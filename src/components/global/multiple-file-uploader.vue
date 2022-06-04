<template>
    <div>
        <v-col cols="12">
             <input type="file"
                style="display:none"
                ref="fileInput"
                @change="onFilePicked"
                multiple
            >
            <v-btn color="teal" class="uploadbtn" dark @click="fileUploadInit" rounded> <v-icon left> mdi-attachment</v-icon> {{ title }}  </v-btn>
        </v-col>
    </div>
</template>
<script>
import { onFilePicked, fileUploadInit } from '@/common/methods.js'

export default {
  name: 'MultipleFileUpload',
  props: {
    title: {
      default: 'Browse files'
    }
  },
  computed: {

  },
  data () {
    return {
      image: null,
      imageUrl: '',
      formData: null,
      rawImage: null,
      standAlone: true,
      imageCollection: null
    }
  },
  methods: {
    onFilePicked,
    fileUploadInit,
    emitData () {
      const image = this.image
      const imageUrl = this.imageUrl
      const rawImage = this.rawImage
      const data = { image, imageUrl, rawImage }
      const self = this

      let imc = []
      const collection = this.imageCollection
      // console.log(collection, 'cc');
      const urls = []

      Object.keys(collection).forEach(function (key) {
        let obj = collection[key]
        console.log(obj, 'object')
        imc.push(obj)
        urls.push(self.readUrl(obj))
        // do something with obj
      })
      Promise.all(urls)
        .then((data) => {
          //  console.log(data, 'urls')
          self.$emit('urls', data)
        })

      this.$emit('image', data)
      this.$emit('collection', imc)
    },
    readUrl (file) {
      //    const self = this
      return new Promise((resolve) => {
        let imageUrl
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.addEventListener('load', () => {
          imageUrl = fileReader.result

          resolve(imageUrl)
          // console.log(this.standAlone, this.imageCollection);
        })
      })
    }
  }
}
</script>

<style scoped>
.uploadbtn{
    text-transform: capitalize;
}
</style>
