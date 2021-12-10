<template>
  <div id="upload" >
    <div class="my" style="width:80%; background-color: #faeaea; margin:auto; margin-top: 30px">
      <p>我的物品</p>
      <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-tabs type="card" style="" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="在售" name="y">
          <el-container class="box1" v-for="(item,index) in onItemList" :key="index">
            <el-aside class="img1" v-bind:style="{'background':'url('+item.url+')', 'background-repeat':'no-repeat','background-position':'center','background-size':'cover' }"></el-aside>
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
                <el-button round icon="el-icon-edit" type="warning">编辑</el-button>
                <el-button round icon="el-icon-delete" type="danger">下架</el-button>
              </div>
            </el-main>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="已卖出" name="n">
          <el-container class="box1" v-for="(item,index) in buyItemList" :key="index">
            <el-aside class="img1" v-bind:style="{'background':'url('+item.url+')', 'background-repeat':'no-repeat','background-position':'center','background-size':'cover' }"></el-aside>
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
export default {
  name: "upload",
  data() {
    return {
      activeName: 'y',
      onItemList: [
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
        {url: "../../static/item/jt6.jpg", title: '美女3', content: '都擦无法无法无法恶法挖法啊啊啊啊啊啊啊啊我阿达伟大顶顶顶顶顶顶顶顶顶顶'},
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
        {url: "../../static/item/jt6.jpg", title: '美女3', content: '都擦无法无法无法恶法挖法啊啊啊啊啊啊啊啊我阿达伟大顶顶顶顶顶顶顶顶顶顶'},

      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #fcbdab;

}
.my .el-tabs__content {
  padding: 10px;
}

.box1{
  width:60%;
  background-color: #fff;
  margin-left:20%;
  margin-right:20%;
  margin-bottom: 40px;
  height: 250px;
  perspective: 1000px;
  border-radius: 20px;
}
.img1{
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
