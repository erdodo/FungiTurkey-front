<template>
  <div class="d-flex flex-column justify-content-between" style="min-height: 100vh">
    <div>
      <Header />
      <div style="min-height: 500px">
        <router-view></router-view>
      </div>
    </div>
    <Footer />
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
    axios.defaults.baseURL = this.api + "api/";
    if (this.getToken != undefined && this.$route.fullPath != "/") {
      /*axios
        .post("/token_control")
        .then((res) => {
          if (res.data.status == "error") {
            localStorage.clear();
            //window.location.href = "/";
          }
        })
        .catch(() => {
          localStorage.clear();
          //window.location.href = "/";
        });*/
    }
  },
  watch: {
    getToken() {
      axios.defaults.headers.common["token"] = this.getToken;
    },
    $route() {
      console.log("route");
    },
  },
};
</script>
<style>
.mobil {
  height: 100vh;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
