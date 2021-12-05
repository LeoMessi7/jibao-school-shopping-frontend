import Vue from 'vue'
import Router from 'vue-router'


import Login from '../components/Login'
import bar from '../components/bar'
import home from '../components/home'
import Infor from '../components/Infor'
import 'animate.css'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
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
