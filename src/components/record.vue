<template>
  <div id="record">
    <div v-for="(item,index) in onItemList" :key="index">
      <el-dialog :visible.sync="item.showcomment" style="padding-top: 80px;margin:auto;width: 80%" @close="resetForm('commodity')">
        <div style="margin-left: 5%">
          <span style="display: inline">评分：</span>
          <el-rate style="display: inline;" :colors="['#fcbdab','#fcbdab','#fcbdab']" v-model="item.rate"></el-rate>
        </div>
        <div style="padding-top: 20px;margin-left: 5%">
          <span >评价：</span><br>
          <el-input
            class="commit"
            type="textarea"
            :autosize="{minRows:3}"
            placeholder="请输入评价"
            v-model="item.comment"
            style="width:90%;margin-top: 10px"
            v-show="item.showcomment"
          />
        </div>
        <div class="reply" style="margin-top:20px;text-align: center" v-show="item.showcomment">
          <i class="el-icon-circle-check"
             :style="icolor"
             @mouseover="mouseOver(0)"
             @mouseleave="mouseLeave(0)"
             style=" font-size: 25px;transform: translateX(-15px)" @click="submitcommit(item)"></i>
          <i class="el-icon-circle-close"
             :style="icolor1"
             @mouseover="mouseOver(1)"
             @mouseleave="mouseLeave(1)"
             style=" font-size: 25px;transform: translateX(15px)" @click="clickcancel(item)"></i>
        </div>
      </el-dialog>
      <el-container class="box">

        <el-aside class="img"
                  v-bind:style="{'background':'url('+item.url+')', 'background-repeat':'no-repeat','background-position':'center','background-size':'cover' }"></el-aside>
        <el-main class="text">
          <div style="position: relative;height: 70%">
            <span>标签：</span>
            <p>{{ item.title }}</p><br>
            <span>说明：</span>
            <p>{{ item.content }}</p><br>
          </div>
          <el-footer style="position: fixed;height: 42px;right: 20px;bottom: 20px">
            <div class="contact" style="margin-left:240px;">
              <el-button round icon="el-icon-edit" type="warning" @click="item.showcomment=true">评价</el-button>
              <el-button round icon="el-icon-chat-dot-square" style="display: inline" type="success">卖家</el-button>
            </div>
          </el-footer>
        </el-main>
      </el-container>
    </div>

  </div>
</template>

<script>
import {getPurchase} from '../api/goods/goods'
export default {
  name: "record",
  data() {
    return {
      activeName: 'first',
      icolor:'color:grey' ,
      icolor1:'color:grey',
      onItemList: [
        {
          url: '../../static/item/jt1.jpg',
          title: '美女1',
          content: '1111111111111111111111111111111111111111111111111111111111111111111111111111111',
          showcomment: false,
          rate: null,
          comment: '',
        },
      ],
    };
  },


  mounted:function() {
    getPurchase().then(res =>{
      console.log(res.data)
      let purchase_list = res.data.goodsInfoList
      let length = res.data.length
      for(let i = 0; i < length; i++){
        this.onItemList.push({
          url: 'http://127.0.0.1:8081/' + purchase_list[i].goods_url,
          title: purchase_list[i].name,
          content: purchase_list[i].description,
          showcomment: false,
          rate: null,
          comment: '',
        })
      }
    }).catch(function (error) {
      console.log(error)
    });
  },

  methods: {
    mouseOver(index) {
      if(index==0)
        this.icolor = 'color: #F56C6C';
      else if(index==1)
        this.icolor1=  'color: #F56C6C';

    },
    mouseLeave(index) {
      if(index==0)
        this.icolor = 'color: black';
      else if(index==1)
        this.icolor1=  'color: black';

    },
    submitcommit(item) {
      item.showcomment = !item.showcomment;

    },
    clickcancel(item) {
      item.showcomment = !item.showcomment;
    },
  }

}
</script>

<style scoped>
.box {
  margin: auto;
  width: 60%;
  background-color: #fff;
  margin-bottom: 40px;
  height: 250px;
  perspective: 1000px;
  border-radius: 20px;
}

.img {
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
/deep/ .el-textarea__inner:focus {
  border: 1px solid rgb(252, 208, 195);
  box-shadow: 0 1px 3px rgb(252, 208, 195), 0 3px 3px rgb(243, 244, 246);
}
</style>
