/*
 * @Date: 2021-01-13 17:01:41
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import axios from "axios";
import router from "@/router/index.js";
import { ElMessage } from "element-plus";
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  ElMessage.error({
    message: msg,
    duration: 2000
  });
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: "login"
    // query: {
    //   redirect: router.currentRoute.fullPath
    // }
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      tip("未登录!");
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip("登录过期，请重新登录!");
      // setTimeout(() => {
      //   toLogin();
      // }, 1000);
      toLogin();
      break;
    // 404请求不存在
    case 404:
      tip("请求的资源不存在");
      break;
    default:
      console.log(other);
  }
};

const axiosConfig = {
  timeout: 60 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
};
// 创建axios实例
const instance = axios.create(axiosConfig);
// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

/**
 * 请求拦截器
 * 每次请求前，判断是否有权限登录
 */

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      tip("可能存在断网的情况，请稍后重试！");
    }
  }
);

export default instance;
