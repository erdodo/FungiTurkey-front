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
    <section class="contact-us" id="contact">
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
          <div class="contact-form col-md-6">
            <div class="form-group mb-4">
              <input type="text" placeholder="İsminiz" class="form-control" v-model="name" />
            </div>

            <div class="form-group mb-4">
              <input type="email" placeholder="Eposta Adresiniz" class="form-control" v-model="email" />
            </div>

            <div class="form-group mb-4">
              <input type="text" placeholder="Başlık" class="form-control" v-model="subject" />
            </div>

            <div class="form-group mb-4">
              <textarea rows="6" placeholder="Mesajınız" class="form-control" v-model="message"></textarea>
            </div>
            <div id="cf-submit">
              <input id="contact-submit" class="btn btn-transparent" value="Gönder" @click="gonder()" />
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
export default {
  data() {
    return {
      contact: [],
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.post("fungitu2_fungiturkey/Contact/first").then((response) => {
        this.contact = response.data.data;
      });
    },
    gonder() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("subject", this.subject);
      formData.append("message", this.message);

      axios.post("fungitu2_fungiturkey/Feedbacks/store", formData);
    },
  },
};
</script>

<style></style>
