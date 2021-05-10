/*
 * @Date: 2021-05-07 11:07:19
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import api from "@/api/index.js";
const centerModule = {
  state: {
    inputValue: "", //搜索
    regMapTableData: [], //注册列表 地图服务 表格数据
    regMapTableDataCount: 0, //数据数量
    timeData: [], //日期
    activeModule: "map", //列表里的子模块
    activeList: "regList", //列表
    pageIndex: 1,
    isshared: null,
    resourcetreeid: null,
    curactid: null
  },
  mutations: {
    //改变所有搜索框的值
    changeInputValue(state, payload) {
      state.inputValue = payload;
    },
    //改变所有日期选择的值
    changeTimePickerValue(state, payload) {
      state.timeData = payload;
    },
    //改变列表里的子模块
    changeModuleName(state, payload) {
      state.activeModule = payload;
    },
    //改变列表
    changeListName(state, payload) {
      state.activeList = payload;
    },
    changePageIndex(state, payload) {
      state.pageIndex = payload;
    },
    changeIsshared(state, payload) {
      state.isshared = payload;
    },
    changeResourcetreeid(state, payload) {
      state.resourcetreeid = payload;
    },
    changeCuractid(state, payload) {
      state.curactid = payload;
    },
    //改变注册列表-地图服务表格数据
    changeRegMapTableData(state, payload) {
      state.regMapTableDataCount = payload.count;
      state.regMapTableData = payload.objects;
    },
  },
  actions: {
    getTableData({ commit, state }, payload) {
      console.log(payload);
      let params = {
        pageindex: state.pageIndex,
        pagesize: 10,
        name: state.inputValue,
        isshared: state.isshared,
        resourcetreeid: state.resourcetreeid,
        curactid: state.curactid,
        starttime:
          state.timeData && state.timeData.length > 0
            ? state.timeData[0]
            : null,
        endtime:
          state.timeData && state.timeData.length > 0
            ? state.timeData[1]
            : null,
      };
      switch (payload.type) {
        case "inputChange":
          commit("changeInputValue", payload.value);
          params.name = payload.value;
          break;
        case "timePickerChange":
          commit("changeTimePickerValue", payload.value);
          params.starttime =
            payload.value && payload.value.length > 0 ? payload.value[0] : null;
          params.endtime =
            payload.value && payload.value.length > 0 ? payload.value[1] : null;
          break;
        case "pageIndexChange":
          commit("changePageIndex", payload.value);
          params.pageindex = payload.value;
          break;
        case "issharedChange":
          commit("changeIsshared", payload.value);
          params.isshared = payload.value;
          break;
        case "themeChange":
          commit("changeResourcetreeid", payload.value);
          params.resourcetreeid = payload.value;
          break;
        case "curactidChange":
          commit("changeCuractid", payload.value);
          params.curactid = payload.value;
          break;
        case "refresh":
          // params = params;
          break;
        default:
          break;
      }
      api.center.getMyResources(params).then(({ objects, count }) => {
        console.log(objects, count);
        commit("changeRegMapTableData", {
          objects,
          count,
        });
      });
    },
  },
};

export default centerModule;
