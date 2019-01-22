<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view><!--isRouterAlive控制组件的生成和销毁，从而实现重载-->
    <SideBar v-fixed="{bottom:0,right:0}"></SideBar><!-- 自定义组件让侧边栏定位在右下角 -->
  </div>
</template>
<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name:"App",
  provide(){//provide、inject实现子组件调用父组件重载页面；也可直接给根组件添加方法，子组件通过this.$root.方法名()调用根组件的方法；this.$parent.方法名()调用父组件方法
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  components:{
    SideBar
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      })
    }
  }
}
</script>
<style>


</style>
