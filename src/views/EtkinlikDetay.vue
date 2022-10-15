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

    <div class="container mb-5" v-loading="load" style="min-height: 300px">
      <div class="d-flex justify-content-center">
        <img :src="ImgBase + activity.image" alt="" style="max-height: 700px !important" class="img-fluid rounded" />
      </div>
      <h2 class="mt-4">{{ activity.title }}</h2>
      <div class="d-flex flex-column">
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Location /> </el-icon>Konum:
          </span>
          <a class="text-dark">{{ activity.location }} </a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Calendar /> </el-icon>Başlama Tarihi:
          </span>
          <a class="text-dark">{{ dateTimeParser(activity.start_date) }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Calendar /> </el-icon>Bitiş Tarihi:
          </span>
          <a class="text-dark">{{ dateTimeParser(activity.finish_date) }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Calendar /> </el-icon>Son Kayıt Tarihi:
          </span>
          <a class="text-dark">{{ dateTimeParser(activity.last_record_date) }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><Money /> </el-icon>Ücret:
          </span>
          <a class="text-dark">{{ activity.price }} ₺ (Kişi başı)</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><User /> </el-icon>Koordinatör:
          </span>
          <a class="text-dark">{{ activity.director }}</a>
        </h6>
        <h6 v-if="activity.quota > 0" class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><User /> </el-icon>Kota:
          </span>
          <a class="text-dark">{{ activity.quota }} Kişilik</a>
        </h6>
        <h6 v-if="activity.cadir_kota > 0" class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><User /> </el-icon>Çadır Kotamız:
          </span>
          <a class="text-dark">{{ activity.cadir_kota }} Kişilik</a>
        </h6>

        <button size="large" class="btn btn-outline-warning my-2" v-if="!getToken" @click="login()">
          Kayıt Olmak İçin Giriş Yap
        </button>
        <button
          class="btn btn-outline-success my-2"
          @click="guncelle_state = true"
          v-if="guncelle_buton_state && my_record_state && getToken"
        >
          Etkinlik kaydını güncelle
        </button>

        <button
          size="large"
          class="btn btn-outline-warning my-2"
          @click="ekle_state = true"
          v-else-if="!my_record_state && getToken && activity.status_record == '1'"
        >
          Etkinliğe Katıl
        </button>
        <button size="large" class="d-none btn btn-outline-danger my-2">Kotamız dolmuştur</button>
      </div>

      <p v-html="activity.content"></p>
    </div>
    <div class="container mb-5" v-loading="load">
      <h4>Yorumlar</h4>
      <div v-if="getToken">
        <el-input v-model="cmm" maxlength="300" placeholder="Yorumunuz..." show-word-limit type="textarea" />
        <div class="w-100 d-flex justify-content-end">
          <el-button :disabled="load" type="primary" :loading="buttonLoad" class="mt-3" @click="yorumGonder()">
            Gönder</el-button
          >
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
    <login :loginState="loginState"></login>
    <activity-record :visible="ekle_state" @visible="ekle_state = $event" :activity="activity" />

    <activity-record-edit :visible="guncelle_state" @visible="guncelle_state = $event" :activity="activity" />
  </div>
</template>

<script>
import axios from "axios";
import { Calendar, Money, User, Location } from "@element-plus/icons-vue";
import dateTimeParser from "@/hooks/dateTimeParser";
import { ElMessageBox } from "element-plus";
import { mapGetters } from "vuex";
import login from "./login/login.vue";
import ActivityRecord from "./modals/ActivityRecord.vue";
import ActivityRecordEdit from "./modals/ActivityRecordEdit.vue";
export default {
  metaInfo: {
    title: "Etkinlik",
    titleTemplate: "Mantar Etkinliklerimiz",
    htmlAttrs: {
      lang: "tr",
      amp: true,
    },
  },
  data() {
    return {
      activity: [],
      modalData: false,
      comments: [],
      load: true,
      buttonLoad: false,
      loginState: 0,
      cmm: "",
      my_record_state: false,
      guncelle_state: false,
      ekle_state: false,
      ekle_buton_state: true,
      guncelle_buton_state: true,
    };
  },
  computed: {
    ...mapGetters(["getToken", "getProfile"]),
  },
  mounted() {
    this.getData();
    this.getComment();
    this.getMyRecord();
  },
  methods: {
    getData() {
      this.load = true;
      axios.post(this.fungi + "/Activity/" + this.$route.params.id + "/get").then((response) => {
        this.activity = response.data.data;
      });
      this.load = false;
    },
    getMyRecord() {
      const params = {
        filter: {
          own_id: this.getProfile?.id,
          activity_id: this.$route.params.id,
        },
      };
      axios.post(this.fungi + "/ActivityRecord", params).then((res) => {
        if (res.data.count > 0) {
          this.my_record_state = true;
        } else {
          this.my_record_state = false;
        }

        this.guncelle_buton_state = !Object.values(res.data.data).find((e) => e.price_status == "1");
      });
    },
    getComment() {
      this.load = true;
      let params = {
        filter: {
          activity_id: this.$route.params.id,
          status: 1,
        },
        order: {
          name: "id",
          type: "DESC",
        },
      };
      axios.post(this.fungi + "/ActivityComment", params).then((response) => {
        this.comments = response.data.data;
        this.buttonLoad = false;
      });
      this.load = false;
    },

    yorumGonder() {
      if (this.cmm.length < 5) {
        ElMessageBox.alert("Lütfen en az 5 karakterlik bir yorum giriniz.", "Dikkat", {
          confirmButtonText: "Tamam",
        });
      } else {
        this.buttonLoad = true;
        var profile = this.getProfile;
        let formData = new FormData();
        formData.append("name", profile.name);
        formData.append("surname", profile.surname);
        formData.append("comment", this.cmm);
        formData.append("activity_id", this.activity.id);
        formData.append("member_id", profile.id);
        formData.append("status", "0");
        axios.post(this.fungi + "/ActivityComment/store", formData).then((res) => {
          if (res.data.status == "success") {
            ElMessageBox.alert("Yorumunuz başarıyla gönderildi. Teşekkürler.", "Başarılı", {
              confirmButtonText: "Tamam",
            });

            this.getComment();
          }
        });
      }
    },
    login() {
      this.loginState++;
    },
    dateTimeParser,
  },
  components: { Calendar, Money, User, login, ActivityRecord, ActivityRecordEdit, Location },
};
</script>

<style>
.image-card {
  height: 200px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
