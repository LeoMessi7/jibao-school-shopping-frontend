// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueCropper from 'vue-cropper';
import router from './router'
import store from './vuex/store.js'
import ElementUI from 'element-ui'
import 'wowjs/css/libs/animate.css'
import wow from 'wowjs'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'

Vue.prototype.$wow=wow
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(VueCropper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
