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

      <form
        class="filtercontainer"
        @submit.prevent="getAllLeaves"
        v-if="this.$store.state.auth.role === 'admin'"
      >
        <h4 class="text-end">Filter by Users</h4>
        <hr />
        <b-form-select
          v-model="email"
          class="btn btn-group btn-lg dropdown-toggle bg-body w-50"
        >
          <b-form-select-option value="" active>All</b-form-select-option>
          <b-form-select-option
            :value="email"
            v-for="email in getemail.email"
            :key="email.id"
            @submit.prevent="getAllLeaves"
            >{{ email }}</b-form-select-option
          >
        </b-form-select>
        <button class="btn btn-secondary m-2" type="submit">
          <i class="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </form>

      <div
        class="filtercontainer border rounded-2"
        v-if="this.$store.state.auth.role === 'admin'"
      >
        <h4 class="text-end m-2">Current user:</h4>
        <hr />
        <span class="font-weight-bolder fs-4 m-4"> Email : </span>
        {{ this.email }}
      </div>
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
        <LeaveCard :leave="leave" />
      </div>
    </div>
  </div>
</template>

<script>
import { getLeaves, getallLeaves } from "../services/leave";
import LeaveCard from "./LeaveCard.vue";
import Vuex from "vuex";

export default {
  name: "LeaveStatus",
  components: {
    LeaveCard,
  },
  data() {
    return {
      leaves: [],
      status: "",
      email: "",
    };
  },
  computed: {
    ...Vuex.mapGetters(["getemail", "getuserID"]),
  },
  methods: {
    async getAllLeaves() {
      if (this.$store.state.auth.role === "general") {
        const id = this.$store.state.auth.user;
        const response = await getLeaves(id, this.status);
        this.leaves = response.data.data;
        return response;
      } else if (this.$store.state.auth.role === "admin") {
        const response = await getallLeaves(this.status);
        this.leaves = response.data.data;
        if (this.email) {
          const user = this.getuserID(this.email);
          const response = await getLeaves(user[0]._id, this.status);
          this.leaves = response.data.data;
        }

        return response;
      }
    },
  },
  created() {
    this.getAllLeaves();
    this.$store.dispatch("getUsers");
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
  margin-bottom: 15%;
}

@media (min-width: 600px) and (max-width: 1000px) {
  .topdiv {
    display: block;
    margin-right: 3%;
  }

  .filtercontainer {
    width: 95%;
    margin: 2%;
  }
}
</style>