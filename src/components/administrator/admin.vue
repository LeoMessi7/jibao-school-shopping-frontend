<template>
  <div id="Admin">
    <AdminBar></AdminBar>
    <el-container>
      <AdminSidebar></AdminSidebar>
      <el-main>
        <div class="add">
          <el-button type="primary" icon="el-icon-plus" style="width:100px" @click="showadddialogue=true">添加</el-button>
        </div>
        <div class="table">
          <el-table
            :data="editForm"
            border
            style="width:100%"
            height="450">
            <el-table-column
              prop="firstcatalogue"
              label="一级目录"
              width="190">
            </el-table-column>
            <el-table-column
              prop="secondcatalogue"
              label="二级目录"
              width="210">
            </el-table-column>
            <el-table-column
              prop="description"
              label="目录描述"
              width="300">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button @click="editDialogue(scope.row)" icon="el-icon-edit" size="small" type="primary">编辑</el-button>
                <el-button icon="el-icon-delete" size="small" type="danger" @click="deleterow(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog
          titel="编辑目录"
          :visible.sync="showeditdialogue"
          width="50%"
          @close="editDialogClosed">
          <el-form
            :model="editForm"
            :rules="editFormRules"
            ref="editFormRef"
            label-width="80px">
            <el-form-item label="一级目录" prop="firstcatalogue">
              <el-input v-model="editForm.firstcatalogue"></el-input>
            </el-form-item>
            <el-form-item label="二级目录" prop="secondcatalogue">
              <el-input v-model="editForm.secondcatalogue"></el-input>
            </el-form-item>
            <el-form-item label="目录描述" prop="description">
              <el-input
                type="textarea"
                :autosize="{minRows:2}"
                v-model="editForm.description">
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialoguefooter">
            <el-button type="primary" icon="el-icon-check" @click="showeditdialogue=false">确定</el-button>
            <el-button type="danger" icon="el-icon-close" @click="showeditdialogue=false">取消</el-button>
          </span>
        </el-dialog>

        <el-dialog
          titel="添加目录"
          :visible.sync="showadddialogue"
          width="50%"
          @close="addDialogClosed">
          <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="80px">
            <el-form-item label="一级目录" prop="firstcatalogue">
              <el-input v-model="addForm.firstcatalogue"></el-input>
            </el-form-item>
            <el-form-item label="二级目录" prop="secondcatalogue">
              <el-input v-model="addForm.secondcatalogue"></el-input>
            </el-form-item>
            <el-form-item label="目录描述" prop="description">
              <el-input
                type="textarea"
                :autosize="{minRows:2}"
                v-model="addForm.description">
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialoguefooter">
            <el-button type="primary" icon="el-icon-check" @click="showadddialogue=false">确定</el-button>
            <el-button type="danger" icon="el-icon-close" @click="showadddialogue=false">取消</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AdminBar from "./adminbar"
import AdminSidebar from "./adminsidebar"

export default{
  name:"Admin",
  components :{
    AdminSidebar,
    AdminBar
  },
  data(){
    return {
      editForm:[{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      }, {
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      },{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      },{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      },{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      },{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      },{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      },{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      },{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      },{
        firstcatalogue:'0',
        secondcatalogue:'0',
        description:'0',
      }],
      showeditdialogue:false,
      showadddialogue:false,
      addForm:{
        firstcatalogue:'',
        secondcatalogue:'',
        description:'',
      },
      editFormRules:{
        firstcatalogue: [
          {required:true,message:'请输入一级目录',trigger:'blur'},
        ],
        secondcatalogue: [
          {required:true,message:'请输入二级目录',trigger:'blur'},
        ],
        description: [
          {required:true,message:'请输入目录介绍',trigger:'blur'},
        ]
      },
      addFormRules:{
        firstcatalogue: [
          {required:true,message:'请输入一级目录',trigger:'blur'},
        ],
        secondcatalogue: [
          {required:true,message:'请输入二级目录',trigger:'blur'},
        ],
        description: [
          {required:true,message:'请输入目录介绍',trigger:'blur'},
        ]
      },
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      console.log(row);
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
  }
}
</script>

<style scoped>
.table{
  position:absolute;
  left:400px;
  top:220px;
}
.add{
  position:absolute;
  width:500px;
  left:400px;
  top:170px;
}
</style>
