<template>
  <div id="Infor" style="height:100%">
    <bar></bar>
    <el-container style="height: 650px">
      <sidebar></sidebar>
      <el-main style="background-color: #e5d7d7; height: 650px">

        <el-row :gutter="20" style="width: 70%;margin: auto">
          <el-col :span="8" :xs="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>个人信息</span>
              </div>
              <div>
                <div class="text-center" style="text-align: center">
                  <div class="user-info-head" @click="editCropper()"><img v-bind:src="options.img" title="点击上传头像" class="img-circle img-lg" alt=""  /></div>
                  <el-dialog :title="title"
                             :visible.sync="open"
                             width="800px"
                             append-to-body
                             @opened="modalOpened">
                    <el-row>
                      <el-col :xs="24" :md="12" :style="{height: '350px'}">
                        <vue-cropper
                          ref="cropper"
                          :img="options.img"
                          :info="true"
                          :autoCrop="options.autoCrop"
                          :autoCropWidth="options.autoCropWidth"
                          :autoCropHeight="options.autoCropHeight"
                          :fixedBox="options.fixedBox"
                          @realTime="realTime"
                          v-if="visible"
                        />
                      </el-col>
                      <el-col :xs="24" :md="12" :style="{height: '350px'}">
                        <div class="avatar-upload-preview">
                          <img :src="options.img"  />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :lg="2" :md="2">
                        <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
                          <el-button size="small">
                            选择
                            <i class="el-icon-upload el-icon--right"></i>
                          </el-button>
                        </el-upload>
                      </el-col>
                      <el-col :lg="{span: 1, offset: 2}" :md="2">
                        <el-button icon="el-icon-plus" size="small" @click="changeScale(1)"></el-button>
                      </el-col>
                      <el-col :lg="{span: 1, offset: 1}" :md="2">
                        <el-button icon="el-icon-minus" size="small" @click="changeScale(-1)"></el-button>
                      </el-col>
                      <el-col :lg="{span: 1, offset: 1}" :md="2">
                        <el-button icon="el-icon-refresh-left" size="small" @click="rotateLeft()"></el-button>
                      </el-col>
                      <el-col :lg="{span: 1, offset: 1}" :md="2">
                        <el-button icon="el-icon-refresh-right" size="small" @click="rotateRight()"></el-button>
                      </el-col>
                      <el-col :lg="{span: 2, offset: 6}" :md="2">
                        <el-button type="primary" size="small" @click="uploadImg">提 交</el-button>
                      </el-col>
                    </el-row>
                  </el-dialog>
                </div>
                <ul class="list-group list-group-striped">
                  <li class="list-group-item">
                    <svg-icon icon-class="user" />用户名称
                    <div class="pull-right">w</div>
                  </li>
                  <li class="list-group-item">
                    <svg-icon icon-class="phone" />手机号码
                    <div class="pull-right">w</div>
                  </li>
                  <li class="list-group-item">
                    <svg-icon icon-class="email" />用户邮箱
                    <div class="pull-right">w</div>
                  </li>
                  <li class="list-group-item">
                    <svg-icon icon-class="date" />创建日期
                    <div class="pull-right">h</div>
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
              <el-tabs >
                <el-tab-pane label="基本资料" name="userinfo">

                </el-tab-pane>
                <el-tab-pane label="修改密码" name="resetPwd">

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

export default {
  name: "Infor",
  components: {
    bar,
    sidebar,

  },
  data() {
    return {
      // 是否显示弹出层
      open: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: "修改头像",
      options: {
        img: '../../../static/item/jt1.jpg', //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      previews: {}
    };
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
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf("image/") == -1) {
        this.$message("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob(data => {
        let formData = new FormData();
        formData.append("avatarfile", data);
        this.open = false;
        this.$message({message:"修改成功",type:'success',customClass:'zZindex'});
        this.visible = false;
      });
    },
    // 实时预览
    realTime(data) {
      this.previews = data;
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
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
