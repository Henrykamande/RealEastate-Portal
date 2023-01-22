<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="Property Name"
          type="text"
          autocomplete="off"
          dense
          v-model="record.Name"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          label="Location"
          type="text"
          autocomplete="off"
          dense
          v-model="record.Location"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          label="No. Rooms"
          type="text"
          autocomplete="off"
          dense
          v-model="record.NoOfRooms"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
         <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="record.RentDueDate"
            label="Rent Date Due"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="record.RentDueDate"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
      
      </v-col>
      <v-col cols="12">
        <v-btn text color="accent" @click.native="dialog = true">
          <v-icon left>mdi-plus</v-icon> Add Rooms
        </v-btn>
 <v-data-table
    :headers="headers"
    :items="rooms"
    :items-per-page="5"
    class="elevation-1"
  >
 <template v-slot:[`item.clear`]="{item}">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
</v-data-table>
       <!--  <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Title</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in features" :key="index">
                <td>{{ item.name }}</td>
                <td>
                  <v-btn icon @click="deleteItem(index)">
                    <v-icon color="red">mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table> -->
      </v-col>
    </v-row>
   
    <v-divider></v-divider>

    <v-row>
      <!-- <v-col cols="12" md="12">
        <v-text-fieldfield
          label="Meta Title"
          type="text"
          autocomplete="off"
          dense
          v-model="record.meta_title"
        ></v-text-fieldfield>
      </v-col> -->

     <!--  <v-col cols="12" md="12">
        <v-textarea
          label="Meta Description"
          type="text"
          autocomplete="off"
          dense
          v-model="record.meta_desc"
        ></v-textarea>
      </v-col> -->

      <!-- <v-col cols="12">
        <html-editor ref="footer_content"></html-editor>
      </v-col> -->
    </v-row>

    <v-row style="margin-top: 70px">
      <v-col cols="12">
        <v-btn
          color="accent"
          v-show="action == 'create'"
          @click="sendData"
          :loading="loader"
        >
          <v-icon left>mdi-content-save</v-icon>Save
        </v-btn>

        <v-btn
          color="accent"
          v-show="action == 'view'"
          @click="sendData"
          :loading="loader"
        >
          <v-icon left>mdi-content-save</v-icon>Update
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-dialog v-model="dialog" max-width="650px">
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

                  <v-select
          v-model="select"
          :hint="`${select.state}, ${select.abbr}`"
          :items="items"
          item-text="state"
          item-value="abbr"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
                 

                  <v-text-field
                    label="Room No."
                    outlined
                    dense
                    v-model="roomNo"
                  ></v-text-field>

                  <v-text-field
                    label="Monthly Rent"
                    outlined
                    dense
                    v-model="monthlyRent"
                  ></v-text-field>
                </v-col>
                <v-col
            cols="12"
            sm="4"
            md="4"
          >
                     <v-select
          v-model="roomStatus"
          :hint="`${roomStatus.state}, ${roomStatus.abbr}`"
          :items="status"
          item-text="state"
          item-value="abbr"
          label="status"
          persistent-hint
          return-object
          single-line
        ></v-select>
            <v-checkbox
              v-model="IselectricityBillable"
              label="Electricity Billable "
              color="red"
              value="true"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="IswaterBillable"
              label="Water Billable"
              color="red darken-3"
              value=true
              hide-details
            ></v-checkbox>
          </v-col>

                <v-col cols="12">
                  <v-btn color="primary" @click="addRooms">Add</v-btn>
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
    ...mapGetters(["serverUrl"]),
  },
  components: {
    // HtmlEditor,
  },
  props: {
    action: {
      type: String,
    },
    initial: {
      type: Object,
    },
  },
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
    modal: false,
      menu2: false,
      rooms:[],
      IselectricityBillable:false,
      IswaterBillable:false,
      headers: [
          {
            text: 'Room Number',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Rom Type', value: 'roomType' },
          { text: 'Rent', value: 'rent' },
          { text: 'Status', value: 'status' },
          { text: 'Clear', value: 'clear' },

          
        ],
        record: {},
      select: { state: 'One Bedroom', abbr: '1B' },
        items: [
          { state: 'One Bedroom', abbr: '1B' },
          { state: 'Two Bedroom', abbr: '2B' },
          { state: 'Three Bedroom', abbr: '3B' },
          { state: 'Bed Sitter', abbr: 'CA' },
          { state: 'Single Room', abbr: 'NY' },
        ],
        roomStatus: { state: 'Occupied', abbr: 'OC' },
        status: [
          { state: 'Occupied', abbr: 'OC' },
          { state: 'Empty', abbr: 'Em' },
         
        ],
      priceItem: {},
      volume: null,
      feature: null,
      roomNo: null,
      monthlyRent:null,
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
      brands: [],
    };
  },
  watch: {
    action: {
      handler: "setAction",
      immediate: true,
    },
    initial: {
      handler: "setInitial",
      immediate: true,
    },
  },
  methods: {
    initializeContent() {
      setTimeout(() => {
        if (
          this.record.content &&
          this.record.content !== "" &&
          this.$refs.footer_content
        ) {
          this.$refs.footer_content.setContent(this.record.content);
        }
      }, 100);
    },
    setAction(val) {
      this.pageStatus = val;
    },
    setInitial(val) {
      this.record = { ...val };
      this.initializeContent();
      if (this.action == "view") {
        this.features = val.features;
      }
    },
    deleteItem(pos) {
      this.rooms.splice(pos, 1);
    },
    addRooms() {
      // const featureRecord = this.features.find((record) => {
      //   return record.name === this.feature;
      // });

      // const pos = this.features.indexOf(featureRecord);

      // if (pos == -1) {
      //   return;
      // }
      console.log(this.IselectricityBillable);
      console.log(this.IswaterBillable);

            console.log(this.select);




      let details = {
        name: this.roomNo,
        roomType:this.select.state,
        rent: this.monthlyRent,
        status:this.roomStatus.state
        


      };
      const initArray = [];
      initArray.push(details);
      this.rooms = [ ...initArray];
      this.dialog = false;
      
    },
    sendData() {
      const data = this.record;
      this.$emit("data", data);
    },
   
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>