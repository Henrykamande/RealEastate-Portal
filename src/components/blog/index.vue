<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Blog</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-btn color="accent" text to="/new/blog"><v-icon>mdi-plus</v-icon>Article</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <!-- start of col -->
          <v-col cols="4" v-for="blog in blogs" v-bind:key="blog._id">
            <v-card class="mx-auto" :to="`/blog/details/${blog.url}`">
              <v-img
                :src="`${serverUrl}/uploads/blog/${blog.coverImage}`"
                height="200px"
                style="max-height: 200px"
              ></v-img>

              <v-card-title> {{blog.title}} </v-card-title>

              <v-card-subtitle> {{blog.size}} </v-card-subtitle>

              <v-card-actions> 
                <v-btn color="accent" text :to="`/blog/details/${blog.url}`">More Details</v-btn>
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
     blogs: [],
    }
  },
  methods: {
     getData() {
      const url = "/blog";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          console.log(res, 'all blog res');
          if(res.state) {
           self.blogs = res.records;
          }
        })
        .catch((err) => {
          console.log(err, 'error')
          this.$refs.snackbar.show(err, "red");
        });
    },
  },
  created () {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
</style>