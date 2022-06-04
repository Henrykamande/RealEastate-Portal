<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>New Slider</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/slider"
          ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
        >
      </v-toolbar>
      <v-card-text>
        <editor @data="save" :action="action"></editor>
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
      action: 'create'
    };
  },
  methods: {
    save(data) {
      const url = "/slider";
      const self = this;
      this.$store
        .dispatch("expressPost", { url, data })
        .then((res) => {
          if(res.state) {
            self.$router.push(`/slider`);
          }else{
            self.$refs.snackbar.show(res.msg, "red");
          }
        }).finally(()=> {
          location.reload();
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>