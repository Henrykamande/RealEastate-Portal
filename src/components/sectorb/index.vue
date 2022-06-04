<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="toolbarColor" dense dark>
        <v-toolbar-title>Home Page</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
          <h1>Home Page</h1>
        <v-row >
          <v-col cols="12" md="12">
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectiona.section}}</h2>
                  <v-btn color="accent" text x-small @click="createsectioninfo(form.sectiona, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn></div>

                  <v-btn v-if="form.sectiona._id !== ''" color="accent" text @click="createsectiona(form.sectiona)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
             <v-row v-if="form.sectiona.modules">
             <!-- <v-row v-if="form.sectiona.modules.> 0"> -->
              <v-col cols="12" :md="form.sectiona.modules[0].columns">
                <h2>{{form.sectiona.modules[0].h1}}</h2>
                <h2>{{form.sectiona.modules[0].h2}}</h2>
                <span>{{form.sectiona.modules[0].description}}</span>
              </v-col>
              <v-col cols="12" :md="form.sectiona.modules[0].columns">
                <img v-if="form.sectiona.modules[0].coverImage" :src="`${serverUrl}/uploads/pages/${form.sectiona.modules[0].coverImage}`" width="400px" />
                <div v-if="!!form.sectiona.modules[0].id" class="" style="display:flex; justify-content: space-between;">
                  <div class="" >
                  <v-btn  color="accent" text x-small @click="createsectiona(form.sectiona, form.sectiona.modules[0])"
                    >edit</v-btn></div>
                  <div class="">
                  <v-btn  color="accent" text x-small @click="deletemodule(form.sectiona, form.sectiona.modules[0])"
                    >delete</v-btn></div>
                </div>
              </v-col>
            </v-row>
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectionb.section}}</h2>
                  <v-btn color="accent" text x-small @click="createsectioninfo(form.sectionb, true, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn>
            </div>
                  <v-btn v-if="form.sectionb._id !== ''" color="accent" text @click="createsectionb(form.sectionb)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
              <div class="" >
              <h2 class="ma-4" style="paddding-top: 4px;">{{form.sectionb.h2}}</h2>
              <p class="ma-4" style="paddding-top: 4px;">{{form.sectionb.description}}</p>
            
            <v-row v-if="form.sectionb.modules">
              <v-col  v-for="(widget, i) in form.sectionb.modules" :key="i" cols="4" :md="widget.columns">
               <img v-if="widget.coverImage" :src="`${serverUrl}/uploads/pages/${widget.coverImage}`" width="200" height="150px"/>
                <h2>{{widget.h1}}</h2>
                <h3>{{widget.description}}...</h3>
                <div v-if="!!widget" class="" style="display:flex; justify-content: space-between;">
                  <div class="" >
                  <v-btn  color="accent" text x-small @click="createsectionb(form.sectionb, widget)"
                    >edit</v-btn></div>
                  <div class="">
                  <v-btn  color="accent" text x-small @click="deletemodule(form.sectionb, widget)"
                    >delete</v-btn></div>
                </div>
              </v-col> 
            </v-row>
              </div>
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectionc.section}}</h2>
                  <v-btn color="accent" text x-small @click="createsectioninfo(form.sectionc, false, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn>
            </div>
                  <!-- <v-btn v-if="form.sectionc._id !== ''" color="accent" text @click="createsectionc(form.sectionc)"
                    ><v-icon>mdi-plus</v-icon></v-btn> -->
            </div>
              <div class="" :style="`background-color: ${form.sectionc.color}; color:white;`" >
              <!-- <h2 class="ma-4" style="paddding-top: 4px;">{{form.sectionc.h2}}</h2> -->
              <p class="ma-4" style="paddding-top: 4px;">{{form.sectionc.description}}</p>
            
              </div>
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectiond.section}}</h2>
                  <v-btn color="accent" text x-small @click="createsectioninfo(form.sectiond, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn>
            </div>
                  <v-btn v-if="form.sectiond._id !== ''" color="accent" text @click="createsectiond(form.sectiond)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
              <div class="" >
              <h2 class="ma-4" style="paddding-top: 4px;">{{form.sectiond.h2}}</h2>
              <p class="ma-4" style="paddding-top: 4px;">{{form.sectiond.description}}</p>
            
            <v-row v-if="form.sectiond.modules">
              <v-col  v-for="(widget, i) in form.sectiond.modules" :key="i" cols="12" :md="widget.columns">
               <img v-if="widget.coverImage" :src="`${serverUrl}/uploads/pages/${widget.coverImage}`" width="200"/>
                <h2>{{widget.h1}}</h2>
                <h3>{{widget.h2}}</h3>
                <div v-if="!!widget.id" class="" style="display:flex; justify-content: space-between;">
                  <div class="" >
                  <v-btn  color="accent" text x-small @click="createsectiond(form.sectiond, widget)"
                    >edit</v-btn></div>
                  <div class="">
                  <v-btn  color="accent" text x-small @click="deletemodule(form.sectiond, widget)"
                    >delete</v-btn></div>
                </div>
              </v-col> 
            </v-row>
              </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  <sectiona :dialogsectiona="dialogsectiona" :sectionaclose="sectionaclose" :section="section" :widget="widget"/>
  <sectionb :dialogsectionb="dialogsectionb" :sectionbclose="sectionbclose" :section="section" :widget="widget"/>
  <sectiond :dialogsectiond="dialogsectiond" :sectiondclose="sectiondclose" :section="section" :widget="widget"/>
  <sectioninfo :dialogsectioninfo="dialogsectioninfo" :sectioninfoclose="sectioninfoclose" :section="section" :h2exist="h2exist" :descexist="descexist"/>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import sectiona from './_components/sectiona.vue';
