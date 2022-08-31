<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Admin</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Admin</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-if="state">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1" v-for="t in tableData" :key="t">
          <div class="card p-2 text-center">
            <div class="d-flex flex-column">
              <h3>{{ t.display }}</h3>
              <el-button class="w-100 mb-2">Ekle</el-button>
              <el-button class="w-100 mb-2 ml-0">Düzenle</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
        {
          display: "Slider",
          name: "Slider",
        },
        {
          display: "Hakkımızda",
          name: "About",
        },
        {
          display: "Organizasyonumuz",
          name: "Services",
        },
        {
          display: "Galeri",
          name: "Galery",
        },

        {
          display: "Etkinlikler",
          name: "Activity",
        },
        {
          display: "Blog",
          name: "Blog",
        },
        {
          display: "Sponsor",
          name: "Sponsor",
        },
        {
          display: "İletişim",
          name: "Contact",
        },
        {
          display: "Geri Dönütler",
          name: "Feedbacks",
        },
      ],
      state: false,
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios.post("/profile");
    },
  },
};
</script>

<style></style>
