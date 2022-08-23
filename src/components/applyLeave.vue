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
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
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
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            placeholder="YYYY-MM-DD"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group size="lg" label="Reason:" label-size="lg" class="m-lg-3">
          <b-form-textarea
            id="textarea-large"
            size="lg"
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
            class="pt-2"
            size="lg"
            :options="['Annual', 'Sick']"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
          ></b-form-radio-group>
        </b-form-group>
        <b-button size="lg" variant="primary" class="mt-sm-4 mt-lg-1 m-lg-3"
          >Apply</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApplyLeave",
};
</script>

<style scoped>
</style>