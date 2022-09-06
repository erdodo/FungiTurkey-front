<template>
  <el-dialog v-model="centerDialogVisible" title="Galeri" width="95%" style="background: transparent" center top="30px">
    <div class="p-4">
      <el-carousel :interval="4000" :initial-index="selectedImage" type="card" height="70vh">
        <el-carousel-item v-for="item in data" :key="item">
          <div class="p-2 text-center">
            <div
              class="w-100 image-modal-card rounded cursor-pointer"
              :style="{ background: 'url(' + ImgBase + item.image + ')' }"
            ></div>
            <label class="mt-3">{{ item.title }}</label>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    modalData: Boolean,
    data: Object,
    selectedImage: Number,
  },
  data() {
    return {
      centerDialogVisible: false,
    };
  },
  watch: {
    modalData(val) {
      this.centerDialogVisible = val;
    },
    centerDialogVisible(val) {
      this.$emit("modalData", val);
    },
  },
  methods: {
    takip(e) {
      console.log(e);
    },
  },
};
</script>

<style>
.image-modal-card {
  height: 60vh;
  background-size: cover !important;
  background-position: center !important;
}
</style>
