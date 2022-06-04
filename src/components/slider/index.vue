<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Slider Images Manager</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-btn color="accent" text :to="`/new-slider`">
              <v-icon>mdi-plus</v-icon>New Slider
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" v-for="slider in sliders" v-bind:key="slider._id">
            <v-card class="mx-auto">
              <v-img
                :src="`${serverUrl}/uploads/slider/${slider.coverImage}`"
                style="background-size: contain"
              ></v-img>

              <v-card-title>{{slider.title}}</v-card-title>

              <v-card-actions>
                <v-btn color="accent" text :to="`/slider/details/${slider.url}`">More Details</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="openModal(slider)">
                  <v-icon color="red" left>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-dialog v-model="dialog" max-width="650px">
            <v-card>
              <v-toolbar dense color="primary" dark>
                <v-toolbar-title>Delete Slider</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="dialog = false" dark>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-row class="subtitle-2 text--primary">
                  <v-col cols="12"></v-col>
                  <v-col cols="12">
                    Are you sure you want to delete this slider -
                    <span
                      v-if="activeSlider"
                      style="color:red"
                    >{{activeSlider.title}}</span> ?
                  </v-col>

                  <v-col cols="12">
                    <v-btn @click="deleteSlider" color="red" dark :loading="loader">Yes</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card-text>
    </v-card>
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
      sliders: [],
      loader: false,
      activeSlider: {},
      dialog: false,
    };
  },
  methods: {
    openModal(data) {
      this.activeSlider = Object.assign({}, data);
      this.dialog = true;
    },
    deleteSlider() {
      const url = `/slider/${this.activeSlider._id}`;
      const self = this;
      this.loader = true;
      this.$store
        .dispatch("expressRemove", url)
        .then((res) => {
          if (res.state) {
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
      const url = `/slider`;
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.state) {
            self.sliders = res.records;
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