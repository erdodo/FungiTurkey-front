<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Organizasyonumuz</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Organizasyonumuz</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <div class="col-12">
          <div class="p-2 text-center">
            <img :src="ImgBase + services.image" alt="" class="w-100 rounded" />
            <h4 class="mt-3">{{ services.title }}</h4>
            <p>
              {{ services.content }}
            </p>
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
      services: [],
      load: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.load = true;
      axios.post("fungitu2_fungiturkey/Services/" + this.$route.params.id + "/get").then((response) => {
        this.services = response.data.data;
        this.load = false;
      });
    },
  },
};
</script>

<style></style>
