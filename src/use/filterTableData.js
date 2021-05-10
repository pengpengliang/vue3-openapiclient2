/*
 * @Date: 2021-05-08 09:58:47
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import store from "@/store/index";
import Common from "@/utils/common.js";
export default function FilterTableData() {
  function changeSearchValue(value) {
    store.dispatch("getTableData", {
      type: "inputChange",
      value,
    });
  }
  function changeTimePicker(value) {
    let {getDate} = Common()
    if (value && value.length > 0) {
      //改个格式
      value.map((item, index) => {
        let dd = {
          date: item,
          format: "yyyy/MM/dd",
        };
        let d = getDate(dd);
        value[index] = d;
      });
    } else {
      value = [];
    }
    store.dispatch("getTableData", {
      type: "timePickerChange",
      value,
    });
  }
  function changePageIndex(value) {
    store.dispatch("getTableData", {
      type: "pageIndexChange",
      value,
    });
  }
  function changeOptions(value) {
    let result;
    let type;
    if (value.service) {
      result = (value.service[0] || value.service[0] == 0) ? value.service[0] : null;
      type = "issharedChange";
    } else if (value.theme) {
      result = value.theme[0] ? value.theme[0] : null;
      type = "themeChange";
    } else if (value.audit) {
      result = value.audit[0] ? value.audit[0] : null;
      type = "curactidChange";
    }
    store.dispatch("getTableData", {
      type,
      value:result,
    });
  }
  return {
    changeSearchValue,
    changeTimePicker,
    changePageIndex,
    changeOptions,
  };
}
