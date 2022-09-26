<template>
  <div class="container">
    <form @submit.prevent="register">
      <h2>Register</h2>
      <hr />
      <div class="row g-3 align-items-center">
        <div class="col-auto set-container">
          <i class="fa-solid fa-pencil"></i>
          <label for="user_name" class="col-form-label mx-2">Username</label>
        </div>
        <div class="col-auto set-container">
          <input
            type="text"
            id="user_name"
            v-model="form.name"
            class="form-control"
            aria-describedby="user_name"
            @blur="$v.form.name.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.name),
              'is-valid': shouldAppendValidClass($v.form.name),
            }"
          />
          <div
            class="text-danger"
            v-if="$v.form.name.$error && !$v.form.name.required"
          >
            <small> This field id required</small>
          </div>
        </div>

        <div class="col-auto set-container">
          <i class="fa-solid fa-user"></i>
          <label for="email" class="col-form-label mx-2">Email ID</label>
        </div>
        <div class="col-auto set-container">
          <input
            type="text"
            id="email"
            name="email"
            v-model="form.email"
            placeholder="user@fynd.com"
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
        <div class="col-auto set-container">
          <i class="fa-solid fa-lock"></i>
          <label for="cpassword" class="col-form-label mx-2"
            >Confirm Password</label
          >
        </div>
        <div class="col-auto set-container">
          <input
            type="password"
            v-model="form.cpassword"
            id="cpassword"
            class="form-control"
            aria-describedby="passwordHelp"
            @blur="$v.form.cpassword.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.cpassword),
              'is-valid': shouldAppendValidClass($v.form.cpassword),
            }"
          />
          <div
            class="text-danger"
            v-if="$v.form.cpassword.$error && !$v.form.cpassword.required"
          >
            <small> This field id required </small>
          </div>
          <div
            v-if="$v.form.cpassword.$error && !$v.form.cpassword.sameAs"
            class="text-danger"
          >
            <small>The password and confirm password must match</small>
          </div>
        </div>
        <div class="col-auto">
          <button
            type="submit"
            class="btn btn-primary"
            name="login"
            :disabled="$v.form.$invalid"
          >
            Register
          </button>
        </div>
      </div>
      <div class="text-muted">
        <div>
          <strong><router-link to="/">Go back to login </router-link></strong>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { register } from "@/services/auth";
import Vue from "vue";
export default {
  name: "AppRegister",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        cpassword: "",
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
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
      cpassword: {
        sameAs: sameAs(function () {
          return this.form.password;
        }),
        required,
      },
    },
  },
  methods: {
    async register() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        const session = {
          ...this.form,
        };

        try {
          const response = await register(session);
          if (response.status === 204) {
            Vue.$toast.success("user registered successfully");
            this.$router.push({ name: "login" });
          }
        } catch (error) {
          Vue.$toast.error("User already exists", {
            position: "top-left",
          });
        }
      } else {
        Vue.$toast.error("invalid input", {
          position: "top-left",
        });
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
  top: 100px;
  min-height: 750px;
  min-width: 60%;
}

form {
  position: relative;
  margin-top: 45px;
  margin-right: 20%;
  margin-left: 20%;
  margin-bottom: 30px;
}
.set-container {
  width: 100%;
}
</style>