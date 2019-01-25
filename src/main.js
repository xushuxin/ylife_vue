import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.withCredentials=true;//要求axios每次携带cookies
Vue.prototype.axios=axios//注册axios

import './myCss/base.css'//引入基础样式
import './myCss/dropMenu.css'//引入下拉菜单样式表
import myCarousel from './js/myCarousel.js'

Vue.prototype.myCarousel=myCarousel;//将自己的js组件注册到全局，通过this.myCarousel({参数})调用
Vue.prototype.bus=new Vue()//全局的bus this.bus调用

Vue.filter("countConvert",function(val){//过滤器
  return val>0?"有货":"无货";
})
Vue.directive('fixed',(el,binding,vNode)=>{//将侧边栏固定在右下角（v-fixed在App.vue绑定）
  el.style.position="fixed";
  el.style.zIndex=99;
  binding.value.bottom!=undefined&&(el.style.bottom=binding.value.bottom);
  binding.value.top!=undefined&&(el.style.top=binding.value.top);
  binding.value.left!=undefined&&(el.style.left=binding.value.left);
  binding.value.right!=undefined&&(el.style.right=binding.value.right);
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
