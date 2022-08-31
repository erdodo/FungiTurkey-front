<template>
  <div
    class="footer-bottom py-2 mt-5 d-flex flex-column flex-md-row text-center justify-content-center align-content-center align-items-center align-items-md-baseline"
    v-if="$route.path != '/'"
  >
    <h5 class="mr-2">&copy; Copyright {{ new Date().getFullYear() }}. Tüm hakları saklıdır.</h5>
    <h6>Geliştirici <a href="https://www.linkedin.com/in/erdogan-yesil-7b7263b3/" target="_blank">Erdoğan Yeşil..</a></h6>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer-bottom {
  position: sticky;
  bottom: 0;
}
</style>
