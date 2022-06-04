<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Search Engine Optimization</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/pages">Pages</v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-btn color="accent" text to="/seo/create">
              <v-icon>mdi-plus</v-icon> New
            </v-btn>
            <v-text-field v-model="search" label="Search"></v-text-field>
          </v-col>

          <!-- start of listing -->
          <v-col cols="12">
            <v-data-table
              :items-per-page="2000"
              :headers="headers"
              :items="seoData"
              :search="search"
            >
              <!-- action template -->
              <template v-slot:item.url="{ item }">
                <v-btn color="primary" text :to="`/seo/details/${item._id}`"
                  >{{ item.url }}
                </v-btn>
              </template>
              <!-- end -->

              <!-- action template -->
              <template v-slot:item.view="{ item }">
                <v-btn
                  color="editIcon"
                  text
                  :to="`/seo/details/${item._id}`"
                  icon
                  ><v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <!-- end -->

              <!-- delete template -->
              <template v-slot:item.delete="{ item }">
                <v-btn color="red" icon><v-icon>mdi-delete</v-icon> </v-btn>
              </template>
              <!-- end -->
            </v-data-table>
          </v-col>
          <!-- end of col -->
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
      search: null,
      seoData: [],
      headers: [
        { text: "Page", value: "url" },
        { text: "Heading", value: "h1" },
        { text: "View", value: "view" },
        { text: "Delete", value: "delete" },
      ],
    };
  },
  methods: {
    getData() {
      const url = "/seo";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.state) {
            self.seoData = res.records;
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