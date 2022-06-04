<template>
  <v-menu
    ref="menu"
    v-model="menu3"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="title"
        prepend-icon="mdi-alarm"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker v-if="menu3" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    timing: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      menu3: false,
      time: null,
      activeId: null,
      activeTiming: null
    };
  },
  watch: {
    time: {
      handler: "timeChanged",
      immediate: true,
    },
    id: {
      handler: "setId",
      immediate: true,
    },
    timing: {
      handler: "setTiming",
      immediate: true,
    },
  },
  methods: {
    timeChanged() {
      const self = this;
      const data = {
        id: self.activeId,
        time: self.time,
        timing: self.timing
      };
      if(self.time!== null) {
          this.$emit("time", data);
      }
    },
    setId(val) {
      this.activeId = val;
    },
    setTiming(val) {
      this.activeTiming = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>