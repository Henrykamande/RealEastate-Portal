<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Vehicle Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/vehicles"
          ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
        >
      </v-toolbar>
      <v-card-text>
        <editor @data="save" :action="action" :initial="dataItem"></editor>
      </v-card-text>
    </v-card>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import Editor from "../_components/editor";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      action: "view",
      url: null,
      dataItem: {}
    };
  },
  watch: {
    "$route.params.url": {
      handler: "setUrl",
      immediate: true,
    },
  },
  methods: {
    setUrl(val) {
      this.url = val;
    },
     save(data) {
      const url = `/vehicles/${this.dataItem._id}`;
      const self = this;
      this.$store
        .dispatch("expressPut", { url, data })
        .then((res) => {
          if(res.state) {
           location.reload();
          } else {
            self.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
    getData() {
      const url = `/vehicles/${this.url}`;
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.state) {
            self.dataItem = res.record;
          } else {
            self.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
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