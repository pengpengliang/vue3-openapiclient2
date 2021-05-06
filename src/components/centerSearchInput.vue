<!--
 * @Date: 2021-01-25 11:23:20
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <div class="changeTableList">
    <div class="searchInput">
      <el-input
        size="small"
        v-model="searchValue"
        placeholder="服务名称或注册人姓名"
        @change="changeSearchValue"
        prefix-icon="el-icon-search"
        clearable
      ></el-input>
    </div>
    <div class="filterDate">
      <span>注册时间</span>
      <el-date-picker
        v-model="timePickerValue"
        size="small"
        align="right"
        unlink-panels
        type="daterange"
        start-placeholder="开始日期"
        range-separator="至"
        end-placeholder="结束日期"
        :shortcuts="shortcuts"
        format="YYYY/MM/DD"
        @change="changeTimePicker"
      ></el-date-picker>
    </div>
    <!-- <div class="funtionBtnGroup">
      <el-button class="functionBtn" @click.stop="createResources">
        <i class="el-icon-document-add"></i>
        注册资源
      </el-button>
      <el-button class="functionBtn" @click.stop="exportExcel">
        <svg-icon
          style="color: inherit; display: inline-block; margin-right: 5px"
          icon-class="exported"
        ></svg-icon
        >导出
      </el-button>
    </div> -->
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup(props, context) {
    const state = reactive({
      searchValue: "",
      timePickerValue: [],
      shortcuts: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
    });
    const changeSearchValue = (value) => {
      context.emit("changeSearchValue", value);
    };
    const changeTimePicker = (value) => {
      context.emit("changeTimePicker", value);
    };
    return {
      ...toRefs(state),
      changeSearchValue,
      changeTimePicker,
    };
  },
};
</script>

<style lang="scss" scoped>
.changeTableList {
  display: flex;
  .searchInput {
    ::v-deep(input) {
      border-radius: 15px;
      border: 1px solid #2dad7d;
    }
  }
  .filterDate {
    margin: 0 10px;
    > span {
      margin-right: 8px;
      color: #6b7581;
    }
    ::v-deep(.el-range-separator) {
        width: 20px;
      .el-input__inner {
        width: 250px;
        border-radius: 15px;
      }
    }
    ::v-deep(.el-input__inner) {
        width: 250px;
        border-radius: 15px;
    }
  }
  .funtionBtnGroup {
    .functionBtn {
      height: 30px;
      border-radius: 15px;
      background-color: #fff;
      color: #2dae7d;
    }
    .functionBtn:hover {
      background-color: #2dae7d;
      color: #ffffff;
    }
    .functionBtn:focus {
      background-color: #ffffff;
      color: #2dae7d;
    }
    ::v-deep(.functionBtn) {
      span {
        position: relative;
        top: -7px;
      }
    }
  }
}
</style>