<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Locations</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-btn text color="accent" @click="openModal">
              <v-icon left>mdi-plus</v-icon>New Location
            </v-btn>
            <v-data-table :headers="headers" :items="locations">
            </v-data-table>
          </v-col>
        </v-row>

        <v-row>
          <v-dialog v-model="dialog" max-width="750px">
            <v-card>
              <v-toolbar dense color="toolbarColor" dark>
                <v-toolbar-title>Create Location</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-container fluid>
                  <v-row class="subtitle-2 text--primary">
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-text-field label="Name" outlined dense v-model="name"></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-text-field label="town" outlined dense v-model="town"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-btn color="accent" @click="save" :loading="loader">
                        <v-icon left>mdi-content-save</v-icon>Save
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>

        <!-- snackbar -->
        <snackbar ref="snackbar"></snackbar>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    url() {
      return this.name.toString().toLowerCase().split(" ").join("-");
    },
  },
  data() {
    return {
      dialog: false,
      loader: false,
      name: "",
      record: {},
      locations: [],
      headers: [
        { text: "Name", value: "name" }
      ],
    };
  },
  methods: {
    openModal() {
      this.dialog = true;
    },
    save() {
      const data = {
        name: this.name,
        town: this.town,
      };
        
      const url = "/location";
      this.loader = true;
      this.$store
        .dispatch("expressPost", { url, data })
        .then((res) => {
          if (res.state) {
            location.reload();
          } else {
            self.$refs.snackbar.show(res.msg, "red");
          }
        })
        .finally(() => {
          location.reload();
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
    getData() {
      const url = "/location";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.state) {
            self.locations = res.records;
          } else {
            self.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
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