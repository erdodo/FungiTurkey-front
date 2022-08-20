<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Sponsor</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Sponsor</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <template v-for="a in sponsor" :key="a">
          <div class="col-12 col-sm-6 col-md-4 p-2">
            <div class="border-right border-left">
              <a class="p-2 text-center sponsor-card" :href="a.WebSite" target="_blank">
                <div :style="{ background: 'url(' + ImgBase + a.Image + ')' }" class="sponsor-image rounded"></div>
                <div class="">
                  <h4 class="mt-3 text-dark">{{ a.Title }}</h4>
                  <a>{{ a.WebSite }} </a>
                </div>
              </a>
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
      sponsor: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.post("fungiturkey/Sponsor").then((response) => {
        this.sponsor = response.data.data;
      });
    },
    dateTimeParser(data) {
      var date = new Date(data);
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var year = date.getFullYear();
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var time = day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;
      return time;
    },
  },
};
</script>

<style>
.sponsor-image {
  height: 230px;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}
</style>
