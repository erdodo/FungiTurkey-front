<template>
  <div>
    <el-dialog v-model="dialogVisible" :Title="services?.title" width="60%" :before-close="handleClose">
      <div class="p-2 text-center">
        <el-image :src="ImgBase + services?.image" class="w-100 rounded">
          <template #placeholder>
            <div class="image-slot">YÜKLENİYOR<span class="dot">...</span></div>
          </template>
        </el-image>
        <h4 class="mt-3">{{ services?.title }}</h4>
        <p v-html="services?.content"></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["visible", "id"],
  data() {
    return {
      services: [],
      load: true,
      dialogVisible: false,
    };
  },
  mounted() {},
  methods: {
    getData() {
      this.load = true;
      axios.post("fungitu2_fungiturkey/Services/" + this.id + "/get").then((response) => {
        this.services = response.data.data;
        this.load = false;
      });
    },
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible;
    },
    dialogVisible() {
      this.$emit("visible", this.dialogVisible);
    },
    id() {
      this.getData();
    },
  },
};
</script>

<style></style>
