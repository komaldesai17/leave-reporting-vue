<template>
  <div class="topdiv">
    <div class="m-3">
      <form class="filtercontainer" @submit.prevent="getAllLeaves">
        <h4>Filter by status</h4>
        <hr />
        <b-form-select
          v-model="status"
          class="btn btn-group btn-lg dropdown-toggle bg-body w-50"
        >
          <b-form-select-option value="" active>All</b-form-select-option>
          <b-form-select-option value="pending">pending</b-form-select-option>
          <b-form-select-option value="approved">approved</b-form-select-option>
          <b-form-select-option value="rejected">rejected</b-form-select-option>
        </b-form-select>
        <button class="btn btn-secondary m-2" type="submit">
          <i class="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </form>
    </div>
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
              type="submit"
              @click="CancelLeave(leave._id)"
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
import { getLeaves, cancelLeave } from "../services/leave";

export default {
  name: "LeaveStatus",
  data() {
    return {
      leaves: [],
      status: "",
    };
  },
  methods: {
    async getAllLeaves() {
      const id = this.$store.state.auth.user;
      const response = await getLeaves(id, this.status);
      this.leaves = response.data.data;
      return response;
    },

    async CancelLeave(leave) {
      const response = await cancelLeave(leave);
      console.log(leave);

      return response;
    },
  },
  created() {
    this.getAllLeaves();
  },
};
</script>

<style scoped>
.topdiv {
  display: flex;
  justify-content: space-between;
}
.topdiv > div {
  width: 100%;
}

.filtercontainer {
  width: 50%;
  margin-left: 5%;
}

.font-weight-bolder {
  font-weight: 500;
}
</style>