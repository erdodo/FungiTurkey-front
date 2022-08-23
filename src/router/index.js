import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/giris",
    name: "giris",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/uyeol",
    name: "uyeol",
    component: () => import("@/views/login/register.vue"),
  },
  {
    path: "/hakkimizda",
    name: "Hakkımızda",
    component: () => import("@/views/Hakkimizda.vue"),
  },
  {
    path: "/iletisim",
    name: "İletisim",
    component: () => import("@/views/Iletisim.vue"),
  },
  {
    path: "/",
    name: "Anasayfa",
    component: () => import("@/views/AnaSayfa.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("@/views/Blog.vue"),
  },
  {
    path: "/blog/:id-:detay",
    name: "BlogDetay",
    component: () => import("@/views/BlogDetay.vue"),
  },
  {
    path: "/etkinlik",
    name: "Etkinlik",
    component: () => import("@/views/Etkinlik.vue"),
  },
  {
    path: "/etkinlik/:id-:detay",
    name: "EtkinlikDetay",
    component: () => import("@/views/EtkinlikDetay.vue"),
  },
  {
    path: "/galeri",
    name: "Galeri",
    component: () => import("@/views/Galeri.vue"),
  },
  {
    path: "/organizasyon",
    name: "Organizasyon",
    component: () => import("@/views/Organizasyon.vue"),
  },
  {
    path: "/magaza",
    name: "Magaza",
    component: () => import("@/views/Shop.vue"),
  },
  {
    path: "/sponsor",
    name: "Sponsor",
    component: () => import("@/views/Sponsor.vue"),
  },
  {
    path: "/profil",
    name: "Profil",
    component: () => import("@/views/Profile/Profile.vue"),
  },
  {
    path: "/profil/blog",
    name: "ProfilBlog",
    component: () => import("@/views/Profile/BlogYorum.vue"),
  },
  {
    path: "/profil/etkinlik",
    name: "ProfilEtkinlik",
    component: () => import("@/views/Profile/EtkinlikYorum.vue"),
  },
  {
    path: "/profil/kayit",
    name: "ProfilKayit",
    component: () => import("@/views/Profile/EtkinlikKayit.vue"),
  },

  {
    path: "/admin/create/:database/:table_name",
    name: "Create",
    component: () => import("@/views/admin/create.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
