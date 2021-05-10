<!--
 * @Date: 2021-01-25 11:05:56
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <div class="registerResource">
    <div class="filterList">
      <CenterSwitchModule />
      <CenterSearchInput />
    </div>
    <service v-show="activeModule == 'map'"/>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex'
import CenterSwitchModule from "@/components/centerSwitchModule";
import CenterSearchInput from "@/components/centerSearchInput";
import Service from './service.vue';
export default {
  setup() {
    const store = useStore()
    const state = store.state.centerModule
    const activeModule = computed(()=>{
      return state.activeModule
    });
    return {
      activeModule
    };
  },
  components: {
    CenterSwitchModule,
    CenterSearchInput,
    Service,
  },
};
</script>

<style lang="scss" scoped>
.registerResource {
  width: calc(100% - 40px);
  margin: 0 auto;
  .filterList {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
  }
}
</style>