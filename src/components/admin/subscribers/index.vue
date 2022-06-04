<template>
  <admin-layout>
    <v-container fluid>
      <v-card>
        <v-toolbar color="secondary" flat>
          <v-toolbar-title>Subscribers List</v-toolbar-title>
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
              <v-data-table :headers="headers" :items="subscribers" :search="search"></v-data-table>
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
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Phone", value: "phone" },
      { text: "Email", value: "email" }
    ],
    subscribers: []
  }),
  methods: {
    getSubscribers() {
      const self = this;
      this.$store
        .dispatch("get", `/user/subscriber`)
        .then(res => {
          if (res.state) {
            self.subscribers = res.records;
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
    this.getSubscribers();
  }
};
</script>