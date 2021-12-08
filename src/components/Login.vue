<template>
  <div id="login">

      <el-container style="margin-left: 300px">
        <el-aside style="width: 50%">
        </el-aside>
        <el-main>
          <div class="login" style="margin-top: 150px;">
            <div class="login-top">
              <el-image style="margin-left: 30px; margin-top:10px; height: 100px" :src="require('@/assets/logo2.png')"></el-image>
              <form>
                <input type="text" value="用户名" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'User Id';}">
                <input type="password" value="密码" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'password';}">
              </form>
              <div class="forgot">
                <a href="#">忘记密码？</a>
                <input type="submit" value="登录" v-on:click="handleLogin">
                <input type="submit" value="注册" v-on:click="handleLogon">
              </div>
            </div>
            <div class="login-bottom">
              <el-image style="height: 20px" :src="require('@/assets/logo3.png')"></el-image>
            </div>
          </div>
        </el-main>
      </el-container>

      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright © 2018-2021 JiaWa.vip All Rights Reserved.</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      screenHeight : 0,//图片父容器的高度
      screenWidth :0,//屏幕的宽度
      images:[
        {url: require('@/image/login.jpg'), isShow:true},
        {url: require('@/image/login1.jpg'), isShow:true},
        {url: require('@/image/login2.jpg'), isShow:false},
        {url: require('@/image/login3.jpg'), isShow:false},
        {url: require('@/image/login4.jpg'), isShow:false},
        {url: require('@/image/login5.jpg'), isShow:false}
      ],
      loginForm: {
        username: 'admin',
        password: 'admin123',
        rememberMe: false,
        code: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
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
    this.screenHeight=window.innerHeight;
    window.onresize = () =>{
      this.screenWidth =  window.innerWidth;
      this.screenHeight=window.innerHeight;
    };
  },
  methods: {
    handleLogon() {
      this.loading = true;
      if(this.loginForm.username == 'admin' && this.loginForm.password == 'admin123') {
        alert("登录成功");
        this.$router.push('/');
      }
      else
        alert("登录失败");
      this.loading = false;
    },
    handleLogin() {
      this.loading = true;
      if(this.loginForm.username == 'admin' && this.loginForm.password == 'admin123') {
        alert("登录成功");
        this.$router.push('/');
      }
      else
        alert("登录失败");
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

