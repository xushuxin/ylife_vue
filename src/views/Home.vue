<template>
  <div class="home">
    <Header></Header>
    <router-view :key="$route.fullPath"></router-view><!--将组件设置唯一的key为地址栏的全路径,路径改变,就会重新加载该组件-->
    <Footer></Footer>
  </div>
</template>

<script>

// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {//必须声明要导出的组件，不然不会显示该组件内容
    Header,Footer
  }
}
</script>
