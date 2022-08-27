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

      <div class="mb-2" v-if="this.$store.state.auth.role === 'admin'">
        <span class="font-weight-bolder">user : </span>{{ leave.user }}
      </div>

      <button
        class="btn btn-danger mb-2"
        v-if="
          leave.status === 'pending' &&
          this.$store.state.auth.role === 'general'
        "
        type="submit"
        @click="CancelLeave(leave._id)"
      >
        <i class="fa-solid fa-trash"></i>
        Cancel
      </button>

      <button
        class="btn btn-outline-success m-2"
        v-if="
          leave.status === 'pending' && this.$store.state.auth.role === 'admin'
        "
        type="submit"
        @click="ChangeStatus(leave._id, 'approved')"
      >
        <i class="fa-solid fa-calendar-check"></i> Approve
      </button>
      <button
        class="btn btn-outline-danger m-2"
        v-if="
          leave.status === 'pending' && this.$store.state.auth.role === 'admin'
        "
        type="submit"
        @click="ChangeStatus(leave._id, 'rejected')"
      >
        <i class="fa-solid fa-calendar-xmark"></i> Reject
      </button>
    </div>

    <div class="w-50">
      <div class="d-flex justify-content-end">
        <span class="m-2 font-weight-bolder">Current Status : </span>
        <div
          class="alert bg-dark text-white h-25 p-2 w-50"
          v-if="leave.status === 'pending'"
        >
          <i class="fa-solid fa-clock-rotate-left ms-5"></i> {{ leave.status }}
        </div>
        <div
          class="alert bg-success h-50 p-2 w-50"
          v-if="leave.status === 'approved'"
        >
          <i class="fa-solid fa-thumbs-up ms-5"></i> {{ leave.status }}
        </div>
        <div
          class="alert alert-danger h-50 p-2 w-50"
          v-if="leave.status === 'rejected'"
        >
          <i class="fa-solid fa-thumbs-down ms-5"></i> {{ leave.status }}
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <span class="m-2 font-weight-bolder">Reason : </span>
        <div class="h-25 p-2 w-50">
          {{ leave.reason }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cancelLeave, changeStatus } from "../services/leave";

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
      return response;
    },
    async ChangeStatus(leave, status) {
      const response = await changeStatus(leave, status.trim());
      console.log(leave, status, response.data.data.status);
      return response;
    },
  },
};
</script>

<style scoped>
.font-weight-bolder {
  font-weight: 500;
}

.statuscontainer {
  width: 35%;
  justify-content: space-around;
}
</style>