<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Etkinlik Detay</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item"><router-link to="/etkinlik" class="text-white">Etkinlikler</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Detay</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container mb-5">
      <img :src="ImgBase + activity.Image" alt="" class="img-fluid rounded" />
      <h2 class="mt-4">{{ activity.Title }}</h2>
      <div class="d-flex flex-column">
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Calendar /> </el-icon>Başlama Tarihi:
          </span>
          <a class="text-dark">{{ dateTimeParser(activity.StartDate) }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Calendar /> </el-icon>Bitiş Tarihi:
          </span>
          <a class="text-dark">{{ dateTimeParser(activity.FinishDate) }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Calendar /> </el-icon>Son Kayıt Tarihi:
          </span>
          <a class="text-dark">{{ dateTimeParser(activity.LastRecordDate) }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Money /> </el-icon>Ücret:
          </span>
          <a class="text-dark">{{ activity.Price }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><User /> </el-icon>Kordinatör:
          </span>
          <a class="text-dark">{{ activity.Director }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><User /> </el-icon>Kontenjan:
          </span>
          <a class="text-dark">{{ activity.Quota }} Kişi</a>
        </h6>
      </div>
      <p v-text="activity.Content"></p>
    </div>
    <div class="container mb-5">
      <h4>Yorumlar</h4>
      <template v-for="c in comments" :key="c">
        <div class="card p-3 my-1">
          <div class="d-flex justify-content-between">
            <h5 class="m-0 p-0">{{ c.Name }} {{ c.Surname }}</h5>
            <p class="text-warning">{{ dateTimeParser(c.added_date) }}</p>
          </div>
          <p>{{ c.Comment }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Calendar, Money, User } from "@element-plus/icons-vue";
export default {
  data() {
    return {
      activity: [],
      modalData: false,
      comments: [],
    };
  },
  mounted() {
    this.getData();
    this.getComment();
  },
  methods: {
    getData() {
      axios.post("fungiturkey/Activity/" + this.$route.params.id + "/get").then((response) => {
        this.activity = response.data.data;
      });
    },
    getComment() {
      let params = {
        filter: {
          ActivityId: this.$route.params.id,
        },
      };
      axios.post("fungiturkey/ActivityComment", params).then((response) => {
        this.comments = response.data.data;
      });
    },
    dateTimeParser(data) {
      var date = new Date(data);
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var year = date.getFullYear();
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var time = day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;
      return time;
    },
  },
  components: { Calendar, Money, User },
};
</script>

<style>
.image-card {
  height: 200px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
