<template>
  <div v-if="dialogState">
    <el-dialog
      v-model="dialogState"
      v-loading="load"
      :title="dialogData.title"
      :width="dialogData.room_status == '1' ? '100%' : '400px'"
      @open="deneme"
    >
      <div class="d-flex flex-column text-center justify-content-center align-items-center">
        <label for="">Kaç kişi katılacaksınız?</label>
        <el-input-number v-model="count" placeholder="Kaç Kişi?" :max="limit" :min="1"></el-input-number>
        <label v-if="count == limit" class="text-danger">Kotamız dolmuştur</label>
        <el-checkbox
          v-model="checked1"
          @click="sozlesmeState = true"
          label="Sözleşmeyi kabul ediyorum."
          class="mt-0"
          size="large"
        />
        <h5 class="text-primary" v-if="dialogData.room_status == '1'">
          Aşağıdan kiralamak istediğiniz odayı seçebilirsiniz
        </h5>
      </div>

      <div class="d-flex" v-if="dialogData.room_status == '1'">
        <el-card
          class="mr-2"
          :class="selected_room == room.id ? 'border-primary' : ''"
          @click="selected_room = room.id"
          v-for="room in rooms"
          :key="room"
        >
          <div class="d-flex flex-column">
            <el-image :src="ImgBase + room.image" style="width: 200px">
              <template #placeholder>
                <div class="image-slot">Loading<span class="dot">...</span></div>
              </template>
            </el-image>
            <h5 class="mt-2">{{ room.room_name }} / {{ room.room_no }}</h5>
            <span> {{ room.price }}TL (Kişi Başı) </span>
            <span> {{ room.quota }} Kişilik </span>

            <p v-html="room.content"></p>
            <label v-if="selected_room == room.id" class="text-primary">Seçili</label>
          </div>
        </el-card>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogState = false">Vazgeç</el-button>
          <el-button type="primary" @click="etkinlikKayit()">Kayıt ol</el-button>
        </span>
      </template>
    </el-dialog>
    <sozlesme :dialogVisible="sozlesmeState"></sozlesme>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { ElNotification } from "element-plus";
import Sozlesme from "./Sozlesme.vue";
export default {
  components: { Sozlesme },
  props: ["kayitDialog", "dialogData", "limit"],
  data() {
    return {
      dialogState: this.kayitDialog,
      count: 1,
      checked1: false,
      sozlesmeState: false,
      load: false,
      rooms: [],
      selected_room: 0,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["getToken", "getProfile"]),
  },
  methods: {
    etkinlikKayit() {
      if (this.checked1 == true) {
        this.load = true;
        const formData = new FormData();
        formData.append("activity_id", Number(this.dialogData.id));
        formData.append("email", this.getProfile.email);
        formData.append("name", this.getProfile.name);
        formData.append("surname", this.getProfile.surname);
        formData.append("phone", this.getProfile.phone);
        formData.append("people_count", this.count);
        formData.append("status", "0");

        axios
          .post("fungitu2_fungiturkey/ActivityRecord/store", formData)
          .then((res) => {
            if (res.data.status == "success") {
              ElNotification({
                title: "Başarılı",
                message: "Kayıt başarıyla onaya gönderildi.",
                type: "success",
              });
              this.dialogState = false;
            }
          })
          .finally(() => {
            this.load = false;
          });
      } else {
        ElNotification({
          title: "Dikkat",
          message: "Sözleşmeyi kabul ediniz.",
          type: "warning",
        });
      }
    },
    getRoom() {
      axios.post("fungitu2_fungiturkey/ActivityRoom").then((res) => {
        this.rooms = res.data.data;
      });
    },
  },
  watch: {
    kayitDialog() {
      //this.activityRecordCreate();
      this.dialogState = this.kayitDialog;
      if (this.dialogData.room_status == "1") {
        this.getRoom();
      }
    },
    dialogState() {
      this.$emit("dialogState", this.dialogState);
    },
  },
};
</script>

<style></style>
