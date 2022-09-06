<template>
  <div class="d-none d-sm-flex flex-column justify-content-between" style="min-height: 100vh">
    <div>
      <Header />
      <div style="min-height: 500px">
        <router-view></router-view>
      </div>
    </div>
    <Footer />
  </div>
  <div class="d-flex mobil flex-column d-sm-none justify-content-center align-items-center">
    Mobil uygulamamızı denemek ister misiniz?
    <el-button type="primary">İndir</el-button>
  </div>
</template>
<script>
import Header from "@/views/layout/header.vue";
import Footer from "@/views/layout/footer.vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  mounted() {
    document.getElementById("app").style.display = "block";
    document.getElementById("first-load").style.display = "none ";

    axios.defaults.headers.common["token"] = this.getToken;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.baseURL = "https://api.fungiturkey.org/api/";
  },
  watch: {
    getToken() {
      axios.defaults.headers.common["token"] = this.getToken;
    },
  },
};
</script>
<style>
.mobil {
  height: 100vh;
}
</style>
