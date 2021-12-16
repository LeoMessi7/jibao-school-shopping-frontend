<template>
  <div id="Infor" style="height:100%">
    <bar></bar>
    <el-container style="height: 650px">
      <sidebar></sidebar>
      <el-main style="background-color: #faeaea; height: 650px">
        <el-dialog title="充值" width="500px" :visible.sync="showRecharge" @close="showRecharge=false">
          <el-form :rules="rule" ref="charge" :model="showRecharge" label-width="80px" style="width: 400px" class="demo-ruleForm">
            <el-form-item label="充值金额" style="text-align: center">
              <el-input v-model="charge"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="recharge(charge)">充值</el-button>
              <el-button type="danger" @click="showRecharge=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-row :gutter="20" style="width: 70%;margin: auto">
          <el-col :span="8" :xs="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>个人信息</span>
              </div>
              <div>
                <div class="text-center" style="text-align: center">
                  <div class="user-info-head" @click="editCropper()">
                    <meta content="no-cache"  />
                    <img :src=options.img title="点击上传头像" class="img-circle img-lg" alt=""/></div>
                  <el-dialog :title="title"
                             :visible.sync="open"
                             width="300px"
                             style="text-align: center;height: 500px"
                             @opened="modalOpened">
                    <el-row>
                      <el-col style="height: 240px">
                        <div class="avatar-upload-preview">
                          <img :src="options.img"/>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-upload style="margin-left:40px; float: left" action="#" :http-request="requestUpload"
                                 :show-file-list="false" :before-upload="beforeUpload">
                        <el-button size="small">
                          选择
                          <i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                      </el-upload>
                      <el-button style="margin-right:40px;float: right" type="primary" size="small" @click="uploadImg">
                        提交
                      </el-button>
                    </el-row>
                  </el-dialog>
                </div>
                <ul class="list-group list-group-striped">
                  <li class="list-group-item">
                    <span>用户名称:</span>
                    <div class="pull-right">{{ user.nickName }}</div>
                  </li>
                  <li class="list-group-item">
                    <span>邮箱:</span>
                    <div class="pull-right">{{ user.email }}</div>
                  </li>
                  <li class="list-group-item">
                    <span>综合评分:</span>
                    <div class="pull-right">
                      <el-rate style="display: inline;"
                               disabled
                               show-score
                               :colors="['#fcbdab','#fcbdab','#fcbdab']" v-model="user.rate">
                      </el-rate>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16" :xs="24">
            <el-card>
              <div slot="header" class="clearfix">
                <span>基本资料</span>
              </div>
              <el-tabs v-model="activeName">
                <el-tab-pane label="基本资料" name="userinfo">
                  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
                    <el-form-item label="用户昵称" prop="nickName">
                      <el-input v-model="user.nickName" disabled/>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input v-model="user.email" maxlength="50" disabled/>
                    </el-form-item>
                    <el-form-item label="综合评分" prop="rate">
                      <el-input v-model="user.rate" maxlength="50" disabled/>
                    </el-form-item>
                    <el-form-item label="余额" prop="rate">
                      <el-input v-model="user.balance" maxlength="50" disabled/>
                    </el-form-item>
                    <el-form-item label="校区">
                      <el-select v-model="user.campus" placeholder="请选择校区" style="width: 100%">
                        <el-option label="四平校区" value="四平校区"></el-option>
                        <el-option label="嘉定校区" value="嘉定校区"></el-option>
                        <el-option label="沪西校区" value="沪西校区"></el-option>
                        <el-option label="彰武路校区" value="彰武路校区"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                      <el-select v-model="user.major" placeholder="请选择专业" style="width: 100%">
                        <el-option label="软件工程" value="软件工程"></el-option>
                        <el-option label="电子信息工程" value="电子信息工程"></el-option>
                        <el-option label="医学" value="医学"></el-option>
                        <el-option label="数学" value="数学"></el-option>
                        <el-option label="建筑设计" value="建筑设计"></el-option>
                        <el-option label="车辆工程" value="车辆工程"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" size="mini" @click="saveInfo">保存</el-button>
                      <el-button type="danger" size="mini" @click="close">关闭</el-button>
                      <el-button type="success" size="mini" v-on:click="showRecharge=true">充值</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="resetPwd">
                  <el-form ref="formPassword" :model="formPassword"  :rules="rules" label-width="80px">
                    <el-form-item label="旧密码" prop="oldpassword" autocomplete="off">
                      <el-input type="password" v-model="formPassword.oldpassword"/>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpassword">
                      <el-input type="password" v-model="formPassword.newpassword" maxlength="16"/>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="renewpassword">
                      <el-input type="password" v-model="formPassword.renewpassword" maxlength="16"/>
                    </el-form-item>
                  </el-form>
                  <div style="text-align: center">
                    <el-button type="primary" size="medium" @click="confirmPassword">修改</el-button>
                    <el-button @click="resetForm('formPassword')">重置</el-button>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>


  </div>
</template>

<script>
import bar from './bar'
import sidebar from './sidebar'
import {saveUseInfo, changePassword, getBalance, updateAvatar} from "../api/user/info";
import {alipayRecharge} from "../api/alipay/alipay";

