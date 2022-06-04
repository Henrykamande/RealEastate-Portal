<template>
  <v-app id="inspire">
    <!-- navigation -->
    <navigation></navigation>
    <!-- end of navigation -->

    <v-main>
        <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./_components/main-nav.vue";

export default {
  components: {
    Navigation
  },
  props: {
    source: String
  },
  data: () => ({
    dialog: false
  })
};
</script>