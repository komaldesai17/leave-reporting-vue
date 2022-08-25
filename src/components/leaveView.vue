<template>
  <div  class="addleave">
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
.addleave {
    margin:2%
}
</style>