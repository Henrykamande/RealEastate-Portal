(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d230e48"],{ede8:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:""}},[e("v-card",[e("v-toolbar",{attrs:{color:"toolbarColor",dense:"",dark:""}},[e("v-toolbar-title",[t._v("Pages")])],1),e("v-card-text",[e("v-row",[e("v-col",{attrs:{cols:"12"}},[e("v-btn",{attrs:{text:"",color:"accent"},on:{click:t.openModal}},[e("v-icon",{attrs:{left:""}},[t._v("mdi-plus")]),t._v("New Page ")],1),e("v-data-table",{attrs:{headers:t.headers,items:t.pago},scopedSlots:t._u([{key:"item.url",fn:function(a){var o=a.item;return["home"===o.url?e("v-btn",{attrs:{color:"accent",text:"",to:"/sector"}},[t._v(t._s(o.url))]):t._e(),"about"===o.url?e("v-btn",{attrs:{color:"accent",text:"",to:"/sectorb"}},[t._v(t._s(o.url))]):t._e()]}}],null,!0)})],1)],1),e("v-row",[e("v-dialog",{attrs:{"max-width":"750px"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("v-card",[e("v-toolbar",{attrs:{dense:"",color:"toolbarColor",dark:""}},[e("v-toolbar-title",[t._v("Create Page")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},nativeOn:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-card-text",[e("v-container",{attrs:{fluid:""}},[e("v-row",{staticClass:"subtitle-2 text--primary"},[e("v-col",{attrs:{cols:"12",xs:"12",sm:"6",md:"6"}},[e("v-text-field",{attrs:{label:"Name",outlined:"",dense:""},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}})],1),e("v-col",{attrs:{cols:"12",xs:"12",sm:"6",md:"6"}},[e("v-text-field",{attrs:{label:"Url",readonly:"",filled:"",outlined:"",dense:""},model:{value:t.url,callback:function(a){t.url=a},expression:"url"}})],1),e("v-col",{attrs:{cols:"12"}},[e("v-btn",{attrs:{color:"accent",loading:t.loader},on:{click:t.save}},[e("v-icon",{attrs:{left:""}},[t._v("mdi-content-save")]),t._v("Save ")],1)],1)],1)],1)],1)],1)],1)],1),e("snackbar",{ref:"snackbar"})],1)],1)],1)},r=[],l=(e("a15b"),e("ac1f"),e("1276"),e("d3b7"),e("25f0"),e("b0c0"),{computed:{url:function(){return this.name.toString().toLowerCase().split(" ").join("-")}},data:function(){return{dialog:!1,loader:!1,name:"",record:{},pago:[],headers:[{text:"Name",value:"name"},{text:"Url",value:"url"}]}},methods:{openModal:function(){this.dialog=!0},save:function(){var t=this,a={name:this.name,url:this.url},e="/pago";this.loader=!0,this.$store.dispatch("expressPost",{url:e,data:a}).then((function(t){t.state?location.reload():self.$refs.snackbar.show(t.msg,"red")})).finally((function(){location.reload()})).catch((function(a){t.$refs.snackbar.show(a,"red")}))},getData:function(){var t=this,a="/pago",e=this;this.$store.dispatch("expressGet",a).then((function(t){t.state?e.pago=t.records:e.$refs.snackbar.show(t.msg,"red")})).catch((function(a){t.$refs.snackbar.show(a,"red")}))}},created:function(){this.getData()}}),n=l,s=e("2877"),c=e("6544"),i=e.n(c),d=e("8336"),u=e("b0af"),v=e("99d9"),f=e("62ad"),b=e("a523"),m=e("8fea"),h=e("169a"),p=e("132d"),g=e("0fd9"),x=e("2fa4"),k=e("8654"),w=e("71d9"),_=e("2a7f"),V=Object(s["a"])(n,o,r,!1,null,"1eef2421",null);a["default"]=V.exports;i()(V,{VBtn:d["a"],VCard:u["a"],VCardText:v["c"],VCol:f["a"],VContainer:b["a"],VDataTable:m["a"],VDialog:h["a"],VIcon:p["a"],VRow:g["a"],VSpacer:x["a"],VTextField:k["a"],VToolbar:w["a"],VToolbarTitle:_["a"]})}}]);
//# sourceMappingURL=chunk-2d230e48.d2913d42.js.map