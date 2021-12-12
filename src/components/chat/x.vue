<template>
  <div id="x">
    <div id="chat">
      <div id="xchat">
        <div class="sidebar">
          <div class="card">
            <header>
              <img class="avatar" :src="avatar_url" >
              <p class="name">{{my_name}}</p>
            </header>
            <footer>
              <input class="search" type="text"  placeholder="search user...">
            </footer>
          </div>
          <div class="list">
            <ul>
              <li v-for="(item,i) in message" :key="i"  :class="{ active: item.to === current_to_name }"
                  v-on:click="change(item.to)"><!--   :class="[item.id === currentSessionId ? 'active':'']" -->
                <img class="avatar" :src="item.avatar" >
                <p class="name">{{item.to}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="main">
          <div class="message">
            <div v-scroll-bottom="sessions">
              <ul v-if="current_to_name===item.to"  v-for="(item,index) in message" :key="index">
                <li v-for="(entry,index) in item.content" :key="index">
                  <p class="time">
                    <span>{{ entry.date | time }}</span>
                  </p>
                  <div class="main" :class="{self:entry.from===my_name}">
                    <img class="avatar" :src="(entry.from === my_name ? item.avatar : item.avatar)" alt="">
                    <p class="text">{{ entry.content }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="uesrtext">
            <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {message, current_to_name, change_to, my_name, sendMessage, send, avatar_url} from "../../js/global"
import {getChat, saveChat} from "../../api/user/chat";
export default {
  name: "x",
  data () {
    return {
      'message': message,
      'current_to_name': current_to_name,
      'my_name': my_name,
      'avatar_url': avatar_url,
      content:''
    }
  },
  mounted:function() {
    this.$store.dispatch('initData');
  },
  filters: {
    time(date) {
      if (date) {
        date = new Date(date);
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
  },
  created: function () {
    setInterval(this.timer, 1000);
  },
  directives: {/*这个是vue的自定义指令,官方文档有详细说明*/
    // 发送消息后滚动到底部,这里无法使用原作者的方法，也未找到合理的方法解决，暂用setTimeout的方法模拟
    'scroll-bottom'(el) {
      //console.log(el.scrollTop);
      setTimeout(function () {
        el.scrollTop += 9999;
      }, 1)
    }
  },
  computed: mapState([
    'sessions',
    'currentSessionId'
  ]),
  methods:{
    timer:function (){
      this.message = message
    },
    change: function(to){
      change_to(to);
      this.current_to_name = to
    },
    addMessage (e) {
      if (e.ctrlKey && e.keyCode ===13 && this.content.length) {
        sendMessage(this.content)
        global.ws.send(send(my_name, current_to_name, this.content))
        saveChat(my_name, current_to_name, this.content).then(res =>{
        }).catch(function (error) {
          console.log(666);
        });


        this.content = '';
      }
    },
    changeCurrentSessionId:function (id) {
      this.$store.commit('changeCurrentSessionId',id)
    }
  }
}
</script>

<style scoped>
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

.message {
  margin-top: 20px;
  padding: 15px;
  max-height: 68%;
  overflow-y: scroll;
}

.message ul {
  padding: 0;
  list-style-type: none;
}

.message li {
  margin-bottom: 15px;
}

.message .time {
  text-align: center;
  margin: 7px 0;
}

.message span {
  display: inline-block;
  padding: 0 18px;
  font-size: 12px;
  color: #FFF;
  background-color: #dcdcdc;
  border-radius: 2px;
}

.message .main .avatar {
  float: left;
  margin: 0 10px 0 0;
  border-radius: 50px;
  width: 40px;
  height: 40px;

}
.message .main .text {
  display: inline-block;
  padding: 0 10px;
  max-width: 80%;
  background-color: #fafafa;
  border-radius: 4px;
  line-height: 30px;
}

.message .self {
  text-align: right;
}

.message .self .avatar {
  float: right;
  margin: 0 0 0 10px;
  border-radius: 50px;
  width: 40px;
  height: 40px;
}

.message .self .text {
  display: inline-block;
  padding: 0 10px;
  max-width: 80%;
  background-color: #b2e281;
  border-radius: 4px;
  line-height: 30px;
}
.list ul{
  padding: 0;
}
.list li {
  padding: 3px 15px;
  list-style-type:none;
  border-bottom: 1px solid #292C33;
  cursor: pointer;

}
.list li:hover {
  background-color: rgba(255, 255, 255, 0.03);
}
.list li .active {/*注意这个是.不是冒号:*/
  background-color: rgba(255, 255, 255, 0.1);
}
.list .avatar {
  border-radius: 50px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.list .name {
  display: inline-block;
  margin-left: 15px;
}
.card {
  padding: 12px;
}
.card img{
  border-radius: 50px;
}
.card .avatar{
  width: 40px;
  height: 40px;
  vertical-align: middle;/*这个是图片和文字居中对齐*/
}
.card .name {
  display: inline-block;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
}
.card .search {
  background: #26292E;
  height: 30px;
  line-height: 30px;
  padding: 0 6px;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  outline: none;/*鼠标点击后不会出现蓝色边框*/
  color: #FFF;
}
.uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #DDD;}
.uesrtext textarea {
  padding: 10px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
@font-face {
  font-family:SuCaiJiShiKangKangTi;
  src:url("../../font/SuCaiJiShiKangKangTi.ttf");
}
</style>
