<template>
  <div class="etk-kayit" v-if="loading == false">
    <el-dialog v-model="dialogVisible" :fullscreen="odalar.length > 0" title="Kayıt Ekleme" width="320px">
      <div class="d-flex justify-content-between flex-column h-100" v-loading="loading">
        <div v-loading="loading">
          <div v-if="oda_state == false && etk_limit > 0" class="w-100 d-flex flex-column align-items-center my-3">
            <label for="">Etkinliğimize kaç kişi katılacaksınız?</label>
            <label v-if="etk_limit - etk_count < 4">
              Son <span class="text-danger">{{ etk_limit - etk_count }}</span> kişilik kotamız kalmıştır!</label
            >
            <el-input-number v-model="etk_count" :min="1" :max="etk_limit" @change="handleChange" />
          </div>
          <div v-if="oda_state == false && etk_limit <= 0">
            <h5>
              Maalesef kontenjanımız kalmadığını bildirmek zorundayız. <br />
              Sonraki etkinliklerde görüşmek üzere.
            </h5>
          </div>

          <label v-if="odalar?.length > 0">Size uygun olan katılım şeklini seçebilirsiniz.</label>
          <div class="d-flex flex-row align-items-center my-3 overflow-auto">
            <el-card
              v-loading="loading"
              v-if="oda_state == true && cadir_limit > 0"
              style="height: 400px; overflow-y: auto; width: 280px"
              :style="odalar?.length <= 0 ? 'width: 280px' : 'width: 280px; min-width:280px;height: 600px;max-height: 70vh;'"
              :class="odalar?.length <= 0 ? '' : 'mr-2'"
            >
              <div class="w-100 d-flex flex-column align-items-center">
                <el-image
                  src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
                >
                  <template #placeholder>
                    <div class="image-slot">Yükleniyor<span class="dot">...</span></div>
                  </template>
                </el-image>
                <label class="h5 mt-2">Etkinliğimize konaklamasız kaç kişi katılmak istiyorsunuz?</label>
                <el-input-number v-model="cadir_count" :min="0" :max="cadir_limit" @change="handleChange" />
                <label v-if="cadir_limit - cadir_count < 4">
                  Son <span class="text-danger">{{ cadir_limit - cadir_count }}</span> kişilik kotamız kalmıştır!</label
                >
                <label>Konaklamasız kişi başı fiyatı {{ activity.cadir_fiyat }}₺ 'dir. </label>
              </div>
            </el-card>
            <el-card
              v-else-if="oda_state == true && cadir_limit <= 0"
              style="width: 280px; min-width: 280px; height: 400px; overflow-y: auto"
              class="mr-2"
            >
              <h5>Maalesef çadır kontenjanımız kalmadığını bildirmek zorundayız.</h5>
            </el-card>
            <el-card
              v-for="oda in odalar"
              :key="oda"
              style="width: 280px; min-width: 280px; height: 600px; max-height: 70vh; overflow-y: auto"
              class="mr-2"
              :class="secilen.find((e) => e == oda.id) ? 'border-primary' : ''"
              @click="odaSec(oda.id)"
            >
              <el-image :src="ImgBase + oda.image">
                <template #placeholder>
                  <div class="image-slot">Yükleniyor<span class="dot">...</span></div>
                </template>
              </el-image>
              <h4>{{ oda.room_name }} - {{ oda.room_no }}</h4>
              <span> Ücret: {{ oda.price }}₺ </span>
              <br />
              <span> {{ oda.quota }} Kişilik </span>
              <hr />

              <label class="mb-1">Kaç kişi misafir olacaksınız?</label>
              <div class="d-flex justify-content-between w-100">
                <el-input-number
                  v-model="oda_count[oda.id]"
                  :min="1"
                  :max="oda.quota"
                  @change="handleChange"
                  @click="secilen.find((e) => e == oda.id) ? odaSec(oda.id) : ''"
                />
                <el-button type="danger" v-if="secilen.find((e) => e == oda.id)">İptal</el-button>
                <el-button type="primary" v-else>Seç</el-button>
              </div>
              <label class="text-primary mt-1 mb-0" v-if="secilen.find((e) => e == oda.id)">Kiraladınız</label>
              <hr />
              <p v-html="oda.content"></p>
            </el-card>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center">
            <el-switch v-model="sozlesme_state" size="large" />
            <span class="ml-3"
              >Lütfen <a class="text-primary cursor-pointer" @click="sozlesme_state = true">sözleşmeyi</a> kabul ediniz</span
            >
          </div>
          <div class="d-flex justify-content-end">
            <el-button @click="dialogVisible = false">Vazgeç</el-button>
            <el-button type="primary" @click="kayit()">Kayıt Ol</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <Sozlesme :dialogVisible="sozlesme_state"></Sozlesme>
  </div>
</template>

