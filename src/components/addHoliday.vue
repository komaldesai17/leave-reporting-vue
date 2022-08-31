<template>
  <form
    class="border border-white rounded p-3"
    novalidate
    @submit.prevent="AddHoliday"
  >
    <div class="form-group row">
      <label for="input1" class="col-sm-7 col-lg-3 col-form-label"
        >start date:</label
      >
      <div class="col-lg-6">
        <input
          type="date"
          name="start_date"
          class="form-control"
          id="input1"
          v-model="form.start"
          @blur="$v.form.start.$touch()"
           :class="{
                'is-invalid': shouldAppendErrorClass($v.form.start),
                'is-valid': shouldAppendValidClass($v.form.start),
              }"
        />
        <div
          class="text-danger"
          v-if="$v.form.end.$error && !$v.form.end.required"
        >
          Please enter start date
        </div>
      </div>
    </div>
    <div class="form-group row mt-1">
      <label for="input2" class="col-sm-7 col-lg-3 col-form-label"
        >end date:</label
      >
      <div class="col-lg-6">
        <input
          type="date"
          name="end_date"
          class="form-control"
          v-model="form.end"
          id="input2"
          @blur="$v.form.end.$touch()"
           :class="{
                'is-invalid': shouldAppendErrorClass($v.form.end),
                'is-valid': shouldAppendValidClass($v.form.end),
              }"
        />
        <div
          class="text-danger"
          v-if="$v.form.end.$error && !$v.form.end.required"
        >
          Please enter end date
        </div>
        <div
          class="text-danger"
          v-if="$v.form.end.$error && !$v.form.end.minValue"
        >
          check the end date for holiday
        </div>
      </div>
    </div>
    <div class="form-group row mt-1">
      <label for="input3" class="col-sm-7 col-lg-3 col-md-3 col-form-label"
        >description:</label
      >
      <div class="col-lg-6">
        <input
          type="text"
          name="description"
          class="form-control"
          v-model="form.title"
          id="input3"
          @blur="$v.form.title.$touch()"
           :class="{
                'is-invalid': shouldAppendErrorClass($v.form.title),
                'is-valid': shouldAppendValidClass($v.form.title),
              }"
        />
        <div
          class="text-danger"
          v-if="$v.form.title.$error && !$v.form.title.required"
        >
          Please enter description for the Holiday
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-7 col-lg-3">
          <button
            type="submit"
            class="btn btn-primary mt-2"
            :disabled="$v.form.$invalid"
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
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
import config from "@/config";

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
  validations: {
    form: {
      start: { required },
      end: {
        required,
        minValue(val) {
          return new Date(val) >= new Date(this.form.start);
        },
      },
      title: { required },
    },
  },
  methods: {
    async AddHoliday() {
      if (!this.$v.form.$invalid) {
        try {
          const response = await AddHoliday(this.form);

          if (response.status === "success") {
            Vue.$toast.success("Added holiday : " + `${this.form.title}`, {
              position: "top-right",
              duration: config.toastDuration,
            });
          }
        } catch (error) {
          Vue.$toast.error("something went wrong", {
            position: "top-right",
            duration: config.toastDuration,
          });
        }
      }
    },
    shouldAppendValidClass(field) {
      return !field.$invalid && field.$model && field.$dirty;
    },
    shouldAppendErrorClass(field) {
      return field.$error;
    },
  },
};
</script>
<style scoped>
</style>