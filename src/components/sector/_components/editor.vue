<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-autocomplete
          autocomplete="off"
          dense
          v-model="record.url"
          :items="pages"
          label="Page"
          item-text="name"
          item-value="url"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="3">
        <v-autocomplete
          autocomplete="off"
          dense
          v-model="sect.url"
          :items="sections"
          label="Section"
          item-text="name"
          item-value="url"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="3">
            <v-btn color="accent" text to="/sections">
              <v-icon>mdi-plus</v-icon> New Section
            </v-btn>
      </v-col>
      <v-col cols="12" md="3">
            <v-btn color="accent" text to="/modelo">
              <v-icon>mdi-plus</v-icon> Add Sub Section
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
    ...mapGetters(["serverUrl"]),
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
      sizes: [],
      record: {},
      sect: {},
      pageStatus: "",
      loader: false,
      coverImage: null,
      images: [],
      imagesUrls: [],
      coverImageUrl: null,
      pages: [],
      countries: [],
      subcategories: [],
      brands: [],
      sections: [],
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
          this.record.footerContent &&
          this.record.footerContent !== "" &&
          this.$refs.footer_content
        ) {
          this.$refs.footer_content.setContent(this.record.footerContent);
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
      formData.append("coverImage", this.coverImage);
      formData.append("content", productContent);
      formData.append("introText", this.introText);
      formData.append("product", JSON.stringify(this.record));
      //other images
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
    getPages() {
      const self = this;
      this.$store
        .dispatch("get", `/pago`)
        .then((res) => {
          if (res.state) {
            self.pages = res.records;
          } else {
            // this.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
    getPages1() {
      const self = this;
      this.$store
        .dispatch("get", `/sections`)
        .then((res) => {
          if (res.state) {
            self.sections = res.records;
          } else {
            // this.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
  },
  created() {
    Promise.all([this.getPages(), this.getPages1()]);
  },
};
</script>

<style lang="scss" scoped>
</style>