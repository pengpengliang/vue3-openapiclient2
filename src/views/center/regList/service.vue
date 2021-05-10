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
      @filter-change="changeOptions"
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
        column-key="theme"
      ></el-table-column>
      <el-table-column prop="registerdate" label="注册时间"></el-table-column>
      <el-table-column prop="username" label="注册人"></el-table-column>
      <el-table-column
        label="服务状态"
        :filters="publishStatus"
        :filter-multiple="false"
        :class-name="'serviceStatus'"
        column-key="service"
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
        column-key="audit"
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
        page-size="10"
        @current-change="changePageIndex"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
import Common from "@/utils/common.js";
import filterTableData from "@/use/filterTableData.js";
import api from "@/api/index.js";
export default {
  props: {
    timeData: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: String,
      default: "",
    },
  },
  setup() {
    const store = useStore();
    // 表格相关筛选方法 分页方法
    const { changePageIndex, changeOptions } = filterTableData();
    // 表格筛选数据
    const {
      getAuditStatus,
      auditStatus,
      getPublishStatus,
      publishStatus,
    } = Common();

    const tableData = computed(() => {
      return store.state.centerModule.regMapTableData;
    });
    const total = computed(() => {
      return store.state.centerModule.regMapTableDataCount;
    });
    const pageindex = computed(() => {
      return store.state.centerModule.pageIndex;
    });

    const state = reactive({
      serviceTheme: [], //服务主题数据
    });

    onMounted(async () => {
      store.dispatch("getTableData", {
        type: "refresh",
      });
      const serviceTheme = await api.center.getResourceTree(); //服务主题数据
      state.serviceTheme = serviceTheme;
    });

    const methods = {
      handleRowClick() {
        console.log(123);
      },
      update() {},
      async start(index, rows) {
        let operation = rows[index].isshared === 4 ? "启用" : "停用";
        let data = {
          resourceId: rows[index].resourceid,
        };
        await api.center.changeIsShared(data, operation);
        store.dispatch("getTableData", {
          type: "refresh",
        });
      },
      deleteRow(index, rows) {
        ElMessageBox.confirm("是否要删除该服务？", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "是",
          cancelButtonText: "否",
        }).then(async () => {
          let data = {
            resourceid: rows[index].resourceid,
          };
          await api.center.deleteResource(data);
          store.dispatch("getTableData", {
            type: "refresh",
          });
        });
      },
      updateResources() {},
    };

    return {
      tableData,
      total,
      changePageIndex,
      changeOptions,
      pageindex,
      ...toRefs(state),
      ...methods,
      getAuditStatus,
      getPublishStatus,
      auditStatus,
      publishStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
.serviceStatus {
  ::v-deep(.el-table-filter) {
    .el-table-filter__list {
      height: 50px;
      overflow: auto;
    }
  }
}

.mapTable {
  .regMapTable {
    ::v-deep(.el-table__header-wrapper) {
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
