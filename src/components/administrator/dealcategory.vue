<template>
  <div id="dealcategory">
    <div class="add">
      <p style="font-weight: 600;display: inline;line-height: 45px">类别管理</p>
      <div class="btn" style="display: inline">
        <el-button class="btn" circle icon="el-icon-plus"
                   style="display: flex;float: right;margin-bottom: 20px"
                   @click="showAdd=true;this.addCategory={}"></el-button>
      </div>
      <br>
      <div class="table">
        <el-table
          :data="category"
          border
          style="width:100%"
          height="450">
          <el-table-column
            prop="category"
            label="主类别"
            width="190">
          </el-table-column>
          <el-table-column
            prop="subCategory"
            label="子类别"
            width="210">
          </el-table-column>
          <el-table-column
            prop="description"
            label="类别描述"
            width="300">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button @click="edit(scope.$index)" style="color: #3287b4" size="small" type="text">编辑
              </el-button>
              <el-button size="small" type="text" style="color: #ff0000" @click="deleteItem(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
      <el-dialog
        titel="编辑目录"
        v-for="(item,index) in category" :key="index"
        v-if="item.showEdit"
        :visible.sync="item.showEdit"
        width="50%"
        @close="item.showEdit=false">
        <el-form
          :model="temp"
          ref="temp"
          :rules="rules"
          label-width="80px">
          <el-form-item label="主类别" prop="category">
            <el-input v-model="temp.category"></el-input>
          </el-form-item>
          <el-form-item label="子类别" prop="subCategory">
            <el-input v-model="temp.subCategory"></el-input>
          </el-form-item>
          <el-form-item label="类别描述" prop="description">
            <el-input
              type="textarea"
              :autosize="{minRows:2}"
              v-model="temp.description">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialoguefooter">
            <el-button type="primary" icon="el-icon-check" @click="update('temp',item)">确定</el-button>
            <el-button type="danger" icon="el-icon-close" @click="item.showEdit=false">取消</el-button>
          </span>
      </el-dialog>
    <el-dialog
      titel="添加目录"
      :visible.sync="showAdd"
      width="50%"
      @close="addDialogClosed">
      <el-form
        :model="addCategory"
        :rules="rules"
        ref="addFormRef"
        label-width="80px">
        <el-form-item label="主类别" prop="category">
          <el-input v-model="addCategory.category"></el-input>
        </el-form-item>
        <el-form-item label="子类别" prop="subCategory">
          <el-input v-model="addCategory.subCategory"></el-input>
        </el-form-item>
        <el-form-item label="类别描述" prop="description">
          <el-input
            type="textarea"
            :autosize="{minRows:2}"
            v-model="addCategory.description">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialoguefooter">
            <el-button type="primary" icon="el-icon-check" @click="add(addCategory)">确定</el-button>
            <el-button type="danger" icon="el-icon-close" @click="showAdd=false">取消</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import {deleteCategory,addCategory,updateCategory,getCategory} from "../../api/admin/admin";
import {modifyGoods} from "../../api/goods/goods";
export default {
  name: "dealcategory",
  data() {
    return {
      category: [],
      showAdd: false,
      addCategory: {},
      temp: {
        category:'',
        subCategory:'',
        description:'',
        cid:'',
      },
      rules: {
        category: [
          {required: true, message: '请输入主类别', trigger: 'blur'},
        ],
        subCategory: [
          {required: true, message: '请输入子类别', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入类别描述', trigger: 'blur'},
        ]
      },
    }
  },
  mounted: function () {
    getCategory().then(res => {
      let category=res.data.category
      this.category=[];
      let s={}
      for(let i=0;i<category.length;i++){
        this.category.push({
          showEdit:false,
          cid:category[i].cid,
          category:category[i].category,
          subCategory:category[i].sub_category,
          description: category[i].description
        })
      }
    }).catch(function (error) {
      console.log(error)
    });
  },
  methods: {
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    addDialogClosed() {
      this.addCategory=[];
    },
    editDialogClosed() {
      this.addCategory=[];
    },
    edit(index){
      this.category[index].showEdit=true
      this.temp.cid=this.category[index].cid
      this.temp.category=this.category[index].category
      this.temp.subCategory=this.category[index].subCategory
      this.temp.description=this.category[index].description
    },
    add(item) {
      addCategory(item.category,item.subCategory,item.description).then(res => {
        if(res.data.code===0){
          this.$message.success("添加成功！")
          getCategory().then(res => {
            let category=res.data.category
            this.category=[];
            let s={}
            for(let i=0;i<category.length;i++){
              this.category.push({
                cid:category[i].cid,
                category:category[i].category,
                subCategory:category[i].sub_category,
                description: category[i].description
              })
            }
          }).catch(function (error) {
            console.log(error)
          });
        }
        else  this.$message.error("添加失败！")
      }).catch(function (error) {
        console.log(error)
      });
    },
    deleteItem(index){
      console.log(index)
      deleteCategory(this.category[index].subCategory).then(res =>{
          if(res.data.code===0){
            this.$message.success('删除成功!')
            this.category.splice(index,1);
          }
          else this.$message.error("删除失败！")
      }).catch(function (error) {
        console.log(error)
      });
    },
    update(temp,item){
      this.$refs[temp][0].validate((valid) => {
        if (valid) {
          console.log(this.temp)
          item.category=this.temp.category
          item.subCategory=this.temp.subCategory
          item.description=this.temp.description
          updateCategory(this.temp.cid,this.temp.category,this.temp.subCategory,this.temp.description).then(res => {
            if(res.data.code===0){
              this.$message.success("修改成功！")
            }
            else  this.$message.error("修改失败！")
          }).catch(function (error) {
            console.log(error)
          });
        } else {
          console.log('修改失败!!');
          return false;
        }
      });

    }
  }
}
</script>

<style scoped>
#dealcategory {
  position: center;
  display: flex;
  justify-items: center;
  justify-content: center;
}

.add {
  margin-top: 50px;
  position: relative;
}

.table {
  margin-top: 20px;
  position: relative;
}
.btn .el-button:hover {
  background-color: #e86e4b;
  color: #faf3f3;
  border-color: #fcefed;
}
</style>
