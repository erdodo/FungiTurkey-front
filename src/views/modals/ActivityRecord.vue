<template>
  <el-dialog v-model="dialogState" :title="dialogData.title" width="400px" @open="deneme">
    <div class="d-flex flex-column text-center justify-content-center align-items-center">
      <label for="">Kaç kişi katılacaksınız?</label>
      <el-input-number v-model="count" placeholder="Kaç Kişi?"></el-input-number>
      <a href="#" class="mt-4 mb-0">Sözleşme detayları.</a>
      <el-checkbox v-model="checked1" label="Sözleşmeyi kabul ediyorum." class="mt-0" size="large" />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogState = false">Vazgeç</el-button>
        <el-button type="primary" @click="etkinlikKayit()">Kayıt ol</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { ElNotification } from "element-plus";
export default {
  props: ["kayitDialog", "dialogData"],
  data() {
    return {
      dialogState: this.kayitDialog,
      count: 2,
      checked1: false,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["getToken", "getProfile"]),
  },
  methods: {
    etkinlikKayit() {
      if (this.checked1 == true) {
        const formData = new FormData();
        formData.append("activity_id", Number(this.dialogData.id));
        formData.append("email", this.getProfile.email);
        formData.append("name", this.getProfile.name);
        formData.append("surname", this.getProfile.surname);
        formData.append("phone", this.getProfile.phone);
        formData.append("people_count", this.count);

        axios.post("fungitu2_fungiturkey/ActivityRecord/store", formData).then((res) => {
          if (res.data.status == "success") {
            ElNotification({
              title: "Başarılı",
              message: "Kayıt başarıyla gönderildi.",
              type: "success",
            });
            this.dialogState = false;
          }
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
    getToken() {
      this.activityRecordCreate();
    },
  },
};
</script>

<style></style>
