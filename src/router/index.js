import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import bar from '../components/bar'
import home from '../components/home'
import upload from '../components/upload'
import feedback from '../components/feedback'
import chat from '../components/chat/x'
import record from '../components/record'
import shop from '../components/shoptype/shop'
import item from '../components/shoptype/item'
import Infor from '../components/Infor'
import admin from '../components/administrator/admin'
import dealfeedback from "../components/administrator/dealfeedback"
import itemdetail from "../components/shoptype/itemdetail";
import adminLogin from "../components/adminLogin"
import 'animate.css'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect:'/shop',
      children:[
        {
          path:'/shop',
          name:'全部',
          component:shop,
          redirect:'/shop/item',
          children:[
            {
              path:'/shop/item',
              name:'物品',
              component:item,
            },
            {
              path:'/itemdetail',
              name:'itemdetail',
              component:itemdetail
            }
          ]
        },
        {
          path:'/chat',
          name:'chat',
          component:chat,
        },
        {
          path:'/record',
          name:'record',
          component:record
        },
        {
          path:'/feedback',
          name:'feedback',
          component:feedback
        },{
          path:'/upload',
          name:'upload',
          component:upload
        },
      ]
    },
    {
      path: '/bar',
      name: 'bar',
      component: bar
    },
    {
      path: '/Infor',
      name: 'Infor',
      component: Infor
    },
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/admin',
      name:'admin',
      component:admin
    },
    {
      path:'/dealfeedback',
      name:'dealfeedback',
      component:dealfeedback
    },
    {
      path:'/adminLogin',
      name:'adminLogin',
      component:adminLogin
    }
  ]
})
