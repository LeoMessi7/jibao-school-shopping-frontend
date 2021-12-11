<template>
  <div id="upload">
    <div class="my" style="width:80%; background-color: #faeaea; margin:auto; margin-top: 30px">
      <el-button type="danger" plain
                 style="transform: translateY(8%); position: relative;float: right;z-index: 2;right:8.3%"
                 @click="showuploadcommodity = true">上传
        <i class="el-icon-upload el-icon--right"/>
      </el-button>
      <el-dialog title="上传商品" :visible.sync="showuploadcommodity" @close="showuploadcommodity=false">
        <el-form :rules="rules" ref="commodity" :model="commodity" label-width="80px" class="demo-ruleForm">
          <el-form-item label="商品图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePictureCardPreview"
              :on-change="handleEditChange"
              list-type="picture-card"
              :auto-upload="false"
              :on-remove="handleRemove"
              :class="{hide:hideUploadEdit}"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-dialog :visible.sync="dialogVisible" :modal-append-to-body='false'>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="commodity.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input type="number" v-model="commodity.price"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category" required>
            <el-cascader
              v-model="commodity.category"
              :show-all-levels="false"
              :options="options"
              clearable></el-cascader>
          </el-form-item>
          <el-form-item label="商品描述" prop="description">
            <el-input type="textarea" v-model="commodity.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('commodity')">上传</el-button>
            <el-button type="danger" @click="showuploadcommodity=false">取消</el-button>
          </el-form-item>
        </el-form>


      </el-dialog>
      <el-tabs type="card" style="" v-model="activeName">
        <el-tab-pane label="在售" name="y">
          <div v-for="(item,index) in onItemList" :key="index">
            <el-dialog title="编辑商品" :visible.sync="item.showonload">
              <el-form :rules="rules" ref="form" :model="item" label-width="80px" class="demo-ruleForm">
                <el-form-item label="商品图片">
                  <el-upload style="margin-left:40px; float: left" action="#" :http-request="requestUpload"
                             :show-file-list="false" :before-upload="beforeUpload">
                    <div class="user-info-head">
                      <img v-bind:src="flag?temp.url:img" title="点击上传头像"
                           class="img-circle img-lg" alt=""/>
                    </div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="temp.name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                  <el-input type="number" v-model="temp.price"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="category" required>
                  <el-cascader
                    v-model="temp.category"
                    :show-all-levels="false"
                    :options="options"
                    clearable></el-cascader>
                </el-form-item>
                <el-form-item label="商品描述" prop="description">
                  <el-input type="textarea" v-model="temp.description"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('temp')">修改</el-button>
                  <el-button type="danger" @click="item.showonload=false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-container class="box1">
              <el-aside class="img1"
                        v-bind:style="{'background':'url('+item.url+')', 'background-repeat':'no-repeat','background-position':'center','background-size':'cover' }"></el-aside>
              <el-main class="text">
                <div style="position: relative;height: 80%;line-height: 25px;">
                  <span style="color: #656565; font-weight: 600">名称：</span>
                  <p style="color: #656565;">{{ item.name }}</p><br>
                  <span style="color: #656565; font-weight: 600">价格：</span>
                  <p style="color: #656565">{{ item.price }}</p><br>
                  <span style="color: #656565; font-weight: 600">分类：</span>
                  <p style="color: #656565;">{{ item.category }}</p><br>
                  <span style="color: #656565; font-weight: 600">描述：</span>
                  <p style="color: #656565;">{{ item.description }}</p><br>
                </div>
                <div style=" position: fixed;height: 42px;right: 20px;">
                  <el-button round icon="el-icon-edit" v-on:click="editItem(item)" type="warning">编辑</el-button>
                  <el-button round icon="el-icon-delete" type="danger" @click="removeItem(item)">下架</el-button>
                </div>
              </el-main>
            </el-container>

          </div>
        </el-tab-pane>
        <el-tab-pane label="已卖出" name="n">
          <el-container class="box1" v-for="(item,index) in buyItemList" :key="index">
            <el-aside class="img1"
                      v-bind:style="{'background':'url('+item.url+')', 'background-repeat':'no-repeat','background-position':'center','background-size':'cover' }"></el-aside>
            <el-main class="text">
              <div style="position: relative;height: 80%;line-height: 30px;">
                <span style="color: #656565; font-weight: 600">商品名称：</span>
                <p style="color: #656565;">{{ item.name }}</p><br>
                <span style="color: #656565; font-weight: 600">买家:</span>
                <p style="color: #656565;">{{ item.customer }}</p><br>
                <span style="color: #656565; font-weight: 600">卖出时间：</span>
                <p style="color: #656565;">{{ item.time }}</p><br>
              </div>
              <div style="position: fixed;height: 42px; right: 20px;">
                <el-button round icon="el-icon-s-custom" type="primary">买家</el-button>
              </div>
            </el-main>
          </el-container>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import {updateAvatar} from "../api/user/info";
