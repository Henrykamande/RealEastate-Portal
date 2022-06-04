<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Profile</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-img
              style="
                margin-left: 100px;
                margin-top: 10px;
                width: 200px;
                height: 200px;
              "
              src="@/assets/avatar.png"
            ></v-img>
          </v-col>
          <v-col cols="8">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="name"
                  label="Name"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="phone"
                  label="Phone Number"
                  filled
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
               <v-col cols="6">
                <v-text-field
                  v-model="address"
                  label="Address"
                  filled
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
               <v-col cols="6">
                <v-text-field
                  v-model="location"
                  label="Location"
                  filled
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    name() {
      return localStorage.getItem("name");
    },
    email() {
      return localStorage.getItem("email");
    },
    phone() {
      return localStorage.getItem("phone");
    },
  },
  data() {
      return {
          location: null,
          address: null
      }
  },
};
</script>

<style lang="scss" scoped>
</style>