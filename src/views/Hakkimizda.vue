<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Hakkımızda</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Hakkımızda</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <div class="col-12 col-md-6">
          <h2>{{ about1.title }}</h2>
          <div v-html="about1.content"></div>
          <img :src="ImgBase + about1.image" alt="" class="w-100" />
        </div>
        <div class="col-12 col-md-6">
          <h2>{{ about2.title }}</h2>
          <div v-html="about2.content"></div>
          <img :src="ImgBase + about2.image" alt="" class="w-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  metaInfo: {
    title: "Hakkımızda",
    titleTemplate:
      "Fungi Turkey 2018 yılında mantar türlerini topluma tanıtabilmek ve bilinçli bir şekilde mantar avcılığı yapabilmek adına Ömer Üngör tarafından kurulmuştur. Sosyal medya üzerinden yaptığımız detaylı tür tanımlamaları, online mantar eğitimleri, saha eğitimleri, etkinlikler ve mantar gastronomisi etkinlikleriyle bu alanda Türkiye'de ilkleri gerçekleştirmiştir. Birbirinden değerli katılımcılara sahip Fungi Turkey topluluğu her geçen gün büyüyerek ilerlemeye devam ediyor.",
    htmlAttrs: {
      lang: "tr",
      amp: true,
    },
  },
  data() {
    return {
      about1: {},
      about2: {},
      load: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.load = true;
      axios.post(this.fungi + "/About/1/get").then((response) => {
        this.about1 = response.data.data;
        axios.post(this.fungi + "/About/2/get").then((res) => {
          this.about2 = res.data.data;
          this.load = false;
        });
      });
    },
  },
};
</script>

<style></style>
