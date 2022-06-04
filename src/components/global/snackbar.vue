<template>
     <v-snackbar
      v-model="snackbar"
      top
      right
      :timeout="timeout"
      :color= "color"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

</template>
<script>
export default {
  name: 'AppSnackbar',
  props: {
    timeout: {
      type: Number,
      default: 6000
    }
  },
  data () {
    return {
      snackbar: false,
      text: 'Success',
      color: 'success'
    }
  },
  methods: {
    show (text = 'Success', color) {
      this.text = text
      this.color = color
      this.snackbar = true
    }
  }
}
</script>
