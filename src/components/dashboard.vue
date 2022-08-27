<template>
  <div
    class="border rounded-4 mt-5 container bg-black  bg-opacity-25"
  >
    <div class="border-bottom row">
      <div class="col text-center position-relative m-lg-4">
        <h2 class="text-light">Total</h2>
        <span class="fs-3"> {{ leaves.length }} </span>

        <router-link class="btn position-absolute start-0 bottom-0 m-1" to="">
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
  <!--
  <div class="container mt-5 p-5">
    <div class="row row-cols-3">
      <div class="col border"></div>
      <div class="col-2 border">SICK</div>
      <div class="col-2 border">ANNUAL</div>
    </div>
    <b-card-group class="row row-cols-3">
      <b-card
        border-variant="light"
        header="Total number of leaves"
        class="col text-center p-0"
      >
        <b-card-text class="text-center"> {{ leaves.length }}</b-card-text>
      </b-card>
      <b-card-group class="row row-cols-2">
        <b-card
          border-variant="light"
          header="Number of Sick leaves pending"
          class="col text-center p-0"
        >
          <b-card-text class="text-center">
            {{ countLeave(leaves, "sickp") }}</b-card-text
          >
        </b-card>

        <b-card
          border-variant="light"
          header="Number of Annual leaves pending"
          class="col text-center p-0"
        >
          <b-card-text class="text-center">{{
            countLeave(leaves, "annualp")
          }}</b-card-text>
        </b-card>
        <b-card class="col border text-center p-0 m-0">
          <b-card-group class="row row-cols-2">
            <b-card
              border-variant="light"
              header="approved"
              class="col text-center p-0"
            >
              <b-card-text class="text-center">
                {{ countLeave(leaves, "sicka") }}</b-card-text
              >
            </b-card>
            <b-card
              border-variant="light"
              header="rejected"
              class="col text-center p-0"
            >
              <b-card-text class="text-center">
                {{ countLeave(leaves, "sickr") }}</b-card-text
              >
            </b-card>
          </b-card-group>
        </b-card>
        <b-card class="col border">
          <b-card-group class="row row-cols-2">
            <b-card
              border-variant="light"
              header="approved"
              class="col text-center p-0"
            >
              <b-card-text class="text-center">
                {{ countLeave(leaves, "annuala") }}</b-card-text
              >
            </b-card>
            <b-card
              border-variant="light"
              header="approved"
              class="col text-center p-0"
            >
              <b-card-text class="text-center">
                {{ countLeave(leaves, "annualr") }}</b-card-text
              >
            </b-card>
          </b-card-group>
        </b-card>
      </b-card-group>
    </b-card-group>
  </div>-->
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
        this.leaves = response.data.data;
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