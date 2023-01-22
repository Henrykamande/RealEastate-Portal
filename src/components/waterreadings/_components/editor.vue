<template>
  <v-container fluid>
    <v-row>
     

      <v-col cols="4">
           <v-select
                     label="Room No"

          v-model="roomNo"
          :hint="`${roomNo.state}, ${roomNo.abbr}`"
          :items="rooms"
          item-text="state"
          item-value="abbr"
          persistent-hint
          return-object
          single-line
        ></v-select> 

      </v-col>

        
     
     
        
      <v-col cols="4">
        <v-text-field
          label="Water Readings"
          outlined
          dense
          v-model="record.h1"
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
            v-model="date"
            label="Readings Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
      
      </v-col>
 
      <v-col cols="12">
        <v-textarea
          outlined
          v-model="record.metaDescription"
          label="Utility Notes"
          value
        ></v-textarea>
      </v-col>

      <v-col cols="12">
        <!-- <html-editor ref="footer_content"></html-editor> -->
      </v-col>
    </v-row>

    <!-- create images section -->
    <v-row style="margin-top: 50px">
      <!-- <v-col cols="12">
        <label>Cover Image</label>
        <file-upload @image="setCoverImage"></file-upload>
      </v-col> -->

      <v-col cols="6">
        <img
          v-if="coverImageUrl"
          :src="coverImageUrl"
          style="width: 350px; height: 350px; padding: 20px"
        />
      </v-col>
    </v-row>

    <v-row v-show="pageStatus == 'create'">
      <v-col cols="12">
       <!--  <label>Other Images</label>
        <multi-upload
          @collection="setImages"
          @urls="setImagesUrls"
        ></multi-upload> -->
      </v-col>

      <v-col cols="3" v-for="(url, key) in imagesUrls" v-bind:key="key">
        <img
          v-if="url"
          :src="url"
          style="width: 350px; height: 250 padding: 20px"
        />
        <v-btn icon @click="removeOtherImage(key)">
          <v-icon color="red">mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- end of create images section -->

    <!-- update images section -->
    <v-row v-show="pageStatus == 'view'" style="margin-top: 50px">
      <v-col cols="4">
        <v-img
          :src="`${serverUrl}/uploads/services/${record.coverImage}`"
          height="200px"
        ></v-img>
      </v-col>
    </v-row>

    <v-row v-show="pageStatus == 'view'">
      <v-col
        cols="4"
        v-for="(image, index) of record.otherImages"
        v-bind:key="index"
      >
        <v-img
          :src="`${serverUrl}/uploads/services/${image}`"
          height="200px"
        ></v-img>
      </v-col>
    </v-row>
    <!-- end of update images section -->

    <v-row>
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
          <v-icon left>mdi-content-save</v-icon> Update
        </v-btn>
      </v-col>
    </v-row>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
//import FileUpload from "@/components/global/file-uploader.vue";
//import HtmlEditor from "@/components/global/html-editor.vue";
//import MultiUpload from "@/components/global/multiple-file-uploader.vue";
export default {
  computed: {
    ...mapGetters(["serverUrl"]),
  },
  components: {
    //FileUpload,
    //MultiUpload,
    //HtmlEditor,
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
       select: { state: 'Heshima Appartments', abbr: 'HA' },
        houses: [
          { state: 'Heshima Appartments', abbr: 'HA' },
          { state: 'Golden Palm House', abbr: 'GP' },
          { state: 'Lake Side House', abbr: 'LS'},
          { state: 'RiverPark HOuser', abbr: 'RP' },
          { state: 'Blue Eden HOuse', abbr: 'BE' },
        ],
        roomNo: { state: 'D1', abbr: 'D1' },
        rooms: [
          { state: 'D1', abbr: 'D1' },
          { state: 'D2', abbr: 'D2' },
          { state: 'D3', abbr: 'D3' },
          { state: 'D4', abbr: 'D4' },
          
        ],

        readingTypes: { state: 'Electricity', abbr: 'E' },
        readings: [
          { state: 'Electricity', abbr: 'E' },
          { state: 'Water', abbr: 'W' },
          
          
        ],
      sizes: [{ name: "1 Acre" }, { name: "2 Acres" }],
      record: {},
      pageStatus: "",
      loader: false,
      coverImage: null,
      images: [],
      imagesUrls: [],
      coverImageUrl: null,
      menuPositions: [
        { name: "On Menu", value: "M" },
        { name: "On Page", value: "P" },
      ],
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
    },
    sendData() {
      const productContent = this.$refs.footer_content.getContent();

      const formData = new FormData();
      const url = this.record.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .trim()
        .split(" ")
        .join("-");
      this.record.url = url;

      formData.append("coverImage", this.coverImage);
      formData.append("content", productContent);
      formData.append("introText", this.introText);
      formData.append("product", JSON.stringify(this.record));
      formData.append("actionStatus", "view");
      //other images
      const files = this.images;
      files.forEach((file) => {
        const m_file = file;
        formData.append("otherImages", m_file);
      });
      this.loader = true;
      this.$emit("data", formData);
    },
    setCoverImage({ image, imageUrl }) {
      this.coverImage = image;
      this.coverImageUrl = imageUrl;
    },
    setImages(files) {
      this.images = files;
    },
    setImagesUrls(urls) {
      this.imagesUrls = urls;
    },
    removeOtherImage(key) {
      this.imagesUrls.splice(key, 1);
      this.images.splice(key, 1);
    },
  },
  created() {
    //  const m = this.meta
    // this.meta = { ...m, ...this.initial }
  },
};
</script>

<style lang="scss" scoped>
</style>