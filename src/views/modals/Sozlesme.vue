<template>
  <el-dialog v-model="state" title="Sözleşme" width="50%" :before-close="handleClose">
    <div style="word-break: normal" v-html="sozlesme"></div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="$emit('success'), (state = false)">Onayla</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["dialogVisible"],
  data() {
    return {
      sozlesme: "",
      state: false,
    };
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible == true) {
        this.state = this.dialogVisible;
        axios.post("/fungitu2_fungiturkey/Settings/1/get").then((res) => {
          this.sozlesme = res.data.data.sozlesme;
        });
      } else {
        this.state = this.dialogVisible;
        this.$emit("state");
      }
    },
    state() {
      if (this.state == false) {
        this.$emit("state");
      }
    },
  },
  mounted() {
    axios.post("/fungitu2_fungiturkey/Settings/1/get").then((res) => {
      this.sozlesme = res.data.data.sozlesme;
    });
  },
};
</script>

<style></style>
