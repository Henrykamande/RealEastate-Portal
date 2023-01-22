<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Properties</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-btn color="accent" text to="/new/package">
              <v-icon>mdi-plus</v-icon>Property
            </v-btn>
            <v-text-field v-model="search" label="Search"></v-text-field>
          </v-col>
          <!-- start of col -->
          <v-col cols="12">

            <v-data-table
              :items-per-page="2000"
              :headers="headers"
              :items="products"
              :search="search"
            >
              <!-- name template -->
              <template v-slot:item.name="{ item }">
                <v-btn
                  color="primary"
                  text
                  :to="`/property/details/${item.url}`"
                >
                  {{ item.name }}
                </v-btn>
              </template>
              <!-- end -->

              <!-- action template -->
              <template v-slot:item.action="{ item }">
                <v-btn
                  color="editIcon"
                  text
                  :to="`/property/details/${item.url}`"
                  icon
                  ><v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <!-- end -->

              <template v-slot:item.delete="{ item }">
                <v-btn color="red" text @click="openDeleteDialog(item)" icon
                  ><v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
          <!-- end of col -->
        </v-row>

        <!-- start of dialog -->
        <v-dialog v-model="deleteDialog" max-width="650px">
          <v-card>
            <v-toolbar dense color="accent" dark>
              <v-toolbar-title>Delete Product</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="deleteDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-container fluid>
                <v-row dense class="subtitle-2 text--primary">
                  <v-col cols="12" sm="12" md="12">
                    <span>
                      Are you sure you want to delete the following product
                      ?</span
                    >
                  </v-col>

                  <v-col cols="12" sm="12" md="6">
                    <span style="color: red"> {{ deleteItem.name }}</span>
                  </v-col>

                  <v-col cols="12" sm="12" md="6">
                    <span style="color: red">url: {{ deleteItem.url }}</span>
                  </v-col>

                  <v-col cols="12">
                    <v-btn
                      color="red"
                      dark
                      :loading="loader"
                      @click="deleteProduct"
                      >Yes</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- end of dialog -->
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
      search: null,
      deleteDialog: false,
      deleteItem: {},
      products: [
    
      ],
      loader: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Location", value: "Location" },
        { text: "No of Roms", value: "NoOfRooms" },
        /* { text: "Vaccant Roms", value: "vaccant" },
         { text: "Action", value: "action" },
        { text: "Delete", value: "delete" }, */
      ],
    };
  },
  methods: {
    getData() {
      const url = "/property";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          console.log(res, "packages");
          if (res) {
            self.products = res;

          }
        })
        .catch((err) => {
          console.log(err, "error");
          this.$refs.snackbar.show(err, "red");
        });
    },
    openDeleteDialog(item) {
      this.deleteItem = item;
      this.deleteDialog = true;
    },
    deleteProduct() {
      const url = `/packages/${this.deleteItem._id}`;
      this.loader = true;
      this.$store
        .dispatch("remove", url)
        .then((res) => {
          if (res.state) {
            this.loader = false;
            location.reload();
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