<template>
  <div>
    <el-dialog v-model="dialogVisible" title="Kayıt Güncelleme" :fullscreen="oda_durum" width="350px">
      <span>This is a message{{ oda_durum }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible", "records"],
  data() {
    return {
      dialogVisible: this.visible,
      oda_durum: false,
      my_rooms: [],
      my_count: 0,
    };
  },
  watch: {
    dialogVisible() {
      this.$emit("visible", this.dialogVisible);
    },
    visible() {
      this.dialogVisible = this.visible;
      for (const val of Object.values(this.records)) {
        if (val.room_id != null) {
          this.oda_durum = true;
        } else {
          this.my_count = parseInt(this.my_count) + parseInt(val.people_count);
        }
      }
    },
  },
};
</script>

<style></style>
