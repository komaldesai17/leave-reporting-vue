<template>
  <div class="container mt-5 p-5">
    <div class="row row-cols-3">
      <div class="col border"></div>
      <div class="col-2 border">SICK</div>
      <div class="col-2 border">ANNUAL</div>
    </div>
    <div class="row row-cols-3">
      <div class="col border">
        Total number of leaves
        {{ leaves.length }}
      </div>
      <div class="row row-cols-2">
        <div class="col border">
          Number of Sick leaves pending{{ countLeave(leaves, "sickp") }}
        </div>

        <div class="col border">
          Number of Annual leaves pending{{ countLeave(leaves, "annualp") }}
        </div>
        <div class="col border">
          <div class="row row-cols-2">
            Number of Sick leaves
            <div class="col border">
              approved {{ countLeave(leaves, "sicka") }}
            </div>
            <div class="col border">
              rejected{{ countLeave(leaves, "sickr") }}
            </div>
          </div>
        </div>
        <div class="col border">
          <div class="row row-cols-2">
            Number of Annual leaves
            <div class="col border">
              approved{{ countLeave(leaves, "annuala") }}
            </div>
            <div class="col border">
              rejected{{ countLeave(leaves, "annualr") }}
            </div>
          </div>
        </div>
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

<style>
</style>