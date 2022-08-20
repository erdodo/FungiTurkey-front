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

    <div class="container">
      <div class="row">
        <template v-for="a in galery" :key="a">
          <div class="col-12 col-sm-6 col-md-4 col-xl-3">
            <div class="p-2 text-center">
              <div
                class="w-100 image-card rounded cursor-pointer"
                @click="modalData = !modalData"
                :style="{ background: 'url(' + ImgBase + a.Image + ')' }"
              ></div>
              <label class="mt-3">{{ a.Title }}</label>
            </div>
          </div>
        </template>
      </div>
    </div>
    <galery v-model="modalData" :data="galery"></galery>
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
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.post("fungiturkey/Galery").then((response) => {
        this.galery = response.data.data;
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
