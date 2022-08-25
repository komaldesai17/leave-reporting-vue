<template>
  <div>
    <div class="datewidth border border-white rounded m-sm-4 m-lg-3">
      <b-form class="m-5">
        <b-form-group
          size="lg"
          label="Start date:"
          label-size="lg"
          class="m-lg-3"
        >
          <b-form-datepicker
            size="lg"
            id="startdate"
            v-model="form.startDate"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            :date-disabled-fn="dateDisabled"
            placeholder="YYYY-MM-DD"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          size="lg"
          label="End date:"
          label-size="lg"
          class="m-lg-3"
        >
          <b-form-datepicker
            size="lg"
            id="enddate"
            v-model="form.endDate"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            :date-disabled-fn="dateDisabled"
            placeholder="YYYY-MM-DD"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group size="lg" label="Reason:" label-size="lg" class="m-lg-3">
          <b-form-textarea
            id="textarea-large"
            size="lg"
            v-model="form.reason"
            placeholder="describe your reason shortly..."
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          size="lg"
          label="Select your leave type:"
          label-size="lg"
          class="m-lg-3"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio-group
            v-model="form.type"
            class="pt-2"
            size="lg"
            :options="['Annual', 'Sick']"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
          ></b-form-radio-group>
        </b-form-group>
        <b-button
          size="lg"
          variant="primary"
          class="mt-sm-4 mt-lg-1 m-lg-3"
          @click="AddLeave"
          >Apply</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
import { addLeave } from "../services/leave";

export default {
  name: "ApplyLeave",
  data() {
    return {
      form: {
        user: "",
        startDate: "",
        endDate: "",
        reason: "",
        type: "",
      },
    };
  },

  methods: {
    async AddLeave() {
      this.form.user = this.$store.state.auth.user;
      const response = await addLeave(this.form);
      console.log(response);
    },
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay();
      const day = date.getDate();
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6 || day === 13;
    },
  },
};
</script>

<style scoped>
</style>