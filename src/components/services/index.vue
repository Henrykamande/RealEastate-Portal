<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Billable Utilities </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-btn color="accent" text to="/new/service"><v-icon>mdi-plus</v-icon>Utility</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <!-- start of col -->
          <v-col cols="4" v-for="billableItem in billAbleItems" v-bind:key="billableItem._id">
            <v-card class="mx-auto" :to="`/service/details/${billableItem.url}`">
              <v-img
                :src="`${serverUrl}/uploads/services/${billableItem.coverImage}`"
                height="200px"
                style="max-height: 200px"
              ></v-img>

              <v-card-title> {{billableItem.Name}} </v-card-title>

              <v-card-subtitle> {{billableItem.pricePerUnit}} </v-card-subtitle>

              <v-card-actions> 
                <v-btn color="accent" text :to="`/service/details/${billableItem.url}`">More Details</v-btn>
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
     billAbleItems: [],
    }
  },
  methods: {
     getData() {
      const url = "/billable-items";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if(res.ResultCode == 1200) {
            console.log(res.ResponseData)
           self.billAbleItems = res.ResponseData;
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