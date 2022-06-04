<template>
    <v-container fluid>
      <v-card>
        <v-toolbar color="secondary" flat>
          <v-toolbar-title>Authorization</v-toolbar-title>
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
            <v-col cols="12" sm="3" md="3">
              <!-- start of table -->
              <v-data-table :items-per-page="pageItems" :headers="headers" :items="users" :search="search"></v-data-table>
              <!-- end -->
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    pageItems: 100,
    headers: [
      { text: "Name", value: "Name" }
    ],
    users: []
  }),
    methods: {
    getDebtors() {
      const self = this;
       this.$store
        .dispatch("get", `/debtors`)
        .then(res => {
        if (res.ResultCode == 1200) {
           self.debtors = res.ResponseData;
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
    // this.getCreditors();
  }
};
</script>