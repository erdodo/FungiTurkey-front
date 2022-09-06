<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Detay</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item"><router-link to="/blog" class="text-white">Blog</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Detay</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container mb-5" v-loading="load" style="min-height: 300px">
      <div class="d-flex justify-content-center">
        <img :src="ImgBase + blog.image" alt="" style="max-height: 700px !important" class="img-fluid rounded" />
      </div>

      <h2 class="mt-4">{{ blog.title }}</h2>

      <p v-text="blog.content"></p>
    </div>
    <div class="container mb-5">
      <h4>Yorumlar</h4>
      <div v-if="getToken">
        <el-input v-model="cmm" :rows="3" size="large" type="textarea" placeholder="Yorumunuz..."></el-input>
        <div class="w-100 d-flex justify-content-end">
          <el-button type="primary" class="mt-3" @click="yorumGonder()"> Gönder</el-button>
        </div>
        <el-divider />
      </div>
      <template v-for="c in comments" :key="c">
        <div class="card p-3 my-1">
          <div class="d-flex justify-content-between">
            <h5 class="m-0 p-0">{{ c.name }} {{ c.surname }}</h5>
            <p class="text-warning">{{ dateTimeParser(c.added_date) }}</p>
          </div>
          <p>{{ c.comment }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dateTimeParser from "@/hooks/dateTimeParser";
import { mapGetters } from "vuex";
import { ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      blog: [],
      comments: [],
      load: true,
      cmm: "",
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  mounted() {
    this.getData();
    this.getComment();
  },
  methods: {
    getData() {
      axios.post("fungitu2_fungiturkey/Blog/" + this.$route.params.id + "/get").then((response) => {
        this.blog = response.data.data;
        this.load = false;
      });
    },
    getComment() {
      let params = {
        filter: {
          blog_id: this.$route.params.id,
        },
      };
      axios.post("fungitu2_fungiturkey/BlogComment", params).then((response) => {
        this.comments = response.data.data;
      });
    },
    yorumGonder() {
      axios.post("/profile").then((res) => {
        var profile = res.data.data;
        let formData = new FormData();
        formData.append("name", profile.name);
        formData.append("surname", profile.surname);
        formData.append("comment", this.cmm);
        formData.append("blog_id", this.blog.id);
        axios.post("fungitu2_fungiturkey/BlogComment/store", formData).then((res) => {
          if (res.data.status == "success") {
            ElMessageBox.alert("Yorumunuz başarıyla gönderildi. Teşekkürler.", "Başarılı", {
              confirmButtonText: "Tamam",
            });
            this.getComment();
          }
        });
      });
    },
    dateTimeParser,
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
