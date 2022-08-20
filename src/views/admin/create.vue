<template>
  <div class="mt-5 pt-5 row">
    <div class="col-12 mt-5">
      <div class="card">
        <div class="card-body">
          <template v-for="(c, name) in columns" :key="name">
            <label class="mt-3">{{ c.display }}: </label>
            <input v-if="c.type == 'file'" type="file" :ref="name" :placeholder="c.display" class="form-control" />
            <input
              v-else-if="c.type == 'varchar'"
              v-model="prm[name]"
              type="text"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <input
              v-if="c.type == 'int'"
              type="number"
              v-model="prm[name]"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <input
              v-if="c.type == 'bit'"
              type="checkbox"
              v-model="prm[name]"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <input
              v-if="c.type == 'datetime'"
              type="datetime-local"
              v-model="prm[name]"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <textarea
              v-if="c.type == 'text'"
              v-model="prm[name]"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
            <input
              type="checkbox"
              v-if="c.type == 'tinyint'"
              v-model="prm[name]"
              :ref="name"
              :placeholder="c.display"
              class="form-control"
            />
          </template>
          <button class="btn btn-primary" @click="onSubmit()">Gönder</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Image: null,
      Title: null,
      columns: [],
      prm: {},
    };
  },
  mounted() {
    this.getColumns();
  },
  methods: {
    getColumns() {
      axios.post(this.$route.params.database + "/" + this.$route.params.table_name + "/create").then((response) => {
        this.columns = response.data.columns;
      });
    },
    async onSubmit() {
      const formData = new FormData();

      for (const [key, val] of Object.entries(this.columns)) {
        if (val.type == "file") {
          formData.append("Image", this.$refs.Image?.[0]?.files[0]);
        } else {
          formData.append(key, this.prm[key] == undefined ? "" : this.prm[key]);
        }
      }
      await axios.post(this.$route.params.database + "/" + this.$route.params.table_name + "/store", formData);
    },
  },
};
</script>

<style></style>
