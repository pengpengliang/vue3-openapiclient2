<!--
 * @Date: 2021-01-13 17:56:59
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <div class="personalCenterContainer">
    <Header></Header>
    <div class="personalCenter">
      <div class="personalCenterList">
        <ul>
          <li
            :class="[{ active: activeListName == 'regList' }]"
            @click="changeListName('regList')"
          >
            <i class="el-icon-document-add" style="margin-right: 8px"></i>
            <span>注册列表</span>
          </li>
          <li
            :class="[{ active: activeListName == 'applyList' }]"
            @click="changeListName('applyList')"
          >
            <svg-icon
              name="apply"
              size="14"
              style="margin-right: 8px"
              :color="`${activeListName == 'applyList' ? '#fff' : '#000'}`"
            ></svg-icon>
            <span>申请列表</span>
          </li>
          <li
            :class="[{ active: activeListName == 'approvalList' }]"
            @click="changeListName('approvalList')"
          >
            <svg-icon
              name="approvalTable"
              size="14"
              style="margin-right: 8px"
              :color="`${activeListName == 'approvalList' ? '#fff' : '#000'}`"
            ></svg-icon>
            <span>审批列表</span>
          </li>
          <li
            :class="[{ active: activeListName == 'approvalRecord' }]"
            @click="changeListName('approvalRecord')"
          >
            <svg-icon
              name="approvalRecord"
              size="14"
              style="margin-right: 8px"
              :color="`${activeListName == 'approvalRecord' ? '#fff' : '#000'}`"
            ></svg-icon>
            <span>审批记录</span>
          </li>
        </ul>
      </div>
      <div class="personalCenterContent">
        <RegList v-show="activeListName === 'regList'"></RegList>
        <div v-show="activeListName === 'applyList'">申请列表</div>
        <div v-show="activeListName === 'approvalList'">审批列表</div>
        <div v-show="activeListName === 'approvalRecord'">审批记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex'
import changeModule from '@/use/changeModule.js'
import Header from "@/components/header";
import RegList from "./regList/index"
export default {
  setup() {
    const store = useStore()
    const state = store.state.centerModule;
    const activeListName = computed(()=>{
      return state.activeList
    });
    let {changeListName} = changeModule();
    return {
      activeListName,
      changeListName
    };
  },
  components: {
    Header,
    RegList
  }
};
</script>

<style lang="scss" scoped>
.personalCenterContainer {
  height: 100%;
  .personalCenter {
    display: flex;
    height: calc(100% - 60px);
    .personalCenterList {
      width: 200px;
      height: 100%;
      margin-right: 10px;
      background-color: #ffffff;
      .iconClass {
        margin-right: 5px;
      }
      li {
        width: 180px;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 14px;
        cursor: pointer;
      }
      .active {
        color: #ffffff;
        background-color: #2dae7d;
      }
    }
    .personalCenterContent {
      width: calc(100% - 210px);
      height: 100%;
      overflow: auto;
      background-color: #ffffff;
    }
  }
}
</style>
