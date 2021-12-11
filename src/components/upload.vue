<template>
  <div id="upload">
    <div class="my" style="width:80%; background-color: #faeaea; margin:auto; margin-top: 30px">
      <el-button type="danger" plain
                 style="transform: translateY(8%); position: relative;float: right;z-index: 2;right:8.3%"
                 @click="showuploadcommodity = true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-dialog title="上传商品" :visible.sync="showuploadcommodity" @close="resetForm('commodity')">
        <el-form :rules="rules" ref="form" :model="commodity" label-width="80px" class="demo-ruleForm">
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
            <el-input v-model="commodity.price"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category" required>
            <el-select v-model="commodity.category" placeholder="请选择商品类别">
              <el-option label="电子产品" value="电子产品"></el-option>
              <el-option label="衣服裤子" value="衣服裤子"></el-option>
              <el-option label="零食小吃" value="零食小吃"></el-option>
              <el-option label="体育用品" value="体育用品"></el-option>
              <el-option label="美容化妆" value="美容化妆"></el-option>
              <el-option label="书籍资料" value="书籍资料"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述" prop="description">
            <el-input type="textarea" v-model="commodity.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('commodity')">上传</el-button>
            <el-button type="danger" @click="resetForm('commodity')">取消</el-button>
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
                      <img v-bind:src="flag?item.url:img" title="点击上传头像"
                           class="img-circle img-lg" alt=""/>
                    </div>
                  </el-upload>


                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="item.title"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                  <el-input v-model="item.content"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="category" required>
                  <el-select v-model="item.category" placeholder="请选择商品类别">
                    <el-option label="电子产品" value="电子产品"></el-option>
                    <el-option label="衣服裤子" value="衣服裤子"></el-option>
                    <el-option label="零食小吃" value="零食小吃"></el-option>
                    <el-option label="体育用品" value="体育用品"></el-option>
                    <el-option label="美容化妆" value="美容化妆"></el-option>
                    <el-option label="书籍资料" value="书籍资料"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品描述" prop="description">
                  <el-input type="textarea" v-model="item.content"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('commodity')">上传</el-button>
                  <el-button type="danger" @click="resetForm('commodity')">取消</el-button>
                </el-form-item>
              </el-form>


            </el-dialog>
            <el-container class="box1">
              <el-aside class="img1"
                        v-bind:style="{'background':'url('+item.url+')', 'background-repeat':'no-repeat','background-position':'center','background-size':'cover' }"></el-aside>
              <el-main class="text">
                <div style="position: relative;height: 80%">
                  <span>标签：</span>
                  <p>{{ item.title }}</p><br>
                  <span>说明：</span>
                  <p>{{ item.content }}</p><br>
                  <span>说明：</span>
                  <p>{{ item.content }}</p><br>
                  <span>说明：</span>
                  <p>{{ item.content }}</p><br>
                </div>
                <div style=" position: fixed;height: 42px;right: 20px;">
                  <el-button round icon="el-icon-edit" @click="item.showonload = true" type="warning">编辑</el-button>
                  <el-button round icon="el-icon-delete" type="danger">下架</el-button>
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
              <div style="position: relative;height: 80%">
                <span>标签：</span>
                <p>{{ item.title }}</p><br>
                <span>说明：</span>
                <p>{{ item.content }}</p><br>
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

export default {
  name: "upload",
  data() {
    return {
      activeName: 'y',
      onItemList: [
        {
          url: '../../static/item/jt1.jpg',
          title: '美女1',
          content: '1111111111111111111111111111111111111111111111111111111111111111111111111111111',
          category: '',
          showonload: false,

        },
        {
          url: '../../static/item/jt2.jpg',
          title: '美女2',
          content: '22222222222222222222222222222222222222222222222222222222222222222',
          category: '',
          showonload: false,
        },
        {
          url: '../../static/item/jt3.jpg',
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333',
          category: '',
          showonload: false,
        },
        {
          url: '../../static/item/jt4.jpg',
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333',
          category: '',
          showonload: false,
        },
        {
          url: "../../static/item/jt5.jpg",
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333',
          category: '',
          showonload: false,
        },
        {
          url: "../../static/item/jt6.jpg",
          title: '美女3',
          content: '都擦无法无法无法恶法挖法啊啊啊啊啊啊啊啊我阿达伟大顶顶顶顶顶顶顶顶顶顶',
          category: '',
          showonload: false,
        },

      ],
      buyItemList: [
        {
          url: '../../static/item/jt1.jpg',
          title: '美女1',
          content: '1111111111111111111111111111111111111111111111111111111111111111111111111111111'
        },
        {
          url: '../../static/item/jt2.jpg',
          title: '美女2',
          content: '22222222222222222222222222222222222222222222222222222222222222222'
        },
        {
          url: '../../static/item/jt3.jpg',
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333'
        },
        {
          url: '../../static/item/jt4.jpg',
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333'
        },
        {
          url: "../../static/item/jt5.jpg",
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333'
        },
        {
          url: "../../static/item/jt6.jpg",
          title: '美女3',
          content: '都擦无法无法无法恶法挖法啊啊啊啊啊啊啊啊我阿达伟大顶顶顶顶顶顶顶顶顶顶'
        },
      ],
      showuploadcommodity: false,
      commodity: {
        image: '',
        name: '',
        price: '',
        category: '',
        description: '',
      },
      flag:true,
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.showuploadcommodity = false;
      this.$refs[formaName].resetFields();
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
          this.flag=false;
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
        if(code === 1){
          this.$message({message:"修改失败",type:'failed',customClass:'zZindex'});
        }
        else if(code === 0){
          this.open = false;
          this.$message({message:"修改成功",type:'success',customClass:'zZindex'});
          this.img = 'http://127.0.0.1:8081/' + res.data.avatar_url
          this.$cookies.set("avatar_url", 'http://127.0.0.1:8081/' + res.data.avatar_url)
          this.visible = false;
        }
      })
      // let formData = new FormData();
      // formData.append("avatarfile", data);
    },
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

.text span {
  margin-top: 10px;


  font-weight: bold;
}

.text p {
  margin-top: 10px;
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
