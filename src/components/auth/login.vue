<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="7">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>RENTAL MANAGEMENT SYSTEM</v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-bank</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-img
                  src="@/assets/logo.jpeg"
                ></v-img>
              </v-col>

              <v-col cols="12" md="6">
                Login here or create an account
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <v-text-field
                    label="Email"
                    v-model="user.email"
                    :rules="inputRules"
                    prepend-icon="mdi-account-outline"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="user.password"
                    :rules="inputRules"
                    autocomplete="on"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-form>
                <v-row no-gutters>
                  <v-btn
                    color="primary"
                    class="right"
                    @click="login"
                    :loading="loader"
                    >Login</v-btn
                  >
                </v-row>

                <v-row class="pt-3">
                  <!-- <v-btn color="primary" text small to="/reset/password"
                    >Forgot password? Reset</v-btn
                  > -->
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- start of snackbar -->
    <snackbar ref="snackbar"></snackbar>
    <!-- end of snackbar -->
  </v-container>
</template>


<script>
import AuthLayout from "@/layout/auth.vue";
export default {
  layout: AuthLayout,
  data: () => ({
    lazy: false,
    valid: false,
    loader: false,
    user: {},
    showPassword: false,
    inputRules: [(v) => !!v || "Required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    setUserData(user) {
      this.$store.commit("setUser", user);
    },
    login() {
      this.$router.push("/services");
      // if (this.$refs.form.validate()) {
      //   const url = "/users/login";
      //   const data = this.user;
      //   const self = this;
      //   self.loader = true;
      //   this.$store
      //     .dispatch("post", { url, data })
      //     .then((res) => {
      //       if (res.ResultCode == 1200) {
      //         self.loader = false;
      //         localStorage.clear();
      //         localStorage.setItem("token", res.token);
      //         localStorage.setItem("userRole", res.user.role);
      //         localStorage.setItem('userName', res.user.name);
      //         self.$router.push("/flowers");
      //       } else {
      //         self.loader = false;
      //         this.$refs.snackbar.show(res.msg, "red");
      //       }
      //     })
      //     .catch((err) => {
      //       this.$refs.snackbar.show(err, "red");
      //     });
      // }
    },
  },
};
</script>
