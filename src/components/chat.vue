<template>
  <div id="chat">
    <div id="xchat">
      <div class="sidebar">
        <card></card>
        <list></list>
      </div>
      <div class="main">
        <message></message>
        <usertext></usertext>
      </div>
    </div>
  </div>
</template>

<script>
import card from './chat/card.vue'
import list from './chat/list.vue'
import message from './chat/message.vue'
import usertext from './chat/usertext.vue'
export default {
  name: "chat",
  mounted:function() {
    if (!this.$cookies.isKey("user_name")) {
      this.$message({message: "请先登录！", type: 'warning', customClass: 'zZindex'})
      this.$router.push("/Login")
    }
    this.$store.dispatch('initData');
  },
  components:{
    card,
    list,
    message,
    usertext
  }
}
</script>

<style  scoped>
#xchat {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;}
 .sidebar, .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    color: #f4f4f4;
    background-color: #2e3238;
    width: 200px;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }

</style>
