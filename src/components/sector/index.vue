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
                  <v-btn  color="accent" text x-small @click="createsectioninfo(form.sectiona, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn>
            </div>
                  <v-btn v-if="form.sectiona._id !== ''" color="accent" text @click="createsectiona(form.sectiona)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
            <v-row v-if="form.sectiona.modules.length> 0">
              <v-col cols="12" :md="form.sectiona.modules[0].columns">
                <h2>{{form.sectiona.modules[0].h1}}</h2>
                <span>{{form.sectiona.modules[0].description}}</span>
                <div v-if="form.sectiona.modules[0].id !== ''" class="" style="display:flex; justify-content: space-between;">
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
                  <v-btn color="accent" text x-small @click="createsectioninfo(form.sectionb, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn></div>

                  <v-btn v-if="form.sectionb._id !== ''" color="accent" text @click="createsectionb(form.sectionb)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
            <v-row v-if="form.sectionb.modules.length> 0">
              <v-col  v-for="(widget, i) in form.sectionb.modules" :key="i" cols="12" :md="widget.columns">
               <img v-if="widget.coverImage" :src="`${serverUrl}/uploads/pages/${widget.coverImage}`" width="200px" height="100px"/>
                <h2>{{widget.h1}}</h2>
                <span>{{widget.description}}</span>
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
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectionc.section}}</h2>
                  <v-btn color="accent" text x-small @click="createsectioninfo(form.sectionc, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn></div>
                  <v-btn v-if="form.sectionc._id !== ''" color="accent" text @click="createsectionc(form.sectionc)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div> 
            <v-row v-if="form.sectionc.modules.length> 0">
              <v-col cols="12" :md="form.sectionc.modules[0].columns">
                <h2>{{form.sectionc.modules[0].partah1}}</h2>
                <img v-if="form.sectionc.modules[0].coverImage" :src="`${serverUrl}/uploads/pages/${form.sectionc.modules[0].coverImage}`" width="400px" /><br />
                <span>{{form.sectionc.modules[0].partaspan}}</span>
              </v-col>
              <v-col cols="12" :md="form.sectionc.modules[0].columns">
                <h2>{{form.sectionc.modules[0].partbh2}}</h2>
                <h2>{{form.sectionc.modules[0].partch2}}</h2>
                <span>{{form.sectionc.modules[0].h5}}</span>
                <div v-if="!!form.sectionc.modules[0]" class="" style="display:flex; justify-content: space-between;">
                  <div class="" >
                  <v-btn  color="accent" text x-small @click="createsectionc(form.sectionc, form.sectionc.modules[0])"
                    >edit</v-btn></div>
                  <div class="">
                  <v-btn  color="accent" text x-small @click="deletemodule(form.sectionc, form.sectionc.modules[0])"
                    >delete</v-btn></div>
                </div>
              </v-col>
            </v-row>
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectiond.section}}</h2>
                  <v-btn  color="accent" text x-small @click="createsectioninfo(form.sectiond, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn></div>

                  <v-btn v-if="form.sectiond._id !== ''" color="accent" text @click="createsectiond(form.sectiond)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
            <v-row v-if="form.sectiond.modules.length> 0">
              <v-col  v-for="(widget, i) in form.sectiond.modules" :key="i" cols="12" :md="widget.columns">
                <h2>{{widget.h1}}</h2>
                <span>{{widget.description}}</span>
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
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectione.section}}</h2>
                  <v-btn  color="accent" text x-small @click="createsectioninfo(form.sectione, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn></div>

                  <v-btn v-if="form.sectione._id !== ''" color="accent" text @click="createsectione(form.sectione)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
             <v-row v-if="form.sectione.modules.length> 0">
              <v-col cols="12" :md="form.sectione.modules[0].columns">
                <img v-if="form.sectione.modules[0].coverImage" :src="`${serverUrl}/uploads/pages/${form.sectione.modules[0].coverImage}`" width="400px" />
              </v-col>
              <v-col cols="12" :md="form.sectione.modules[0].columns">
                <h2>{{form.sectione.modules[0].h1}}</h2>
                <h2>{{form.sectione.modules[0].h2}}</h2>
                <span>{{form.sectione.modules[0].description}}</span>
                <div v-if="!!form.sectione.modules[0]" class="" style="display:flex; justify-content: space-between;">
                  <div class="" >
                  <v-btn  color="accent" text x-small @click="createsectione(form.sectione, form.sectione.modules[0])"
                    >edit</v-btn></div>
                  <div class="">
                  <v-btn  color="accent" text x-small @click="deletemodule(form.sectione, form.sectione.modules[0])"
                    >delete</v-btn></div>
                </div>
              </v-col>
            </v-row>
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectionf.section}}</h2>
                  <v-btn color="accent" text x-small @click="createsectioninfo(form.sectionf, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn></div>

                  <v-btn v-if="form.sectionf._id !== ''" color="accent" text @click="createsectionf(form.sectionf)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
             <v-row v-if="form.sectionf.modules.length> 0">
              <v-col cols="12" :md="form.sectionf.modules[0].columns">
                <h2>{{form.sectionf.modules[0].h1}}</h2>
                <h2>{{form.sectionf.modules[0].h2}}</h2>
                <span>{{form.sectionf.modules[0].description}}</span>
              </v-col>
              <v-col cols="12" :md="form.sectionf.modules[0].columns">
                <img v-if="form.sectionf.modules[0].coverImage" :src="`${serverUrl}/uploads/pages/${form.sectionf.modules[0].coverImage}`" width="400px" />
                <div v-if="!!form.sectionf.modules[0].id" class="" style="display:flex; justify-content: space-between;">
                  <div class="" >
                  <v-btn  color="accent" text x-small @click="createsectionf(form.sectionf, form.sectionf.modules[0])"
                    >edit</v-btn></div>
                  <div class="">
                  <v-btn  color="accent" text x-small @click="deletemodule(form.sectionf, form.sectionf.modules[0])"
                    >delete</v-btn></div>
                </div>
              </v-col>
            </v-row>
           <v-divider class="ma-3"></v-divider>
            <div class="" style="display:flex; justify-content: space-between;">
            <div class="" style="display:flex;">
            <h2 >{{form.sectiong.section}}</h2>
                  <v-btn color="accent" text x-small @click="createsectioninfo(form.sectiong, true)"
                    ><v-icon>mdi-pencil</v-icon></v-btn>
            </div>
                  <v-btn v-if="form.sectiong._id !== ''" color="accent" text @click="createsectiong(form.sectiong)"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
              <!-- <div class="" :style="`background-color: ${form.sectiong.color}; color:white;`"> -->
              <div class="" >
              <h1 class="ma-4" style="paddding-top: 4px;">{{form.sectiong.h2}}</h1>
              <p class="ma-4" style="paddding-top: 4px;">{{form.sectiong.description}}...</p>
            
            <v-row v-if="form.sectiong.modules.length> 0">
              <v-col class="ma-2"  v-for="(widget, i) in form.sectiong.modules" :key="i" cols="3" :md="widget.columns">
               <img v-if="widget.coverImage" :src="`${serverUrl}/uploads/pages/${widget.coverImage}`" width="200px" />
                <h2>{{widget.h1}}</h2>
                <p>{{widget.description}}...</p>
                <div v-if="!!widget.id" class="" style="display:flex; justify-content: space-between;">
                  <div class="" >
                  <v-btn  color="accent" text x-small @click="createsectiong(form.sectiong, widget)"
                    >edit</v-btn></div>
                  <div class="">
                  <v-btn  color="accent" text x-small @click="deletemodule(form.sectiong, widget)"
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
  <sectionc :dialogsectionc="dialogsectionc" :sectioncclose="sectioncclose" :section="section" :widget="widget"/>
  <sectiond :dialogsectiond="dialogsectiond" :sectiondclose="sectiondclose" :section="section" :widget="widget"/>
  <sectione :dialogsectione="dialogsectione" :sectioneclose="sectioneclose" :section="section" :widget="widget"/>
  <sectionf :dialogsectionf="dialogsectionf" :sectionfclose="sectionfclose" :section="section" :widget="widget"/>
  <sectiong :dialogsectiong="dialogsectiong" :sectiongclose="sectiongclose" :section="section" :widget="widget" />
  <sectioninfo :dialogsectioninfo="dialogsectioninfo" :sectioninfoclose="sectioninfoclose" :section="section" :h2exist="h2exist"/>
    <snackbar ref="snackbar"></snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import sectiona from './_components/sectiona.vue';
