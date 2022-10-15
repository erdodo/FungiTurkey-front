<template>
  <div>
    <section class="single-page-header mb-5" style="background: url('/_assets/HeaderBack.jpeg')">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>İletişim</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item"><router-link to="/" class="text-white">Ana Sayfa</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">İletişim</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!--Start Contact Us
	=========================================== -->
    <section class="contact-us" id="contact" v-loading="load" style="min-height: 300px">
      <div class="container">
        <div class="row">
          <!-- Contact Details -->
          <div class="contact-details col-md-6">
            <h3 class="mb-3">Detaylar</h3>
            <ul class="contact-short-info mt-4">
              <li class="mb-3">
                <i class="bi bi-house mr-2"></i>
                <span>Adres: {{ contact.adress }} </span>
              </li>
              <li class="mb-3">
                <i class="bi bi-telephone mr-2"></i>
                <span>Telefon: {{ contact.phone }} </span>
              </li>
              <li class="mb-3">
                <i class="bi bi-envelope mr-2"></i>
                <span>E-Posta: {{ contact.mail }} </span>
              </li>
              <li>
                <i class="bi bi-people mr-2"></i>
                <span>Yönetici: {{ contact.director }} </span>
              </li>
            </ul>
            <!-- Footer Social Links -->
            <div class="social-icon">
              <ul>
                <li>
                  <a :href="contact.facebook" target="_blank"><i class="bi bi-facebook"></i></a>
                </li>
                <li>
                  <a :href="contact.twitter" target="_blank"><i class="bi bi-twitter"></i></a>
                </li>
                <li>
                  <a :href="contact.linkedin" target="_blank"><i class="bi bi-linkedin"></i></a>
                </li>
                <li>
                  <a :href="contact.youtube" target="_blank"><i class="bi bi-youtube"></i></a>
                </li>
              </ul>
            </div>
            <!--/. End Footer Social Links -->
          </div>
          <!-- / End Contact Details -->

          <!-- Contact Form -->
          <div class="contact-form col-md-6" v-loading="load">
            <div class="form-group mb-4">
              <span v-if="getProfile">
                {{ getProfile.name }} {{ getProfile.surname }}
                <template>{{ (name = getProfile.name + " " + getProfile.surname) }} </template>
              </span>
              <input v-else type="text" placeholder="İsminiz" class="form-control" v-model="name" />
            </div>

            <div class="form-group mb-4">
              <span v-if="getProfile">
                {{ getProfile?.email }}
                <template>{{ (email = getProfile?.email) }} </template>
              </span>
              <input v-else type="email" placeholder="Eposta Adresiniz" class="form-control" v-model="email" />
            </div>
            <div class="form-group mb-4">
              <span v-if="getProfile">
                {{ getProfile?.phone }}
                <template>{{ (phone = getProfile?.phone) }} </template>
              </span>
              <input v-else type="text" placeholder="Telefon numaranız" class="form-control" v-model="phone" />
            </div>
            <div class="form-group mb-4"></div>
            <div class="form-group mb-4">
              <input type="text" placeholder="Başlık" class="form-control" v-model="subject" />
            </div>

            <div class="form-group mb-4">
              <textarea rows="6" placeholder="Mesajınız" class="form-control" v-model="message"></textarea>
            </div>

            <div id="cf-submit">
              <el-button type="primary" class="w-100" :loading="buttonLoading" @click="gonder()">Gönder</el-button>
            </div>
          </div>
          <!-- ./End Contact Form -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </section>
    <!-- end section -->

    <!--================================
=            Google Map            =
=================================-->
    <iframe
      v-if="false"
      :src="contact.map_link"
      width="100%"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <!--====  End of Google Map  ====-->
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { ElNotification } from "element-plus";
export default {
  metaInfo: {
    title: "İletişim",
    titleTemplate:
      "Fungi Turkey 2018 yılında mantar türlerini topluma tanıtabilmek ve bilinçli bir şekilde mantar avcılığı yapabilmek adına Ömer Üngör tarafından kurulmuştur. Sosyal medya üzerinden yaptığımız detaylı tür tanımlamaları, online mantar eğitimleri, saha eğitimleri, etkinlikler ve mantar gastronomisi etkinlikleriyle bu alanda Türkiye'de ilkleri gerçekleştirmiştir. Birbirinden değerli katılımcılara sahip Fungi Turkey topluluğu her geçen gün büyüyerek ilerlemeye devam ediyor.",
    htmlAttrs: {
      lang: "tr",
      amp: true,
    },
  },
  data() {
    return {
      contact: {
        map_link: "",
        adress: "",
        phone: "",
        mail: "",
        director: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        youtube: "",
      },
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      load: true,
      buttonLoading: false,
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
      axios.post(this.fungi + "/Contact/first").then((response) => {
        this.contact = response.data.data;
        this.load = false;
      });
    },
    gonder() {
      if (this.email.length < 3 || this.name.length < 3 || this.subject.length < 3 || this.message.length < 3) {
        ElNotification({
          title: "Dikkat",
          message: "Boş alanları doldurunuz!",
          type: "info",
        });
      } else {
        this.buttonLoading = true;
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("subject", this.subject);
        formData.append("message", this.message);

        axios.post(this.fungi + "/Feedbacks/store", formData).then((res) => {
          if (res.data.status == "success") {
            ElNotification({
              title: "Başarılı",
              message: "Mesaj başarıyla düzenlendi",
              type: "success",
            });
            this.buttonLoading = false;
            window.location.reload();
          }
        });
      }
    },
  },
};
</script>

<style></style>
