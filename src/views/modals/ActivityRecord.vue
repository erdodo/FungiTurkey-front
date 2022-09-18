<template>
  <div v-if="dialogState">
    <el-dialog v-model="dialogState" v-loading="load" :title="dialogData.title" width="400px" @open="deneme">
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
  },
  watch: {
    kayitDialog() {
      //this.activityRecordCreate();
      this.dialogState = this.kayitDialog;
    },
    dialogState() {
      this.$emit("dialogState", this.dialogState);
    },
  },
};
</script>

<style></style>
