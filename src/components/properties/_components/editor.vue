<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          label="Property Name"
          type="text"
          autocomplete="off"
          dense
          v-model="record.name"
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          label="Location"
          type="text"
          autocomplete="off"
          dense
          outlined
          v-model="record.Location"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          label="No. Rooms"
          type="number"
          autocomplete="off"
          dense
          outlined
          v-model="record.NoOfRooms"
        ></v-text-field>
      </v-col>
  
    </v-row>

    <v-row class="mb-2">
      <v-col cols="12">
        <v-btn color="accent" small v-show="action == 'create'" @click="sendData" :loading="loader">
          <v-icon left>mdi-content-save</v-icon>Save
        </v-btn>

        <v-btn class="float-right" color="primary" small v-show="action == 'view'" @click="sendData" :loading="loader">
          <v-icon left>mdi-content-save</v-icon>Update Property
        </v-btn>

        <v-btn  text color="accent" v-show="action == 'view'" @click.native="dialog = true">
          <v-icon left>mdi-plus</v-icon>Add Room
        </v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row v-show="action == 'view'">
      <v-col cols="12">
      
      </v-col>
      <v-col cols="12" style="background: #D3D3D3">

          <v-data-table :headers="headers" :items="record.rooms" :items-per-page="5" class="elevation-1">
               <!-- type template -->
               <template v-slot:item.status="{ item }">
                <span v-if="item.status == 'V'" style="color: red">Vacant</span>
                <span v-else style="color: blue">Occupied</span>
              </template>
             <!-- end of type template -->
        </v-data-table>
      
  
      </v-col>
    </v-row>


    <v-row>
      <v-dialog v-model="dialog" max-width="750px">
        <v-card>
          <v-toolbar dense color="accent" dark>
            <v-toolbar-title>Add Rooms</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-row dense class="subtitle-2 text--primary">
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Room No / Label" outlined dense v-model="roomItem.Label"></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <v-autocomplete
                    autocomplete="off"
                    hide-details
                    dense
                    outlined
                    v-model="roomItem.RoomType"
                    :items="roomTypes"
                    label="Room Type"
                    item-text="title"
                    item-value="title"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    type="number"
                    label="Monthly Rent"
                    outlined
                    dense
                    v-model="roomItem.MonthlyRent"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-autocomplete
                    autocomplete="off"
                    hide-details
                    dense
                    outlined
                    v-model="roomItem.Status"
                    :items="status"
                    label="Room Status"
                    item-text="title"
                    item-value="abbr"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    type="number"
                    label="Opening Water Reading"
                    outlined
                    dense
                    v-model="roomItem.OpeningWaterReading"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    type="number"
                    label="Opening Electricity Reading"
                    outlined
                    dense
                    v-model="roomItem.OpeningElectricityReading"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-checkbox
                    v-model="electricityBillable"
                    label="Electricity Billable "
                    color="red"
                    hide-details
                  ></v-checkbox>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-checkbox
                    v-model="waterBillable"
                    label="Water Billable"
                    color="red darken-3"
                    hide-details
                  ></v-checkbox>
                </v-col>

                <v-col cols="12">
                  <v-btn color="primary" @click="addRoom">Add Room</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
// import HtmlEditor from "@/components/global/html-editor.vue";
export default {
  computed: {
    ...mapGetters(["serverUrl"])
  },
  components: {
    // HtmlEditor,
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      rooms: [],
      electricityBillable: false,
      waterBillable: false,
      headers: [
        {
          text: "Room Number",
          align: "start",
          sortable: false,
          value: "Label"
        },
        { text: "Room Type", value: "RoomType" },
        { text: "Rent", value: "MonthlyRent" },
        { text: "Status", value: "status" },
        // { text: "Clear", value: "clear" }
      ],
      record: {},
      roomItem: {},
      roomTypes: [
        { title: "One Bedroom", abbr: "1B" },
        { title: "Two Bedroom", abbr: "2B" },
        { title: "Three Bedroom", abbr: "3B" },
        { title: "Bed Sitter", abbr: "CA" },
        { title: "Single Room", abbr: "NY" }
      ],
      status: [
        { title: "Occupied", abbr: "O" },
        { title: "Vacant", abbr: "V" }
      ],
      priceItem: {},
      volume: null,
      feature: null,
      roomNo: null,
      monthlyRent: null,
      features: [],
      dialog: false,
      offer: false,
      trending: false,
      clearance: false,
      sizes: [],
      pageStatus: "",
      loader: false,
      coverImage: null,
      images: [],
      imagesUrls: [],
      coverImageUrl: null,
      categories: [],
      countries: [],
      subcategories: [],
      brands: []
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
    deleteItem(pos) {
      this.rooms.splice(pos, 1);
    },
    addRoom() {
      let data = this.roomItem;
      data.property_id = this.record.id;
      data.ElectricityBillable = this.electricityBillable;
      data.WaterBillable = this.waterBillable;

      const url = "/room";
      const self = this;
      this.$store
        .dispatch("expressPost", { url, data })
        .then((res) => {
           if (res.ResultCode == 1200) {
           location.reload();
          } else {
            self.$refs.snackbar.show(res.msg, "red");
          } 
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
    sendData() {
      const data = this.record;
      this.$emit("data", data);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>