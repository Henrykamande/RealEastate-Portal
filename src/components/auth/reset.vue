<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>EnviaNet</v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-bank</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-img
                  style="margin-top: 40px"
                  src="@/assets/envianet.png"
                ></v-img>
              </v-col>

              <v-col cols="12" md="6" align-self="center">
                Reset password
                <v-form>
                  <v-text-field
                    label="Enter Phone No."
                    name="phone"
                    type="text"
                  />
                </v-form>
                <v-row no-gutters>
                  <v-btn color="accent" to="/login">Login</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" class="right" @click="login"
                    >Reset</v-btn
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import AuthLayout from "@/layout/auth.vue";
export default {
  layout: AuthLayout,
  data: () => ({
    showPassword: false,
  }),
  methods: {
    login() {
      this.$router.push("/");
    },
  },
};
</script>
