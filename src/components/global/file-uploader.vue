<template>
  <div>
    <v-col cols="12">
      <input type="file" style="display :none" ref="fileInput" @change="onFilePicked">
      <v-btn color="primary" class="uploadbtn" dark @click="fileUploadInit">
        <v-icon left>mdi-file-upload</v-icon>
        {{ title }}
      </v-btn>
    </v-col>
  </div>
</template>
<script>
import { onFilePicked, fileUploadInit } from "@/common/methods.js";

export default {
  name: "ImageUpload",
  props: {
    title: {
      type: String,
      default: "Browse"
    }
  },
  computed: {},
  data() {
    return {
      image: null,
      imageUrl: "",
      formData: null,
      rawImage: null,
      standAlone: true,
      fileName: ""
    };
  },
  methods: {
    onFilePicked,
    fileUploadInit,
    emitData() {
      const image = this.image;
      const imageUrl = this.imageUrl;
      const rawImage = this.rawImage;
      const fileName = this.fileName;
      this.$emit("image", { image, imageUrl, rawImage });
      this.$emit("file", { image, fileName, rawImage });
    }
  }
};
</script>

<style scoped>
.uploadbtn {
  text-transform: capitalize;
}
</style>
