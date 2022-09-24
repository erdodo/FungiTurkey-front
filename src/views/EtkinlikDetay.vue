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
            <el-icon class="mr-2 mb-0"><User /> </el-icon>Kordinatör:
          </span>
          <a class="text-dark">{{ activity.director }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><User /> </el-icon>Kontenjan:
          </span>
          <a class="text-dark">{{ activity.quota }} Kişi</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1" v-if="activity.quota - activityRecordsCount <= 3">
          <span class="mr-3 text-success">
            <el-icon class="mr-2 mb-0"><User /> </el-icon>Kalan Kontenjan:
          </span>
          <a class="text-dark">{{ activity.quota - activityRecordsCount }} Kişi</a>
        </h6>

        <button
          v-if="activity.status_record == 1 && !getToken"
          size="large"
          class="btn btn-outline-warning my-2"
          @click="login()"
        >
          Kayıt Olmak İçin Giriş Yap
        </button>
        <button
          v-if="
            activity.status_record == 1 && getToken && activityRecords.length <= 0 && activityRecordsCount < activity.quota
          "
          size="large"
          class="btn btn-outline-warning my-2"
          @click="kayitDialogEvent(activity)"
        >
          Etkinliğe Katıl
        </button>
        <button
          v-else-if="activity.status_record == 1 && getToken && activityRecords.length <= 0"
          size="large"
          class="btn btn-outline-danger my-2"
        >
          Kotamız dolmuştur
        </button>

        <button
          v-if="activityRecords.length > 0 && activityRecords[0]?.price_status == '0'"
          class="btn btn-outline-success my-2"
          @click="recordDialogState = true"
        >
          Etkinlik kaydını güncelle
        </button>
      </div>

      <p v-html="activity.content"></p>
    </div>
    <div class="container mb-5" v-loading="load">
      <h4>Yorumlar</h4>
      <div v-if="getToken">
        <el-input v-model="cmm" maxlength="300" placeholder="Yorumunuz..." show-word-limit type="textarea" />
        <div class="w-100 d-flex justify-content-end">
          <el-button :disabled="load" type="primary" class="mt-3" @click="yorumGonder()"> Gönder</el-button>
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
    <activity-record
      :kayitDialog="this.kayitDialog"
      :dialogData="this.dialogData"
      @dialogState="kayitDialog = $event"
      :limit="activity.quota - activityRecordsCount"
    ></activity-record>
    <activity-record-edit
      v-if="activityRecords.length > 0"
      :record="this.activityRecords[0]"
      :visible="recordDialogState"
      @visible="recordDialogState = $event"
      :benim="this.activityRecords[0].people_count"
      :kota="activity.quota"
      :kayit="activityRecordsCount"
    />
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
  data() {
    return {
      activity: [],
      modalData: false,
      comments: [],
      load: true,
      kayitDialog: false,
      dialogData: {},
      loginState: 0,
      cmm: "",
      activityRecords: [],
      recordDialogState: false,
      activityRecordsCount: 0,
    };
  },
  computed: {
    ...mapGetters(["getToken", "getProfile"]),
  },
  mounted() {
    this.getData();
    this.getComment();
    this.getRecord();
    this.getLimit();
  },
  methods: {
    getData() {
      this.load = true;
      axios.post("fungitu2_fungiturkey/Activity/" + this.$route.params.id + "/get").then((response) => {
        this.activity = response.data.data;
      });
      this.load = false;
    },
    getRecord() {
      const params = {
        filter: {
          own_id: this.getProfile?.id,
          activity_id: this.$route.params.id,
        },
      };
      axios.post("fungitu2_fungiturkey/ActivityRecord", params).then((response) => {
        this.activityRecords = response.data.data;
        this.load = false;
      });
    },
    getComment() {
      this.load = true;
      let params = {
        filter: {
          activity_id: this.$route.params.id,
          status: 1,
        },
      };
      axios.post("fungitu2_fungiturkey/ActivityComment", params).then((response) => {
        this.comments = response.data.data;
      });
      this.load = false;
    },
    getLimit() {
      const params = {
        filter: {
          activity_id: this.$route.params.id,
          status: "1",
        },
      };
      axios.post("fungitu2_fungiturkey/ActivityRecord", params).then((response) => {
        let activityRecords = response.data.data;
        for (const val of Object.values(activityRecords)) {
          this.activityRecordsCount += parseFloat(val.people_count);
        }
        this.load = false;
      });
    },
    yorumGonder() {
      if (this.cmm.length < 5) {
        ElMessageBox.alert("Lütfen en az 5 karakterlik bir yorum giriniz.", "Dikkat", {
          confirmButtonText: "Tamam",
        });
      } else {
        this.load = true;
        var profile = this.getProfile;
        let formData = new FormData();
        formData.append("name", profile.name);
        formData.append("surname", profile.surname);
        formData.append("comment", this.cmm);
        formData.append("activity_id", this.activity.id);
        formData.append("member_id", profile.id);
        formData.append("status", "0");
        axios.post("fungitu2_fungiturkey/ActivityComment/store", formData).then((res) => {
          if (res.data.status == "success") {
            ElMessageBox.alert("Yorumunuz başarıyla gönderildi. Teşekkürler.", "Başarılı", {
              confirmButtonText: "Tamam",
            });
            this.load = false;
            this.getComment();
          }
        });
      }
    },
    login() {
      this.loginState++;
    },
    kayitDialogEvent(data) {
      this.kayitDialog = true;
      this.dialogData = data;
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
