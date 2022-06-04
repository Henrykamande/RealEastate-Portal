<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Sections</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
          <v-col cols="6">
             <h2> {{page}} - page</h2>
             </v-col>
            <v-col cols="6">
            <v-btn text color="accent" @click="openModal">
              <v-icon left>mdi-plus</v-icon>New Section
            </v-btn> 
            </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-data-table :headers="headers" :items="pago">

               <template v-slot:[`item.section`]="{ item }">
            <v-btn color="accent" text :to="`/modelo?url=${item._id}`">
              {{item.section}}
            </v-btn>
            </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-row>
          <v-dialog v-model="dialog" max-width="750px">
            <v-card>
              <v-toolbar dense color="toolbarColor" dark>
                <v-toolbar-title>Create Section</v-toolbar-title>
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
                      <v-text-field label="Color" outlined dense v-model="color"></v-text-field>
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
      pago: [],
      page: '',
      color: '',
      headers: [
        { text: "Name", value: "section" },
        { text: "Page", value: "page" },
        { text: "Color", value: "color" }
      ],
    };
  },
  methods: {
    openModal() {
      this.dialog = true;
    },
    save() {
      const data = {
        section: this.name,
        page: this.page,
        color: this.color
      };
        
      const url = "/sections";
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
      const url = `/sections?page=${this.$route.query.url}`;
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.state) {
            self.pago = res.records;
            // console.log(">>>>>>>>>>>>asdfgg", self.pago)
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
    console.log(">>>>>>>>>>>>asdfgg", this.$route.query.url)
    this.page = this.$route.query.url
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
</style>