import sectionb from './_components/sectionb.vue';
import sectionc from './_components/sectionc.vue';
import sectiond from './_components/sectiond.vue';
import sectione from './_components/sectione.vue';
import sectionf from './_components/sectionf.vue';
import sectiong from './_components/sectiong.vue';
import sectioninfo from './_components/sectioninfo.vue';
export default {
  components: { sectiona , sectionb,sectiond, sectione, sectionf, sectiong, sectionc, sectioninfo },
  data() {
    return {
      dialogsectiona: false,
      dialogsectionb: false,
      dialogsectiond: false,
      dialogsectione: false,
      dialogsectionf: false,
      dialogsectiong: false,
      dialogsectionc: false,
      dialogsectioninfo: false,
      search: null,
      sectorData: [],
      section: {},
      widget: {},
      h2exist: false,
      headers: [
        { text: "Page", value: "url" },
        { text: "Heading", value: "h1" },
        { text: "View", value: "view" },
        { text: "Delete", value: "delete" },
      ],
      form: {
        sectiona: {},
        sectionb: {},
        sectionc: {},
        sectiond: {},
        sectione: {},
        sectionf: {},
        sectiong: {}
      },
      forms: {
        sectiona: {
          page:'home',
          section:'Section a',
          modules: [
            {columns: 12}
          ],
        },
        sectionb: {
          page:'home',
          section:'Section b',
          modules: [
            {columns: 4}
          ],
        },
        sectionc: {
          page:'home',
          section:'Section c',
          modules: [
            {columns: 4}
          ],
        },
        sectiond: {
          page:'home',
          section:'Section d',
          modules: [
            {columns: 4}
          ],
        },
        sectione: {
          page:'home',
          section:'Section e',
          modules: [
            {columns: 4}
          ],
        },
        sectionf: {
          page:'home',
          section:'Section f',
          modules: [
            {columns: 4}
          ],
        },
        sectiong: {
          page:'home',
          section:'Section g',
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
      const url ="/sector?page=home";
      const self = this;
      this.$store
        .dispatch("expressGet", url)
        .then((res) => {
          if (res.state) {
            self.sectorData = res.records;
            // console.log(">>>>>>>>>>", self.sectorData)
        //     let arra = [
        // {sectiona: 'Section A'},
        // {sectionb: 'Section B'},
        // {sectionc: 'Section C'},
        // {sectiond: 'Section D'},
        // {sectione: 'Section E'},
        // {sectionf: 'Section F'},
        // {sectiong: 'Section G'}]
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
        self.form.sectione = self.sectorData.find(item => item.section === 'Section e')
        if (self.form.sectione === 'undefined'|| !self.form.sectione ){
          self.form.sectione = self.forms.sectione
          self.form.sectione._id = ''
        }
        self.form.sectionf = self.sectorData.find(item => item.section === 'Section f')
        if (self.form.sectionf === 'undefined'|| !self.form.sectionf ){
          self.form.sectionf = self.forms.sectionf
          self.form.sectionf._id = ''
        }
        self.form.sectiong = self.sectorData.find(item => item.section === 'Section g')
        if (self.form.sectiong === 'undefined'|| !self.form.sectiong ){
          self.form.sectiong = self.forms.sectiong
          self.form.sectiong._id = ''
        }
        console.log("--------dwfsvddberg", self.form.sectiona._id)

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
      console.log(">>>>>>b ----", this.section, this.widget)
    this.dialogsectionb = true
    },    
    sectionbclose(){
    this.dialogsectionb = false
    }, 
    createsectionc(val, widget){
      this.section = val
      this.widget = widget
    this.dialogsectionc = true
    },    
    sectioncclose(){
    this.dialogsectionc = false
    }, 
    createsectione(val, widget){
      this.section = val
      this.widget = widget
    this.dialogsectione = true
    },    
    sectiondclose(){
    this.dialogsectiond = false
    }, 
    createsectiond(val, widget){
      this.section = val
      this.widget = widget
    this.dialogsectiond = true
    },    
    sectioneclose(){
    this.dialogsectione = false
    }, 
    createsectionf(val, widget){
      this.section = val
      this.widget = widget
    this.dialogsectionf = true
    },    
    sectionfclose(){
    this.dialogsectionf = false
    }, 
    createsectiong(val, widget){
      this.section = val
      this.widget = widget
    this.dialogsectiong = true
    },    
    sectiongclose(){
    this.dialogsectiong = false
    }, 
    createsectioninfo(part,e){
      this.section = part
      this.h2exist = e
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