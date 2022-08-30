<template>
  <div class="card-body d-inline-flex justify-content-between">
    <div>
      <div class="mb-2">
        <span class="font-weight-bolder">From : </span>
        {{ formatDate(leave.startDate) }}
      </div>
      <div class="mb-2">
        <span class="font-weight-bolder">To : </span
        >{{ formatDate(leave.endDate) }}
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
import formatDateMixin from "../mixins/formatDate";
import Vue from "vue";
import config from "@/config";
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
  mixins: [formatDateMixin],
  methods: {
    async CancelLeave(id) {
      try {
        const response = await cancelLeave(id);
        if (response.status === "success") {
          Vue.$toast.error("Cancelled", {
            position: "top-right",
            duration: config.toastDuration,
          });
        }
      } catch (error) {
        Vue.$toast.error("something went wrong", {
          position: "top-right",
          duration: config.toastDuration,
        });
      }
    },
    async ChangeStatus(id, status) {
      try {
        const response = await changeStatus(id, status.trim());
        console.log(this.leave);
        if (response.data.status === "approved") {
          Vue.$toast.success("Leave approved ", {
            position: "top-right",
            duration: config.toastDuration,
          });
        } else if (response.data.status === "rejected") {
          Vue.$toast.error("Leave rejected ", {
            position: "top-right",
            duration: config.toastDuration,
          });
        }
      } catch (error) {
        Vue.$toast.error("something went wrong", {
          position: "top-right",
          duration: config.toastDuration,
        });
      }
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