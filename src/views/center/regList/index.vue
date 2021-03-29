<!--
 * @Date: 2021-01-25 11:05:56
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <div class="registerResource">
    <div class="filterList">
      <CenterSwitchModule @changeModuleName="changeModuleName" />
      <CenterSearchInput
        @changeSearchValue="changeSearchValue"
        @changeTimePicker="changeTimePicker"
      />
    </div>
    <service :timeData="timeData" :searchData="searchData"/>
  </div>
</template>

<script>
import CenterSwitchModule from "@/components/centerSwitchModule";
import CenterSearchInput from "@/components/centerSearchInput";
import {getDate} from "@/utils/common.js";
import { reactive, toRefs } from 'vue';
import Service from './service.vue';
export default {
  setup() {
    const state = reactive({
      moduleName: '',
      timeData: [],
      searchData: ''
    })
    const changeModuleName = (moduleName) => {
      state.moduleName = moduleName
    };
    const changeSearchValue = (val) => {
      state.searchData = val
    };
    const changeTimePicker = (val) => {
      if (val && val.length > 0) {
        //改个格式
        val.map((item,index) => {
          let dd = {
            date: item,
            format: "yyyy/MM/dd",
          };
          let d = getDate(dd);
          val[index] = d;
        });
        state.timeData = val
      } else {
        state.timeData = []
      }
    };
    return {
      ...toRefs(state),
      changeModuleName,
      changeSearchValue,
      changeTimePicker,
    };
  },
  components: {
    CenterSwitchModule,
    CenterSearchInput,
    Service,
  },
};
</script>

<style lang="scss" scoped>
.registerResource {
  width: calc(100% - 40px);
  margin: 0 auto;
  .filterList {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
  }
}
</style>