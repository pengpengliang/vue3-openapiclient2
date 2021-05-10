/*
 * @Date: 2021-01-13 11:27:42
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import { createStore } from "vuex";
import centerModule from './module/center'
export default createStore({
  state: {
    hasToken: false
  },
  mutations: {
    changeToken(state,bool){
      state.hasToken = bool
    }
  },
  actions: {},
  modules: {
    centerModule
  }
});
