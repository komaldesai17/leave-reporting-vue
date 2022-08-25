<template>
<div>
<div class="card mt-1" v-for="leave in leaves" :key="leave._id">
  <div class="card-header">
    from :{{leave.startDate}} to:{{leave.endDate}}
  </div>
  <div class="card-body">
    <p class="card-text">Reason:{{leave.reason}}</p>
    <a href="#" class="btn btn-dark">{{leave.status}}</a>
  </div>
  </div>
</div></template>

<script>
import { getLeaves } from "../services/leave";

export default {
  name: "LeaveStatus",
  data() {
    return {
      leaves: [],
    };
  },
  methods: {
    async getAllLeaves() {
      const id = this.$store.state.auth.user;
      const response = await getLeaves(id);
      this.leaves = response.data.data;
      console.log(this.leaves);
      return response;
    },
  },
  created() {
    this.getAllLeaves();
  },
};
</script>

<style>
</style>