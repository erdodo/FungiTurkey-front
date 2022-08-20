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
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7">
          <div class="form-group mb-4">
            <label>İsim:</label>
            <input type="text" placeholder="İsim" class="form-control" v-model="profile.name" />
          </div>
          <div class="form-group mb-4">
            <label>Soyisim:</label>
            <input type="text" placeholder="Soyisim" class="form-control" v-model="profile.surname" />
          </div>
          <div class="form-group mb-4">
            <label>Telefon:</label>
            <input type="text" placeholder="Telefon" class="form-control" v-model="profile.phone" />
          </div>
          <div class="form-group mb-4">
            <label>Email:</label>
            <input type="text" placeholder="Email" class="form-control" v-model="profile.mail" />
          </div>
          <div class="form-group mb-4">
            <label>Şifre:</label>
            <input type="password" placeholder="Şifre" class="form-control" v-model="profile.password" />
          </div>
          <div class="mb-4">
            <button class="btn btn-primary">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      profile: {},
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        filter: {
          token: "0",
        },
      };
      axios.post("Simple/users", params).then((res) => {
        this.profile = res.data.data[0];
      });
    },
  },
};
</script>

<style></style>
