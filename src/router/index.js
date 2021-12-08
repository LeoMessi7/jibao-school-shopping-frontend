import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import bar from '../components/bar'
import home from '../components/home'
import car from '../components/shopcar'
import upload from '../components/upload'
import feedback from '../components/feedback'
import chat from '../components/chat'
import record from '../components/record'
import shop from '../components/shoptype/shop'
import eshop from '../components/shoptype/eshop'
import book from '../components/shoptype/book'
import cloches from '../components/shoptype/cloches'
import food from '../components/shoptype/food'
import beauty from '../components/shoptype/beauty'
import sport from '../components/shoptype/sport'
import item from '../components/shoptype/item'
import Infor from '../components/Infor'
import 'animate.css'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
        {
          path:'/shop',
          name:'全部',
          component:shop,
          children:[
            {
              path:'/shop/eshop',
              name:'电子产品',
              component:eshop,
            },
            {
              path:'/shop/book',
              name:'书籍资料',
              component:book
            },
            {
              path:'/shop/beauty',
              name:'化妆',
              component:beauty
            },
            {
              path:'/shop/food',
              name:'食物',
              component:food
            },
            {
              path:'/shop/cloches',
              name:'衣服',
              component:cloches
            },
            {
              path:'/shop/sport',
              name:'体育',
              component:sport
            },
            {
              path:'/shop/item',
              name:'物品',
              component:item
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
        {
          path:'/shopcar',
          name:'car',
          component:car
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

  ]
})
