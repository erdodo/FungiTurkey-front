<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import Header from "@/views/layout/header.vue";
import Footer from "@/views/layout/footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
