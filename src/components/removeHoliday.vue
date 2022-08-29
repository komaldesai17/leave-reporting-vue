<template>
  <form class="border border-white rounded p-3" @submit.prevent="RemoveHol">
    <div class="form-group row">
      <label for="input1" class="col-sm-7 col-lg-3 col-form-label"
        >Description:</label
      >
      <div class="col-lg-6">
        <input
          type="text"
          name="description"
          v-model="description"
          class="form-control"
          id="input1"
        />
      </div>
      <div class="form-group">
        <div class="col-sm-7 col-lg-3">
          <button type="submit" class="btn btn-danger mt-1">remove</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { removeHoliday } from "@/services/holiday";
import Vue from "vue";
import config from "@/config";

export default {
  name: "RemoveHoliday",
  data() {
    return {
      description: "",
    };
  },
  methods: {
    async RemoveHol() {
      try {
        const response = await removeHoliday(this.description);
        if (response.status == "success") {
          Vue.$toast.success("Removed holiday : " + `${this.description}`, {
            position: "top-right",
            duration: config.toastDuration,
          });
        }
      } catch (error) {
        Vue.$toast.error("No such holiday", {
          position: "top-right",
          duration: config.toastDuration,
        });
      }
    },
  },
};
</script>

<style>
</style>