<template>
  <el-dialog v-model="dialogVisible" title="Etkinlik kayıt güncelleme" width="400px" :before-close="handleClose">
    <div class="d-flex flex-column text-center justify-content-center align-items-center">
      <label for="">Kaç kişi katılacaksınız?</label>
      <el-input-number v-model="count" placeholder="Kaç Kişi?"></el-input-number>
      <a href="#" class="mt-4 mb-0">Sözleşme detayları.</a>
      <el-checkbox v-model="checked1" label="Sözleşmeyi kabul ediyorum." class="mt-0" size="large" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Vazgeç</el-button>
        <el-button type="primary" @click="update()">Güncelle</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";
export default {
  props: ["record", "visible"],
  data() {
    return {
      dialogVisible: this.visible,
      count: this.record.people_count,
    };
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible;
      this.count = this.record.people_count;
    },
    record() {
      this.count = this.record.people_count;
    },
  },
  methods: {
    handleClose() {
      this.$emit("visible", false);
    },
    update() {
      if (this.checked1 == true) {
        const formData = new FormData();
        formData.append("people_count", this.count);

        axios.post("fungitu2_fungiturkey/ActivityRecord/" + this.record.id + "/update", formData).then((res) => {
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
};
</script>

<style></style>
