<template>
  <div class="topdiv">
   <div>New </div>
    <div class="m-2">
      <div
        class="card border-light alert alert-danger m-3 p-3"
        style="max-width: 60rem"
        v-if="leaves.length === 0"
      >
        No Leaves found currently
      </div>
      <div
        class="card border-light mb-3 bg-transparent"
        style="max-width: 60rem"
        v-for="leave in leaves"
        :key="leave._id"
      >
        <div class="card-body d-inline-flex justify-content-between">
          <div>
            <div class="mb-2">
              <span class="font-weight-bolder">From : </span>
              {{ leave.startDate }}
            </div>
            <div class="mb-2">
              <span class="font-weight-bolder">To : </span>{{ leave.endDate }}
            </div>

            <button
              class="btn btn-danger mb-2"
              v-if="leave.status === 'pending'"
            >
              <i class="fa-solid fa-trash"></i>
              Cancel
            </button>
          </div>
          <div class="d-flex justify-content-between">
            <span class="m-2 font-weight-bolder">Current Status : </span>
            <div
              class="alert bg-dark text-white h-50"
              v-if="leave.status === 'pending'"
            >
              <i class="fa-solid fa-clock-rotate-left"></i> {{ leave.status }}
            </div>
            <div class="alert bg-success" v-if="leave.status === 'approved'">
              <i class="fa-solid fa-thumbs-up"></i> {{ leave.status }}
            </div>
            <div class="alert alert-danger" v-if="leave.status === 'rejected'">
              <i class="fa-solid fa-thumbs-down"></i> {{ leave.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

<style scoped>
.topdiv{
  display: flex;
}
.font-weight-bolder {
  font-weight: 500;
}
</style>