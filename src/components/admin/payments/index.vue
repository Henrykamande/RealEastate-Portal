<template>
  <admin-layout>
    <v-container fluid>
      <v-card>
        <v-toolbar color="secondary" flat>
          <v-toolbar-title>Payment Records</v-toolbar-title>
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
              <v-data-table :headers="headers" :items="payments" :search="search"></v-data-table>
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
    payments: [
      {firstName: 'Kenneth', 
      lastName: "Kibet", 
      shop: "Ken Shop", 
      amount: "1000", 
      paymentMode: "Mpesa",
      date: "2020-02-30"}
    ],
    headers: [
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Shop", value: "shop" },
      { text: "Amount", value: "amount" },
      { text: "Payment Method", value: "paymentMode" },
      { text: "Date", value: "date" }
    ],
    accounts: []
  })
};
</script>