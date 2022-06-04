<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>SEO Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/seo"><v-icon left>mdi-arrow-left</v-icon>Back</v-btn>
      </v-toolbar>
      <v-card-text>
        {{ dataItem.url }}
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
      dataItem: {},
    };
  },
  watch: {
    "$route.params.url": {
      handler: "singlePage",
      immediate: true,
    },
  },
  methods: {
    singlePage(val) {
      console.log(val, "page url");
      const self = this;
      this.$store
        .dispatch("get", `/seo/${val}`)
        .then((res) => {
          console.log(res, "seo res");
          if (res.state) {
            self.dataItem = res.record;
          } else {
            this.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
    save(data) {
      const url = `/seo/edit/${this.dataItem._id}`;
      const self = this;
      this.$store
        .dispatch("expressPut", { url, data })
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
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>