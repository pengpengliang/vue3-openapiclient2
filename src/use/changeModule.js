/*
 * @Date: 2021-05-08 13:55:13
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import store from '@/store/index'
export default function ChangeModule () {
  // 切换列表中的子模块
  function changeModuleName (value) {
    store.commit('changeModuleName',value)
  }
  //切换列表
  function changeListName (value) {
    store.commit('changeListName',value)
  }
  return {
    changeModuleName,
    changeListName
  }
}