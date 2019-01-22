import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
import Product from './views/Product.vue'
import Detail from './views/Detail.vue'
import Login from './views/Login.vue'
import Reg from './views/Reg.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',component : Home,children:[
      { path : '',component : Index },
      { path : 'product',component : Product,props : (route) => ({query:route.query.kwords}) },
      { path : 'detail/:id',name:'detail',component : Detail }
    ] },
    { path : '/login',component : Login },
    { path : '/reg',component : Reg },
    { path : '/*',component : NotFound}
  ],
  scrollBehavior(to,from,savedPosition){//切换路由时的滚动行为
    return savedPosition || {x : 0,y : 0}//savedPosition点击后退按钮时触发,回到原页面原位置
  },
  beforeEach(to, from, next){
    // to and from are both route objects. must call `next`.
    
  }
})
