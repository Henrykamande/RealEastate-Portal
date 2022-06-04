import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: "#261251",
        accent: "#F76800",
        toolbarColor: "#F76800",
        secondary: "#FAFAFA",
        error: "#b71c1c",
        tabColor: "#BDBDBD",
        iconColor: "#03A9F4",
        flatButton: "#03A9F4",
      },
    },
  },
});
