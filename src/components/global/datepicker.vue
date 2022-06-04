<template>
  <v-menu
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
      outlined
      dense
        v-model="date"
        :label="title"
        prepend-icon="mdi-calendar-month"
        v-on="on"
        readonly
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
  </v-menu>
</template>


<script>
export default {
  props: {
    myDate: {
      type: String
    },
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    date: null,
    menu2: false
  }),
  watch: {
    date: {
      handler: 'dateChanged',
      immediate: true
    },
    myDate: {
        handler: "setDate",
        immediate: true
    }
  },
  methods: {
    dateChanged() {
      this.$emit("date", this.date);
    },
    setDate(val) {
      this.date = val;
    }
  }
};
</script>
