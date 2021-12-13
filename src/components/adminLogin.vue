<template>
  <div id="adminlogin">
    <el-container style="height: 100%">
      <el-aside style="width: 50%;height: 100%">
        <p class="text1" style="font-size:50px;text-align:center;margin-left:100px;margin-top: 50%">"济宝" </p>
        <p class="text1">——同济二手交易平台</p>
        <p class="text1">挑选你的心仪二手宝物</p>
      </el-aside>
      <el-main style="width: 50%;position: relative;height: 100%">
        <div class="login" style="margin: auto!important;width:420px">
          <div class="login-front">
            <div style="height: 130px;width: 100%;z-index: 2"></div>
            <div style="  border-radius: 18px; box-shadow: 0px 5px 20px 0px rgba(252,189,171,0.5);">
              <div class="login-img">
                <el-image style="margin-left: -15px; margin-top:10px; height: 100px"
                          :src="require('@/assets/logo2.png')"></el-image>
              </div>
              <div class="login-top1">
                <form>
                  <input type="text" v-model="loginForm.email" placeholder=邮箱>
                  <input type="password" v-model="loginForm.password" placeholder=密码 show-password>
                </form>
                <div class="forgot">
                  <input type="submit" value="登录" v-on:click="handleLogin">
                </div>
              </div>
              <div class="login-bottom">
                <el-image style="height: 20px" :src="require('@/assets/logo3.png')"></el-image>
              </div>
            </div>
          </div>
          <div class="login-back">
            <div style="height: 70px;width: 100%;z-index: 2"></div>
            <div style=" border-radius: 18px; box-shadow: 0px 5px 20px 0px rgba(252,189,171,0.5);">
              <div class="login-img">
                <el-image style="margin-left: -15px; margin-top:10px; height: 100px"
                          :src="require('@/assets/logo2.png')"></el-image>
              </div>
              <div class="login-bottom">
                <el-image style="height: 20px" :src="require('@/assets/logo3.png')"></el-image>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import {checkAccount, checkEmailCaptcha, getImageCaptcha, loginGet} from "../api/user/login";
import {message, my_name, set_name, avatar_url, set_avatar_url, addMessage} from "../js/global"
import {getChat} from "../api/user/chat";
import {adminLogin} from "../api/admin/admin"
export default {
  name: 'adminLogin',
  data() {
    return {
      flag: 1,
      screenHeight: 0,//图片父容器的高度
      screenWidth: 0,//屏幕的宽度
      waitingtime: 60,
      loginForm: {
        email: "",
        password: "",
        rememberMe: false,
        captcha_code: ""
      },
      codeUrl: "",
    }
  },
  mounted: function () {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loginForm.email = this.$cookies.get("email")
    this.loginForm.password = this.$cookies.get("password")
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.loginForm.email = this.$cookies.get("email")
      this.loginForm.password = this.$cookies.get("password")
    };
  },
  methods: {
    time() {
      this.waitingtime--;
    },
    handleLogin() {
      this.loading = true;
      if (this.loginForm.email === "")
        this.$message({message:"邮箱不能为空！",type:'error',customClass:'zZindex'})
      else if (this.loginForm.password === "")
        this.$message({message:"密码不能为空！",type:'error',customClass:'zZindex'})
      else {
        adminLogin(this.loginForm.email, this.loginForm.password).then(res => {
          let code = res.data.code
          console.log(code)
          if (code === 1)
            this.$message({message:"登录失败！该管理员用户不存在！",type:'error',customClass:'zZindex'})
          else if (code === 2)
            this.$message({message:"登录失败！管理员用户名与密码不匹配！",type:'error',customClass:'zZindex'})
          else if (code === 0) {
            this.$message({message:"登录成功！",type:'success',customClass:'zZindex'})
            this.$cookies.set("user_name", res.data.user_name)
            this.$router.push('/dealfeedback')
          }
        }).catch(function (error) {
          console.log(error)
        });
      }
      this.loading = false;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../css/style.css";

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#adminlogin {
  background-image: url("../image/login.jpg");
  align-items: center;
  height: 100%;
  background-color: #ffffff;
  background-size: cover;
}


.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.text1 {
  font-family: baotuxiaobai;
  color: #481e13;
  text-align: right;
  font-size: 40px;
  height: 40px;
}

#dyEmailButton {
  color: #fcbdab;
}

@font-face {
  font-family: baotuxiaobai;
  src: url("../font/baotuxiaobai.ttf");
}
</style>

