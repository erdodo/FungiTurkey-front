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
        <el-image :src="ImgBase + blog.image" class="img-fluid rounded" fit="cover" style="max-height: 700px !important">
          <template #placeholder>
            <div class="w-100 h-100" v-loading="true">Yükleniyor<span class="dot">...</span></div>
          </template>
        </el-image>
      </div>

      <h2 class="mt-4">{{ blog.title }}</h2>

      <p v-html="blog.content"></p>
      <div class="d-flex justify-content-end">
        <h5>{{ dateTimeParser(blog.added_date) }}</h5>
      </div>
      <div class="card my-3">
        <div class="p-3 d-flex">
          <el-image :src="ImgBase + user.image" style="height: 100px; min-width: 100px">
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
          </el-image>
          <div class="ml-4">
            <h3>{{ user.name }} {{ user.surname }}</h3>
            <p>{{ user.about }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-5" v-loading="commentLoad">
      <h4>Yorumlar</h4>
      <div v-if="getToken">
        <el-input v-model="cmm" :rows="3" size="large" type="textarea" placeholder="Yorumunuz..."></el-input>
        <div class="w-100 d-flex justify-content-end">
          <el-button type="primary" class="mt-3" :loading="buttonLoad" @click="yorumGonder()"> Gönder</el-button>
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
  metaInfo: {
    title: "Blog",
    titleTemplate: "Blog",
    htmlAttrs: {
      lang: "tr",
      amp: true,
    },
  },
  data() {
    return {
      blog: [],
      comments: [],
      load: true,
      commentLoad: true,
      buttonLoad: false,
      cmm: "",
      user: [],
    };
  },
  computed: {
    ...mapGetters(["getToken", "getProfile"]),
  },
  mounted() {
    this.getData();
    this.getComment();
  },
  methods: {
    getData() {
      this.load = true;
      axios.post(this.fungi + "/Blog/" + this.$route.params.id + "/get").then((response) => {
        this.blog = response.data.data;
        this.load = false;
        this.getUser(this.blog.own_id);
      });
    },
    getComment() {
      this.commentLoad = true;
      let params = {
        filter: {
          blog_id: this.$route.params.id,
          status: 1,
        },
        order: {
          name: "id",
          type: "DESC",
        },
      };
      axios.post(this.fungi + "/BlogComment", params).then((response) => {
        this.comments = response.data.data;
        this.commentLoad = false;
        this.buttonLoad = false;
      });
    },
    getUser(id) {
      axios.post(this.simple + "/users/" + id + "/get").then((response) => {
        this.user = response.data.data;
      });
    },
    yorumGonder() {
      if (this.cmm.length < 5) {
        ElMessageBox.alert("Lütfen en az 5 karakterlik bir yorum giriniz.", "Dikkat", {
          confirmButtonText: "Tamam",
        });
      } else {
        this.buttonLoad = true;
        var profile = this.getProfile;
        let params = {
          name: profile.name,
          surname: profile.surname,
          comment: this.cmm,
          blog_id: this.blog.id,
          member_id: profile.id,
          status: "0",
        };
        axios.post(this.fungi + "/BlogComment/store", params).then((res) => {
          if (res.data.status == "success") {
            ElMessageBox.alert("Yorumunuz onaylandıktan sonra görüntülenecektir. Teşekkürler.", "Başarılı", {
              confirmButtonText: "Tamam",
            });
            this.getComment();
          }
        });
      }
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
