<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          label="Description"
          type="text"
          autocomplete="off"
          dense
          v-model="record.name"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          label="Speed"
          type="text"
          autocomplete="off"
          dense
          v-model="record.speed"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          label="Price"
          type="text"
          autocomplete="off"
          dense
          v-model="record.price"
        ></v-text-field>
      </v-col>

      <v-col cols="4">
        <v-btn text color="accent" @click.native="dialog = true">
          <v-icon left>mdi-plus</v-icon> Feature
        </v-btn>

        <v-simple-table dense>
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
        </v-simple-table>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
          label="Meta Title"
          type="text"
          autocomplete="off"
          dense
          v-model="record.meta_title"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="12">
        <v-textarea
          label="Meta Description"
          type="text"
          autocomplete="off"
          dense
          v-model="record.meta_desc"
        ></v-textarea>
      </v-col>

      <v-col cols="12">
        <html-editor ref="footer_content"></html-editor>
      </v-col>
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
            <v-toolbar-title>Create Feature</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-row dense class="subtitle-2 text--primary">
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Title"
                    outlined
                    dense
                    v-model="feature"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn color="primary" @click="addFeature">Add</v-btn>
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
import HtmlEditor from "@/components/global/html-editor.vue";
export default {
  computed: {
    ...mapGetters(["serverUrl"]),
  },
  components: {
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
      priceItem: {},
      volume: null,
      feature: null,
      features: [],
      dialog: false,
      offer: false,
      trending: false,
      clearance: false,
      sizes: [],
      record: {},
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
      this.features.splice(pos, 1);
    },
    addFeature() {
      // const featureRecord = this.features.find((record) => {
      //   return record.name === this.feature;
      // });

      // const pos = this.features.indexOf(featureRecord);

      // if (pos == -1) {
      //   return;
      // }

      let details = {
        name: this.feature,
      };
      const initArray = [];
      initArray.push(details);
      this.features = [...this.features, ...initArray];
      this.dialog = false;
      this.feature = null;
    },
    sendData() {
      const productContent = this.$refs.footer_content.getContent();
      const formData = new FormData();
      const url = this.record.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .trim()
        .split(" ")
        .join("-");

      this.record.url = url;
      this.record.features = this.features;
      formData.append("content", productContent);
      formData.append("product", JSON.stringify(this.record));
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
  created() {},
};
</script>

<style lang="scss" scoped>
</style>