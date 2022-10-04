<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Etkinlikler</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Etkinlikler</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="w-100 d-flex justify-content-end">
        <el-button @click="calendarState = true"><i class="bi bi-calendar-date mr-2"></i> Etkinlik Takvimi</el-button>
      </div>
      <div class="row">
        <template v-for="a in activity" :key="a">
          <div class="col-12 col-sm-6 col-md-4 mt-2">
            <div class="p-2 text-center">
              <div
                class="w-100 image-card rounded cursor-pointer"
                @click="modalData = !modalData"
                :style="{ background: 'url(' + ImgBase + a.image + ')' }"
              ></div>
              <h3 class="mt-3">{{ a.title }}</h3>
              <h5>
                Son Kayıt: <a class="text-warning">{{ dateTimeParser(a.last_record_date) }}</a>
              </h5>
              <div class="">
                <router-link
                  :to="'/etkinlik/' + a.id + '-' + a.title.replace(/ /g, '-')"
                  class="btn btn-warning mx-2 text-white"
                  >Devamını Oku</router-link
                >
              </div>
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
    <login :loginState="loginState"></login>
    <activity-record
      :kayitDialog="this.kayitDialog"
      :dialogData="this.dialogData"
      @dialogState="kayitDialog = $event"
    ></activity-record>
    <activity-calendar :state="calendarState" @state="calendarState = $event"></activity-calendar>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import login from "./login/login.vue";
import ActivityRecord from "./modals/ActivityRecord.vue";
import dateTimeParser from "@/hooks/dateTimeParser";
import ActivityCalendar from "./modals/ActivityCalendar.vue";

export default {
  components: { login, ActivityRecord, ActivityCalendar },
  data() {
    return {
      activity: [],
      modalData: false,
      loginState: 0,
      load: true,
      kayitDialog: false,
      calendarState: false,
      dialogData: {},
      page: 1,
      limit: 6,
      count: 0,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    getData() {
      this.load = true;
      const params = {
        page: this.page,
        limit: this.limit,
        filter: {
          status: "1",
        },
         order: {
          name: "id",
          type: "DESC",
        },
      };
      axios.post(this.fungi + "/Activity", params).then((response) => {
        this.activity = response.data.data;
        this.count = response.data.count;
        this.load = false;
      });
    },
    setPage(e) {
      this.page = e;
      this.getData();
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
};
</script>

<style>
.image-card {
  height: 200px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
