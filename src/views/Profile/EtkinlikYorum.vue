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

    <div class="container mb-5" v-loading="load">
      <h4>Yorumlar</h4>
      <template v-for="c in comments" :key="c">
        <div class="card p-3 my-1">
          <a :href="'/activity/' + c.activity_id + '-' + 'Yorum-yapılan-activity'" class="d-flex">
            <div style="width: 200px">
              <el-image :src="ImgBase + activitys[c.activity_id].image" style="height: 100px">
                <template #placeholder>
                  <div class="image-slot">Loading<span class="dot">...</span></div>
                </template>
              </el-image>
            </div>
            <div class="d-flex flex-column justify-content-between">
              <h5>{{ activitys[c.activity_id].title }}</h5>
              <p class="text-warning">{{ dateTimeParser(c.added_date) }}</p>
              <p>{{ c.comment }}</p>
            </div>
          </a>
          <div class="w-100 d-flex justify-content-between">
            <div>
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
            <div>
              <el-tag class="mx-1" size="large" type="success" v-if="c.status == 1">Onaylı</el-tag>
              <el-tag class="mx-1" size="large" type="danger" v-else>Onay Bekliyor</el-tag>
            </div>
          </div>
        </div>
      </template>
      <el-empty description="Buralar boş gibi görünüyor" v-if="comments.length <= 0" />
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
  </div>
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
      load: false,
      activitys: {},
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
      this.load = true;
      const params = {
        filter: {
          own_id: this.getProfile.id,
        },
      };
      axios
        .post("fungitu2_fungiturkey/ActivityComment", params)
        .then((response) => {
          this.comments = response.data.data;
          for (const val of Object.values(this.comments)) {
            this.getActivity(val.activity_id);
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    duzenle(c) {
      this.dialogState = true;
      this.islemData = c;
    },
    duzenleOnay() {
      this.load = true;
      axios
        .post("fungitu2_fungiturkey/ActivityComment/" + this.islemData.id + "/update", {
          comment: this.islemData.comment,
          status: "0",
        })
        .then((res) => {
          if (res.data.status == "success") {
            ElNotification({
              title: "Başarılı",
              message: "Yorum başarıyla onaya gönderildi.",
              type: "success",
            });
            this.dialogState = false;
            this.getData();
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    sil(c) {
      axios.post("fungitu2_fungiturkey/ActivityComment/" + c.id + "/delete").then((res) => {
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
    getActivity(id) {
      this.load = true;

      axios
        .post("fungitu2_fungiturkey/Activity/" + id + "/get")
        .then((response) => {
          this.activitys[id] = response.data.data;
        })
        .finally(() => {
          this.load = false;
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
