<template>
  <div class="container">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <hr />
      <div class="row g-3 align-items-center">
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
        <!--
      <div class="col-auto hidden">
        <span id="passwordHelpInline" class="form-text">
          Must be 8-20 characters long.
        </span>
      </div>-->
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
  methods: {
    login() {
      this.$store
        .dispatch("login", this.form)
        .then(() => {
          if (this.$store.state.auth.role === "general") {
            this.$router.push({ name: "Dashboard" });
          } else if (this.$store.state.auth.role === "admin") {
            this.$router.push({ name: "Home" });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
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
