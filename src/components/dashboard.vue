<template>
  <div class="border rounded-4 mt-5 container bg-black bg-opacity-25">
    <div class="border-bottom row">
      <div class="col text-center position-relative m-lg-4">
        <h2 class="text-light">Total</h2>
        <span class="fs-3"> {{ leaves.length }} </span>

        <router-link
          class="btn position-absolute start-0 bottom-0 m-1"
          to="/status"
        >
          <i class="fa-solid fa-circle-chevron-right"></i>
        </router-link>
      </div>
      <div
        class="
          border
          bg-info bg-gradient bg-opacity-25
          rounded-2
          col
          text-center
          m-5
          position-relative
        "
      >
        <h2 class="text-light">Sick</h2>
        <i
          class="
            fa-regular fa-hourglass-half
            position-absolute
            end-0
            bottom-0
            m-3
          "
        ></i>
        <br />
        <span class="fs-3"> {{ countLeave(leaves, "sickp") }} </span>
      </div>
      <div
        class="
          border
          rounded-2
          bg-info bg-gradient bg-opacity-25
          col
          text-center
          m-5
          position-relative
        "
      >
        <h2 class="text-light">Annual</h2>
        <i
          class="
            fa-regular fa-hourglass-half
            position-absolute
            end-0
            bottom-0
            m-3
          "
        ></i>
        <br />
        <span class="fs-3"> {{ countLeave(leaves, "annualp") }} </span>
      </div>
    </div>
    <div class="row">
      <div class="col text-center m-4">
        <h2 class="text-success">Approved</h2>
        <i class="fa-solid fa-user-check m-5 fa-lg"></i>
      </div>
      <div
        class="
          border
          bg-success bg-gradient bg-opacity-25
          rounded-2
          col
          text-center
          m-5
          position-relative
        "
      >
        <span class="fs-3 position-absolute bottom-50"
          >{{ countLeave(leaves, "annuala") }}
        </span>
      </div>
      <div
        class="
          border
          rounded-2
          col
          bg-success bg-gradient bg-opacity-25
          text-center
          m-5
          position-relative
        "
      >
        <span class="fs-3 position-absolute bottom-50"
          >{{ countLeave(leaves, "sicka") }}
        </span>
      </div>
    </div>
    <div class="border-top row">
      <div class="col text-center m-4">
        <h2 class="text-danger">Rejected</h2>
        <i class="fa-solid fa-user-slash m-5 fa-lg"></i>
      </div>
      <div
        class="
          border
          rounded-2
          col
          text-center
          bg-danger bg-gradient bg-opacity-25
          m-5
          position-relative
        "
      >
        <span class="fs-3 position-absolute bottom-50">{{
          countLeave(leaves, "annualr")
        }}</span>
      </div>
      <div
        class="
          border
          bg-danger bg-gradient bg-opacity-25
          rounded-2
          col
          text-center
          m-5
          position-relative
        "
      >
        <span class="fs-3 position-absolute bottom-50">{{
          countLeave(leaves, "sickr")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getLeaves } from "../services/leave";
import countMixin from "@/mixins/countLeaves";

export default {
  name: "LeaveDashboard",
  data() {
    return {
      leaves: [],
      status: "",
    };
  },
  methods: {
    async getAllLeaves() {
      if (this.$store.state.auth.role === "general") {
        const id = this.$store.state.auth.user;
        const response = await getLeaves(id, this.status);
        this.leaves = response.data;
        return response;
      }
    },
  },
  mixins: [countMixin],

  created() {
    this.getAllLeaves();
  },
};
</script>

<style scoped>
.container {
  height: 810px;
}

.container > .row {
  height: 270px;
}

.col {
  width: 60%;
}
</style>