<template>
  <div class="border rounded-4 mt-5 container bg-black bg-opacity-25">
    <h3 class="m-5 text-center">Welcome Admin</h3>
    <p class="fs-4 text-light">
      Manage Leaves for users
      <router-link class="btn m-1" to="/status">
        <i class="fa-solid fa-circle-chevron-right"></i>
      </router-link>
    </p>
    <p class="fs-4 text-light">
      If You need to set/remove the holidays
      <router-link class="btn m-1" to="/holiday">
        <i class="fa-solid fa-circle-chevron-right"></i>
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "AppHome",
};
</script>

<style scoped>
.container {
  height: 800px;
}

p {
  margin: 100px;
}
</style>