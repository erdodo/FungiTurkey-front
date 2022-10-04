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
            <div class="p-2 mt-2 card">
              <div class="row">
                <div class="col-12 col-lg-7">
                  <template> {{ getActivity(a.activity_id) }} </template>
                  <div class="d-flex align-items-center h-100 flex-wrap justify-content-start justify-content-md-left">
                    <el-image :src="ImgBase + activities[a.activity_id]?.image" style="height: 130px">
                      <template #placeholder>
                        <div class="image-slot">Yükleniyor<span class="dot">...</span></div>
                      </template>
                    </el-image>
                    <div class="mx-1">
                      <h5 class="text-wrap">{{ activities[a.activity_id]?.title }}</h5>
                      <p>
                        Kordinatör: <a class="text-warning ml-2"> {{ activities[a.activity_id]?.director }} </a>
                      </p>
                      <p>
                        Toplam Ücret:
                        <a class="text-warning ml-2"> {{ activities[a.activity_id]?.price * a.people_count }} TL</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-5">
                  <div class="d-flex flex-column text-center text-md-left">
                    <h3 class="mt-3">{{ a.name }} {{ a.surname }}</h3>
                    <h5>
                      Bilet sayısı: <a class="text-warning ml-2"> {{ a.people_count }} Kişi</a>
                    </h5>
                    <p>
                      Kayıt tarihi: <a class="text-warning"> {{ dateTimeParser(a.added_date) }}</a>
                    </p>
                    <div class="d-flex">
                      <el-button
                        type="primary"
                        v-if="a.price_status != 1 && activities[a.activity_id]?.room_status == 0"
                        @click="(record = a), (editStatus = true)"
                        >Düzenle</el-button
                      >
                      <el-button
                        type="default"
                        v-if="activities[a.activity_id]?.room_status == 1"
                        @click="(room = a.room_id), (roomStatus = true)"
                        >Oda Detayları</el-button
                      >
                      <el-tag class="mx-1" size="large" type="success" v-if="a.price_status == 1">Ödeme alındı</el-tag>
                      <el-tag class="mx-1" size="large" type="danger" v-else>Ödeme alınmadı</el-tag>
                      <div>
                        <el-tag class="mx-1" size="large" type="success" v-if="a.status == 1">Onaylı</el-tag>
                        <el-tag class="mx-1" size="large" type="danger" v-else>Onay Bekliyor</el-tag>
                      </div>

                      <el-popconfirm
                        confirm-button-text="Evet"
                        cancel-button-text="Hayır"
                        :icon="InfoFilled"
                        icon-color="#626AEF"
                        title="Silmek istediğinize emin misiniz?"
                        @confirm="kayitSil(a)"
                        @cancel="cancelEvent"
                        v-if="a.price_status != 1"
                      >
                        <template #reference>
                          <el-button type="danger">Sil</el-button>
                        </template>
                      </el-popconfirm>
                    </div>
                  </div>
                  <div class="w-100">
                    <div v-if="a.status == 1 && a.price_status != 1">IBAN: {{ activities[a.activity_id].iban }}</div>
                    <div v-if="a.price_status == 1" v-html="activities[a.activity_id].location_url"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <el-empty class="col-12" description="Buralar boş gibi görünüyor" v-if="activityRecords.length <= 0" />
      </div>
    </div>
    <div>
      <activity-record-edit
        :record="record"
        :visible="editStatus"
        :benim="record.people_count"
        :kota="activities[record.activity_id]?.quota"
        :kayit="activityRecordsCount[record.activity_id]"
        @state="getData(), (editStatus = false)"
        :activity="activities[record.activity_id]"
      ></activity-record-edit>
      <room :dialogVisible="roomStatus" @state="roomStatus = $event" :room="room"></room>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import dateTimeParser from "@/hooks/dateTimeParser";
import ActivityRecordEdit from "../modals/ActivityRecordEdit.vue";
import { InfoFilled } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import Room from "../modals/Room.vue";

export default {
  components: { ActivityRecordEdit, Room },
  data() {
    return {
      InfoFilled,
      activityRecords: [],
      activities: {},
      editStatus: false,
      roomStatus: false,
      room: null,
      record: {},
      load: false,
      activityRecordsCount: {},
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
      this.load = true;
      const params = {
        filter: {
          own_id: this.getProfile.id,
        },
      };
      axios
        .post(this.fungi + "/ActivityRecord", params)
        .then((response) => {
          this.activityRecords = response.data.data;
          for (const val of Object.values(this.activityRecords)) {
            if (this.activityRecordsCount[val.activity_id] == undefined) {
              this.activityRecordsCount[val.activity_id] = 0;
            }
            this.getLimit(val.activity_id);
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    getActivity(id) {
      if (this.activities[id] == undefined) {
        this.load = true;
        axios
          .post(this.fungi + "/Activity/" + id + "/get")
          .then((response) => {
            this.activities[id] = response.data.data;
          })
          .finally(() => {
            this.load = false;
          });
      }
    },
    getLimit(id) {
      const params = {
        filter: {
          activity_id: id,
          status: "1",
        },
      };
      axios.post(this.fungi + "/ActivityRecord", params).then((response) => {
        let activityRecords = response.data.data;
        this.activityRecordsCount[id] = 0;
        for (const val of Object.values(activityRecords)) {
          console.log(val);

          this.activityRecordsCount[val.activity_id] =
            parseFloat(this.activityRecordsCount[val.activity_id]) + parseFloat(val.people_count);
        }
        this.load = false;
      });
    },
    kayitSil(val) {
      console.log(this.activities[val.activity_id]);
      if (this.activities[val.activity_id].room_status == 1) {
        const params = {
          rent_status: 0,
        };
        axios.post(this.fungi + "/ActivityRoom/" + val.room_id + "/update", params).finally(() => {
          this.load = false;
        });
      }
      axios
        .post(this.fungi + "/ActivityRecord/" + val.id + "/delete")
        .then((res) => {
          if (res.data.status == "success") {
            ElNotification({
              title: "Başarılı",
              message: "Kayıt başarıyla silindi",
              type: "success",
            });
          }
        })
        .finally(() => {
          this.getData();
          this.load = false;
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
