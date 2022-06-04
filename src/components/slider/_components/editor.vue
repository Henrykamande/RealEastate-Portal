<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Title"
          outlined
          dense
          v-model="record.title"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          label="Heading 1"
          outlined
          dense
          v-model="record.h1"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          label="Heading 2"
          outlined
          dense
          v-model="record.h2"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-textarea
          outlined
          v-model="record.desc"
          label="Desc"
          value
          rows="3"
        ></v-textarea>
      </v-col>

      <v-col cols="12">
        <v-text-field
          label="Button Url"
          outlined
          dense
          v-model="record.buttonUrl"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-show="pageStatus == 'view'">
      <v-col cols="6">
        <v-img
          :src="`${serverUrl}/uploads/slider/${record.coverImage}`"
        ></v-img>
      </v-col>
    </v-row>

    <!-- create images section -->
    <v-row>
      <v-col cols="3">
        <label>Upload Image</label>
        <file-upload @image="setCoverImage"></file-upload>
      </v-col>

      <v-col cols="5">
        <img
          v-if="coverImageUrl"
          :src="coverImageUrl"
          style="width: 450px; height: 250px; padding: 20px"
        />
      </v-col>

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
          @click="sendData"
          :loading="loader"
          v-show="action == 'view'"
        >
          <v-icon left>mdi-content-save</v-icon>Update
        </v-btn>
      </v-col>
    </v-row>

    <!-- update images section -->

    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import FileUpload from "@/components/global/file-uploader.vue";
// import MultiUpload from "@/components/global/multiple-file-uploader.vue";
export default {
  computed: {
    ...mapGetters(["serverUrl"]),
  },
  components: {
    FileUpload,
    // MultiUpload,
  },
  props: {
    action: {
      type: String,
    },
    initial: {
      type: Object,
    },
    categoryUrl: {
      type: String,
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
    setAction(val) {
      this.pageStatus = val;
    },
    setInitial(val) {
      this.record = { ...val };
    },
    sendData() {
      const formData = new FormData();
      const url = this.record.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .trim()
        .split(" ")
        .join("-");
      this.record.url = url;
      formData.append("coverImage", this.coverImage);
      formData.append("slider", JSON.stringify(this.record));
      formData.append("actionStatus", "view");
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
};
</script>

<style lang="scss" scoped>
</style>