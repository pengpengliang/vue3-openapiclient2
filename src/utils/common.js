/*
 * @Date: 2021-03-29 15:34:24
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */

export default function Common() {
  //element-ui 日期组件返回值转换
  const getDate = (format) => {
    let date = new Date(format.date);
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
    };
    if (/(y+)/.test(format.format)) {
      format.format = format.format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format.format)) {
        format.format = format.format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format.format;
  };
  const auditStatus = [
    {
      value: "A003",
      text: "审核中",
    },
    {
      value: "A004",
      text: "已拒绝",
    },
    {
      value: "A005",
      text: "已通过",
    },
  ]; //审批状态
  // 获取审核状态中文描述
  const getAuditStatus = (curactid) => {
    let res = "";
    if (!curactid) {
      res = "--";
    } else {
      auditStatus.forEach(function(item) {
        if (item.value === curactid) {
          res = item.text;
        }
      });
    }
    return res;
  };
  const publishStatus = [
    {
      value: 0,
      text: "未发布",
    },
    {
      value: 1,
      text: "已发布",
    },
    {
      value: 2,
      text: "发布中",
    },
    {
      value: 3,
      text: "更新中",
    },
    {
      value: 4,
      text: "已停用",
    },
    {
      value: 5,
      text: "发布失败",
    },
    {
      value: 6,
      text: "更新失败",
    },
  ];

  // 获取发布状态中文描述
  // 发布状态 0未发布 1已发布 2发布中 3更新中 4已停用
  const getPublishStatus = (isshared) => {
    let res = "";
    publishStatus.forEach(function(item) {
      if (item.value === isshared) {
        res = item.text;
      }
    });
    return res;
  };
  return {
    getDate,
    getAuditStatus,
    auditStatus,
    getPublishStatus,
    publishStatus,
  };
}
