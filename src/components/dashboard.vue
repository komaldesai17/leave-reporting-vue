<template>
  <div class="container mt-5 p-5">
    <div class="row row-cols-3">
      <div class="col border">Number of leaves applied</div>
      <div class="row row-cols-2">
        <div class="col border">Number of Sick leaves pending</div>

        <div class="col border">Number of Annual leaves pending</div>
        <div class="col border">
          <div class="row row-cols-2">
            Number of Sick leaves
            <div class="col border">approved</div>
            <div class="col border">rejected</div>
          </div>
        </div>
        <div class="col border">
          <div class="row row-cols-2">
            Number of Annual leaves
            <div class="col border">approved</div>
            <div class="col border">rejected</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaveDashboard",
  methods: {},
};
</script>

<style>
</style>