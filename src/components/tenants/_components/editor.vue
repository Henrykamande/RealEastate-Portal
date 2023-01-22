<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field label="Tenant Name" autocomplete="off" outlined dense v-model="record.Name"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field label="Id No." autocomplete="off" outlined dense v-model="record.IdNo"></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field label="Email" autocomplete="off" outlined dense v-model="record.Email"></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field label="Phone No." autocomplete="off" outlined dense v-model="record.PhoneNo"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Next of Kin Tel No."
          autocomplete="off"
          outlined
          dense
          v-model="record.KinTelNo"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field label="Opening Water Reading" outlined dense v-model="record.OpeningWaterReading"></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field label="Opening Electricity Reading" outlined dense v-model="record.OpeningElectricityReading"></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-autocomplete
          autocomplete="off"
          hide-details
          dense
          outlined
          v-model="record.RoomNo"
          :items="rooms"
          label="Assign Room"
          item-text="Label"
          item-value="id"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12">
        <v-textarea outlined label="Room Condition / More Details" v-model="record.RoomCondition" rows="3"></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn color="accent" v-show="action == 'create'" @click="sendData" :loading="loader">
          <v-icon left>mdi-content-save</v-icon>Save
        </v-btn>

        <v-btn color="accent" v-show="action == 'view'" @click="sendData" :loading="loader">
          <v-icon left>mdi-content-save</v-icon>Update
        </v-btn>
      </v-col>
    </v-row>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["serverUrl"])
  },
  components: {

  },
  props: {
    action: {
      type: String
    },
    initial: {
      type: Object
    }
  },
  data() {
    return {
      rooms: [],
      record: {},
      loader: false,
    };
  },
  watch: {
    action: {
      handler: "setAction",
      immediate: true
    },
    initial: {
      handler: "setInitial",
      immediate: true
    }
  },
  methods: {
    setAction(val) {
      this.pageStatus = val;
    },
    setInitial(val) {
      this.record = { ...val };
    },
    sendData() {
      const data = this.record;
      this.$emit("data", data);
    },
    getData() {
      const url = "/room";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.ResultCode == 1200) {
            self.rooms = res.ResponseData;
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
</style>