<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Takımımız</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Takımımız</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <template v-for="a in team" :key="a">
          <div class="col-12 col-sm-6 col-md-4 p-2">
            <div class="border-right border-left">
              <a class="p-2 text-center team-card" :href="a.WebSite" target="_blank">
                <div :style="{ background: 'url(' + ImgBase + a.image + ')' }" class="team-image rounded"></div>
                <div class="">
                  <h4 class="mt-3 text-dark">{{ a.name }} {{ a.surname }}</h4>
                  <h4 class="mt-3 text-dark">{{ a.job }}</h4>
                  <p class="mx-1" v-html="a.description"></p>
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
import dateTimeParser from "@/hooks/dateTimeParser";
export default {
  data() {
    return {
      team: [],
      load: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.load = true;
      const params = {
        filter: {
          status: 1,
        },
      };
      axios.post("fungitu2_fungiturkey/Team", params).then((response) => {
        this.team = response.data.data;
        this.load = false;
      });
    },
    dateTimeParser,
  },
};
</script>

<style>
.team-image {
  height: 230px;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}
</style>
