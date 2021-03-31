<!--
 * @Date: 2021-03-24 14:23:24
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <div class="mapTable">
    <el-table
      class="regMapTable"
      :data="tableData"
      stripe
      style="width: 100%"
      @row-click="handleRowClick"
    >
      <el-table-column
        prop="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column prop="resourcename" label="服务名称"></el-table-column>
      <el-table-column
        prop="title"
        label="服务主题"
        :filters="serviceTheme"
        :filter-multiple="false"
        :filter-method="handleServiceThemeFilter"
      ></el-table-column>
      <el-table-column prop="registerdate" label="注册时间"></el-table-column>
      <el-table-column prop="username" label="注册人"></el-table-column>
      <el-table-column
        label="服务状态"
        :filters="publishStatus"
        :filter-multiple="false"
        :filter-method="handlePublishStatusFilter"
        :class-name="'serviceStatus'"
      >
        <template #default="scope">
          <span style="margin-left: 10px">{{
            getPublishStatus(scope.row.isshared)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        :filters="auditStatus"
        :filter-multiple="false"
        :filter-method="handleAuditStatusFilter"
      >
        <template #default="scope">
          <span style="margin-left: 10px">{{
            getAuditStatus(scope.row.curactid)
          }}</span>
          <el-button
            v-if="scope.row.curactid === 'A004'"
            @click.stop.prevent="viewResult(scope.row.resourceid)"
            type="text"
            size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedate"
        label="最近一次更新时间"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            class="operation-button"
            v-if="
              (scope.row.curactid === 'A005' || scope.row.curactid == null) &&
              scope.row.usemapproxy == 1 &&
              scope.row.isshared !== 3 &&
              scope.row.isshared !== 2 &&
              scope.row.usemapproxy == 1
            "
            @click.stop.prevent="update(scope.$index, tableData)"
            type="text"
            size="small"
            >更新</el-button
          >
          <el-button
            class="operation-button"
            v-if="
              (scope.row.curactid === 'A005' || scope.row.curactid == null) &&
              (scope.row.isshared === 1 || scope.row.isshared === 4)
            "
            @click.stop.prevent="start(scope.$index, tableData)"
            type="text"
            size="small"
            >{{
              tableData[scope.$index].isshared === 4 ? "启用" : "停用"
            }}</el-button
          >

          <el-button
            class="operation-button"
            v-if="
              (scope.row.curactid !== 'A003' || scope.row.curactid == null) &&
              scope.row.isshared !== 2 &&
              scope.row.isshared !== 3
            "
            @click.stop.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
            >删除</el-button
          >
          <el-button
            class="operation-button"
            v-if="scope.row.curactid === 'A004'"
            @click.stop.prevent="updateResources(scope.$index, tableData)"
            type="text"
            size="small"
            >重新提交</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="tablePagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="pageindex"
        :total="total"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import {
  getAuditStatus,
  auditStatus,
  getPublishStatus,
  publishStatus,
} from "@/utils/common.js";

import api from "@/api/index.js";
export default {
  props: {
    timeData: {
      type: Array,
      default: ()=>[]
    },
    searchData: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    console.log(props);
    const state = reactive({
      tableData: [],
      serviceTheme: [], //服务主题数据
      selectedServiceTheme: null, //选中的服务主题
      publishStatus: publishStatus,
      selectedServiceStatus: null, //选中的服务状态
      auditStatus: auditStatus,
      selectedApproveStatus: null, //选中的审批状态
      pageindex: 1,
      pagesize: 10,
      total: 10,
    });
    onMounted(async () => {
      let obj = {
        // starttime: 2021 / 03 / 01,
        // endtime: 2021 / 03 / 02,
        pageindex: state.pageindex,
        pagesize: state.pagesize,
      };
      const serviceTheme = await api.center.getResourceTree(); //服务主题数据
      state.serviceTheme = serviceTheme;
      getMyResources(obj)
    });
    // watch([props.timeData, props.searchData], ([newfoo, newbar], [prevfoo, prevbar]) => {

    // })
    const getMyResources = async (params) => {
      const myResourcesData = await api.center.getMyResources(params); //列表数据
      state.tableData = myResourcesData.objects;
      state.total = myResourcesData.count;
    }
    const methods = {
      handleRowClick() {},
      handleServiceThemeFilter(value) {
        if (state.selectedServiceTheme == value) {
          return;
        }
        state.selectedServiceTheme = value;
        let obj = {
          resourcetreeid: value,
          pageindex: 1,
          pagesize: state.pagesize,
          name: props.searchData
        }
        getMyResources(obj)
        console.log(obj);
      },
      handlePublishStatusFilter(value) {
        console.log(value);
      },
      handleAuditStatusFilter(value) {
        console.log(value);
      },
      update() {},
      start() {},
      deleteRow() {},
      updateResources() {},
      handleCurrentChange() {},
    };
    return { ...toRefs(state), ...methods, getAuditStatus, getPublishStatus };
  },
};
</script>

<style lang="scss" scoped>
.serviceStatus{
::v-deep {
    .el-table-filter {
      .el-table-filter__list {
        height: 50px;
        overflow: auto;
      }
    }
  }
}


.mapTable {
  .regMapTable {
    ::v-deep {
      .el-table__header-wrapper {
        .el-table__header {
          tr {
            th {
              background-color: #f8f9ff;
              color: #6b7581;
              .blueFont {
                color: #2dae7d;
              }
              .el-select {
                position: absolute;
                width: 50px;
              }
              .el-input__inner {
                visibility: hidden;
              }
              .el-input__suffix {
                visibility: hidden;
              }
            }
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__row {
          td {
            padding: 8px 0px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .tablePagination {
    text-align: right;
    margin-top: 30px;
  }
}
</style>