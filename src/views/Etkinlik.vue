<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Etkinlikler</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Etkinlikler</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <template v-for="a in activity" :key="a">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="p-2 text-center">
              <div
                class="w-100 image-card rounded cursor-pointer"
                @click="modalData = !modalData"
                :style="{ background: 'url(' + ImgBase + a.Image + ')' }"
              ></div>
              <h3 class="mt-3">{{ a.Title }}</h3>
              <h5>
                Son Kayıt: <a class="text-warning">{{ a.LastRecordDate }}</a>
              </h5>
              <div class="">
                <router-link
                  :to="'/etkinlik/' + a.id + '-' + a.Title.replace(/ /g, '-')"
                  class="btn btn-warning mx-2 text-white"
                  >Devamını Oku</router-link
                >
                <button class="btn btn-outline-warning mx-2">Giriş Yap</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity: [],
      modalData: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.post("fungiturkey/Activity").then((response) => {
        this.activity = response.data.data;
      });
    },
  },
};
</script>

<style>
.image-card {
  height: 200px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
