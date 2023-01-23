<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="secondary" flat>
        <v-toolbar-title>Users</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-btn color="accent" small to="/new-user">
            <v-icon left dark>mdi-plus</v-icon>New User
          </v-btn>
        </v-row>

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
            <v-data-table
              :items-per-page="pageItems"
              :headers="headers"
              :items="users"
              :search="search"
            >
              <template v-slot:item.role="{ item }">
                <span v-if="item.role == 1">Cashier</span>
                <span v-if="item.role == 2">Admin</span>
              </template>
            </v-data-table>
            <!-- end -->
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- snackbar -->
    <snackbar ref="snackbar"></snackbar>
    
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    pageItems: 100,
    headers: [
      { text: "Name", value: "name" },
      { text: "Phone Number", value: "phone" },
      { text: "Email Address", value: "email" },
      { text: "Role", value: "role" },
    ],
    users: [],
  }),
  methods: {
    getUsers() {
      const self = this;
      this.$store
        .dispatch("expressGet", `/users`)
        .then((res) => {
          console.log(res, 'res')
          if (res.ResultCode == 1200) {
            self.users = res.ResponseData;
          } else {
            this.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>