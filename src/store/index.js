/*
 * @Date: 2021-01-13 11:27:42
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import { createStore } from "vuex";

export default createStore({
  state: {
    hasToken: false
  },
  mutations: {
    changeToken(state,bool){
      console.log(bool)
      state.hasToken = bool
    }
  },
  actions: {},
  modules: {}
});
