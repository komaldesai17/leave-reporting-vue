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
          />
        </div>

        <div class="col-auto set-container">
          <i class="fa-solid fa-user"></i>
          <label for="user_id" class="col-form-label mx-2">Email ID</label>
        </div>
        <div class="col-auto set-container">
          <input
            type="text"
            id="user_id"
            v-model="form.email"
            class="form-control"
            aria-describedby="user_id"
          />
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
          />
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
          />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary" name="login">
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
import { register } from "@/services/auth";
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
  methods: {
    async register() {
      console.log(this.form);
      const response = await register(this.form);
      console.log(response);
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
  max-height: 750px;
}

form {
  position: relative;
  margin: 10% 20%;
}
.set-container {
  width: 100%;
}
</style>