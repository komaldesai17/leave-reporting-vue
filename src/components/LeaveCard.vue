<template>
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
</template>

<script>
import { cancelLeave } from "../services/leave";

export default {
  name: "LeaveCard",
  data() {
    return {};
  },
  props: {
    leave: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async CancelLeave(leave) {
      const response = await cancelLeave(leave);
      console.log(leave);

      return response;
    },
  },
};
</script>

<style scoped>
.font-weight-bolder {
  font-weight: 500;
}
</style>