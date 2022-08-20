<template>
  <el-dialog v-model="centerDialogVisible" title="Galeri" width="100%" style="background: transparent" center fullscreen>
    <div class="p-4">
      <el-carousel :interval="4000" type="card" height="70vh">
        <el-carousel-item v-for="item in data" :key="item">
          <div class="p-2 text-center">
            <div
              class="w-100 image-modal-card rounded cursor-pointer"
              :style="{ background: 'url(' + ImgBase + item.Image + ')' }"
            ></div>
            <label class="mt-3">{{ item.Title }}</label>
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
};
</script>

<style>
.image-modal-card {
  height: 60vh;
  background-size: cover !important;
  background-position: center !important;
}
.el-dialog {
  background: rgba(255, 255, 255, 0.9) !important;
}
</style>
