/*
 * @Date: 2021-01-14 16:08:12
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
/**
 * api接口的统一出口
 */
import center from "@/api/center";
import login from "@/api/login";
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
    duration: duration
  });
};
// 导出接口
export default {
  toast,
  center,
  login
};
