<template>
  <header class="fixed-top">
    <transition name="fade"></transition>
    <div class="px-5" v-if="desktop">
      <!-- main nav -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo align-items-center"
        style="border-bottom: none"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="horizontal"
        :ellipsis="false"
        router
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <img src="@/assets/LOGO.png" width="130" class="m-2" alt="" />
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/">Anasayfa</el-menu-item>
        <el-menu-item index="/hakkimizda">Hakkımızda</el-menu-item>
        <el-menu-item index="/organizasyon">Organizasyonumuz</el-menu-item>
        <el-menu-item index="/galeri">Galeri</el-menu-item>
        <el-menu-item index="/etkinlik">Etkinlikler</el-menu-item>
        <el-menu-item index="/blog">Blog</el-menu-item>
        <el-menu-item index="/sponsor">Sponsorlar</el-menu-item>
        <el-menu-item index="/magaza">Market</el-menu-item>
        <el-menu-item index="/iletisim">İletişim</el-menu-item>
        <el-sub-menu>
          <template #title>Profil</template>
          <el-menu-item index="/profil"><span class="text-dark">Bilgilerim</span></el-menu-item>
          <el-menu-item index="/profil/blog">Blog Yorumlarım</el-menu-item>
          <el-menu-item index="/profil/etkinlik">Etkinlik Yorumlarım</el-menu-item>
          <el-menu-item index="/profil/kayit">Kayıtlarım</el-menu-item>
          <el-menu-item index="/profil/cikis">Çıkış</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <!-- /main nav -->
    </div>
    <div class="px-1 px-md-3 mobil-header" v-if="!desktop">
      <!-- main nav -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo align-items-center"
        style="border-bottom: none"
        background-color="transparent"
        text-color="black"
        active-text-color="#ffd04b"
        mode="horizontal"
        :ellipsis="false"
        router
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <img src="@/assets/LOGO.png" width="100" class="m-2" alt="" />
        </el-menu-item>
        <div class="flex-grow" />
        <el-sub-menu index="/" style="border-bottom: none !important">
          <template #title
            ><h2 class="text-warning"><i class="bi bi-list"></i></h2
          ></template>
          <el-menu-item index="/">Anasayfa</el-menu-item>
          <el-menu-item index="/hakkimizda">Hakkımızda</el-menu-item>
          <el-menu-item index="/organizasyon">Organizasyonumuz</el-menu-item>
          <el-menu-item index="/galeri">Galeri</el-menu-item>
          <el-menu-item index="/etkinlik">Etkinlikler</el-menu-item>
          <el-menu-item index="/blog">Blog</el-menu-item>
          <el-menu-item index="/sponsor">Sponsorlar</el-menu-item>
          <el-menu-item index="/magaza">Market</el-menu-item>
          <el-menu-item index="/iletisim">İletişim</el-menu-item>
          <el-sub-menu index="11-4">
            <template #title class="text-dark">Profil</template>
            <el-menu-item index="/profil">Bilgilerim</el-menu-item>
            <el-menu-item index="/profil/blog">Blog Yorumlarım</el-menu-item>
            <el-menu-item index="/profil/etkinlik">Etkinlik Yorumlarım</el-menu-item>
            <el-menu-item index="/profil/kayit">Kayıtlarım</el-menu-item>
            <el-menu-item index="/profil/cikis">Çıkış</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
      <!-- /main nav -->
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      desktop: true,
    };
  },
  mounted() {
    this.desktop = window.innerWidth > 1240 ? true : false;
    window.addEventListener("resize", () => {
      this.desktop = window.innerWidth > 1240 ? true : false;
    });
  },
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.sticky-header {
  background: rgba(0, 0, 0, 0.9);
}
@media screen and (max-width: 768px) {
  .mobil-header {
    background: rgba(0, 0, 0, 0.9);
  }
}
</style>
