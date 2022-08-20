<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Etkinlik Yorumlarınız</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Etkinlik Yorumlarınız</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container mb-5">
      <h4>Yorumlar</h4>
      <template v-for="c in comments" :key="c">
        <a class="card p-3 my-1" :href="'/etkinlik/' + c.ActivityId + '-' + 'Yorum-yapılan-Etkinlik'">
          <div class="d-flex justify-content-between">
            <h5 class="m-0 p-0">{{ c.Name }} {{ c.Surname }}</h5>
            <p class="text-warning">{{ dateTimeParser(c.added_date) }}</p>
          </div>
          <p>{{ c.Comment }}</p>
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      comments: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        filter: {
          own_id: "1",
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
};
</script>

<style>
.image-card {
  height: 230px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
