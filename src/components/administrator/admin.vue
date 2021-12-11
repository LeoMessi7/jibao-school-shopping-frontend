<template>
  <div id="Admin">
    <AdminBar></AdminBar>
    <el-container>
      <AdminSidebar></AdminSidebar>
      <el-main>

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
      input:'',
      tableData:[{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      },{
        id:'2018',
        name:'1',
        email:'1',
        score:'1',
        or:'是'
      }]
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.usertext{
  position:absolute;
  left:300px;
  top:100px;
}
.search{
  position:absolute;
  left:300px;
  top:170px;
}
.search #add{
  position:absolute;
  left:935px;
  top:0px;
}
.table{
  position:absolute;
  left:300px;
  top:250px;
}
</style>
