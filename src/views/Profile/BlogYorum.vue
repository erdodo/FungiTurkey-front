<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Blog Yorumlarınız</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Blog Yorumlarınız</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container mb-5">
      <h4>Yorumlar</h4>
      <template v-for="c in comments" :key="c">
        <div class="card p-3 my-1">
          <a class="" :href="'/blog/' + c.blog_id + '-' + 'Yorum-yapılan-blog'">
            <div class="d-flex justify-content-between">
              <h5 class="m-0 p-0">{{ c.name }} {{ c.surname }}</h5>
              <p class="text-warning">{{ dateTimeParser(c.added_date) }}</p>
            </div>
            <p>{{ c.comment }}</p>
          </a>
          <div class="w-100">
            <el-button type="success" @click="duzenle(c)">Düzenle</el-button>
            <el-popconfirm
              title="Silmek istediğinize emin misiniz?"
              confirm-button-text="Evet"
              cancel-button-text="Vazgeç"
              @confirm="sil(c)"
            >
              <template #reference>
                <el-button type="danger">Sil</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
    </div>
  </div>
  <el-dialog v-model="dialogState" title="Düzenle" width="50%" :before-close="handleClose">
    <el-input v-model="islemData.comment" :rows="4" type="textarea" placeholder="Yorumunu<"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogState = false">Vazgeç</el-button>
        <el-button type="primary" @click="duzenleOnay()">Kaydet</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import dateTimeParser from "@/hooks/dateTimeParser";
import { ElNotification } from "element-plus";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      comments: [],
      islemData: {},
      dialogState: false,
    };
  },
  computed: {
    ...mapGetters(["getProfile"]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        filter: {
          own_id: this.getProfile.id,
        },
      };
      axios.post("fungitu2_fungiturkey/BlogComment", params).then((response) => {
        this.comments = response.data.data;
      });
    },
    duzenle(c) {
      this.dialogState = true;
      this.islemData = c;
    },
    duzenleOnay() {
      let formData = new FormData();
      formData.append("comment", this.islemData.comment);
      axios.post("fungitu2_fungiturkey/BlogComment/" + this.islemData.id + "/update", formData).then((res) => {
        if (res.data.status == "success") {
          ElNotification({
            title: "Başarılı",
            message: "Yorum başarıyla düzenlendi",
            type: "success",
          });
          this.dialogState = false;
          this.getData();
        }
      });
    },
    sil(c) {
      axios.post("fungitu2_fungiturkey/BlogComment/" + c.id + "/delete").then((res) => {
        if (res.data.status == "success") {
          ElNotification({
            title: "Başarılı",
            message: "Yorum başarıyla silindi",
            type: "success",
          });
          this.dialogState = false;
          this.getData();
        }
      });
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