<script>
import Sozlesme from "./Sozlesme.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { ElNotification } from "element-plus";
export default {
  components: { Sozlesme },
  props: ["visible", "activity"],
  data() {
    return {
      dialogVisible: this.visible,
      oda_state: false,
      sozlesme_state: false,
      cadir_limit: 0,
      cadir_count: 0,
      etk_limit: 0,
      etk_count: 1,
      odalar: [],
      oda_count: {},
      secilen: [],
      loading: true,
      islem_count: 0,
      islem_success: 0,
    };
  },
  computed: {
    ...mapGetters(["getProfile"]),
  },
  mounted() {
    this.limitReturn();
  },
  watch: {
    dialogVisible() {
      this.$emit("visible", this.dialogVisible);
    },
    visible() {
      this.dialogVisible = this.visible;
      if (this.activity.room_status == 1) {
        this.oda_state = true;
        this.loading = true;
        this.getCadirRecords();
        this.getOdaRecords();
      } else {
        this.getEtkinlikLimit();
      }
    },
    activity() {
      console.log("sdflknsmdfjnsdkj", this.activity.room_status);
      if (this.activity.room_status == 1) {
        this.oda_state = true;
        this.loading = true;
        this.getCadirRecords();
        this.getOdaRecords();
      } else {
        this.getEtkinlikLimit();
      }
    },
    islem_success() {
      if (this.islem_success == this.islem_count) {
        window.location.reload();
      }
    },
    cadir_limit() {
      this.limitReturn();
    },
    etk_limit() {
      this.limitReturn();
    },
    odalar() {
      this.limitReturn();
    },
  },
  methods: {
    limitReturn() {
      const state = this.etk_limit <= 0 && this.cadir_limit <= 0 && this.odalar.length <= 0;
      this.$emit("limitState", state);
    },
    getEtkinlikLimit() {
      this.loading = true;
      const params = {
        filter: {
          activity_id: this.activity.id,
          room_id: null,
        },
      };
      axios.post(this.fungi + "/ActivityRecord", params).then((res) => {
        let limit = 0;
        for (const val of Object.values(res.data.data)) {
          limit += parseFloat(val.people_count);
        }
        this.etk_limit = parseInt(this.activity.quota) - parseInt(limit);
        this.loading = false;
      });
    },
    getCadirRecords() {
      this.loading = true;
      const params = {
        filter: {
          activity_id: this.activity.id,
          room_id: null,
        },
      };
      axios.post(this.fungi + "/ActivityRecord", params).then((res) => {
        let limit = 0;
        for (const val of Object.values(res.data.data)) {
          limit += parseFloat(val.people_count);
        }
        this.cadir_limit = parseInt(this.activity.cadir_kota) - parseInt(limit);
      });
    },
    getOdaRecords() {
      this.loading = true;
      const params = {
        filter: {
          activity_id: this.activity.id,
          rent_status: "0",
          status: "1",
        },
      };
      axios.post(this.fungi + "/ActivityRoom", params).then((res) => {
        this.odalar = res.data.data;
        for (const oda of Object.values(this.odalar)) {
          this.oda_count[oda.id] = 0;
        }
        this.loading = false;
      });
    },
    odaSec(id) {
      if (this.secilen.find((e) => e == id)) {
        delete this.secilen[this.secilen.indexOf(id)];
      } else {
        this.secilen.push(id);
      }
    },
    kayit() {
      if (this.sozlesme_state != true) {
        this.loading = true;
        if (this.oda_state == false) {
          const params = {
            activity_id: this.activity.id,
            email: this.getProfile.email,
            name: this.getProfile.name,
            people_count: this.etk_count,
            phone: this.getProfile.phone,
            room_id: null,
            surname: this.getProfile.surname,
            status: "0",
          };
          this.islem_count += 1;
          axios.post(this.fungi + "/ActivityRecord/store", params).then((res) => {
            if (res.data.status == "success") {
              ElNotification({
                title: "Başarılı",
                message: "Kayıt başarıyla oluşturuldu.",
                type: "success",
              });
              this.islem_success += 1;
              window.location.reload();
            }
          });
        } else {
          if (this.cadir_count > 0) {
            const params = {
              activity_id: this.activity.id,
              email: this.getProfile.email,
              name: this.getProfile.name,
              people_count: this.cadir_count,
              phone: this.getProfile.phone,
              room_id: null,
              surname: this.getProfile.surname,
              status: "0",
            };
            this.islem_count += 1;
            axios.post(this.fungi + "/ActivityRecord/store", params).then((res) => {
              if (res.data.status == "success") {
                if (this.secilen.length > 0) {
                  this.odaKayit();
                } else {
                  this.islem_success += 1;
                  ElNotification({
                    title: "Başarılı",
                    message: "Kayıt başarıyla oluşturuldu.",
                    type: "success",
                  });
                  window.location.reload();
                }
              }
            });
          } else {
            if (this.secilen.length > 0) {
              this.odaKayit();
            } else {
              ElNotification({
                title: "Dikkat",
                message: "Seçilen oda bulunamadı.",
                type: "warning",
              });
            }
          }
        }
      } else {
        ElNotification({
          title: "Dikkat",
          message: "Lütfen sözleşmeyi kabul ediniz.",
          type: "warning",
        });
      }
    },
    odaKayit() {
      for (const val of Object.values(this.secilen)) {
        console.log(this.getProfile);
        const params = {
          activity_id: this.activity.id,
          email: this.getProfile.email,
          name: this.getProfile.name,
          people_count: this.oda_count[val], //this.odalar.find((e) => e.id == val).quota,
          phone: this.getProfile.phone,
          room_id: val,
          surname: this.getProfile.surname,
          status: "0",
        };
        this.islem_count += 1;
        axios.post(this.fungi + "/ActivityRecord/store", params).then((res) => {
          if (res.data.status == "success") {
            ElNotification({
              title: "Başarılı",
              message: "Kayıt başarıyla oluşturuldu.",
              type: "success",
            });
            const oda = {
              rent_status: "1",
              member_id: this.getProfile.id,
            };
            axios.post(this.fungi + "/ActivityRoom/" + val + "/update", oda).then((res) => {
              if (res.data.status == "success") {
                this.islem_success += 1;
                ElNotification({
                  title: "Başarılı",
                  message: "Oda başarıyla kiralandı.",
                  type: "success",
                });
              }
            });
          }
        });
      }
    },
  },
};
</script>

<style>
.etk-kayit .el-dialog__body {
  height: calc(100% - 80px);
}
.etk-kayit * {
  word-break: normal !important;
}
</style>
