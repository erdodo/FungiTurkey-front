<template>
  <el-dialog
    v-model="dialogVisible"
    v-loading="loading"
    title="Etkinlik Takvimi"
    fullscreen
    width="30%"
    :before-close="handleClose"
  >
    <FullCalendar v-if="!loading" :options="calendarOptions" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Kapat</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "@fullcalendar/core/vdom";
export default {
  props: ["state"],
  data() {
    return {
      dialogVisible: false,
      activity: {},
      count: 0,
      loading: true,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin],
        initialView: "dayGridMonth", //aylık görünüm
        footerToolbar: {
          left: "",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        themeSystem: "bootstrap", //bootstrap tema
        selectable: true, //takvimden gün seçilebilir
        locale: "tr", //tr dilini kullan
        eventDisplay: "auto", //takvimde günlerin yanında eventlerin görünmesi
        height: "75vh", //takvimin yüksekliği
        width: "100%", //takvimin genişliği
        responsive: true, //takvimin cevabında görünmesi
        events: [],
        eventClick: this.eventClick,
        displayEventTime: false, //eventlerin zamanını gösterme
        longPressDelay: 500, //eventlerin ne kadar süre boyunca yüksekliği olması
        eventLongPressDelay: 500, //eventlerin ne kadar süre boyunca yüksekliği olması
        selectLongPressDelay: 500, //eventlerin ne kadar süre boyunca yüksekliği olması
        buttonText: {
          today: "Bugün",
          month: "Ay",
          week: "Hafta",
          day: "Gün",
          list: "Liste",
          prev: "Önceki",
          next: "Sonraki",
          prevYear: "Önceki Yıl",
          nextYear: "Sonraki Yıl",
        },
        buttonIcons: {},
        dayMaxEvents: true, // for all non-TimeGrid views
        moreLinkContent: "Diğer ...",
        views: {
          timeGrid: {
            dayMaxEventRows: 3, // adjust to 6 only for timeGridWeek/timeGridDay
            text: "Zaman",
          },
          timeGridYear: {
            dayMaxEventRows: 10, // adjust to 6 only for timeGridWeek/timeGridDay
            text: "Zaman",
          },
        },
      },
    };
  },
  watch: {
    dialogVisible() {
      this.$emit("state", this.dialogVisible);
    },
    state() {
      this.dialogVisible = this.state;
      if (this.state == true) {
        this.getData();
      }
    },
  },
  methods: {
    getData() {
      this.loading = true;
      const params = {
        page: 1,
        limit: 1000,
        filter: {
          status: "1",
        },
      };
      axios.post(this.fungi + "/Activity", params).then((response) => {
        this.activity = response.data.data;
        this.count = response.data.count;
        this.loading = false;
        this.calendarOptions.events = [];
        for (const val of Object.values(this.activity)) {
          this.calendarOptions.events.push({
            title: val.title,
            start: val.start_date,
            end: val.finish_date,
            url: "/etkinlik/" + val.id + "-" + val.title.replace(" ", "-"),
          });
        }
      });
    },
    eventClick(e) {
      console.log(e);
    },
  },
  components: {
    FullCalendar,
  },
};
</script>

<style></style>
