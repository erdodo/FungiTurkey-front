<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      v-loading="loading"
      title="Etkinlik Takvimi"
      fullscreen
      width="30%"
      :before-close="handleClose"
    >
      <span
        >*Etkinlik tarihlerimiz sizin için uygun değil mi? Etkinlik istediğiniz güne tıklayarak bize bildirebilirsiniz.</span
      >
      <FullCalendar v-if="!loading" @clickDate="dayClick" @select="handleSelect" :options="calendarOptions" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Kapat</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="activityFeedback" title="Etkinlik İsteği" width="300px">
      <el-input v-model="message" :rows="4" type="textarea" placeholder="Nasıl bir etkinlik talep ediyorsunuz?" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="activityFeedback = false">Vazgeç</el-button>
          <el-button type="primary" @click="newFeedback()">Gönder</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { ElNotification } from "element-plus";

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
      activityFeedback: false,
      tarih: null,
      message: "",
      calendarOptions: {
        dateClick: this.handleDateClick,
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
  computed: {
    ...mapGetters(["getProfile"]),
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
    handleSelect(e) {
      console.log(e);
    },
    handleDateClick: function (arg) {
      this.tarih = arg.dateStr;
      if (this.getProfile?.id != undefined) {
        this.activityFeedback = true;
      } else {
        ElNotification({
          title: "Dikkat",
          message: "Geri bildirim göndermek için giriş yapmalısınız!",
          type: "info",
        });
      }
    },
    newFeedback() {
      const params = {
        member_id: this.getProfile.id,
        name: this.getProfile.name + " " + this.getProfile.surname,
        phone: this.getProfile.phone,
        message: this.message,
        activity_date: this.tarih,
      };
      this.activityFeedback = false;
      axios.post(this.fungi + "/ActivityFeedback/store", params).then((res) => {
        if (res.data.status == "success") {
          ElNotification({
            title: "Başarılı",
            message: "Geri bildirim başarıyla gönderildi.",
            type: "success",
          });
        }
      });
    },
  },
  components: {
    FullCalendar,
  },
};
</script>

<style></style>
