<template>
  <div class="table">
    <el-aside>
    <el-row class="tac">
      <el-col :span="16">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          router
        >
          <el-menu-item
            :index="item.path"
            v-for="item in noChildren"
            :key="item.path"
            @click="clickMenu(item)"
          >
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
          <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.path">
            <template slot="title">
              <i :class="'el-icon-'+item.icon"></i>npm
              <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="subItem.path"
                v-for="(subItem,subIndex) in item.children"
                :key="subIndex"
                @click="clickMenu(subItem)"
              >
                <i :class="'el-icon-'+subItem.icon"></i>
                <span slot="title">{{subItem.label}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    </el-aside>
  </div>
</template>

<script>
export default{
  data(){
    return {
      menu: [
        {
          path:"/admin",
          name:"admin",
          label:"用户管理",
          icon:"location",
        },
        {
          path:"/dealfeedback",
          name:"dealfeedback",
          label:"处理反馈",
          icon:"location",
        }
      ],
    }
  },
  methods:{
    clickMenu(item){
      this.$router.push({path:item.path});
    },
  },
  computed:{
    noChildren(){
      return this.menu.filter((item)=>!item.children);
    },
    hasChildren(){
      return this.menu.filter((item)=>item.children);
    },
  }
}
</script>

<style scoped>
.table{
  /*position:absolute;*/
  /*width:400px;*/
  /*height:500px;*/
  /*top:60px;*/
  position:absolute;
  top:60px;
  left:0px;
}
.text-active-color{
  color:red;
}
</style>
