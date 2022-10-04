<template>
  <div v-if="dialogState">
    <el-dialog
      v-model="dialogState"
      v-loading="load"
      :title="dialogData.title"
      :width="dialogData.room_status == '1' ? '100%' : '400px'"
      @open="deneme"
    >
      <div
        v-if="dialogData?.room_status != '1' || dialogData?.cadir_kota > 0"
        class="d-flex flex-column text-center justify-content-center align-items-center"
      >
        <label v-if="dialogData?.cadir_kota > 0">Kaç kişilik çadır kiralamak istersiniz?</label>
        <label v-else>Kaç kişi katılacaksınız?</label>
        <el-input-number
          v-model="count"
          placeholder="Kaç Kişi?"
          :max="limit"
          :min="dialogData?.cadir_kota > 0 ? 0 : 1"
        ></el-input-number>
        <label v-if="count == limit" class="text-danger">Kotamız dolmuştur</label>
        <el-checkbox
          v-if="count > 0"
          v-model="checked1"
          @click="sozlesmeState = true"
          label="Sözleşmeyi kabul ediyorum."
          class="mt-0"
          size="large"
        />
      </div>
      <h5 class="text-primary" v-if="dialogData.room_status == '1' && rooms?.length != 0">
        Aşağıdan kiralamak istediğiniz odayı seçebilirsiniz
      </h5>
      <div class="d-flex overflow-auto py-3" v-if="dialogData.room_status == '1'">
        <el-card
          class="mr-2"
          :class="selected_room?.find((e) => e == room.id) ? 'border-primary' : ''"
          v-for="room in rooms"
          :key="room"
          style="min-width: 250px; max-width: 250px; max-height: 500px; overflow-y: auto"
        >
          <div class="d-flex flex-column">
            <el-image :src="ImgBase + room.image" style="width: 200px">
              <template #placeholder>
                <div class="image-slot">Loading<span class="dot">...</span></div>
              </template>
            </el-image>
            <h5 class="mt-2">{{ room.room_name }} / {{ room.room_no }}</h5>
            <span> {{ room.price }}TL</span>
            <span> {{ room.quota }} Kişilik </span>

            <el-button type="danger" v-if="selected_room?.find((e) => e == room.id)" @click="deleteSelected(room.id)" plain
              >İptal</el-button
            >
            <el-button type="primary" v-else @click="setSelect(room.id)" class="">Seç</el-button>
            <p v-html="room.content"></p>
          </div>
        </el-card>
        <div v-if="rooms.length == 0 && dialogData?.cadir_kota == 0">
          <h5>Maalesef kontenjanımız kalmadığını bildirmek zorundayız. Sonraki etkinliklerde görüşmek üzere.</h5>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-center mt-3" v-if="dialogData.room_status == '1' && rooms.length != 0">
        <el-checkbox
          v-model="checked1"
          @click="sozlesmeState = true"
          label="Sözleşmeyi kabul ediyorum."
          class="mt-0"
          size="large"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogState = false">Vazgeç</el-button>
          <el-button v-if="dialogData.room_status == '1' && dialogData?.cadir_kota > 0" type="primary" @click="odaKayit()"
            >Kayıt Ol</el-button
          >
          <el-button v-else-if="dialogData.room_status != '1'" type="primary" @click="etkinlikKayit()">Kayıt Ol</el-button>
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
      selected_room: [],
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
        const params1 = {
          activity_id: Number(this.dialogData.id),
          email: this.getProfile.email,
          name: this.getProfile.name,
          surname: this.getProfile.surname,
          phone: this.getProfile.phone,
          people_count: this.count,
          room_id: null,
          status: 0,
        };
        axios
          .post(this.fungi + "/ActivityRecord/store", params1)
          .then((res) => {
            if (res.data.status == "success") {
              ElNotification({
                title: "Başarılı",
                message: "Kayıt başarıyla onaya gönderildi.",
                type: "success",
              });
              window.location.reload();
            }
          })
          .finally(() => {
            this.load = false;
          });
        if (this.selected_room > 0) {
          const params = {
            rent_status: "1",
          };
          axios.post(this.fungi + "/ActivityRoom/" + this.selected_room + "/update", params);
        }
      } else {
        ElNotification({
          title: "Dikkat",
          message: "Sözleşmeyi kabul ediniz.",
          type: "warning",
        });
      }
    },
    odaKayit() {
      if (this.checked1 == true) {
        if (this.count > 0 && this.dialogData?.cadir_kota > 0) this.etkinlikKayit();
        for (const val of Object.values(this.selected_room)) {
          this.load = true;
          const params = {
            activity_id: Number(this.dialogData.id),
            email: this.getProfile.email,
            name: this.getProfile.name,
            surname: this.getProfile.surname,
            phone: this.getProfile.phone,
            people_count: this.rooms.find((e) => e.id == val).quota,
            room_id: val,
            status: 0,
          };
          axios
            .post(this.fungi + "/ActivityRecord/store", params)
            .then((res) => {
              if (res.data.status == "success") {
                ElNotification({
                  title: "Başarılı",
                  message: "Kayıt başarıyla onaya gönderildi.",
                  type: "success",
                });
                window.location.reload();
              }
            })
            .finally(() => {
              this.load = false;
            });

          const params2 = {
            rent_status: "1",
          };
          axios.post(this.fungi + "/ActivityRoom/" + val + "/update", params2);
        }
      } else {
        ElNotification({
          title: "Dikkat",
          message: "Sözleşmeyi kabul ediniz.",
          type: "warning",
        });
      }
    },
    setSelect(id) {
      this.selected_room.push(id);
    },
    deleteSelected(id) {
      delete this.selected_room[this.selected_room.indexOf(id)];
    },
    getRoom() {
      this.count = this.dialogData?.cadir_kota > 0 ? 0 : 1;
      const params = {
        limit: 100,
        filter: {
          status: "1",
          rent_status: "0",
          activity_id: this.dialogData.id,
        },
      };
      axios.post(this.fungi + "/ActivityRoom", params).then((res) => {
        this.rooms = res.data.data;
      });
    },
  },
  watch: {
    kayitDialog() {
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
