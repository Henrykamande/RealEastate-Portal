<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
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

      <v-col cols="12" md="8">
        <v-text-field
          label="Meta Title"
          type="text"
          autocomplete="off"
          dense
          v-model="record.metaTitle"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          label="H1 (Main Heading)"
          type="text"
          autocomplete="off"
          dense
          v-model="record.h1"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          label="H2 (Sub Heading)"
          type="text"
          autocomplete="off"
          dense
          v-model="record.h2"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="12">
        <v-text-field
          label="Page Description"
          type="text"
          autocomplete="off"
          dense
          v-model="record.pageDescription"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="12">
        <v-text-field
          label="Meta Description"
          type="text"
          autocomplete="off"
          dense
          v-model="record.metaDescription"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        Content
        <html-editor ref="footer_content"></html-editor>
      </v-col>
    </v-row>

    <!-- create images section -->
    <v-row style="margin-top: 50px">
      <v-col cols="12">
        <label>Image</label>
        <file-upload @image="setCoverImage"></file-upload>
      </v-col>

      <v-col cols="6">
        <img
          v-if="coverImageUrl"
          :src="coverImageUrl"
          style="width: 350px; height: 350px; padding: 20px"
        />
      </v-col>
    </v-row>

    <!-- end of create images section -->

    <!-- update images section -->
    <v-row v-show="pageStatus == 'view'" style="margin-top: 50px">
      <v-col cols="4">
        <v-img
          :src="`${serverUrl}/uploads/products/${record.coverImage}`"
        ></v-img>
      </v-col>
    </v-row>

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
          <v-icon left>mdi-content-save</v-icon>Update
        </v-btn>
      </v-col>
    </v-row>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import FileUpload from "@/components/global/file-uploader.vue";
import HtmlEditor from "@/components/global/html-editor.vue";
export default {
  computed: {
    ...mapGetters(["serverUrl"]),
  },
  components: {
    FileUpload,
    HtmlEditor,
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
        .dispatch("get", `/pages`)
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
  },
  created() {
    Promise.all([this.getPages()]);
  },
};
</script>

<style lang="scss" scoped>
</style>