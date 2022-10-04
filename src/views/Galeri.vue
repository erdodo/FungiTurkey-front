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
        <template v-for="(a, key) in galery" :key="key">
          <div class="col-12 col-sm-6 col-md-4 col-xl-3 mt-2">
            <div class="p-2 text-center">
              <el-image
                :src="ImgBase + a.image"
                style="width: 100%"
                class="w-100 image-card rounded cursor-pointer"
                fit="cover"
                @click="(modalData = !modalData), (selectedImage = key)"
              >
                <template #placeholder>
                  <div v-loading="true" class="card h-100 d-flex align-items-center justify-content-center">
                    <div></div>
                  </div>
                </template>
              </el-image>
              <label class="mt-3">{{ a.title }}</label>
            </div>
          </div>
        </template>

        <div class="col-12 mt-4">
          <div class="w-100 d-flex justify-content-center">
            <el-pagination
              :page-size="limit"
              :pager-count="3"
              @current-change="setPage($event)"
              layout="prev, pager, next"
              :total="count"
            />
          </div>
        </div>
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
      count: 0,
      limit: 6,
      page: 1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.load = true;
      const params = {
        limit: this.limit,
        page: this.page,
        filter: {
          status: 1,
        },
         order: {
          name: "id",
          type: "DESC",
        },
      };
      axios.post(this.fungi + "/Galery", params).then((response) => {
        this.galery = response.data.data;
        this.count = response.data.count;
        this.load = false;
      });
    },
    setPage(e) {
      this.page = e;
      this.getData();
    },
  },
};
</script>

<style>
.image-card {
  height: 200px;
}
</style>
