<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Blog Kategorilerimiz</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Blog Kategorilerimiz</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <template v-for="a in kategori" :key="a">
          <div class="col-12 col-sm-6 col-md-4 mt-2">
            <div class="p-2 text-center">
              <div :style="{ background: 'url(' + ImgBase + a.image + ')' }" class="image-card rounded"></div>
              <h4 class="mt-3">{{ a.name }}</h4>
            </div>
            <router-link :to="'/blog/' + a.id + '-' + a.name.replace(/ /g, '-')" class="w-100 btn btn-outline-warning">
              Bloglar
            </router-link>
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
  </div>
</template>

<script>
import axios from "axios";
import dateTimeParser from "@/hooks/dateTimeParser";
export default {
  data() {
    return {
      kategori: [],
      load: true,
      limit: 6,
      page: 1,
      count: 0,
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
      axios.post(this.fungi + "/BlogCategory", params).then((response) => {
        this.kategori = response.data.data;
        this.count = response.data.count;
        this.load = false;
      });
    },
    setPage(e) {
      this.page = e;
      this.getData();
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
