<!--
 * @Date: 2021-01-13 15:39:15
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <svg
    class="svg-icon"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
      color: props.color
    }"
    @mousedown="clickIcon"
  >
    <use :xlink:href="`#icon-${props.name}`" :fill="props.color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
      default: "email"
    },
    size: {
      type: Number,
      default: 32
    },
    color: {
      type: String,
      default: "#000"
    }
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>
