<template>
  <div class="topcontainer">
    <div class="admincontainer">
      <div class="addholiday" v-if="role === 'admin'">
        <h5 class="mt-3">Add Holiday</h5>
        <hr />
        <AddHoliday />
      </div>
      <div class="removeholiday" v-if="role === 'admin'">
        <h5 class="mt-3">Remove Holiday</h5>
        <hr />
        <RemoveHoliday />
      </div>
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
import RemoveHoliday from "./removeHoliday";

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
        events: [],
        eventDisplay: "block",
        eventColor: "green",
        displayEventTime: false,
        height: 800,
        aspectRatio: 1.8,
        titleFormat: { month: "short", year: "numeric" },
      },
      role: this.$store.state.auth.role,
    };
  },
  methods: {
    async getEvents() {
      const response = await fetchHolidays();
      /*response.data.forEach((element) => {
        this.calendarOptions.events.push(element);
      });*/
      this.calendarOptions.events = response.data;
    },
  },
  created() {
    this.getEvents();
  },
};
</script>

<style scoped>
.topcontainer {
  display: flex;
  margin: 1%;
}

.addholiday {
  width: 100%;
  margin-left: 5%;
  margin-bottom: 15%;
}
.removeholiday {
  width: 100%;
  margin-left: 5%;
}
.calcontainer {
  width: 60%;
  margin-right: 10%;
  margin-left: 10%;
}

@media (min-width: 600px) and (max-width: 1000px) {
  .topcontainer {
    display: block;
  }
  .admincontainer {
    display: inline-flex;
    justify-content: space-between;
  }
  .addholiday {
    width: 50%;
  }
  .removeholiday {
    width: 45%;
  }

  .calcontainer {
    width: 97%;
    height: 0%;
    margin-left: 1.5%;
    margin-right: 1.5%;
  }
}
</style>