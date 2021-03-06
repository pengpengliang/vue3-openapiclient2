/*
 * @Date: 2021-01-14 16:09:13
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
/**
 * center模块接口列表
 */

import axios from "@/utils/http"; // 导入http中创建的axios实例
import config from "@/utils/config";
import { ElMessage } from "element-plus";
/**
 * 消息提示框
 * toastMsg：消息框主题内容
 * toastType:消息框的类型,(success/warning/info/error)
 * duration: 延迟关闭时间
 * **/
const toast = (toastMsg, toastType, duration = 3000) => {
  ElMessage({
    message: toastMsg,
    type: toastType,
    duration: duration,
  });
};
const center = {
  //获取地图服务目录
  getResourceTree() {
    let promise = new Promise((resolve, reject) => {
      let url = config.webRoot + `/project/getResourceTree`;
      axios({
        url: url,
        method: "get",
        params: { syskey: config.syskey },
      }).then((res) => {
        if (res.data.ReturnCode == 0) {
          let serviceTheme = res.data.Data.map(function(item) {
            return {
              value: item.id,
              text: item.title,
            };
          });
          resolve([...serviceTheme]);
        } else {
          toast(res.data.Message || "获取地图服务目录失败", "error");
          reject();
        }
      });
    });
    return promise;
  },
  //获取“我注册的地图服务列表”
  getMyResources(params) {
    let promise = new Promise((resolve, reject) => {
      let url = config.webRoot + `/project/getMyResources`;
      params.syskey = config.syskey;
      axios({
        url: url,
        method: "get",
        params: params,
      }).then((res) => {
        if (res.data.ReturnCode == 0) {
          let datas = res.data.Data;
          datas.objects.forEach((item, index) => {
            item.index = (datas.pageIndex - 1) * params.pagesize + index + 1;
          });
          resolve(datas);
        } else {
          toast(res.data.Message || "获取“我注册的地图服务列表”失败", "error");
          reject();
        }
      });
    });
    return promise;
  },
  //删除地图服务
  deleteResource(params) {
    let promise = new Promise((resolve, reject) => {
      let url = config.webRoot + `/project/deleteResource`;
      axios({
        url: url,
        method: "post",
        data: params,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.ReturnCode == 0) {
          resolve();
          toast("删除服务成功", "success");
        } else {
          toast(res.data.Message || "删除服务失败", "error");
          reject();
        }
      });
    });
    return promise;
  },
  //停用或启用地图服务
  changeIsShared(params,operation) {
    let promise = new Promise((resolve, reject) => {
      let url = config.webRoot + `/project/changeIsShared`;
      axios({
        url: url,
        method: "get",
        params: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((res) => {
        if (res.data.ReturnCode == 0) {
          resolve();
          toast("已" + operation + "服务", "success");
        } else {
          toast(res.data.Message || operation + "服务失败", "error");
          reject();
        }
      });
    });
    return promise;
  },
};

export default center;
