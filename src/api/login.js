/*
 * @Date: 2021-01-14 16:13:20
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
/**
 * 登录模块接口列表
 */

import axios from "@/utils/http"; // 导入http中创建的axios实例
import config from "@/utils/config";

const login = {
  //登录
  login(params) {
    return axios.post(
      config.gatewayUrl +
        `/account/logIn2?password=${params.password}&userName=${params.user}`
    );
  },
  //退出登录
  logout() {
    return axios.post(config.gatewayUrl + "/logout");
  },
  //获取用户信息
  getUserInfo() {
    return axios.get(config.webRoot + "/user/getUserInfo");
  }
};

export default login;
