<template>
  <div  class="addholiday">
    <h3 >Apply for a leave</h3>
    <hr />
    <ApplyLeave />
  </div>
</template>

<script>
import ApplyLeave from "./applyLeave.vue";

export default {
  name: "LeaveView",
  components: {
    ApplyLeave,
  },
};
</script>


<style scoped>
.addholiday {
    margin:1%
}
</style>