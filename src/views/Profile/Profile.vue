<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Profil</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Profil</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <div class="container" v-loading="load">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7">
          <template v-for="(c, name) in columns" :key="name">
            <label class="mt-3" v-if="name != 'password'">{{ c.display }}: </label>
            <input
              v-if="c.name == 'phone'"
              v-model="params[name]"
              v-mask="'+90(###) ### ## ##'"
              type="text"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <template v-else-if="c.name == 'password'"></template>
            <div v-else-if="c.type == 'file'" class="row">
              <div v-if="params[name]" class="position-relative col-12 col-md-6">
                <el-button type="danger" style="" class="image-remover" circle @click="imageRemove(name)"> X </el-button>
                <img :src="ImgBase + params[name]" class="rounded" style="max-height: 250px; max-width: 100%" alt="" />
              </div>
              <div class="mt-2 mt-md-0 col-12 text-center" :class="params[name] ? 'col-md-6' : 'col-md-12'">
                <input type="file" :ref="name" :placeholder="c.display" class="form-control" />
              </div>
            </div>

            <input
              v-else-if="c.type == 'varchar'"
              v-model="params[name]"
              type="text"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <input
              v-else-if="c.type == 'int' || c.type == 'smallint'"
              type="number"
              v-model="params[name]"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />

            <input
              v-else-if="c.type == 'datetime'"
              type="datetime-local"
              v-model="params[name]"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <textarea
              v-else-if="c.type == 'text'"
              v-model="params[name]"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <div v-else-if="c.type == 'tinyint' || c.type == 'bit'">
              <el-switch v-model="params[name]" :ref="name" />
            </div>
          </template>
          <div class="d-flex justify-content-between mt-3">
            <el-button type="warning" @click="passChangeState = true">Şifre değiştir</el-button>
            <el-button type="primary" @click="save()">Kaydet</el-button>
          </div>
        </div>
      </div>
    </div>
    <pass-change :dialogVisible="passChangeState" @success="passChangeState = false" />
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { mask } from "vue-the-mask";
import { ElNotification } from "element-plus";
import passChange from "../modals/passChange.vue";
export default {
  components: { passChange },
  directives: { mask },
  data() {
    return {
      columns: {},
      params: {},
      msg: {},
      passChangeState: false,
      load: false,
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
      let params = {
        filter: {
          token: this.$store.getters.getToken,
        },
      };
      axios
        .post(this.simple + "/users/" + this.getProfile.id + "/edit", params)
        .then((res) => {
          this.columns = res.data.columns;
          this.params = res.data.data;
          for (const clm of Object.values(this.columns)) {
            if (clm.type == "tinyint" || clm.type == "bit") {
              this.params[clm.name] = this.params[clm.name] == "1" ? true : false;
            }
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    save() {
      this.load = true;
      const formData = new FormData();
      let form = false;
      for (const [key, val] of Object.entries(this.columns)) {
        if (val.type == "file") {
          if (this.$refs.image?.[0]?.files[0] != undefined) {
            formData.append(key, this.$refs.image?.[0]?.files[0]);
            form = true;
          } else {
            formData.append(key, this.params[key] == undefined ? "" : this.params[key]);
          }
        } else if (val.type == "tinyint" || val.type == "bit") {
          formData.append(key, this.params[key] == undefined ? "" : this.params[key] ? "1" : "0");
        } else {
          formData.append(key, this.params[key] == undefined ? "" : this.params[key]);
        }
      }
      axios
        .post(this.simple + "/users/" + this.getProfile.id + "/update", form == true ? formData : this.params)
        .then((res) => {
          if (res.data.status == "success") {
            ElNotification({
              title: "Başarılı!",
              message: "Düzenleme işlemi başarıyla gerçekleşti.",
              type: "success",
            });
            this.params = res.data.data;
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    validateEmail() {
      if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.params.email)) {
        this.msg["email"] = "Epostanızı kontrol ediniz.";
      } else {
        this.msg["email"] = "";
      }
    },
    imageRemove(name) {
      this.params[name] = "";
    },
  },
};
</script>

<style>
.image-remover {
  padding-left: 10px !important;
  padding-right: 10px !important;
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
