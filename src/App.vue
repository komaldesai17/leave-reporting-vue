<template>
  <div>
    <AppMenu />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import AppMenu from "./components/appmenu";

export default {
  name: "App",
  components: {
    AppMenu,
  },
};
</script>

<style>
</style>
