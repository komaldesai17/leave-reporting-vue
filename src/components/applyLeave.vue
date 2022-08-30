<template>
  <div class="addleave">
    <h3>Apply for a leave</h3>
    <hr />
    <div class="datewidth border border-white rounded m-sm-4 m-lg-3">
      <form class="m-5" @submit.prevent="AddLeave">
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
            :state="validateState('startDate')"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            aria-describedby="input-1-live-feedback"
            :date-disabled-fn="dateDisabled"
            placeholder="YYYY-MM-DD"
          ></b-form-datepicker>
          <b-form-invalid-feedback id="input-1-live-feedback">
            This feild is required and must be selected for current or future
            dates
          </b-form-invalid-feedback>
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
            :state="validateState('endDate')"
            aria-describedby="input-2-live-feedback"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            :date-disabled-fn="dateDisabled"
            placeholder="YYYY-MM-DD"
          ></b-form-datepicker>
          <b-form-invalid-feedback id="input-2-live-feedback">
            This feild is required and must be selected for current or future
            dates
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group size="lg" label="Reason:" label-size="lg" class="m-lg-3">
          <b-form-textarea
            id="textarea-large"
            size="lg"
            v-model="form.reason"
            :state="validateState('reason')"
            aria-describedby="input-3-live-feedback"
            placeholder="describe your reason shortly..."
          ></b-form-textarea>
          <b-form-invalid-feedback id="input-3-live-feedback">
            This feild is required and must be between 3 to 25 charachters
          </b-form-invalid-feedback>
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
            name="radios-btn-default"
            :state="state"
            :aria-describedby="ariaDescribedby"
            buttons
          ></b-form-radio-group>
          <b-form-invalid-feedback :state="validateState('type')">
            This feild is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button
          size="lg"
          variant="primary"
          type="submit"
          class="mt-sm-5 mt-lg-4 me-lg-5 me-sm-3"
          >Apply</b-button
        >
        <b-button
          size="lg"
          class="mt-sm-5 mt-lg-4 me-lg-5 me-sm-3"
          @click="resetForm()"
          >Reset</b-button
        >
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { addLeave } from "../services/leave";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import Vue from "vue";
import config from "@/config";

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
  validations: {
    form: {
      startDate: {
        required,
        minValue(val) {
          return new Date(val) > new Date();
        },
      },
      endDate: {
        required,
        minValue(val) {
          return new Date(val) > new Date();
        },
      },
      reason: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      type: {
        required,
      },
    },
  },
  mixins: [validationMixin],
  computed: {
    state() {
      return Boolean(this.value);
    },
  },

  methods: {
    async AddLeave() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      if (!this.$v.form.$invalid) {
        try {
          const id = this.$store.state.auth.user;
          const response = await addLeave(id, this.form);
          console.log(response);
          if (response.status === "success") {
            Vue.$toast.success("Leave Added ", {
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
      } else {
        Vue.$toast.error("something went wrong", {
          position: "top-right",
          duration: config.toastDuration,
        });
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        startDate: null,
        endDate: null,
        reason: null,
        type: null,
      };
      /*
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });*/
    },

    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      const weekday = date.getDay();
      //const day = date.getDate();
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6;
    },
  },
};
</script>

<style scoped>
.addleave {
  margin: 3%;
}
</style>