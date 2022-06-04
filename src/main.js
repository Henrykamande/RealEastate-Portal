import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './assets/styles.css'

import router from './routes/router';
import store from './store/store';
// layouts
import DefaultLayout from './layout/default.vue';

// import AuthLayout from './layout/auth.vue';

// socket.io imports
// import socketio from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io';
// end

// reusable components
import Snackbar from '@/components/global/snackbar.vue';
import DatePicker from '@/components/global/datepicker.vue'
import TimePicker from '@/components/global/timepicker.vue'

// reports exporting to files
import JsonExcel from 'vue-json-excel'
import pdf from 'vue-pdf'


import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB7r43uNpFPCaOlSJq_w6qh7yLPe1FUnQE",
    libraries: 'places'
  }
}
)

Vue.use(require('vue-moment'));
Vue.component('Snackbar', Snackbar);
Vue.component('DatePicker', DatePicker);
Vue.component('TimePicker', TimePicker);
// end of reusable
// Vue.component('AuthLayout', AuthLayout);
Vue.component('DefaultLayout', DefaultLayout);
Vue.component('ExcelExport', JsonExcel);
Vue.component('ExportPDF', pdf);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  // apolloProvider,
  render: h => h(App)
}).$mount('#app')
