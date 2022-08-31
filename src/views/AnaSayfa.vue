<template>
  <div class="hero-slider p-0" v-if="slides.length > 0">
    <vueper-slides fixed-height="100vh" autoplay pause-on-hover :touchable="false">
      <vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :title="slide.title"
        :image="ImgBase + slide.image"
        :content="slide.content"
      >
        <template #content>
          <div class="slider-content">
            <div class="row justify-content-md-center">
              <div class="col-11 col-sm-9 col-md-7">
                <h1 class="display-4">{{ slide.title }}</h1>
                <p class="h5 text-white m-0 p-0">{{ slide.content }}</p>
                <router-link :to="slide.button_href" class="btn btn-outline-warning rounded-pill mt-2">
                  {{ slide.button_title }}
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import axios from "axios";
export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      slides: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.post("fungitu2_fungiturkey/Slider").then((response) => {
        this.slides = response.data.data;
        console.log(this.slides);
      });
    },
  },
};
</script>

<style>
.slider-content {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
