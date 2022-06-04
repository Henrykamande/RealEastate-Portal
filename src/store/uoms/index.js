import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  uoms: [],
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};