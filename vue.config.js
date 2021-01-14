/*
 * @Date: 2021-01-13 15:12:11
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
const path = require("path");

module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
