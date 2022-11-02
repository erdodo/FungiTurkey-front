<template>
  <div>
    <el-dialog v-model="state" title="Giriş Yap" v-loading="load" width="400px" :before-close="handleClose" draggable>
      <label for="">Eposta:</label>
      <el-input v-model="email" placeholder="Eposta adresiniz" @keypress.enter="giris()" size="large"></el-input>
      <label for="" class="text-danger">{{ err }}</label>
      <br />
      <label class="mt-3" for="">Şifre:</label>
      <el-input
        v-model="password"
        type="password"
        @keypress.enter="giris()"
        size="large"
        placeholder="Şifreniz"
        show-password
      ></el-input>
      <span @click="forgetstate = true" class="cursor-pointer">Şifremi unuttum </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="giris()" class="w-100">Giriş</el-button>
        </span>
      </template>
    </el-dialog>
    <forget :forgetstate="forgetstate"></forget>
  </div>
</template>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";
import forget from "./forget.vue";
export default {
  components: { forget },
  props: ["loginState"],
  data() {
    return {
      state: false,
      email: "",
      password: "",
      err: "",
      forgetstate: false,
      load: false,
    };
  },
  mounted() {},
  methods: {
    giris() {
      this.load = true;
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
            axios.defaults.headers.common["token"] = res.data.token;
            axios.post("/profile").then((res2) => {
              this.$store.commit("setProfile", JSON.stringify(res2.data.data));
              window.location.reload();
            });
          } else {
            ElNotification({
              title: "Hata",
              message: res.data.message,
              type: "error",
            });
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
  },
  watch: {
    loginState() {
      this.state = true;
    },
    email() {
      if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.err = "Epostanızı kontrol ediniz.";
      } else {
        this.err = "";
      }
    },
  },
};
</script>

<style></style>
