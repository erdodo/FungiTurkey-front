<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Galeri</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Galeri</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <template v-for="(a, key) in galery" :key="a">
          <div class="col-12 col-sm-6 col-md-4 col-xl-3">
            <div class="p-2 text-center">
              <div
                class="w-100 image-card rounded cursor-pointer"
                @click="(modalData = !modalData), (selectedImage = key)"
                :style="{ background: 'url(' + ImgBase + a.image + ')' }"
              ></div>
              <label class="mt-3">{{ a.title }}</label>
            </div>
          </div>
        </template>
      </div>
    </div>
    <galery v-if="modalData" v-model="modalData" :selectedImage="selectedImage" :data="galery"></galery>
  </div>
</template>

<script>
import axios from "axios";
import Galery from "./modals/Galery.vue";
export default {
  components: { Galery },
  data() {
    return {
      galery: [],
      modalData: false,
      load: true,
      selectedImage: 0,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.load = true;
      axios.post("fungitu2_fungiturkey/Galery").then((response) => {
        this.galery = response.data.data;
        this.load = false;
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
