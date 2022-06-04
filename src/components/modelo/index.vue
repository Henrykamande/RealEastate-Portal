<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Model</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-col cols="12">
            <v-row>
          <v-col cols="4">
             <h2> {{section.page}} - page</h2>
             </v-col>
          <v-col cols="4">
             <h2>Section: {{section.section}} </h2>
             </v-col>
            <v-col cols="4">
            <v-btn text color="accent" :to="`/new/modelo?url=${section._id}`">
              <v-icon left>mdi-plus</v-icon>New Widget
            </v-btn> 
            </v-col>
            </v-row>
          </v-col>
        <!-- <v-row>
          <v-col cols="12">
            <v-btn color="accent" text to="/new/modelo"><v-icon>mdi-plus</v-icon>Article</v-btn>
          </v-col>
        </v-row> -->

        <v-row>
          <!-- start of col -->
          <v-col cols="4" v-for="modelo in modelos" v-bind:key="modelo._id">
            <v-card class="mx-auto" :to="`/modelo/details/${modelo._id}?url=${section._id}`">
              <v-img
                :src="`${serverUrl}/uploads/modelo/${modelo.coverImage}`"
                height="200px"
                style="max-height: 200px"
              ></v-img>

              <v-card-title> {{modelo.h1}} </v-card-title>

              <v-card-subtitle> {{modelo.h2}} </v-card-subtitle>

              <v-card-actions> 
                <v-btn color="accent" text :to="`/modelo/details/${modelo._id}?url=${section._id}`">More Details</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="deleteItem(modelo._id)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- end of col -->
        </v-row>
      </v-card-text>
    </v-card>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import  { mapGetters }  from 'vuex';
export default {
  computed: {
    ...mapGetters(['serverUrl'])
  },
  data() {
    return {
     section: {},
     modelos: []
    }
  },
  methods: {
    getData() {
      const self = this;
      this.$store
        .dispatch("get", `/sections/${self.$route.query.url}`)
        .then((res) => {
          if (res.state) {
            self.section = res.record;
            self.getData1(self.section) 
            // console.log(">>>>>>>>>>>", self.section)
          } else {
            self.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
    deleteItem(id) {
      const self = this;
      this.$store
        .dispatch("remove", `/modelo/${id}`)
        .then((res) => {
          if (res.state) {
            self.$router.push(`/modelo?url=${self.$route.query.url}`);
          } else {
            self.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
    getData1(sec) {
      const url = `/modelo?page=${sec.page}&section=${sec.section}`;
      const self = this;
      this.$store
        .dispatch("get", url)
        .then((res) => {
          if (res.state) {
            self.modelos = res.records;
          }
        })
        .catch((err) => {
          console.log(err, "error");
          this.$refs.snackbar.show(err, "red");
        });
    },
  },
  created () {
    this.getData()
  },
};
</script>

<style lang="scss" scoped>
</style>