<!--
 * @Date: 2021-01-20 16:45:43
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <div
    :class="[{ header: !fullScreenBool }, { header_hidden: fullScreenBool }]"
  >
    <div class="header_left">
      <div class="header_title">
        <svg-icon name="systemIcon" size="32"></svg-icon>
        <h2>{{ systemName }}</h2>
      </div>
    </div>
    <div class="header_right">
      <div class="header_right_nav">
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index>
            <router-link to="/market">资源超市</router-link>
          </el-menu-item>
          <el-menu-item index>
            <router-link to="/personalcenter/registerResources"
              >个人中心</router-link
            >
          </el-menu-item>
          <el-menu-item index>
            <router-link to="/statistical">平台统计</router-link>
          </el-menu-item>
          <el-menu-item index>
            <router-link to="/technicalSupport">技术支持</router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <el-popover placement="bottom" width="150" trigger="hover">
        <div class="header_right_userinfo_logout">
          <span class="logout" @click="logOut()">退出</span>
        </div>
        <template #reference>
          <div class="header_right_userinfo">
            <div class="header_user_icon">
              <svg-icon name="header_user" size="24"></svg-icon>
            </div>
            <div class="header_user_name">
              <span>{{ userName }}</span>
            </div>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import router from "@/router/index";
import api from "@/api/index.js";
import config from "@/utils/config";
export default {
  setup() {
    const userName = ref("");
    onMounted(async () => {
      const { data } = await api.login.getUserInfo();
      if (data.ReturnCode == 0) {
        userName.value = data.Data.userName;
      } else {
        api.toast(data.Message, "error");
      }
    });
    const systemName = computed(() => {
      return config.systemName;
    });
    return { userName, logOut, systemName };
  }
};
function logOut() {
  api.login.logout().then(() => {
    router.push({
      path: "/"
    });
    api.toast("退出成功", "success");
  });
}
</script>

<style lang="scss" scoped>
.header_right_userinfo_logout {
  text-align: center;
  cursor: pointer;
}
.header_hidden {
  width: 100%;
  height: 60px;
  background: #2dae7d;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.8s;
}
.header {
  width: 100%;
  height: 60px;
  background: url("../assets/image/nav_bg.png") no-repeat;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.8s;
}
.header_left {
  float: left;
  width: 670px;
  height: 100%;
  overflow: hidden;

  .header_title {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    font-size: 20px;
    color: #ffffff;
    margin-left: 20px;
    .header_icon {
      display: inline-block;
      margin-right: 8px;
      font-size: 24px;
    }
    h2 {
      display: inline-block;
      font-weight: Bold;
    }
  }
}
.header_right {
  float: right;
  width: 590px;
  overflow: hidden;
  .header_right_nav {
    width: 380px;
    height: 60px;
    line-height: 60px;
    float: left;
    ul {
      background: none;
      height: 60px;
      line-height: 60px;
      li {
        height: 60px;
        line-height: 60px;
        padding: 0 15px;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
        .router-link-active {
          background: none;
          color: #ffffff;
          padding-bottom: 10px;
          border-bottom: 2px solid #ffffff;
        }
        a {
          display: inline;
          // color: #fff;

          font-size: 16px;
        }
        a:hover {
          color: #ffffff;
        }
      }
      li:hover {
        background-color: #2dae7d;
        color: #ffffff;
      }
    }
  }

  .header_right_userinfo {
    width: 120px;
    margin: 17px 15px 0px 15px;
    float: left;
    overflow: hidden;
    cursor: pointer;
    .header_user_icon {
      float: left;
      margin-right: 8px;
    }
    .header_user_name {
      float: left;
      span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
</style>
