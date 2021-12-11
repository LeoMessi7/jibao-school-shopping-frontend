<template>
  <div id="record">
    <el-container class="box" v-for="(item,index) in onItemList" :key="index">
      <el-aside class="img"  v-bind:style="{'background':'url('+item.url+')', 'background-repeat':'no-repeat','background-position':'center','background-size':'cover' }"></el-aside>
      <el-main class="text">
        <div style="position: relative;height: 80%">
          <span>标签：</span>
          <p>{{ item.title }}</p><br>
          <span>说明：</span>
          <p>{{ item.content }}</p><br>
        </div>
        <el-footer>
          <div class="contact" style="margin-left:240px;">
            <el-button round icon="el-icon-edit" type="warning" @click="clickcommit(item)">评价</el-button>
            <el-button round icon="el-icon-chat-dot-square" type="success">卖家</el-button>
          </div>
          <el-input
            class="commit"
            type="textarea"
            :autosize="{minRows:2}"
            placeholder="请输入评价"
            v-model="item.commit"
            style="width:460px;margin-top:30px;margin-left:-12px;"
            v-show="item.showcommit"
          >
          </el-input>
          <div class="reply" style="margin-left:240px;margin-top:15px;height:70px;" v-show="item.showcommit">
            <el-button round icon="el-icon-check" type="primary" @click="submitcommit(item)">提交</el-button>
            <el-button round icon="el-icon-close" type="danger" @click="clickcancel(item)">取消</el-button>
          </div>
        </el-footer>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "record",
  data() {
    return {
      activeName: 'first',
      onItemList: [
        {
          url: '../../static/item/jt1.jpg',
          title: '美女1',
          content: '1111111111111111111111111111111111111111111111111111111111111111111111111111111',
          showcommit:false,
          commit:'',
        },
        {
          url: '../../static/item/jt2.jpg',
          title: '美女2',
          content: '22222222222222222222222222222222222222222222222222222222222222222',
          showcommit:false,
          commit:'',
        },
        {
          url: '../../static/item/jt3.jpg',
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333',
          showcommit: false,
          commit:'',
        },
        {
          url: '../../static/item/jt4.jpg',
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333',
          showcommit: false,
          commit:'',
        },
        {
          url: "../../static/item/jt5.jpg",
          title: '美女3',
          content: '33333333333333333333333333333333333333333333333333333333333333333333333333333333',
          showcommit: false,
          commit:'',
        },
        {
          url: "../../static/item/jt6.jpg",
          title: '美女3',
          content: '都擦无法无法无法恶法挖法啊啊啊啊啊啊啊啊我阿达伟大顶顶顶顶顶顶顶顶顶顶',
          showcommit:false,
          commit:'',
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
      ]
    };
  },
  methods:{
    clickcommit(item){
      item.showcommit=!item.showcommit;
    },
    submitcommit(item){
      item.showcommit=!item.showcommit;

    },
    clickcancel(item){
      item.showcommit=!item.showcommit;
    },
  }

}
</script>

<style scoped>
.box{
  margin: auto;
  width:60%;
  background-color: #fff;
  margin-bottom: 40px;
  height: 250px;
  perspective: 1000px;
  border-radius: 20px;
}
.img{
  height: 250px;
  width: 35% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px 0px 0px 20px;

}
.text span{
  margin-top: 10px;


  font-weight: bold;
}
.text p{
  margin-top: 10px;
  margin-right: 10px;
  word-wrap:break-word;
  white-space:pre-wrap;
  text-align: justify;
  display: inline;
}

</style>
