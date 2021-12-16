<template>
  <div id="feedback" style="background-color: #faeaea;">
    <div style="margin-top:50px;background-color: #faeaea;text-align: center">
      <el-form ref="form" style="width: 60%;margin:0 auto;" :model="form" label-width="80px">
        <el-form-item>
          <h1 style="margin-bottom: 0px">客服反馈</h1>
        </el-form-item>
        <el-form-item>
          <textarea style="width: 100%" :rows=" 15 " placeholder="欢迎提出宝贵意见..." v-model="form.content"></textarea>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin:0 auto;" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {userfeedback} from "../api/feedback/feedback";

export default {
  name: "feedback",
  data() {
    return {
      form: {
        content: '',
      }
    }
  },
  mounted(){
    if(!this.$cookies.isKey("user_name")){
      this.$message({message:"请先登录！",type:'warning',customClass:'zZindex'})
      this.$router.push("/Login")
    }
  },
  methods: {
    onSubmit() {
      if (this.form.content === '') {
        this.$message.error("不能提交空白信息！")
      } else {
        this.$confirm('确认是否提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setTimeout(() => {
            userfeedback(this.form.content).then(res => {
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
            message: '已取消发送！'
          });
        });
      }
    }
  }
}
</script>

<style scoped>
/deep/ .el-input__inner:focus {
  border-color: pink !important;
}

textarea {
  width: 400px;

  min-height: 20px;

  max-height: 500px;

  _height: 120px;

  margin-left: auto;

  margin-right: auto;

  padding: 0px;

  outline: 0;
  border-radius: 10px;
  border: 1px solid #dde0e7;

  font-size: 16px;

  line-height: 24px;

  padding: 2px;

  word-wrap: break-word;

  overflow-x: hidden;

  overflow-y: auto;

}

textarea:focus {
  border-color: #efd6cf;
  box-shadow: 0 1px 10px rgb(252, 208, 195), 0 10px 10px rgb(243, 244, 246);
}
</style>
