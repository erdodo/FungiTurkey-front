<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Etkinlik Kayıtlarınız</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Etkinlik Kayıtlarınız</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <template v-for="a in activityRecords" :key="a">
          <div class="col-12">
            <div class="p-2 card">
              <div class="row">
                <div class="col-12 col-md-8">
                  <template> {{ getActivity(a.activity_id) }} </template>
                  <div class="d-flex align-items-center h-100 flex-wrap justify-content-center justify-content-md-left">
                    <img :src="ImgBase + activities[a.activity_id].image" style="height: 130px" />
                    <div class="mx-1">
                      <h5>{{ activities[a.activity_id].title }}</h5>
                      <p>
                        Kordinatör: <a class="text-warning ml-2"> {{ activities[a.activity_id].director }} Kişi</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="d-flex flex-column text-center text-md-left">
                    <h3 class="mt-3">{{ a.name }} {{ a.surname }}</h3>
                    <h5>
                      Bilet sayısı: <a class="text-warning ml-2"> {{ a.people_count }} Kişi</a>
                    </h5>
                    <p>
                      Kayıt tarihi: <a class="text-warning"> {{ dateTimeParser(a.added_date) }}</a>
                    </p>
                    <el-tag class="mx-1" size="large" type="success" v-if="a.price_status == 1">Ödeme alındı</el-tag>
                    <el-tag class="mx-1" size="large" type="danger" v-else>Ödeme alınmadı</el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import dateTimeParser from "@/hooks/dateTimeParser";

export default {
  data() {
    return {
      activityRecords: [],
      activities: {},
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["getToken", "getProfile"]),
  },
  methods: {
    getData() {
      console.log(this.getProfile);
      const params = {
        filter: {
          own_id: this.getProfile.id,
        },
      };
      axios.post("fungitu2_fungiturkey/ActivityRecord", params).then((response) => {
        this.activityRecords = response.data.data;
        this.load = false;
      });
    },
    getActivity(id) {
      if (this.activities[id] == undefined) {
        axios.post("fungitu2_fungiturkey/Activity/" + id + "/get").then((response) => {
          this.activities[id] = response.data.data;
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
