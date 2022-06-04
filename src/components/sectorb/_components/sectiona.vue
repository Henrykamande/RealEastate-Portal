<template>
   <v-row>
          <v-dialog v-model="dialogsectiona" 
          persistent max-width="750px">
            <v-card>
              <v-toolbar dense color="toolbarColor" dark>
                <v-toolbar-title>Create Section A module</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="close()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-container fluid>
                  <v-row class="subtitle-2 text--primary">
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-textarea label="H1" filled outlined dense v-model="form.h1"></v-textarea>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-textarea label="H2" filled outlined dense v-model="form.h2"></v-textarea>
                    </v-col>

                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-textarea label="Description" filled outlined dense v-model="form.description"></v-textarea>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-textarea label="summary" filled outlined dense v-model="form.summary"></v-textarea>
                    </v-col>
                       <v-col
                        cols="12"
                        md="6"
                      >   <v-file-input
                          accept="image/*"
                          label="Change Image"
                          required
                          type="file"
                          @change="onFile"
                        ></v-file-input>
                        </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6">
                      <v-text-field label="phone" outlined dense v-model="form.phone"></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="12">
                      <v-text-field label="columns" outlined dense v-model="form.columns"></v-text-field>
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
    props: ['dialogsectiona','sectionaclose', 'section', 'widget'],
    data(){
      return{
        form:{
          page: 'home',
          section: 'sectiona',
          columns: 6,
          h1:'',
          h2:'',
          description:'',
          summary:'',
          phone: ''
        },
        store:'api/tax'
      }
    },
  watch: {
    widget: {
      handler: "setWidget",
      immediate: true,
    },
  },
    methods:{
    setWidget(val) {
      // console.log("mmmmmmmmmmm", val)
        if (val == undefined){
            this.form = {}
        }else{
           this.form = { ...val };
        }
    },
    onFile(e){
      console.log(e)
      this.picture = e
    },
      close(){
          this.sectionaclose()
          this.form.h1 = '',
          this.form.description = ''
      },
      save() {
          const data = [];
          const details = {
              h1: this.form.h1,
              h2: this.form.h2,
              description: this.form.description,
              columns: this.form.columns,
              summary: this.form.summary,
              phone: this.form.phone
          };
          data.push(details);
        // console.log(">>>>>>>>>>>>>>>>>",this.picture, data);
        let coverImage = this.picture
        const formData = new FormData();
        formData.append("coverImage", coverImage);
        // formData.append("data", data);
        formData.append("modulos", JSON.stringify(data));

        //
       if (this.form.id !== ''){
        const url = `/sector/update?item=${this.section._id}&id=${this.form.id}`;
        this.loader = true;
        this.$store
          .dispatch("expressPut", { url, data:formData })
          .then((res) => {
              console.log(res)
          })
          .finally(() => {
            location.reload();
          })
          .catch((err) => {
            this.$refs.snackbar.show(err, "red");
          });
        }else{
        const url = `/sector/${this.section._id}`;
        this.loader = true;
        this.$store
          .dispatch("expressPut", { url, data:formData })
          .then((res) => {
              console.log(res)
          })
          .finally(() => {
            location.reload();
          })
          .catch((err) => {
            this.$refs.snackbar.show(err, "red");
          });
        }
      },
    }
}
</script>

<style>

</style>