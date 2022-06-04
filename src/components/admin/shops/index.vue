<template>
  <admin-layout>
    <v-container fluid>
      <v-card>
        <v-toolbar color="secondary" flat>
          <v-toolbar-title>All Shops</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12" md="12">
              <!-- start of table -->
              <v-data-table :headers="headers" :items="shops" :search="search"></v-data-table>
              <!-- end -->
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </admin-layout>
</template>

<script>
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Shop Name", value: "name" },
      { text: "Location", value: "location" }
    ],
    shops: []
  }),
  methods: {
    getShops() {
      const self = this;
       this.$store
        .dispatch("get", `/store/shop`)
        .then(res => {
          if (res.state) {
           self.shops = res.records;
          } else {
            this.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch(err => {
          this.$refs.snackbar.show(err, "red");
        });
    }
  },
  created() {
    this.getShops();
  }
};
</script>