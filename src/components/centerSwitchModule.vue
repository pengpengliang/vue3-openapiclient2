<!--
 * @Date: 2021-01-25 11:07:56
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <div class="toggleModule">
    <div
      :class="['moduleItem', { activeModule: activeModule === 'map' }]"
      @click="changeModule('map')"
    >
      地图服务
    </div>
    <div
      :class="['moduleItem', { activeModule: activeModule === 'interface' }]"
      @click="changeModule('interface')"
    >
      接口资源
    </div>
    <div
      :class="['moduleItem', { activeModule: activeModule === 'data' }]"
      @click="changeModule('data')"
    >
      数据资源
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props,context) {
    console.log(props,context)
    const activeModule = ref("map");
    const changeModule = (moduleName) => {
      activeModule.value = moduleName;
      context.emit("changeModuleName", moduleName)
    };
    return {
      activeModule,
      changeModule
    };
  },
};
</script>

<style lang="scss" scoped>
.toggleModule {
  width: 300px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #2dad7d;
  border-radius: 15px;
  display: flex;
  text-align: center;
  cursor: pointer;
  .moduleItem {
    width: 100px;
    border-radius: 15px;
    color: #bcbcbc;
  }
  .activeModule {
    background-color: #2dae7d;
    color: #ffffff;
  }
}
</style>