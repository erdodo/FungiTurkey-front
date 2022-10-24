<template>
  <header class="fixed-top head">
    <div class="px-5" v-if="desktop">
      <!-- main nav -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo align-items-center"
        style="border-bottom: none"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="horizontal"
        :ellipsis="false"
        router
        @select="handleSelect"
      >
        <el-menu-item :index="'/'" class="border-bottom-0">
          <a href="/"> <img src="@/assets/logo.png" width="130" class="m-2" alt="" /></a>
        </el-menu-item>
        <div v-if="this.fungi == 'fungitu2_test_fungiturkey'" class="text-danger"><h1>TEST</h1></div>
        <div class="flex-grow" />
        <el-menu-item index="/">Anasayfa</el-menu-item>
        <el-menu-item :index="m.table_name" v-for="m in menu" :key="m"
          ><i :class="m.icon" class="me-1"></i> {{ m.display_name }}</el-menu-item
        >

        <el-sub-menu v-if="getToken">
          <template #title>Profil</template>
          <el-menu-item index="/profil"><span class="text-dark">Bilgilerim</span></el-menu-item>
          <el-menu-item index="/profil/blog"><span class="text-dark">Blog Yorumlarım</span></el-menu-item>
          <el-menu-item index="/profil/etkinlik"><span class="text-dark">Etkinlik Yorumlarım</span></el-menu-item>
          <el-menu-item index="/profil/kayit"><span class="text-dark">Kayıtlarım</span></el-menu-item>
          <el-menu-item :index="$route.path" @click="cikis()"><span class="text-dark">Çıkış</span></el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="$route.path" @click="uyeol()">Üye Ol</el-menu-item>
      </el-menu>
      <!-- /main nav -->
    </div>
    <div class="px-1 px-md-3 mobil-header" v-if="!desktop">
      <!-- main nav -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo align-items-center"
        style="border-bottom: none"
        background-color="transparent"
        text-color="black"
        active-text-color="#ffd04b"
        mode="horizontal"
        :ellipsis="false"
        router
        @select="handleSelect"
      >
        <el-menu-item index="/" class="border-bottom-0">
          <img src="@/assets/logo.png" width="100" class="m-2" alt="" />
        </el-menu-item>
        <div v-if="this.fungi == 'fungitu2_test_fungiturkey'" class="text-danger"><h1>TEST</h1></div>
        <div class="flex-grow" />
        <el-sub-menu index="/" style="border-bottom: none !important">
          <template #title
            ><h2 class="text-warning"><i class="bi bi-list"></i></h2
          ></template>
          <el-menu-item index="/">Anasayfa</el-menu-item>
          <el-menu-item :index="m.table_name" v-for="m in menu" :key="m"
            ><i :class="m.icon" class="me-1"></i>{{ m.display_name }}</el-menu-item
          >
          <el-sub-menu v-if="getToken">
            <template #title class="text-dark">Profil</template>
            <el-menu-item index="/profil">Bilgilerim</el-menu-item>
            <el-menu-item index="/profil/blog">Blog Yorumlarım</el-menu-item>
            <el-menu-item index="/profil/etkinlik">Etkinlik Yorumlarım</el-menu-item>
            <el-menu-item index="/profil/kayit">Kayıtlarım</el-menu-item>
            <el-menu-item :index="$route.path" @click="cikis()">Çıkış</el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="$route.path" @click="uyeol()">Üye Ol</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <!-- /main nav -->
    </div>
    <register :registerState="registerState"></register>
  </header>
</template>

<script>
import Register from "../login/register.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: { Register },
  data() {
    return {
      desktop: true,
      token: localStorage.getItem("token"),
      registerState: 0,
      menu: {},
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  mounted() {
    this.getMenu();
    this.desktop = window.innerWidth > 1365 ? true : false;
    window.addEventListener("resize", () => {
      this.desktop = window.innerWidth > 1365 ? true : false;
    });
  },
  methods: {
    uyeol() {
      this.registerState++;
    },
    cikis() {
      this.$store.commit("setToken", "");
      window.location.href = "/";
    },
    getMenu() {
      const params = {
        filter: {
          status: "1",
        },
        order: {
          name: "id",
          type: "DESC",
        },
      };
      axios.defaults.baseURL = this.api + "api/";
      axios.defaults.headers.common["token"] = this.getToken;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      axios.post(this.fungi + "/Menu", params).then((res) => {
        this.menu = res.data.data;
      });
      /*.catch(() => {
          this.$store.commit("setToken", "");
          window.location.href = "/";
        });*/
    },
  },
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.head {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.01));
}
@media screen and (max-width: 768px) {
  .mobil-header {
    background: rgba(0, 0, 0, 0.9);
  }
}
.el-menu-item,
.el-sub-menu__title {
  font-size: 18px !important;
}
</style>
