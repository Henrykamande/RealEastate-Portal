<template>
   <v-row>
          <v-dialog v-model="dialogsectioninfo" 
          persistent max-width="750px">
            <v-card>
              <v-toolbar dense color="toolbarColor" dark>
                <v-toolbar-title> {{this.form.section}} info</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="close()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-container fluid>
                  <v-row class="subtitle-2 text--primary">
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-text-field label="page" outlined dense v-model="form.page" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-text-field label="section a" outlined dense v-model="form.section" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-text-field label="position" outlined dense v-model="form.position"></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-text-field label="color" outlined dense v-model="form.color"></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" sm="6" md="12" v-if="h2exist">
                      <v-textarea label="h2" filled outlined dense v-model="form.h2"></v-textarea>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="12" v-if="h2exist">
                      <v-textarea label="description" filled outlined dense v-model="form.description"></v-textarea>
                    </v-col>

                    <v-col cols="12">
                      <v-btn color="accent" @click="save" >
                        <v-icon left>mdi-content-save</v-icon>Save
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
   </v-row>
</template>

<script>
export default {
    props: ['dialogsectioninfo','sectioninfoclose', 'section', 'h2exist'],
    data(){
      return{
        form:{
          page: 'home',
          sectionpart: '',
          position: 1,
          color:'',
          h2:'',
        },
        loader: false
      }
    },
  watch: {
    section: {
      handler: "setInitial",
      immediate: true,
    },
  },
    methods:{
    setInitial(val) {
      this.form = { ...val };
    },
      close(){
          this.sectioninfoclose()
          this.form.h1 = '',
          this.form.description = ''
      },
      save() {
        const data = {
          page: this.form.page,
          section: this.form.section,
          color: this.form.color,
          position: this.form.position,
          h2: this.form.h2,
          description: this.form.description,
          modules: []
        };
        const url = "/sector";
        this.loader = true;
        this.$store
          .dispatch("expressPost", { url, data })
          .then((res) => {
            if (res.state) {
              location.reload();
            } else {
              self.$refs.snackbar.show(res.msg, "red");
            }
          })
          .finally(() => {
            location.reload();
          })
          .catch((err) => {
            this.$refs.snackbar.show(err, "red");
          });
      },
    }
}
</script>

<style>

</style>