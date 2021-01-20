<!--
 * @Date: 2021-01-13 14:09:50
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
-->
<template>
  <div class="login_container">
    <header class="login_header">
      <div class="login_title">
        <svg-icon name="systemIconGreen" size="28" class="login_icon">
        </svg-icon>
        <h1>{{ systemName }}</h1>
      </div>
    </header>
    <main class="login_main">
      <div class="login_bg">
        <img src="@/assets/image/login_bg.png" alt="登录背景" />
      </div>
      <div class="login_form">
        <h2>用户登录</h2>
        <el-form
          ref="form"
          :model="state.form"
          label-width="0px"
          :rules="state.rules"
          @keyup.enter="submitForm('form')"
        >
          <el-form-item class="login_user" prop="user">
            <el-input
              placeholder="请输入用户名"
              v-model="state.form.user"
              autocomplete="new-password"
            ></el-input>
            <svg-icon
              name="login_user"
              color="#bcbcbc"
              size="30"
              class="icon_position"
            ></svg-icon>
          </el-form-item>
          <el-form-item class="login_password" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="state.form.password"
              type="password"
              autocomplete="new-password"
            ></el-input>
            <svg-icon
              name="login_password"
              color="#bcbcbc"
              size="30"
              class="icon_position"
            ></svg-icon>
          </el-form-item>
          <el-form-item class="login_remember">
            <el-checkbox v-model="state.form.rememberPassword"
              >记住密码</el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" @click="submitForm('form')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </main>
    <footer class="login_footer">广州城市信息研究所所有@2020</footer>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/index.js";
import config from "@/utils/config";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      form: {
        user: "",
        password: "",
        rememberPassword: false
      },
      rules: {
        user: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    });

    const submitForm = () => {
      api.login.login(state.form).then(res => {
        if (res.data.ReturnCode == 0) {
          state.form.user = "";
          state.form.password = "";
          router.push({
            path: "/center"
          });
        } else {
          api.toast(res.data.Message || "登录失败", "error");
        }
      });
    };
    const systemName = computed(() => {
      return config.systemName;
    });
    return {
      state,
      submitForm,
      systemName
    };
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .login_header {
    width: 100%;
    height: 100px;
    line-height: 100px;
    .login_title {
      height: 100px;
      line-height: 100px;
      margin-left: 10%;
      .login_icon {
        margin-right: 8px;
      }
      h1 {
        display: inline-block;
        font-size: 24px;
        font-weight: Bold;
        color: #0f9c66;
        margin-left: 5px;
      }
    }
  }
  .login_main {
    flex: 1;
    position: relative;
    .login_bg {
      position: absolute;
      width: 100%;
      height: 100%;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .login_form {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      padding: 60px 50px;
      background-color: #ffffff;
      width: 500px;
      height: 500px;
      box-sizing: border-box;
      h2 {
        margin-bottom: 40px;
        font-size: 22px;
        color: #0f9c66;
      }
      .el-form {
        .login_user {
          margin-bottom: 40px;
        }
        .login_password {
          margin-bottom: 10px;
        }
        .login_remember {
          margin-bottom: 60px;
        }
        .el-form-item {
          position: relative;
          .icon_position {
            position: absolute;
            left: 7px;
            top: 7px;
          }
          .login_btn {
            width: 100%;
            background-color: #0f9c66;
            color: #ffffff;
          }
        }
      }
    }
  }
  .login_footer {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #333333;
  }
}
</style>
<style lang="scss">
.login_main {
  .login_form {
    .el-form {
      .el-input {
        .el-input__inner {
          text-indent: 2em;
        }
      }
    }
  }
}
</style>
