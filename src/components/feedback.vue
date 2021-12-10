<template>
  <div id="feedback" style="background-color: #faeaea;">
    <div style="margin-top:50px;background-color: #faeaea;text-align: center">
      <el-form ref="form" style="width: 60%;margin:0 auto;" :model="form" label-width="80px">
        <el-form-item >
          <h1 style="margin-bottom: 0px">客服反馈</h1>
        </el-form-item>
        <el-form-item >
          <textarea style="width: 100%" :rows=" 15 " placeholder = "欢迎提出宝贵意见..." v-model="form.content"></textarea>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" style="margin:0 auto;" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "feedback",
  data(){
    return{
      form: {
        name: '',
        content:'',
      }
    }
  },
  methods: {
    onSubmit() {
      const h = this.$createElement;
      this.$msgbox({
        title: '提交',
        message: h('p', null, [
          h('span', null, '请确认是否提交？ '),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '提交中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 300);

          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: 'action: ' + action
        });
      });
    }
  }

}
</script>

<style scoped>
/deep/ .el-input__inner:focus{
  border-color:pink!important;
}
textarea{
  width:400px;

  min-height:20px;

  max-height:500px;

  _height:120px;

  margin-left:auto;

  margin-right:auto;

  padding:0px;

  outline:0;
  border-radius: 10px;
  border:1px solid #dde0e7;

  font-size:16px;

  line-height:24px;

  padding:2px;

  word-wrap:break-word;

  overflow-x:hidden;

  overflow-y:auto;

}
textarea:focus{
  border-color: #efd6cf;
  box-shadow:0 1px 10px rgb(252, 208, 195),0 10px 10px rgb(243, 244, 246);
}
</style>
