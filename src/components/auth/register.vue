<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="9">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>EnviaNet</v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-bank</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-img
                  style="margin-top: 40px"
                  src="@/assets/envianet.png"
                ></v-img>
              </v-col>

              <v-col cols="12" md="8">
                Create An Account
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="user.name"
                        :rules="inputRules"
                        label="Name"
                        name="name"
                        type="text"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        v-model="user.email"
                        :rules="emailRules"
                        label="Email"
                        name="email"
                        type="text"
                      />
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        v-model="user.phone"
                        label="Phone"
                        name="phone"
                        type="text"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        label="Password"
                        name="password"
                        v-model="user.password"
                        autocomplete="on"
                        prepend-icon="mdi-lock"
                        :rules="passwordRules"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                      />
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        label="Confirm Password"
                        name="confirmPassword"
                        v-model="confirmPassword"
                        autocomplete="on"
                        prepend-icon="mdi-lock"
                        :rules="passwordRules"
                        :append-icon="
                          showPasswordTwo ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="showPasswordTwo ? 'text' : 'password'"
                        @click:append="showPasswordTwo = !showPasswordTwo"
                      />
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-btn
                      color="primary"
                      :loading="loader"
                      class="right"
                      @click="register"
                      >Register</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn color="accent" to="/login" text> Login</v-btn>
                  </v-row>
                </v-form>
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
    valid: false,
    lazy: false,
    loader: false,
    user: {},
    confirmPassword: null,
    inputRules: [(v) => !!v || "Required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Required",
      (v) =>
        (v && v.length >= 5) || "Password must be greater than 4 characters",
    ],
    showPassword: false,
    showPasswordTwo: false,
  }),
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        if (this.user.password !== this.confirmPassword) {
          this.$refs.snackbar.show("Password mismatch!", "red");
        } else {
          const url = "/register";
          const self = this;
          this.loader = true;
          const data = this.user;
          this.$store
            .dispatch("post", { url, data })
            .then((res) => {
              self.loader = false;
              if (res.ResultCode == 1200) {
                this.$refs.snackbar.show("Registration successful", "blue");
                this.user = {};
                this.confirmPassword = null;
                this.valid = true;
              } else {
                this.$refs.snackbar.show(res.ResultDesc, "red");
              }
            })
            .catch((err) => {
              this.$refs.snackbar.show(err, "red");
            });
        }
      }
    },
  },
};
</script>
