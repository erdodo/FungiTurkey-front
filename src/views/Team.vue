<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Takımımız</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Takımımız</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <template v-for="a in team" :key="a">
          <div class="col-12 col-sm-6 col-md-4 p-2">
            <div class="border-right border-left">
              <a class="p-2 text-center team-card" :href="a.WebSite" target="_blank">
                <div :style="{ background: 'url(' + ImgBase + a.image + ')' }" class="team-image rounded"></div>
                <div class="">
                  <h4 class="mt-3 text-dark">{{ a.name }} {{ a.surname }}</h4>
                  <h4 class="mt-3 text-dark">{{ a.job }}</h4>
                  <p class="mx-1" v-html="a.content"></p>
                  <el-button @click="detay(a.id)">Devamı...</el-button>
                </div>
              </a>
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
    <el-dialog v-loading="load" v-model="dialogVisible" title="Detaylar" width="400px" :before-close="handleClose">
      <el-image :src="ImgBase + detaylar.image">
        <template #placeholder>
          <div class="image-slot">Yükleniyor<span class="dot">...</span></div>
        </template>
      </el-image>
      <div class="w-100 text-center mt-4">
        <h4>{{ detaylar.name }} {{ detaylar.surname }}</h4>
        <h5>{{ detaylar.job }}</h5>
      </div>
      <p v-html="detaylar.content"></p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Kapat</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import dateTimeParser from "@/hooks/dateTimeParser";
export default {
  metaInfo: {
    title: "Takımımız",
    titleTemplate: "Mantar Takımımız",
    htmlAttrs: {
      lang: "tr",
      amp: true,
    },
  },
  data() {
    return {
      team: [],
      load: true,
      detaylar: {},
      dialogVisible: false,
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
      axios.post(this.fungi + "/Team", params).then((response) => {
        this.team = response.data.data;
        this.load = false;
        this.count = response.data.count;
      });
    },
    setPage(e) {
      this.page = e;
      this.getData();
    },
    detay(id) {
      this.dialogVisible = true;
      this.load = true;
      const params = {
        filter: {
          status: 1,
        },
      };
      axios.post(this.fungi + "/Team/" + id + "/get", params).then((response) => {
        this.detaylar = response.data.data;
        this.load = false;
      });
    },
    dateTimeParser,
  },
};
</script>

<style>
.team-image {
  height: 230px;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}
</style>
