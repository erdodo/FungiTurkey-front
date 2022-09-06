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
        <template v-for="a in about" :key="a">
          <div class="col-12 col-md-6">
            <h2>{{ a.title }}</h2>
            <p>
              {{ a.content }}
            </p>
            <img :src="ImgBase + a.image" alt="" class="w-100" />
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
      load: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.load = true;
      axios.post("fungitu2_fungiturkey/About").then((response) => {
        this.about = response.data.data;
        this.load = false;
      });
    },
  },
};
</script>

<style></style>
