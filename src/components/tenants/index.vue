<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Tenants</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-btn color="accent" text to="/new/tenant"
              ><v-icon>mdi-plus</v-icon>Tenant</v-btn
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-data-table
              :items-per-page="2000"
              :headers="headers"
              :items="tenants"
              :search="search"
            >
             
            </v-data-table>
          </v-col>
        </v-row>

       
      </v-card-text>
    </v-card>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["serverUrl"]),
  },
  data() {
    return {
      search: "",
      tenants: [],
      headers: [
        { text: "Name", value: "Name" },
        { text: "Id No", value: "IdNo" },
        { text: "Phone No", value: "PhoneNo" },
        { text: "Nok Phone", value: "KinTelNo" },
        { text: "Email", value: "Email" },
        { text: "Room", value: "RoomNo" },
      ],
    };
  },
  methods: {
    getData() {
      const url = "/tenant";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.ResultCode == 1200) {
            self.tenants = res.ResponseData;
          }
        })
        .catch((err) => {
          console.log(err, "error");
          this.$refs.snackbar.show(err, "red");
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
</style>