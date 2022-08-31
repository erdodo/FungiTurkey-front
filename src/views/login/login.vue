<template>
  <div>
    <el-dialog v-model="state" title="Giriş Yap" width="30%" :before-close="handleClose" draggable>
      <label for="">Eposta:</label>
      <el-input v-model="email" placeholder="Eposta adresiniz"></el-input>
      <label class="mt-3" for="">Şifre:</label>
      <el-input v-model="password" type="password" placeholder="Şifreniz" show-password></el-input>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="giris()" class="w-100">Giriş</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";
export default {
  props: ["loginState"],
  data() {
    return {
      state: false,
      email: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    giris() {
      axios
        .post("/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.data.status == "success") {
            ElNotification({
              title: "Başarılı",
              message: res.data.message,
              type: "success",
            });

            this.$store.commit("setToken", res.data.token);
            this.state = false;
            this.email = "";
            this.password = "";
          } else {
            ElNotification({
              title: "Hata",
              message: res.data.message,
              type: "error",
            });
          }
        });
    },
  },
  watch: {
    loginState() {
      this.state = true;
    },
  },
};
</script>

<style></style>
