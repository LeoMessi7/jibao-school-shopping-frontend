<template>
  <div id="login">

      <el-container style="height: 100%">
        <el-aside style="width: 50%;height: 100%">
        </el-aside>
        <el-main style="width: 50%;position: relative;height: 100%">
          <div style="height: 150px;width: 100%;z-index: 2"></div>
          <div class="login" style="margin: auto!important;width:420px">
            <div class="login-front">
              <div class="login-img">
              <el-image  style="margin-left: -15px; margin-top:10px; height: 100px" :src="require('@/assets/logo2.png')"></el-image>
              </div>
              <div class="login-top1">
                <form>
                  <input type="text" v-model="loginForm.email" placeholder=邮箱>
                  <input type="password" v-model="loginForm.password" placeholder=密码 show-password>
                  <input type="captcha_code" v-model="loginForm.captcha_code" placeholder=验证码>
                  <el-image style=" position:absolute;height:40px;width:100px;margin-top:5px;margin-left: 20px" :src=codeUrl></el-image>
                </form>
                <div class="forgot">
                  <a href="#" v-on:click="moveToReg">没有账号？</a>
                  <input type="submit" value="登录" v-on:click="handleLogin">
                </div>
              </div>
              <div class="login-bottom">
                <el-image style="height: 20px" :src="require('@/assets/logo3.png')"></el-image>
              </div>
            </div>
            <div class="login-back">
              <div class="login-img">
                <el-image  style="margin-left: -15px; margin-top:10px; height: 100px" :src="require('@/assets/logo2.png')"></el-image>
              </div>
              <div class="login-top2">
                <form>
                  <input type="text" v-model="regForm.email" placeholder="邮箱">
                  <input type="password" v-model="regForm.password" placeholder="设置密码" show-password>
                  <input type="password" v-model="regForm.confirm" placeholder="确认密码" show-password>
                </form>
                <div class="forgot">
                  <a href="#" v-on:click="moveToLogin">已有账号？</a>
                  <input type="submit" value="注册" v-on:click="handleLogon">
                </div>
              </div>
              <div class="login-bottom">
                <el-image style="height: 20px" :src="require('@/assets/logo3.png')"></el-image>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>

  </div>
</template>

<script>
import {getImageCaptcha, loginGet} from "../api/user/login";
export default {
  name: 'Login',
  data() {
    return {
      screenHeight : 0,//图片父容器的高度
      screenWidth : 0,//屏幕的宽度
      images:[
        {url: require('@/image/login.jpg'), isShow:true},
        {url: require('@/image/login1.jpg'), isShow:true},
        {url: require('@/image/login2.jpg'), isShow:false},
        {url: require('@/image/login3.jpg'), isShow:false},
        {url: require('@/image/login4.jpg'), isShow:false},
        {url: require('@/image/login5.jpg'), isShow:false}
      ],
      loginForm: {
        email : "",
        password : "",
        rememberMe: false,
        captcha_code: ""
      },
      codeUrl: "",
      regForm:{
        email : "",
        password : "",
        confirm:"",
        rememberMe: false,
        code: ""
      },
      loginRules: {
        email: [
          { required: true, trigger: 'blur', message: '邮箱不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      }
    }
  },
  mounted:function() {
    this.screenWidth =  window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.getCode()
    this.loginForm.email = this.$cookies.get("email")
    this.loginForm.password = this.$cookies.get("password")
    window.onresize = () =>{
      this.screenWidth =  window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.getCode()
      this.loginForm.email = this.$cookies.get("email")
      this.loginForm.password = this.$cookies.get("password")
    };
  },
  methods: {
    handleLogon() {
      // this.loading = true;
      // if(this.loginForm.email === 'admin' && this.loginForm.password === 'admin123') {
      //
      //   alert("登录成功");
      //   this.$router.push('/');
      // }
      // else
      //   alert("登录失败");
      // this.loading = false;
    },
    moveToReg(){
      let x=document.getElementsByClassName("login-front");
      let y=document.getElementsByClassName("login-back");
      x[0].style.opacity=0;
      x[0].style.zIndex=0;
      y[0].style.transitionDelay="0.5s";
      y[0].style.opacity=1;
      y[0].style.zIndex=1;
      x[0].style.transitionDelay="0s";
    },
    moveToLogin(){
      let x=document.getElementsByClassName("login-front");
      let y=document.getElementsByClassName("login-back");
      y[0].style.opacity=0;
      y[0].style.zIndex=0;
      x[0].style.transitionDelay="0.5s";
      x[0].style.opacity=1;
      x[0].style.zIndex=1;
      y[0].style.transitionDelay="0s";

    },
    getCode(){
      getImageCaptcha().then(res => {
        this.codeUrl = "data:image/jpg;base64," + btoa(new Uint8Array(res.data).reduce((res, byte) => res + String.fromCharCode(byte), ''))
      });
    },
    handleLogin() {
      this.loading = true;
      const map = {email: this.loginForm.email, password: this.loginForm.password, captcha_code: this.loginForm.captcha_code}
      loginGet(map).then(res => {
        let code = res.data.code
        if (code === 1)
          alert("登录失败！该用户不存在！")
        else if(code === 2)
          alert("登录失败！用户名与密码不匹配！")
        else if(code === 3)
            alert("登录失败！验证码错误！")
        else{
          alert("登录成功")
          this.$cookies.set("email", this.loginForm.email)
          this.$cookies.set("password", this.loginForm.password)
          this.$router.push('/shop/item')
        }
      }).catch(function (error) {
        console.log(error)
      });
      this.loading = false;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../css/style.css";
html,body{height:100%;
  margin:0;
  padding:0;}
#login {
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
  color:#ffffff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>