import sectionb from './_components/sectionb.vue';
import sectiond from './_components/sectiond.vue';
import sectioninfo from './_components/sectioninfo.vue';
export default {
  components: { sectiona, sectionb,sectiond, sectioninfo },
  data() {
    return {
      dialogsectiona: false,
      dialogsectionb: false,
      dialogsectiond: false,
      dialogsectioninfo: false,
      search: null,
      sectorData: [],
      section: {},
      widget: {},
      h2exist: false,
      descexist: false,
      headers: [
        { text: "Page", value: "url" },
        { text: "Heading", value: "h1" },
        { text: "View", value: "view" },
        { text: "Delete", value: "delete" },
      ],
      form: {
        sectiona: {},
        sectionb: {}
      },
      forms: {
        sectiona: {
          page:'about',
          section:'Section a',
          modules: [
            {columns: 6}
          ],
        },
        sectionb: {
          page:'about',
          section:'Section b',
          modules: [
            {columns: 4}
          ],
        },
        sectionc: {
          page:'about',
          section:'Section c',
          modules: [
            {columns: 4}
          ],
        },
        sectiond: {
          page:'about',
          section:'Section d',
          modules: [
            {columns: 4}
          ],
        },
      }
    };
  },
  computed: {
    ...mapGetters(["serverUrl"]),
  },
  methods: {
    deletemodule(item, module){
      this.$store
        .dispatch("remove", `/sector?item=${item._id}&id=${module.id}`)
        .then((res) => {
          if (res.state) {
            location.reload();
          } else {
            console.log(res.msg);
            // self.$refs.snackbar.show(res.msg, "red");
          }
        })
        .catch((err) => {
          console.log(err);
          // self.$refs.snackbar.show(err, "red");
        });
    },
    getData() {
      const url = "/sector?page=about";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.state) {
            self.sectorData = res.records;
        // console.log("--------dwfsvddberg", res.records)
        self.form.sectiona = self.sectorData.find(item => item.section === 'Section a')
        if (self.form.sectiona === 'undefined'|| !self.form.sectiona ){
          self.form.sectiona = self.forms.sectiona
          self.form.sectiona._id = ''
        }
        self.form.sectionb = self.sectorData.find(item => item.section === 'Section b')
        if (self.form.sectionb === 'undefined'|| !self.form.sectionb ){
          self.form.sectionb = self.forms.sectionb
          self.form.sectionb._id = ''
        }
        self.form.sectionc = self.sectorData.find(item => item.section === 'Section c')
        if (self.form.sectionc === 'undefined'|| !self.form.sectionc ){
          self.form.sectionc = self.forms.sectionc
          self.form.sectionc._id = ''
        }
        self.form.sectiond = self.sectorData.find(item => item.section === 'Section d')
        if (self.form.sectiond === 'undefined'|| !self.form.sectiond ){
          self.form.sectiond = self.forms.sectiond
          self.form.sectiond._id = ''
        }
        console.log("--------dwfsvddberg", self.form.sectiond)

          }
        })
        .catch((err) => {
          console.log(err, "error");
          // self.$refs.snackbar.show(err, "red");
        });
    },
    createsectiona(val, widget){
      this.section = val
      this.widget = widget
    this.dialogsectiona = true
    },    
    sectionaclose(){
    this.dialogsectiona = false
    }, 
    createsectionb(val, widget){
      this.section = val
      this.widget = widget
    this.dialogsectionb = true
    },    
    sectionbclose(){
    this.dialogsectionb = false
    }, 
    createsectiond(val, widget){
      this.section = val
      this.widget = widget
    this.dialogsectiond = true
    },    
    sectiondclose(){
    this.dialogsectiond = false
    }, 
    createsectioninfo(part,e, f){
      this.section = part
      this.h2exist = e
      this.descexist= f
    this.dialogsectioninfo = true
    },    
    sectioninfoclose(){
      this.section = ''
    this.dialogsectioninfo = false
    }, 
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
</style>