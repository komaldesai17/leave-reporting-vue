<template>
<div>
<div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
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
      this.leaves = response.data;
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