<template>
  <v-container fluid>
    <v-row>
      <!-- {{$route.query.url}} -->
      <v-col cols="4">
        <h1> {{section.page}} - page</h1>
      </v-col>
      <v-col cols="12" md="4">
        <h1>Section: {{section.section}}</h1>
      </v-col>
      <v-col cols="4">
        <v-text-field label="Columns" outlined dense type="Number" v-model="record.column"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field label="H1" outlined dense v-model="record.h1"></v-text-field>
      </v-col>

      <v-col cols="6">
        <v-text-field label="H2" outlined dense v-model="record.h2"></v-text-field>
      </v-col>

      <!-- <v-col cols="12">
        <v-text-field label="Meta Title" outlined dense v-model="record.metaTitle"></v-text-field>
      </v-col> -->
<!-- 
      <v-col cols="12">
        <v-textarea outlined v-model="record.metaDescription" label="Meta Description" value></v-textarea>
      </v-col> -->

      <v-col cols="12">
        <html-editor ref="footer_content"></html-editor>
      </v-col>
    </v-row>

    <!-- create images section -->
    <v-row style="margin-top: 50px">
      <v-col cols="12">
        <label>Cover Image</label>
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

    <!-- <v-row v-show="pageStatus == 'create'">
      <v-col cols="12">
        <label>Other Images</label>
        <multi-upload @collection="setImages" @urls="setImagesUrls"></multi-upload>
      </v-col>

      <v-col cols="3" v-for="(url, key) in imagesUrls" v-bind:key="key">
        <img v-if="url" :src="url" style="width: 350px; height: 250 padding: 20px" />
        <v-btn icon @click="removeOtherImage(key)">
          <v-icon color="red">mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row> -->
    <!-- end of create images section -->

    <!-- update images section -->
    <v-row v-show="action == 'view'">
      <v-col cols="4">
        <v-img :src="`${serverUrl}/uploads/modelo/${record.coverImage}`" height="200px"></v-img>
      </v-col>
    </v-row>

    <!-- <v-row v-show="action == 'view'">
      <v-col cols="4" v-for="(image, index) of record.otherImages" v-bind:key="index">
        <v-img :src="`${serverUrl}/uploads/modelo/${image}`" height="200px"></v-img>
      </v-col>
    </v-row> -->
    <!-- end of update images section -->

    <v-row>
      <v-col cols="12">
        <v-btn color="accent" v-show="pageStatus == 'create'" @click="sendData" :loading="loader">
          <v-icon left>mdi-content-save</v-icon>Save
        </v-btn>

        <v-btn color="accent" v-show="pageStatus == 'view'" @click="sendData" :loading="loader">
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
      sizes: [{ name: "1 Acre" }, { name: "2 Acres" }],
      record: {},
      pageStatus: "",
      loader: false,
      coverImage: null,
      images: [],
      imagesUrls: [],
      coverImageUrl: null,
      // sections: [],
      sectoring: "",
      section: {},
      secto: {}
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
    // sect: {
    //   handler: "setSect",
    //   immediate: true,
    // },
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
    console.log("xxxxxxxxxx", this.record)
    },
    // setSect(val) {
    //   this.section = val;
    // },
    sendData() {
      const productContent = this.$refs.footer_content.getContent();
      this.record.page = this.section.page
      this.record.section = this.section.section
      const formData = new FormData();
      formData.append("section", this.sect);
      formData.append("coverImage", this.coverImage);
      // formData.append("coverImageUrl", this.coverImageUrl);
      formData.append("content", productContent);
      formData.append("product", JSON.stringify(this.record));
      formData.append("actionStatus", "create");
      this.loader = true;
      this.$emit("data", formData);
    },
    setCoverImage({ image, imageUrl }) {
      this.coverImage = image;
      this.coverImageUrl = imageUrl;
    },
    getData() {
      const self = this;
      this.$store
        .dispatch("get", `/sections/${self.$route.query.url}`)
        .then((res) => {
          if (res.state) {
            self.section = res.record;
            // console.log(">>>>>>>>>>>ssddd", self.section)
          } else {
            self.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          this.$refs.snackbar.show(err, "red");
        });
    },
  },
  created() {
    // console.log("xxxxxxxxxx", this.$route.query.url)
    this.getData()
  }
};
</script>

<style lang="scss" scoped>
</style>