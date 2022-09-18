<template>
  <div v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" title="Etkinlik kayıt güncelleme" width="400px" :before-close="handleClose">
      <div class="d-flex flex-column text-center justify-content-center align-items-center">
        <label for="">Kaç kişi katılacaksınız?</label>
        <el-input-number v-model="count" placeholder="Kaç Kişi?" :max="maxlimit" :min="1"></el-input-number>
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
          <el-button @click="dialogVisible = false">Vazgeç</el-button>
          <el-button type="primary" @click="update()">Güncelle</el-button>
        </span>
      </template>
    </el-dialog>
    <sozlesme :dialogVisible="sozlesmeState" @state="sozlesmeState = false"></sozlesme>
  </div>
</template>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";
import Sozlesme from "./Sozlesme.vue";
export default {
  props: ["record", "visible", "benim", "kota", "kayit"],
  data() {
    return {
      dialogVisible: false,
      count: 0,
      sozlesmeState: false,
      load: false,
      maxlimit: 0,
    };
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible;
      this.count = this.record.people_count;
      console.log(this.record);
      if (this.record.status == 1) {
        this.maxlimit = parseInt(this.kota) - parseInt(this.kayit) + parseInt(this.benim);
      } else {
        this.maxlimit = parseInt(this.kota) - parseInt(this.kayit);
      }
    },
    record() {
      this.count = this.record.people_count;
      console.log(this.record);
      if (this.record.status == 1) {
        this.maxlimit = parseInt(this.kota) - parseInt(this.kayit) + parseInt(this.benim);
      } else {
        this.maxlimit = parseInt(this.kota) - parseInt(this.kayit);
      }
    },
    dialogVisible() {
      if (this.dialogVisible == false) {
        this.$emit("state");
      }
    },
    sozlesmeState() {
      console.log(this.sozlesmeState);
    },
  },
  methods: {
    handleClose() {
      this.$emit("visible", false);
      this.dialogVisible = false;
    },
    update() {
      if (this.checked1 == true) {
        const formData = new FormData();
        formData.append("people_count", this.count);
        formData.append("status", "0");
        this.load = true;
        axios
          .post("fungitu2_fungiturkey/ActivityRecord/" + this.record.id + "/update", formData)
          .then((res) => {
            if (res.data.status == "success") {
              ElNotification({
                title: "Başarılı",
                message: "Kayıt başarıyla gönderildi.",
                type: "success",
              });
              this.dialogVisible = false;
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
  components: {
    Sozlesme,
  },
};
</script>

<style></style>
