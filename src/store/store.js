import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

//  root utility
import getters from './root/getters';
import actions from './root/actions';
import mutations from './root/mutations';

import { rootUrl } from '../common/index';

// modules
import territory from './territory/index';
import salesEmployee from './sales-employees/index';
import uom from './uoms/index';
import survey from './surveys/index';
import currency from './currency/index';

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'stock',
});

export default new Vuex.Store({
  modules: {
    territory,
    currency,
    salesEmployee,
    uom,
    survey
  },
  state: {
    users: [],
    clients: [],
    user: null,
    isLoggedIn: false,
    host: rootUrl,
    loader: false
  },
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin],
});
