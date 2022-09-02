<template>
  <form
    class="filtercontainer"
    @submit.prevent="getAllLeaves"
    v-if="this.$store.state.auth.role === 'general'"
  >
    <h4>Search by date</h4>
    <hr />
    <div class="calcontainer">
      <FullCalendar :options="calendarOptions" />
    </div>
    <button class="btn btn-secondary m-2" type="submit">
      <i class="fa-solid fa-magnifying-glass"></i> Search
    </button>
  </form>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
export default {
    name:"LeaveCalendar",
    components:{
        FullCalendar
    },
    data(){
        return{
             start: "",
      end: "",
      calendarOptions: {
        selectable: true,
        plugins: [dayGridPlugin, interactionPlugin],
        events: [],
        eventDisplay: "block",
        eventColor: "green",
        displayEventTime: false,
        height: 600,
        aspectRatio: 1.8,
        titleFormat: { month: "short", year: "numeric" },

        }
      
      }

}
}
</script>

<style scoped>
.calcontainer {
  width: 100%;
}


</style>