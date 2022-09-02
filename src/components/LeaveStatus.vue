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
      <form class="filtercontainer" @submit.prevent="getAllLeaves"  v-if="this.$store.state.auth.role === 'general'">
        <h4>Search by date</h4>
        <hr />
        <label for="input1" class="col-sm-7 col-lg-3 col-form-label"
          >start date:</label
        >
        <div class="col-lg-6">
          <input
            type="date"
            name="start_date"
            class="form-control"
            id="input1"
            v-model="start"
          />
        </div>
        <label for="input1" class="col-sm-7 col-lg-3 col-form-label"
          >end date:</label
        >
        <div class="col-lg-6">
          <input
            type="date"
            name="start_date"
            class="form-control"
            id="input1"
            v-model="end"
          />
        </div>

        <button class="btn btn-secondary mt-5" type="submit">
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
        <span class="font-weight-bolder fs-4 m-4"> Email </span> :
        {{ this.email }}
      </div>
    </div>
    <div class="m-2">
      <div
        class="card border-light alert alert-danger m-3 p-3"
        style="max-width: 60rem"
        v-if="leaves.length === 0 && this.page === 1"
      >
        No Leaves found currently
      </div>
      <div class="row-4">
        <div class="mb-3" v-if="leaves.length != 0 && this.page >= 1">
          <button class="btn me-2" @click="previous">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          {{ this.page }}
          <button class="btn me-2" @click="next" :disabled="leaves.length < 4">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div
          class="card border-light mb-3 bg-transparent"
          style="max-width: 60rem"
          v-for="leave in leaves"
          :key="leave._id"
        >
          <LeaveCard :leave="leave" :ok="ok" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLeaves, getallLeaves } from "../services/leave";
import LeaveCard from "./LeaveCard.vue";
import Vuex from "vuex";
import countMixin from "@/mixins/countLeaves";

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
      page: 1,
      start: "",
      end: "",
    };
  },
  mixins: [countMixin],
  computed: {
    ...Vuex.mapGetters(["getemail", "getuserID"]),
  },
  methods: {
    async getAllLeaves() {
      if (this.$store.state.auth.role === "general") {
        const id = this.$store.state.auth.user;
        const response = await getLeaves(this.page, id, this.status,this.start,this.end);
        if (response.data == 0) {
          this.page = 1;
          this.getAllLeaves();
        } else {
          this.leaves = response.data;
        }
        return response;
      } else if (this.$store.state.auth.role === "admin") {
        const response = await getallLeaves(this.page, this.status,this.start,this.end);
        if (response.data == 0) {
          this.page = 1;
          this.getAllLeaves();
        } else {
          this.leaves = response.data;
        }
        if (this.email) {
          const user = this.getuserID(this.email);
          const response = await getLeaves(this.page, user[0]._id, this.status);
          if (response.data == 0) {
            this.page = 1;
            this.getAllLeaves();
          } else {
            this.leaves = response.data;
          }
        }

        return response;
      }
    },
    ok() {
      this.getAllLeaves();
    },

    previous() {
      if (this.page !== 1) {
        this.page = this.page - 1;
        this.getAllLeaves();
      }
    },
    next() {
      this.page = this.page + 1;
      this.getAllLeaves();
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

  .calcontainer {
    width: 97%;
    height: 0%;
    margin-left: 1.5%;
    margin-right: 1.5%;
  }
}
</style>