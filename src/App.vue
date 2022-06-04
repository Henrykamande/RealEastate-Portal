<template>
  <v-app id="inspire">
    <router-view></router-view>

    <loader></loader>
  </v-app>
</template>

<script>
import Loader from "./components/global/loader.vue";
export default {
  name: "App",
  components: { Loader },
  data: () => ({
    //
  }),
  methods: {
    async init() {
      // get data

      // show loader
    },
  },
  beforeCreate() {
    // this.$store.commit("loader", true);
  },
  mounted() {
    // this.$store.commit("loader", false);
  },
  created() {
    this.init();
  },
};
</script>
