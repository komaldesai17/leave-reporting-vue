<template>
  <div class="container mt-5 p-5">
    <div class="row row-cols-3">
      <div class="col border">Number of leaves applied</div>
      <div class="col border">Number of Sick leaves</div>
      <div class="col border">Number of Annual leaves</div>
      <div>
      <h1>Vue cookies</h1>
     <button @click="getCookie">Get Cookie</button>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaveDashboard",
   methods:{
     getCookie(){
         // it gets the cookie called `username`
      const username = this.$cookies.get("email");
      console.log(username);
     }
   }
};
</script>

<style>
</style>