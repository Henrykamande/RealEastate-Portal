<template>
  <v-row>
    <v-col cols="12">
      <quill-editor
        style="min-height:350px !important; height:350px;"
        v-model="content"
        ref="myQuillEditor"
      ></quill-editor>
    </v-col>
  </v-row>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
      quillEditor
  },
  data() {
      return {
          content: ''
      }
  },
   methods: {
    setContent (content) { this.content = content },
    getContent () { return this.content }
  }
};
</script>

<style lang="scss" scoped>
</style>