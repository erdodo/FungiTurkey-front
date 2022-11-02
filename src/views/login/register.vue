<template>
  <div>
    <el-dialog v-model="state" title="Üye Ol" v-loading="load" width="450px" top="5vh" :before-close="handleClose">
      <div class="row">
        <div v-for="r in registerData" :key="r" class="col-12 col-lg-6">
          <label class="mt-2 mb-0">{{ r.display }}:</label>
          <el-input
            v-if="r.name == 'phone'"
            v-mask="'+90(###) ### ## ##'"
            v-model="params[r.name]"
            size="large"
            :placeholder="r.display"
          ></el-input>
          <el-input
            v-else-if="r.name == 'password'"
            type="password"
            v-model="params[r.name]"
            size="large"
            :placeholder="r.display"
          ></el-input>
          <el-input
            v-else-if="r.name == 'email'"
            @keyup="validateEmail()"
            v-model="params[r.name]"
            size="large"
            :placeholder="r.display"
          ></el-input>
          <el-input v-else v-model="params[r.name]" size="large" :placeholder="r.display"></el-input>
          <label class="text-danger"> {{ msg[r.name] }} </label>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="register()" class="w-100">Üye ol</el-button>
          <el-divider> Üyeliğiniz var mı? </el-divider>
          <el-button type="success" class="w-100" @click="(state = false), login()">Giriş Yap</el-button>
        </span>
      </template>
    </el-dialog>
    <login :loginState="loginState"></login>
  </div>
</template>

<script>
import axios from "axios";
import login from "./login.vue";
import { ElNotification } from "element-plus";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  components: { login },
  props: ["registerState"],
  data() {
    return {
      state: false,
      loginState: 0,
      registerData: {},
      params: {},
      msg: {},
      load: false,
    };
  },
  mounted() {
    this.getCreateData();
  },
  methods: {
    login() {
      this.loginState++;
    },
    register() {
      this.load = true;
      axios
        .post("/register", this.params)
        .then((res) => {
          if (res.data.status == "success") {
            ElNotification({
              title: "Başarılı",
              message: res.data.message,
              type: "success",
            });
            this.state = false;
            this.login();
          } else {
            ElNotification({
              title: "Başarılı",
              message: res.data.message,
              type: "error",
            });
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    getCreateData() {
      this.load = true;
      axios.post("/fungitu2_Simple/users/create").then((res) => {
        this.registerData = res.data.columns;
        this.load = false;
      });
    },
    validateEmail() {
      if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.params.email)) {
        this.msg["email"] = "Epostanızı kontrol ediniz.";
      } else {
        this.msg["email"] = "";
      }
    },
  },
  watch: {
    registerState() {
      this.state = true;
      this.getCreateData();
    },
  },
};
</script>

<style></style>
