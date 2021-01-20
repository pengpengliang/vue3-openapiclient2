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
  login(params) {
    return axios.post(
      config.gatewayUrl +
        `/account/logIn2?password=${params.password}&userName=${params.user}`
    );
  }
};

export default login;
