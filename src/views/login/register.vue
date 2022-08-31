<template>
  <div>
    <el-dialog v-model="state" title="Üye Ol" width="30%" top="5vh" :before-close="handleClose">
      <div v-for="r in registerData" :key="r">
        <label class="mt-2 mb-0">{{ r.display }}:</label>
        <el-input v-model="params[r.name]" :placeholder="r.display"></el-input>
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
export default {
  components: { login },
  props: ["registerState"],
  data() {
    return {
      state: false,
      loginState: 0,
      registerData: {},
      params: {},
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
      axios.post("/register", this.params);
    },
    getCreateData() {
      axios.post("/fungitu2_Simple/users/create").then((res) => {
        this.registerData = res.data.columns;
      });
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
