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
              <el-form :rules="rules" ref="temp" :model="item" label-width="80px" class="demo-ruleForm">
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
                  <el-button type="primary" @click="submitForm1('temp',item)">修改</el-button>
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
                  <p style="color: #656565;">{{ item.category[1] }}</p><br>
                  <span style="color: #656565; font-weight: 600">描述：</span>
                  <p style="color: #656565;">{{ item.description }}</p><br>
                </div>
                <div style=" position: fixed;height: 42px;right: 20px;">
                  <el-button round icon="el-icon-edit" v-on:click="editItem(item)" type="warning">编辑</el-button>
                  <el-button round icon="el-icon-delete" type="danger" @click="removeItem(item,index)">下架</el-button>
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
                <p style="color: #656565;">{{ item.date }}</p><br>
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
import {modifyGoods,withdrawGoods, getUpload, uploadGoods} from "../api/goods/goods"
import {getCategory} from "../api/category/category";

export default {
  name: "upload",
  data() {
    return {
      options: [],
      activeName: 'y',
      //修改商品用的
      temp: {
        url: '',
        name: '',
        price: '',
        category: [],
        description: '',
      },
      onItemList: [],
      buyItemList: [],
      showuploadcommodity: false,
      //上传商品用的
      commodity: {
        image: '',
        name: '',
        price: '',
        category:'',
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
  mounted: function () {
    this.options = []
    getCategory().then(res => {
      console.log(res.data)
      let category = res.data.category
      let length = res.data.category.length
      for (let i = 0; i < length; i++) {
        this.options.push({
          value: category[i].category,
          label: category[i].category,
          children: []
        })
        let s = '';
        for (let j = 0; j < category[i].sub_category.length; j++) {
          if (category[i].sub_category[j] !== '[' && category[i].sub_category[j] !== ']' && category[i].sub_category[j] !== ','&&category[i].sub_category[j] !== ' ') {
            s += category[i].sub_category[j];
          } else if (category[i].sub_category[j] !== '['&&category[i].sub_category[j] !== ' ') {
            this.options[i].children.push({
              value: s,
              label: s,
            })
            s = ''
          }
        }
      }
    }).catch(function (error) {
      console.log(error)
    });
    //得到上架的物品
    getUpload().then(res => {
      this.onItemList=[]
      this.buyItemList=[]
      let goodsList = res.data.goodsInfoList
      for (let i=0; i < res.data.goodsInfoList.length; i++) {
        if (goodsList[i].status === "售卖中") {
          this.onItemList.push({
            id: goodsList[i].goods_id,
            name: goodsList[i].goods_name,
            description: goodsList[i].description,
            category: [goodsList[i].category, goodsList[i].sub_category,],
            url: 'http://127.0.0.1:8081/' + goodsList[i].goods_url,
            price: goodsList[i].price,
            showonload: false,
          })
        }
        else if(goodsList[i].status === "已售出"){
          this.buyItemList.push({
            id:goodsList[i].goods_id,
            price: goodsList[i].price,
            category: [goodsList[i].category,goodsList[i].sub_category,],
            name: goodsList[i].goods_name,
            date: goodsList[i].date,
            url: 'http://127.0.0.1:8081/'+goodsList[i].goods_url,
            customer: goodsList[i].user_name,
          })

        }
      }
    }).catch(function (error) {
      console.log(error)
    });
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
    //上传商品
    submitForm(commodity) {
      this.$refs[commodity].validate((valid) => {
        if (valid) {
          uploadGoods(this.commodity.description, this.commodity.name, this.commodity.category[1], this.commodity.price, this.commodity.image).then(res => {
            this.$message.success("上传成功！")
            getUpload().then(res => {
              this.onItemList=[]
              this.buyItemList=[]
              let goodsList = res.data.goodsInfoList
              for (let i=0; i < res.data.goodsInfoList.length; i++) {
                if (goodsList[i].status === "售卖中") {
                  this.onItemList.push({
                    id: goodsList[i].goods_id,
                    name: goodsList[i].goods_name,
                    description: goodsList[i].description,
                    category: [goodsList[i].category, goodsList[i].sub_category,],
                    url: 'http://127.0.0.1:8081/' + goodsList[i].goods_url,
                    price: goodsList[i].price,
                    showonload: false,
                  })
                }
                else if(goodsList[i].status === "已售出"){
                  this.buyItemList.push({
                    id:goodsList[i].goods_id,
                    price: goodsList[i].price,
                    category: [goodsList[i].category,goodsList[i].sub_category,],
                    name: goodsList[i].goods_name,
                    date: goodsList[i].date,
                    url: 'http://127.0.0.1:8081/'+goodsList[i].goods_url,
                    customer: goodsList[i].user_name,
                  })

                }
              }
            }).catch(function (error) {
              console.log(error)
            });
            this.showuploadcommodity = false
          }).catch(function (error) {
            console.log(error)
          });
        } else {
          console.log('上传失败!!');
          return false;
        }
      });
    },
    //修改商品
    submitForm1(temp,item){
      this.$refs[temp][0].validate((valid) => {
        if (valid) {
          item.description=this.temp.description
          item.name=this.temp.name
          item.price=this.temp.price
          item.url=this.temp.url
          item.category=this.temp.category
          modifyGoods(item.id,this.temp.description, this.temp.name, this.temp.category[1], this.temp.price, this.temp.url).then(res => {
            this.$message.success("上传成功！")
            item.showonload = false
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
      if (formName === 'temp')
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
    removeItem(item,index) {
      this.$confirm('确认是否下架?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          withdrawGoods(item.id).then(res => {
            let code = res.data.code
            console.log(code)
            if (code === 1)
              this.$message.error("下架失败！")
            else
            {
              this.onItemList.splice(index)
              this.$message.success("下架成功！")
            }

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
