(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f0dd0"],{"9dd3":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",{attrs:{fluid:""}},[o("v-card",[o("v-toolbar",{attrs:{color:"toolbarColor",dense:"",dark:""}},[o("v-toolbar-title",[t._v("Model")])],1),o("v-card-text",[o("v-col",{attrs:{cols:"12"}},[o("v-row",[o("v-col",{attrs:{cols:"4"}},[o("h2",[t._v(" "+t._s(t.section.page)+" - page")])]),o("v-col",{attrs:{cols:"4"}},[o("h2",[t._v("Section: "+t._s(t.section.section)+" ")])]),o("v-col",{attrs:{cols:"4"}},[o("v-btn",{attrs:{text:"",color:"accent",to:"/new/modelo?url="+t.section._id}},[o("v-icon",{attrs:{left:""}},[t._v("mdi-plus")]),t._v("New Widget ")],1)],1)],1)],1),o("v-row",t._l(t.modelos,(function(e){return o("v-col",{key:e._id,attrs:{cols:"4"}},[o("v-card",{staticClass:"mx-auto",attrs:{to:"/modelo/details/"+e._id+"?url="+t.section._id}},[o("v-img",{staticStyle:{"max-height":"200px"},attrs:{src:t.serverUrl+"/uploads/modelo/"+e.coverImage,height:"200px"}}),o("v-card-title",[t._v(" "+t._s(e.h1)+" ")]),o("v-card-subtitle",[t._v(" "+t._s(e.h2)+" ")]),o("v-card-actions",[o("v-btn",{attrs:{color:"accent",text:"",to:"/modelo/details/"+e._id+"?url="+t.section._id}},[t._v("More Details")]),o("v-spacer"),o("v-btn",{attrs:{color:"red",text:""},on:{click:function(o){return t.deleteItem(e._id)}}},[t._v("Delete")])],1)],1)],1)})),1)],1)],1),o("snackbar",{ref:"snackbar"})],1)},r=[],c=o("5530"),s=(o("99af"),o("2f62")),n={computed:Object(c["a"])({},Object(s["b"])(["serverUrl"])),data:function(){return{section:{},modelos:[]}},methods:{getData:function(){var t=this,e=this;this.$store.dispatch("get","/sections/".concat(e.$route.query.url)).then((function(t){t.state?(e.section=t.record,e.getData1(e.section)):e.$refs.snackbar.show(t.msg,"red")})).catch((function(e){t.$refs.snackbar.show(e,"red")}))},deleteItem:function(t){var e=this,o=this;this.$store.dispatch("remove","/modelo/".concat(t)).then((function(t){t.state?o.$router.push("/modelo?url=".concat(o.$route.query.url)):o.$refs.snackbar.show(t.msg,"red")})).catch((function(t){e.$refs.snackbar.show(t,"red")}))},getData1:function(t){var e=this,o="/modelo?page=".concat(t.page,"&section=").concat(t.section),a=this;this.$store.dispatch("get",o).then((function(t){t.state&&(a.modelos=t.records)})).catch((function(t){console.log(t,"error"),e.$refs.snackbar.show(t,"red")}))}},created:function(){this.getData()}},i=n,d=o("2877"),l=o("6544"),u=o.n(l),v=o("8336"),h=o("b0af"),f=o("99d9"),b=o("62ad"),m=o("a523"),_=o("132d"),p=o("adda"),g=o("0fd9"),w=o("2fa4"),V=o("71d9"),k=o("2a7f"),$=Object(d["a"])(i,a,r,!1,null,"6c9dba46",null);e["default"]=$.exports;u()($,{VBtn:v["a"],VCard:h["a"],VCardActions:f["a"],VCardSubtitle:f["b"],VCardText:f["c"],VCardTitle:f["d"],VCol:b["a"],VContainer:m["a"],VIcon:_["a"],VImg:p["a"],VRow:g["a"],VSpacer:w["a"],VToolbar:V["a"],VToolbarTitle:k["a"]})}}]);
//# sourceMappingURL=chunk-2d0f0dd0.a727fe29.js.map