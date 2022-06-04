<template>
    <v-container fluid>
      <v-card>
        <v-toolbar color="secondary" flat>
          <v-toolbar-title>New User</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" small text to="/users">
            <v-icon left dark>mdi-keyboard-backspace</v-icon>Back
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <!-- editor -->
            <editor :docCreate="docCreate" :initial="dataItem" @data="save"></editor>
          <!-- end -->
        </v-card-text>
      </v-card>

      <!-- snackbar -->
      <snackbar ref="snackbar"></snackbar>
    </v-container>
</template>

<script>
import Editor from '../_components/editor.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    Editor
  },
  computed: {
    ...mapGetters(['user'])
  },
  data: () => ({
    dataItem: {},
    docCreate: true
  }),
  methods: {
     save(data) {
      const url = "/users";
      const self = this;
      this.$store
        .dispatch("expressPost", { url, data })
        .then(res => {
          if (res.ResultCode == 1200) {
            self.$router.push('/users');
          } else {
            this.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch(err => {
          this.$refs.snackbar.show(err, "red");
        });
    }
  }
};
</script>