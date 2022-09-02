<template>
  <div class="container">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <hr />
      <div class="row g-3 align-items-center">
        <div class="col-auto set-container">
          <i class="fa-solid fa-user"></i>
          <label for="email" class="col-form-label mx-2">Email ID</label>
        </div>
        <div class="col-auto set-container">
          <input
            type="text"
            id="email"
            v-model="form.email"
            class="form-control"
            aria-describedby="email"
            @blur="$v.form.email.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.email),
              'is-valid': shouldAppendValidClass($v.form.email),
            }"
          />
          <div
            class="text-danger"
            v-if="$v.form.email.$error && !$v.form.email.required"
          >
            <small>This field id required</small>
          </div>
          <div v-if="!$v.form.email.email" class="text-danger">
            <small>Invalid email</small>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto set-container">
          <i class="fa-solid fa-key"></i>
          <label for="password" class="col-form-label mx-2">Password</label>
        </div>
        <div class="col-auto set-container">
          <input
            type="password"
            v-model="form.password"
            id="password"
            class="form-control"
            aria-describedby="passwordHelp"
            @blur="$v.form.password.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.password),
              'is-valid': shouldAppendValidClass($v.form.password),
            }"
          />
          <div
            class="text-danger"
            v-if="$v.form.password.$error && !$v.form.password.required"
          >
            <small>This field id required</small>
          </div>
          <div
            v-if="$v.form.password.$error && !$v.form.password.minLength"
            class="text-danger"
          >
            <small>The password must hava at least 8 charachters</small>
          </div>
          <div
            v-if="
              $v.form.password.$error && !$v.form.password.containsUppercase
            "
            class="text-danger"
          >
            <small>
              The password must have at least 1 uppercase charachter</small
            >
          </div>
          <div
            v-if="
              $v.form.password.$error && !$v.form.password.containsLowercase
            "
            class="text-danger"
          >
            <small
              >The password must have at least 1 lowercase charachter</small
            >
          </div>
          <div
            v-if="$v.form.password.$error && !$v.form.password.containsNumber"
            class="text-danger"
          >
            <small> The password must have at least 1 number</small>
          </div>
          <div
            v-if="$v.form.password.$error && !$v.form.password.containsSpecial"
            class="text-danger"
          >
            <small> The password must have at least 1 special character</small>
          </div>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary" name="login">
            Login
          </button>
        </div>
      </div>
      <div class="text-muted">
        <div>
          <small><strong>Not a user yet ?</strong></small>
        </div>
        <div>
          <strong><router-link to="/register"> sign in </router-link></strong>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import Vue from "vue";
export default {
  name: "AppLogin",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(8),
        containsUppercase: function (value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase: function (value) {
          return /[a-z]/.test(value);
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value);
        },
        containsSpecial: function (value) {
          return /[#?!@$%^&*-]/.test(value);
        },
      },
    },
  },
  methods: {
    login() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store
          .dispatch("login", this.form)
          .then(() => {
            if (this.$store.state.auth.role === "general") {
              this.$router.push({ name: "Dashboard" });
            } else if (this.$store.state.auth.role === "admin") {
              this.$router.push({ name: "Home" });
            }
          })
          .catch(() => {
            Vue.$toast.error("please check the details");
          });
      } else {
        Vue.$toast.error("invalid input values");
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
.container {
  box-sizing: border-box;
  background-color: azure;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  top: 200px;
  max-height: 800px;
}

form {
  position: relative;
  margin: 10% 20%;
}
.set-container {
  width: 100%;
}
</style>
