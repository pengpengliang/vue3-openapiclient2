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
          <li :class="[{'active': moduleName == 'regList'}]" @click="changeModule('regList')">
            <i class="el-icon-document-add" style="margin-right:8px"></i>
            <span>注册列表</span>
          </li>
          <li :class="[{'active': moduleName == 'applyList'}]" @click="changeModule('applyList')">
            <svg-icon name="apply" size="14" style="margin-right:8px" :color="`${moduleName == 'applyList'?'#fff':'#000'}`"></svg-icon>
            <span>申请列表</span>
          </li>
          <li :class="[{'active': moduleName == 'approvalList'}]" @click="changeModule('approvalList')">
            <svg-icon
              name="approvalTable"
              size="14"
              style="margin-right:8px"
              :color="`${moduleName == 'approvalList'?'#fff':'#000'}`"
            ></svg-icon>
            <span>审批列表</span>
          </li>
          <li :class="[{'active': moduleName == 'approvalRecord'}]" @click="changeModule('approvalRecord')">
            <svg-icon
              name="approvalRecord"
              size="14"
              style="margin-right:8px"
              :color="`${moduleName == 'approvalRecord'?'#fff':'#000'}`"
            ></svg-icon>
            <span>审批记录</span>
          </li>
        </ul>
      </div>
      <div class="personalCenterContent">
        <div v-show="moduleName === 'regList'">注册列表</div>
        <div v-show="moduleName === 'applyList'">申请列表</div>
        <div v-show="moduleName === 'approvalList'">审批列表</div>
        <div v-show="moduleName === 'approvalRecord'">审批记录</div>

      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { ref } from 'vue';
export default {
  setup() {
    const moduleName = ref("regList")
    const changeModule = (name) => {
      moduleName.value = name
    }
    return {
      changeModule,
      moduleName
    };
  },
  components: {
    Header,
  },
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
