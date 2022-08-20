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

    <div class="container">
      <div class="row">
        <template v-for="a in about" :key="a">
          <div class="col-12 col-md-6">
            <h2>{{ a.Title }}</h2>
            <p>
              {{ a.Content }}
            </p>
            <img :src="ImgBase + a.Image" alt="" class="w-100" />
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
      about: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.post("fungiturkey/About").then((response) => {
        this.about = response.data.data;
      });
    },
  },
};
</script>

<style></style>
