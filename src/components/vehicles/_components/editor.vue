<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" xs="12" md="4">
        <v-text-field
          label="Vehicle/Model"
          type="text"
          autocomplete="off"
          outlined
          dense
          v-model="record.name"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" xs="12" md="4">
        <v-text-field
          label="Retail Daily Price"
          type="text"
          autocomplete="off"
          outlined
          dense
          v-model="record.dailyPrice"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" xs="12" md="4">
        <v-text-field
          label="Corp Daily Price"
          type="text"
          autocomplete="off"
          outlined
          dense
          v-model="record.corpPrice"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" xs="12" md="4">
        <v-text-field
          label="Daily Free Km"
          type="text"
          autocomplete="off"
          outlined
          dense
          v-model="record.freeKm"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" xs="12" md="4">
        <v-text-field
          label="Extra KM Price"
          type="text"
          autocomplete="off"
          outlined
          dense
          v-model="record.extraKmPrice"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" xs="12" md="4">
        <v-autocomplete
          autocomplete="off"
          dense
          outlined
          v-model="record.available"
          :items="availability"
          label="Availability"
          item-text="name"
          item-value="value"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="12" xs="12" md="12">
        <v-text-field
          label="Availability Details"
          type="text"
          autocomplete="off"
          outlined
          dense
          v-model="record.availableDetails"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- create images section -->
    <v-row  style="margin-top: 0px">
      <v-col cols="12">
        <label>Cover Image</label>
        <file-upload @image="setCoverImage"></file-upload>
      </v-col>

      <v-col cols="6">
        <img
          v-if="coverImageUrl"
          :src="coverImageUrl"
          style="width: 500px; height: 350px; padding: 20px"
        />
      </v-col>
    </v-row>

    <!-- update images section -->
    <v-row v-show="pageStatus == 'view'">
      <v-col cols="4">
        <v-img :src="`${serverUrl}/uploads/vehicles/${record.coverImage}`" height="width: 500px; height: 350px; padding: 20px"></v-img>
      </v-col>
    </v-row>
    <!-- end of update images section -->

    <v-row>
      <v-col cols="12">
        <v-btn color="accent" v-show="action == 'create'" @click="sendData" :loading="loader">
          <v-icon left>mdi-content-save</v-icon>Save
        </v-btn>

        <v-btn color="accent" v-show="action == 'view'" @click="sendData" :loading="loader">
          <v-icon left>mdi-content-save</v-icon> Update
        </v-btn>
      </v-col>
    </v-row>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import FileUpload from "@/components/global/file-uploader.vue";
export default {
  computed: {
    ...mapGetters(["serverUrl"]),
  },
  components: {
    FileUpload
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
      sizes: [{ name: "1 Acre" }, { name: "2 Acres" }],
      record: {},
      pageStatus: "",
      loader: false,
      coverImage: null,
      images: [],
      imagesUrls: [],
      coverImageUrl: null,
      availability: [
        { name: 'Available', value: 'Y'},
        { name: 'Not Available', value: 'N'}
      ]
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
    },
    sendData() {
      const formData = new FormData();
      const url = this.record.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .trim()
        .split(" ")
        .join("-");
      this.record.url = url;

      formData.append("coverImage", this.coverImage);
      formData.append("vehicle", JSON.stringify(this.record));
      formData.append("actionStatus", "create");
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
    this.initializeContent();
  },
};
</script>

<style lang="scss" scoped>
</style>