export default {
  name: "Infor",
  components: {
    bar,
    sidebar,
  },

  data() {
    return {
      // 是否显示弹出层
      charge:'',
      showRecharge:false,
      activeName: 'userinfo',
      user: {
        nickName: this.$cookies.get("user_name"),
        email: this.$cookies.get("email"),
        campus:this.$cookies.get("campus"),
        major:this.$cookies.get("major"),
        rate: this.$cookies.get("mark"),
        balance: 0
      },
      formPassword:{
        oldpassword:'',
        newpassword:'',
        renewpassword:'',
      },
      formData: new FormData(),
      open: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: "修改头像",
      options: {
        img: this.$cookies.get("avatar_url"), //裁剪图片的地址
      },
      previews: {},
      // 表单校验
      rule: {
        charge: [
          {required: true, message: "请输入商品价格", trigger: 'blur'},
          {pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/, message: "商品价格不合法", trigger: 'blur'}
        ],
      },
      rules: {
        nickName: [
          {required: true, message: "用户昵称不能为空", trigger: "blur"}
        ],
        email: [
          {required: true, message: "邮箱地址不能为空", trigger: "blur"},
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
      }
    };
  },
  mounted: function () {
    if (!this.$cookies.isKey("user_name")) {
      this.$message({message: "请先登录！", type: 'warning', customClass: 'zZindex'})
      this.$router.push("/Login")
    }
    getBalance().then(res => {
      this.user.balance = res.data / 100
    })
  },
  methods: {
    // 编辑头像
    editCropper() {
      this.open = true;
    },
    // 打开弹出层结束时的回调
    modalOpened() {
      this.visible = true;
    },
    // 覆盖默认的上传行为
    requestUpload() {
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf("image/") === -1) {
        this.$message({message: "文件格式错误，请上传图片类型，如：JPG，PNG后缀的文件！", type: 'error', customClass: 'zZindex'})
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result
        }
        this.formData.append("avatar", file);
        console.log(this.formData)
      }
    },
    // 上传图片
    uploadImg() {
      let image = this.formData.get("avatar")
      console.log(image)
      updateAvatar(image).then(res => {
        let code = res.data.code
        if (code === 1) {
          this.$message({message: "修改失败！", type: 'error', customClass: 'zZindex'})
        } else if (code === 0) {
          this.open = false;
          this.$message({message: "修改成功！", type: 'success', customClass: 'zZindex'});
          this.$cookies.set("avatar_url", 'http://localhost:8081/' + res.data.avatar_url)
          this.visible = false;
        }
      }).catch(function (error) {
        console.log(error)
      });
    },
    saveInfo(){
      if(this.user.major!=='请选择专业'&&this.user.campus!=='请选择校区'){
        saveUseInfo(this.user.major,this.user.campus).then(res=>{
          let code = res.data.code
          if (code === 1) {
            this.$message({message: "修改失败！", type: 'error', customClass: 'zZindex'})
          } else if (code === 0) {
            this.$message({message: "修改成功！", type: 'success', customClass: 'zZindex'});
            this.$cookies.set("major", this.user.major)
            this.$cookies.set("campus", this.user.campus)
          }
        }).catch(function (error) {
          console.log(error)
        });
      }

    },
    close() {
      this.$router.push({path: "/"});
    },
    confirmPassword() {
      if (this.formPassword.oldpassword !== this.$cookies.get("password"))
        this.$message({message: "请输入正确的旧密码！", type: 'error', customClass: 'zZindex'})
      else if (this.formPassword.newpassword === "")
        this.$message({message: "新密码不能为空！", type: 'error', customClass: 'zZindex'})
      else if (this.formPassword.newpassword !== this.formPassword.renewpassword)
        this.$message({message: "两次输入的密码不一致", type: 'error', customClass: 'zZindex'})
      else if (this.formPassword.newpassword === this.formPassword.oldpassword)
        this.$message({message: "该密码正在被使用！", type: 'error', customClass: 'zZindex'})
      else {
        changePassword(this.formPassword.newpassword).then(res => {
          this.$message({message: "修改成功！", type: 'success', customClass: 'zZindex'})
          this.$cookies.set("password", this.formPassword.newpassword)
        }).catch(function (error) {
          console.log(error)
        });
      }
    },
    resetForm(formPassword) {
      this.$refs[formPassword].resetFields();
    },
    recharge(charge){
      let amount = charge;
      this.showRecharge=false
      alipayRecharge(amount).then(res => {
        if(res.status === 200){
          // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
          let divForm = document.getElementsByTagName('divform')
          if (divForm.length) {
            document.body.removeChild(divForm[0])
          }
          document.querySelector('body').innerHTML = res.data
          document.forms[0].submit()
        }else{
          this.$alert("错误：请求错误","提示",{
            confirmButtonText:'确定'
          });
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}

.user-info-head:hover:after {
  content: '+';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
}

.img-circle {
  border-radius: 50%;
}

.img-lg {
  width: 120px;
  height: 120px;
}

.avatar-upload-preview {
  display: flex;
  margin-left: 30px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}

.list-group-item {
  list-style-type: none
}

.list-group-striped > .list-group-item {
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
}

.list-group {
  padding-left: 0px;
  list-style: none;
}

.list-group-item {
  border-bottom: 1px solid #e7eaec;
  border-top: 1px solid #e7eaec;
  margin-bottom: -1px;
  padding: 11px 0px;
  font-size: 13px;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

/deep/ .el-input.is-disabled .el-input__inner {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #3a3939;
  cursor: not-allowed;
}

.pull-right {
  float: right !important;
}
</style>
