<template>
  <form class="border border-white rounded p-3">
    <div class="form-group row">
      <label for="input1" class="col-sm-7 col-lg-3 col-form-label"
        >start date:</label
      >
      <div class="col-lg-4">
        <input
          type="date"
          name="start_date"
          class="form-control"
          v-model="form.start"
          id="input1"
        />
      </div>
    </div>
    <div class="form-group row mt-1">
      <label for="input2" class="col-sm-7 col-lg-3 col-form-label"
        >end date:</label
      >
      <div class="col-lg-4">
        <input
          type="date"
          name="end_date"
          class="form-control"
          v-model="form.end"
          id="input2"
        />
      </div>
    </div>
    <div class="form-group row mt-1">
      <label for="input3" class="col-sm-7 col-lg-3 col-md-3 col-form-label"
        >description:</label
      >
      <div class="col-lg-4">
        <input
          type="text"
          name="description"
          class="form-control"
          v-model="form.title"
          id="input3"
        />
      </div>
      <div class="form-group row">
        <div class="col-sm-7 col-lg-3">
          <button
            type="submit"
            class="btn btn-primary mt-1"
            @click="AddHoliday"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { AddHoliday } from "@/services/holiday";
export default {
  name: "AddHoliday",
  data() {
    return {
      form: {
        start: "",
        end: "",
        title: "",
      },
    };
  },
  methods: {
    async AddHoliday() {
      const response = await AddHoliday(this.form);
      console.log(response);
    },
  },
};
</script>
<style scoped>
</style>