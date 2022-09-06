<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Blog</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Blog</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <template v-for="a in blog" :key="a">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="p-2 text-center">
              <div :style="{ background: 'url(' + ImgBase + a.image + ')' }" class="image-card rounded"></div>
              <h4 class="mt-3">{{ a.title }}</h4>
              <span class="text-info"> {{ dateTimeParser(a.added_date) }} </span>
            </div>
            <router-link :to="'/blog/' + a.id + '-' + a.title.replace(/ /g, '-')" class="w-100 btn btn-outline-warning"
              >Devamını Oku</router-link
            >
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
      blog: [],
      load: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.post("fungitu2_fungiturkey/Blog").then((response) => {
        this.blog = response.data.data;
        this.load = false;
      });
    },
    dateTimeParser,
  },
};
</script>

<style>
.image-card {
  height: 230px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
