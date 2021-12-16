<template>
  <div id="Admin">
    <adminbar></adminbar>
    <router-view/>
  </div>
</template>

<script>
import adminbar from "./adminbar";
import dealfeedback from "./dealfeedback";
import dealcategory from "./dealcategory";
export default{
  name:"Admin",
  components:{
    adminbar,
    dealfeedback,
    dealcategory
  },
  data(){
    return {}
  }
}
</script>
<style scoped>
</style>
