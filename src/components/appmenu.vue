<template>
  <div>
    <b-navbar class="bd-navbar">
      <b-navbar-brand class="ml-5 p-1">Leave Reporting</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text
            ><b-nav-item class="ml-7 p-1">
              <router-link to="/Dashboard" class="text-decoration-none"
                >Dashboard</router-link
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
              <router-link to="/holiday" class="text-decoration-none"
                >Holiday</router-link
              ></b-nav-item
            >
          </b-nav-text>
          <b-nav-text ml-auto>
            <b-nav-item class="ml-7 p-1" href="#">Log out</b-nav-item>
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "AppMenu",
};
</script>

<style scoped>
.bd-navbar {
  background-color: rgb(147, 124, 176, 0.7);
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 5%), inset 0 -1px 0 rgb(0 0 0 / 10%);
}
</style>