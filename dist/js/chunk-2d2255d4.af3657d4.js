(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2255d4"],{e3a1:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-card",[a("v-toolbar",{attrs:{color:"toolbarColor",dense:"",dark:""}},[a("v-toolbar-title",[t._v("Slider Images Manager")])],1),a("v-card-text",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-btn",{attrs:{color:"accent",text:"",to:"/new-slider"}},[a("v-icon",[t._v("mdi-plus")]),t._v("New Slider ")],1)],1)],1),a("v-row",t._l(t.sliders,(function(e){return a("v-col",{key:e._id,attrs:{cols:"4"}},[a("v-card",{staticClass:"mx-auto"},[a("v-img",{staticStyle:{"background-size":"contain"},attrs:{src:t.serverUrl+"/uploads/slider/"+e.coverImage}}),a("v-card-title",[t._v(t._s(e.title))]),a("v-card-actions",[a("v-btn",{attrs:{color:"accent",text:"",to:"/slider/details/"+e.url}},[t._v("More Details")]),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(a){return t.openModal(e)}}},[a("v-icon",{attrs:{color:"red",left:""}},[t._v("mdi-delete")])],1)],1)],1)],1)})),1),a("v-row",[a("v-dialog",{attrs:{"max-width":"650px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-toolbar",{attrs:{dense:"",color:"primary",dark:""}},[a("v-toolbar-title",[t._v("Delete Slider")]),a("v-spacer"),a("v-btn",{attrs:{icon:"",dark:""},nativeOn:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("v-card-text",[a("v-row",{staticClass:"subtitle-2 text--primary"},[a("v-col",{attrs:{cols:"12"}}),a("v-col",{attrs:{cols:"12"}},[t._v(" Are you sure you want to delete this slider - "),t.activeSlider?a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.activeSlider.title))]):t._e(),t._v(" ? ")]),a("v-col",{attrs:{cols:"12"}},[a("v-btn",{attrs:{color:"red",dark:"",loading:t.loader},on:{click:t.deleteSlider}},[t._v("Yes")])],1)],1)],1)],1)],1)],1)],1)],1)],1)},o=[],s=a("5530"),i=a("2f62"),c={computed:Object(s["a"])({},Object(i["b"])(["serverUrl"])),data:function(){return{sliders:[],loader:!1,activeSlider:{},dialog:!1}},methods:{openModal:function(t){this.activeSlider=Object.assign({},t),this.dialog=!0},deleteSlider:function(){var t=this,e="/slider/".concat(this.activeSlider._id),a=this;this.loader=!0,this.$store.dispatch("expressRemove",e).then((function(t){t.state?location.reload():a.$refs.snackbar.show(t.msg,"red")})).catch((function(e){t.$refs.snackbar.show(e,"red")}))},getData:function(){var t=this,e="/slider",a=this;this.$store.dispatch("expressGet",e).then((function(t){t.state?a.sliders=t.records:a.$refs.snackbar.show(t.msg,"red")})).catch((function(e){t.$refs.snackbar.show(e,"red")}))}},created:function(){this.getData()}},l=c,d=a("2877"),n=a("6544"),v=a.n(n),u=a("8336"),f=a("b0af"),b=a("99d9"),h=a("62ad"),p=a("a523"),g=a("169a"),_=a("132d"),w=a("adda"),m=a("0fd9"),k=a("2fa4"),V=a("71d9"),x=a("2a7f"),S=Object(d["a"])(l,r,o,!1,null,"c4388dae",null);e["default"]=S.exports;v()(S,{VBtn:u["a"],VCard:f["a"],VCardActions:b["a"],VCardText:b["c"],VCardTitle:b["d"],VCol:h["a"],VContainer:p["a"],VDialog:g["a"],VIcon:_["a"],VImg:w["a"],VRow:m["a"],VSpacer:k["a"],VToolbar:V["a"],VToolbarTitle:x["a"]})}}]);
//# sourceMappingURL=chunk-2d2255d4.af3657d4.js.map