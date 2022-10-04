<template>
  <div v-loading="load" class="hero-slider p-0" v-if="slides.length > 0">
    <vueper-slides fixed-height="100vh" autoplay pause-on-hover :touchable="false">
      <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :content="slide.content">
        <template #content>
          <img class="slider-back" src="" :id="slide.image" alt="" />

          <div class="slider-content" style="background: rgba(0, 0, 0, 0.6)">
            <div class="row justify-content-center text-center">
              <div class="col-11 col-md-9 text-center">
                <h1 class="display-3 w-100 d-flex justify-content-center">{{ slide.title }}</h1>
                <p class="h4 text-white m-0 p-0">{{ slide.content }}</p>
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
      load: true,
    };
  },
  mounted() {
    this.load = true;
    this.getData();
  },
  methods: {
    getData() {
      this.load = true;
      let params = {
        filter: {
          status: 1,
        },
         order: {
          name: "id",
          type: "DESC",
        },
      };
      axios
        .post(this.fungi + "/Slider", params)
        .then((response) => {
          this.slides = response.data.data;
          this.load = false;
          for (const img of Object.values(this.slides)) {
            document.getElementById("app").style.display = "none";
            document.getElementById("first-load").style.display = "flex";

            var image = new Image();
            image.onload = function () {
              document.getElementById(img.image).setAttribute("src", this.src);
              document.getElementById("app").style.display = "block";
              document.getElementById("first-load").style.display = "none ";
            };
            image.src = this.ImgBase + img.image;
          }
        })
        .catch((e) => {
          if (e.response.data.message == "Unauthorized") {
            this.$store.commit("setToken", "");
            this.$store.commit("setProfile", "");
            window.location.reload();
          }
        });
    },
  },
};
</script>

<style>
.slider-content {
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}
.slider-back {
  position: fixed;
  min-height: 100vh;
  min-width: 100vw;
  width: auto;
  inline-size: max-content;
  text-align: center;
}
</style>