import {feedback} from "../api/feedback/feedback";
import {uploadGoods} from"../api/goods/goods"
export default {
  name: "upload",
  data() {
    return {
      options: [
        {
          value: '电子产品',
          label: '电子产品',
          children: [{
            value: '手机',
            label: '手机',
          }, {
            value: '电脑',
            label: '电脑',
          }]
        },
        {
          value: '衣服裤子',
          label: '衣服裤子',
          children: [{
            value: '衣服',
            label: '衣服',
          }, {
            value: '裤子',
            label: '裤子',
          }]
        },
        {
          value: '零食小吃',
          label: '零食小吃',
          children: [{
            value: '水果',
            label: '水果',
          }, {
            value: '饼干',
            label: '饼干',
          }]
        },
        {
          value: '体育用品',
          label: '体育用品',
          children: [{
            value: '篮球',
            label: '篮球',
          }, {
            value: '足球',
            label: '足球',
          }]
        },
        {
          value: '美容化妆',
          label: '美容化妆',
          children: [{
            value: '口红',
            label: '口红',
          }, {
            value: '粉底',
            label: '粉底',
          }]
        },
        {
          value: '书籍资料',
          label: '书籍资料',
          children: [{
            value: '数学',
            label: '数学',
          }, {
            value: '计算机',
            label: '计算机',
          }]
        },
        {
          value: '其他',
          label: '其他',
          children: [{
            value: '其他',
            label: '其他',
          }]
        },
      ],
      activeName: 'y',
      //修改商品用的
      temp: {
        url: '',
        name: '',
        price: '',
        category: '',
        description: '',
      },
      onItemList: [
        {
          url: '../../static/item/jt1.jpg',
          name: '123',
          price: '123',
          category: '数学',
          description: '123',
          showonload: false,
        },
      ],
      buyItemList: [
        {
          url: '../../static/item/jt1.jpg',
          name: '123',
          time: '123',
          customer: '123',
        },
      ],
      showuploadcommodity: false,
      //上传商品用的
      commodity: {
        image: '',
        name: '',
        price: '',
        category: '',
        description: '',
      },
      flag: true,//是否第一次上传头像
      img: this.$cookies.get("avatar_url"),
      uploadURL: '',
      headerObj: {
        Authorization: localStorage.getItem("token"),
      },
      dialogVisible: false,
      hideUploadEdit: false,
      hideImgEdit: true,
      dialogImageUrl: '',
      limitCount: 1,
      rules: {
        name: [
          {required: true, message: "请输入商品名称", trigger: 'blur'}
        ],
        price: [
          {required: true, message: "请输入商品价格", trigger: 'blur'}
        ],
        category: [
          {required: true, message: "请输入商品分类", trigger: 'blur'}
        ],
        description: [
          {required: true, message: "请输入商品描述", trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    editCropper() {
      this.open = true;
    },
    modalOpened() {
      this.visible = true;
    },
    handleRemove(file, fileList) {
      this.hideUploadEdit = true;
      this.listLength = fileList.length;
      this.hideUploadEdit = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleEditChange(file, fileList) {
      let vm = this;
      vm.hideUploadEdit = fileList.length >= this.limitCount;
    },
    submitForm(commodity) {
      this.$refs[commodity].validate((valid) => {
        if (valid) {
          uploadGoods(this.commodity.description,this.commodity.name,this.commodity.category[1],this.commodity.price).then(res => {
            this.$message.success("上传成功！")
          }).catch(function (error) {
            console.log(error)
          });
        } else {
          console.log('上传失败!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      if(formName==='temp')

      this.showuploadcommodity = false;
      this.$refs[formName].resetFields();
    },
    // 覆盖默认的上传行为
    requestUpload() {
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf("image/") === -1) {
        this.$message("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
      } else {
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.img = reader.result;
          this.flag = false;
          this.$cookies.set("avatar_img", file)
        }
      }
    },
    // 上传图片
    uploadImg() {
      let image = this.$cookies.get("avatar_img")
      console.log(image)
      updateAvatar(image).then(res => {
        let code = res.data.code
        if (code === 1) {
          this.$message({message: "修改失败", type: 'failed', customClass: 'zZindex'});
        } else if (code === 0) {
          this.open = false;
          this.$message({message: "修改成功", type: 'success', customClass: 'zZindex'});
          this.img = 'http://127.0.0.1:8081/' + res.data.avatar_url
          this.$cookies.set("avatar_url", 'http://127.0.0.1:8081/' + res.data.avatar_url)
          this.visible = false;
        }
      })
      // let formData = new FormData();
      // formData.append("avatarfile", data);
    },
    editItem(item) {
      item.showonload = true
      this.temp.name = item.name
      this.temp.url = item.url
      this.temp.category = item.category
      this.temp.price = item.price
      this.temp.description = item.description
    },
    removeItem(item) {
      this.$confirm('确认是否下架?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          withdrawGoods(gid).then(res => {
            let code = res.data.code
            console.log(code)
            if (code === 1)
              this.$message.error("发送失败！")
            else
              this.$message.success("发送成功！")
          }).catch(function (error) {
            console.log(error)
          });
        }, 300);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下架'
        });
      });
    }
  }
}
</script>

<style>
.my .el-tabs__item {
  color: #656565 !important;
}

.my .el-tabs__item.is-active {
  color: #fcbdab !important;
}

.my .el-tabs__item:hover {
  color: #fcbdab !important;
}

.my .el-tabs__item {

  height: 47px;
  line-height: 47px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}

.my .el-tabs__nav-scroll {
  background-color: #f3f4f6;
}

.my .el-tabs--card .el-tabs__header .el-tabs__nav {
  border: none;
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #fcbdab;

}

.my .el-tabs__content {
  padding: 10px;
}

.box1 {
  width: 60%;
  background-color: #fff;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 40px;
  height: 250px;
  perspective: 1000px;
  border-radius: 20px;
}

.img1 {
  height: 250px;
  width: 35% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px 0px 0px 20px;

}


.text p {
  margin-top: 0px;
  margin-right: 10px;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: justify;
  display: inline;
}

.hide .el-upload--picture-card {
  display: none;
}

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
  border-radius: 10px;
}

.img-circle {
  border-radius: 10px;
}

.img-lg {
  width: 120px;
  height: 120px;
}


</style>
