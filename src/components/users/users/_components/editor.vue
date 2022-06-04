<template>
    <v-row dense>
      <v-col cols="3">
        <v-text-field
          outlined
          dense
          label="Name"
          v-model="record.name"
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-text-field
          outlined
          dense
          label="Email"
          v-model="record.email"
        ></v-text-field>
      </v-col>

       <v-col cols="3">
        <v-text-field
          outlined
          dense
          label="Phone"
          v-model="record.phone"
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-autocomplete
          hide-details
          dense
          outlined
          v-model="record.role"
          :items="roles"
          label="Role"
          item-text="name"
          item-value="role"
        ></v-autocomplete>
      </v-col>

      <v-col cols="3">
        <v-text-field
          outlined
          dense
          label="Password"
          v-model="record.password"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn v-if="docCreate == true" color="accent" @click="sendData" :loading="loader">
          <v-icon left>mdi-content-save</v-icon>Save
        </v-btn>

        <v-btn v-else color="accent" @click="sendData">
          <v-icon left>mdi-content-save</v-icon>Update
        </v-btn>
      </v-col>
    </v-row>
</template>


<script>
export default {
  name: "SuppliersIndex",
  props: {
    initial: {
      type: Object,
      required: true,
    },
    docCreate: {
      type: Boolean,
    },
  },
  data: () => ({
    record: {},
    loader: false,
    stores: [],
    storesArray: [],
    date: new Date().toISOString().substr(0, 10),
    roles: [
      { name: "Admin", role: 2 }
    ],
  }),
  watch: {
    initial: {
      handler: "init",
      immediate: true,
    },
  },
  methods: {
    init(val) {
      this.record = { ...val };
    },
    setDate(date) {
      this.record.date = date;
    },
    sendData() {
      this.loader = true;
      this.$emit("data", this.record);
    }
  },
  created() {
  },
};
</script>