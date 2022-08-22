<template>
    <div class="topcontainer">
      <div class="addholiday">
        <h5 class="mt-3">Add Holiday</h5>
        <hr />
        <AddHoliday />
        <h5 class="mt-5">Remove Holiday</h5>
        <hr />
        <RemoveHoliday />
      </div>
      <div class="calcontainer">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchHolidays } from "@/services/holiday";
import AddHoliday from "./addHoliday";
import RemoveHoliday from "./removeHoliday.vue";

export default {
  name: "HolidayView",
  components: {
    FullCalendar,
    AddHoliday,
    RemoveHoliday,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        //initialView: "dayGridMonth",
        events: [],
        eventDisplay:"block",
        eventColor: "green",
        displayEventTime: false,
        height: 800,
        aspectRatio: 1.8,
        titleFormat: { month: "short", year: "numeric" },
      },
    };
  },
  created() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      const response = await fetchHolidays();
      this.calendarOptions.events = response.data.data;
      console.log(this.calendarOptions.events);
    },
  },
};
</script>

<style scoped>
.topcontainer {
  display: flex;
  margin-top: 1%;
  margin-left: 3%;
}

.addholiday {
  width: 35%;
}
.calcontainer {
  width: 60%;
  margin-right: 10%;
  margin-left: 10%;
}

@media (min-width: 600px) and (max-width: 1000px) {
  .calcontainer {
    width: 100%;
    height: 0%;
  }
}
</style>