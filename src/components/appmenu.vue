<template>
  <div>
    <b-navbar class="bd-navbar" v-if="isAuthenticated" toggleable="lg">
      <b-navbar-brand class="ms-2 p-1">Leave Reporting</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" class="me-2"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-2 p-1">
          <b-nav-text
            ><b-nav-item
              class="ml-7 p-1"
              v-if="this.$store.state.auth.role === 'general'"
            >
              <router-link
                to="/Dashboard"
                class="text-decoration-none"
                exact-active-class="active"
                >Dashboard</router-link
              ></b-nav-item
            >
            <b-nav-item
              class="ml-7 p-1"
              v-if="this.$store.state.auth.role === 'admin'"
            >
              <router-link
                to="/home"
                class="text-decoration-none"
                active-class="active"
                >Home</router-link
              ></b-nav-item
            >
          </b-nav-text>
          <b-nav-text>
            <b-nav-item-dropdown class="ml-7 p-1" text="Leaves">
              <b-dropdown-item>
                <router-link to="/status" class="text-decoration-none"
                  >Check status</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item v-if="this.$store.state.auth.role === 'general'">
                <router-link to="/leave" class="text-decoration-none"
                  >Apply leave</router-link
                ></b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-nav-text>
          <b-nav-text>
            <b-nav-item class="ml-7 p-1">
              <router-link
                to="/holiday"
                class="text-decoration-none"
                active-class="active"
                >Holiday</router-link
              ></b-nav-item
            >
          </b-nav-text>
          <b-nav-text ml-auto>
            <b-nav-item class="ml-7 p-1" @click="logout()">Log out</b-nav-item>
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "AppMenu",
  data() {
    return {};
  },
  computed: {
    email() {
      return this.$store.state.auth.email;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

<style scoped>
.bd-navbar {
  background-color: rgb(147, 124, 176, 0.7);
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 5%), inset 0 -1px 0 rgb(0 0 0 / 10%);
}

.active {
  color: white;
}
</style>