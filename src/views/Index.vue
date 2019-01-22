<template>
    <section id="section">
      <!-- 轮播图 -->
      <div class="carousel">
        <!--轮播图主体-->
        <div class="car_img">
          <router-link :to="{name:'detail',params:{id:item.href.split('=')[1]}}" v-for="(item,i) of carousel_list" :key="i" :class="i==index_id?'active':''">
            <img :src="item.src" alt="" >
          </router-link>
        </div>
        <!-- 小圆点 -->
        <ul class="car_index">
          <li v-for="(item,i) of carousel_list" :key="i" @mouseover="changeimg" :data-id="i" :class="i==index_id?'active':''"></li>
        </ul>
      </div>
      <!-- 今日推荐 -->
      <div class="today_rec container">
        <div class="title">今日推荐</div>
        <div class="scroll_box">
          <ul class="today_img" :style="`transition:${transition};margin-left:${marginLeft}px;`">
            <li v-for="(item,i) of today_list" :key="i">
              <router-link :to="{name:'detail',params:{id:item.href.split('=')[1]}}"><img :src="item.img_url" alt=""></router-link>
            </li>
          </ul> 
        </div>
          <div class="arrow-left" @click="prev"><span></span></div>
          <div class="arrow-right" @click="next"><span></span></div>
      </div>
      <!-- 热门推荐 -->
      <div class="hot_rec container">
        <h1>
          <span>热门推荐 </span>
          <p class="another" @click="changeAnother"><span>换一批</span><span class="another_icon"></span></p>
        </h1>
        <ul class="rec_box">
          <li class="hot_item" v-for="(item,i) of hot_list" :key="i" v-cloak>
            <router-link :to="{name:'detail',params:{id:item.href.split('=')[1]}}"><img :src="item.img_url" alt=""></router-link>
            <p><router-link :to="{name:'detail',params:{id:item.href.split('=')[1]}}">{{item.title}}</router-link></p>
            <p>￥<span>{{item.price}}</span></p>
          </li>
        </ul>
      </div>
      <div class="floor">
        <!-- 1F -->
        <div class="floor1 container">
          <!-- 1F头部 -->
          <h1>
            <div class="title">
              <span>1F</span>
              <span>精选杯子</span>
            </div>
            <div class="icon">
              <span class="font_white">厨具餐具</span>
              <i></i>
            </div>
          </h1>
          <!-- 1F主体 -->
          <div class="box clearfix">
            <!-- 左边1个 -->
            <div class="left">
              <img :src="floor1.content[0].img_url" alt="">
              <ul class="clearfix">
                <li v-for="(item,i) of floor1.class" :key="i"><a href="javascript:;">{{item.name}}</a></li>
              </ul>
            </div>
            <!-- 右边8个 -->
            <div class="right">
              <ul class="clearfix common">
                <li v-for="(item,i) of floor1.content.slice(1)" :key="i">
                  <router-link :to="{name:'detail',params:{id:item.productId}}"><img :src="item.img_url" alt=""></router-link>
                  <p>
                    <router-link :to="{name:'detail',params:{id:item.productId}}">{{item.title}}</router-link>
                  </p>
                  <p>¥<span>{{item.price.toFixed(2)}}</span></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 2F -->
        <div class="floor2 container">
          <!-- 2F头部 -->
          <h1>
            <div class="title">
              <span>2F</span>
              <span>生活家电</span>
            </div>
            <div class="icon">
              <span class="font_white">生活家电</span>
              <i></i>
            </div>
          </h1>
          <!-- 2F主体 -->
          <div class="box clearfix">
            <!-- 左边1个 -->
            <div class="left">
              <img :src="floor2.content[0].img_url" alt="">
              <ul class="clearfix">
                <li v-for="(item,i) of floor2.class" :key="i"><a href="">{{item.name}}</a></li>
              </ul>
            </div>
            <!-- 右边8个 -->
            <div class="right">
              <ul class="clearfix common">
                <li class="my_carousel">
                  <ul class="img clearfix">
                    <li v-for="(item,i) of floor2.content.slice(1,3)" :key="i">
                      <router-link :to="{name:'detail',params:{id:item.productId}}"><img :src="item.img_url" alt=""></router-link>
                    </li>
                  </ul>
                  <div class="arrow">
                    <div class="arrow-left"><span></span></div>
                    <div class="arrow-right"><span></span></div>
                  </div>
                  <div class="index clearfix">
                    <div class="active"></div>
                    <div></div>
                  </div>
                </li>
                <li v-for="(item,i) of floor2.content.slice(3)" :key="i">
                  <router-link :to="{name:'detail',params:{id:item.productId}}"><img :src="item.img_url" alt=""></router-link>
                  <p>
                    <router-link :to="{name:'detail',params:{id:item.productId}}">{{item.title}}</router-link>
                  </p>
                  <p>¥<span>{{item.price.toFixed(2)}}</span></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 3F -->
        <div class="floor3 container">
          <!-- 3F头部 -->
          <h1>
            <div class="title">
              <span>3F</span>
              <span>小家电</span>
            </div>
            <div class="icon">
              <span class="font_white">小家电</span>
              <i></i>
            </div>
          </h1>
          <!-- 3F主体 -->
          <div class="box clearfix">
            <!-- 左边1个 -->
            <div class="left">
              <img :src="floor3.content[0].img_url" alt="">
              <ul class="clearfix">
                <li v-for="(item,i) of floor3.class" :key="i">
                  <a href="">{{item.name}}</a>
                </li>
              </ul>
            </div>
            <!-- 右边8个 -->
            <div class="right">
              <ul class="clearfix">
                <li>
                  <ul class="clearfix">
                    <li v-for="(item,i) of floor3.content.slice(1,3)" :key="i">
                      <router-link :to="{name:'detail',params:{id:item.productId}}"><img :src="item.img_url" alt=""></router-link>
                      <p><router-link :to="{name:'detail',params:{id:item.productId}}">飞科6220吹风机</router-link></p>
                      <p>¥<span>{{item.price}}</span></p>
                    </li>
                  </ul>
                </li>
                <li class="my_carousel">
                  <ul class="img clearfix">
                    <li v-for="(item,i) of floor3.content.slice(3,5)" :key="i">
                      <router-link :to="{name:'detail',params:{id:item.productId}}"><img :src="item.img_url" alt=""></router-link>
                    </li>
                  </ul>
                  <div class="arrow">
                    <div class="arrow-left"><span></span></div>
                    <div class="arrow-right"><span></span></div>
                  </div>
                  <div class="index">
                    <div class="active"></div>
                    <div></div>
                  </div>
                </li>
                <li>
                  <ul class="clearfix">
                    <li v-for="(item,i) of floor3.content.slice(5)" :key="i">
                      <router-link :to="{name:'detail',params:{id:item.productId}}"><img :src="item.img_url" alt=""></router-link>
                      <p><router-link :to="{name:'detail',params:{id:item.productId}}">光明5800吹风机</router-link></p>
                      <p>¥<span>{{item.price}}</span></p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 4F -->
        <div class="floor4 container">
          <!-- 4F头部 -->
          <h1>
            <div class="title">
              <span>4F</span>
              <span>精品茶具 ，瓷杯</span>
            </div>
            <div class="icon">
              <span class="font_white">茶具水具</span>
              <i></i>
            </div>
          </h1>
          <!-- 4F主体 -->
          <div class="box clearfix">
            <!-- 左边1个 -->
            <div class="left">
              <img :src="floor4.content[0].img_url" alt="">
              <ul class="clearfix">
                <li v-for="(item,i) of floor4.class" :key="i"><a href="">{{item.name}}</a></li>
              </ul>
            </div>
            <!-- 右边8个 -->
            <div class="right">
              <ul class="clearfix common">
                <li v-for="(item,i) of floor4.content.slice(1)" :key="i">
                  <router-link :to="{name:'detail',params:{id:item.productId}}"><img :src="item.img_url" alt=""></router-link>
                  <p><router-link :to="{name:'detail',params:{id:item.productId}}">{{item.title}}</router-link></p>
                  <p>¥<span>{{item.price}}</span></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
export default {
  data(){
    return {
      carousel_list:[],//1轮播图列表
      index_id:0,//轮播图小圆点的下标
      timer1:null,//轮播图定时器
      today_list:[],//2今日推荐列表
      transition:"none",//今日推荐过渡
      marginLeft:0,//今日推荐ul左外边距
      index:0,//今日推荐指示器
      clickTime:0,//点击时间，控制点击频率
      timer2:null,//今日推荐定时器
      hot_list:[],//3热门推荐列表
      floor1:{class:[{id:1,name:"茶具饮具"},{id:2,name:"厨房配件"},{id:3,name:"烹饪锅具"},{id:4,name:"餐具类"}],content:[{id:1,img_url:"http://127.0.0.1:80/images/index_1L1.jpg",title:null,price:null,productId:4},
      {id:2,img_url:"http://127.0.0.1:80/images/index_1L2.jpg",title:"乐扣乐扣迷你保温杯",price:52.90,productId:4},
      {id:3,img_url:"http://127.0.0.1:80/images/index_1L3.jpg",title:"乐扣马克家庭套装（两大一小）(3件套)",price:325.00,productId:4},
      {id:4,img_url:"http://127.0.0.1:80/images/index_1L4.jpg",title:"百安思便携式保温水杯BMD",price:128.00,productId:4},
      {id:5,img_url:"http://127.0.0.1:80/images/index_1L5.jpg",title:"百安思便携式保温水杯BMJ",price:168.00,productId:4},
      {id:6,img_url:"http://127.0.0.1:80/images/index_1L6.jpg",title:"百安思玻璃内胆保温壶APD（磨砂）",price:138.00,productId:4},
      {id:7,img_url:"http://127.0.0.1:80/images/index_1L7.jpg",title:"百安思304不锈钢真空，焖烧罐BSH(紫色500ml)",price:138.00,productId:4},
      {id:8,img_url:"http://127.0.0.1:80/images/index_1L8.jpg",title:"乐扣乐扣炫彩组合双杯(玫红 蓝)",price:236.00,productId:4},
      {id:9,img_url:"http://127.0.0.1:80/images/index_1L9.jpg",title:"百安思焖烧罐BSF儿童(都市生活500ml)(动物世界500ml)",price:125.00,productId:4}
      ]},
      floor2:{class:[{id:1,name:"生活电器"},{id:2,name:"厨房小家电"},{id:3,name:"个护健康"},{id:4,name:"大家电"}],content:[{id:1,img_url:"http://127.0.0.1:80/images/index_2L1.jpg",title:null,price:null,productId:4},
      {id:2,img_url:"http://127.0.0.1:80/images/index_2L2.jpg",title:null,price:null,productId:4},
      {id:3,img_url:"http://127.0.0.1:80/images/index_2L2-2.jpg",title:null,price:null,productId:4},
      {id:4,img_url:"http://127.0.0.1:80/images/index_2L3.jpg",title:"龙的巧趣系列电烤箱红外加热大容量 LD-KX12A",price:228.00,productId:4},
      {id:5,img_url:"http://127.0.0.1:80/images/index_2L4.jpg",title:"龙的派乐系列电子饭盒LD-FH15C",price:138.00,productId:4},
      {id:6,img_url:"http://127.0.0.1:80/images/index_2L5.jpg",title:"恵钻系列电磁炉 NK-CL2010A",price:276.00,productId:4},
      {id:7,img_url:"http://127.0.0.1:80/images/index_2L6.jpg",title:"龙的微电脑电饭煲 LD-FS420",price:698.00,productId:4},
      {id:8,img_url:"http://127.0.0.1:80/images/index_2L7.jpg",title:"新榜样8.2超高型 多功能韩式电热锅X0332",price:179.00,productId:4},
      {id:9,img_url:"http://127.0.0.1:80/images/index_2L8.jpg",title:"新榜样水性元宝锅X0170",price:219.00,productId:4}
      ]},
      floor3:{class:[{id:1,name:"生活电器"},{id:2,name:"厨房小家电"},{id:3,name:"个护健康"},{id:4,name:"大家电"}],content:[{id:1,img_url:"http://127.0.0.1:80/images/index_3L1.jpg",title:null,price:null,productId:4},
      {id:2,img_url:"http://127.0.0.1:80/images/index_3L2.jpg",title:"飞科6220吹风机",price:166.00,productId:4},
      {id:3,img_url:"http://127.0.0.1:80/images/index_3L3.jpg",title:"朗威Rs862剃须刀(1个)",price:39.00,productId:4},
      {id:4,img_url:"http://127.0.0.1:80/images/index_3L4.jpg",title:null,price:null,productId:4},
      {id:5,img_url:"http://127.0.0.1:80/images/index_3L5.jpg",title:null,price:null,productId:4},
      {id:6,img_url:"http://127.0.0.1:80/images/index_3L6.jpg",title:"光明5800吹风机",price:110.00,productId:4},
      {id:7,img_url:"http://127.0.0.1:80/images/index_3L7.jpg",title:"朗威9108理发器",price:98.00,productId:4},
      {id:8,img_url:"http://127.0.0.1:80/images/index_3L8.jpg",title:"飞科剃须刀Fs876",price:135.00,productId:4},
      {id:9,img_url:"http://127.0.0.1:80/images/index_3L9.jpg",title:"久量折叠式柔光台灯686",price:35.00,productId:4}
      ]},
      floor4:{class:[{id:1,name:"茶具饮具"},{id:2,name:"厨房配件"},{id:3,name:"烹饪锅具"},{id:4,name:"餐具类"}],content:[{id:1,img_url:"http://127.0.0.1:80/images/index_4L1.jpg",title:null,price:null,productId:4},
      {id:2,img_url:"http://127.0.0.1:80/images/index_4L2.jpg",title:"大润窑12头青花茶具",price:75.00,productId:4},
      {id:3,img_url:"http://127.0.0.1:80/images/index_4L3.jpg",title:"申福12头青花餐具",price:75.00,productId:4},
      {id:4,img_url:"http://127.0.0.1:80/images/index_4L4.jpg",title:"申福 青花瓷功夫茶具套装 手绘荷花 10件套礼盒装",price:85.00,productId:4},
      {id:5,img_url:"http://127.0.0.1:80/images/index_4L5.jpg",title:"大润窑 2头日式时尚蓝钻罐瓶搭配(2个)",price:75.00,productId:4},
      {id:6,img_url:"http://127.0.0.1:80/images/index_4L6.jpg",title:"大润窑青花10头茶具",price:70.00,productId:4},
      {id:7,img_url:"http://127.0.0.1:80/images/index_4L7.jpg",title:"大润窑7头青春茶具(7)",price:60.00,productId:4},
      {id:8,img_url:"http://127.0.0.1:80/images/index_4L8.jpg",title:"大润窑 汝窑10头茶具",price:85.00,productId:4},
      {id:9,img_url:"http://127.0.0.1:80/images/index_4L9.jpg",title:"申福青花瓷单人餐具套装",price:218.00,productId:4}
      ]},
    }
  },
  methods:{
    //1轮播图
    getcarousel(){
      this.axios.get("http://127.0.0.1:80/index/carousel").then(res=>{//使用axios模块发送ajax异步请求
        this.carousel_list=res.data.data;//res.data->{code:1,list:[{id:1,src:...},...]}
      })
    },
    changeimg(e){
      this.index_id=e.target.dataset.id;//把前台点击事件获得的id赋值给vm实例对象的index_id
      this.carouselauto();//自动轮播
    },
    carouselauto(){//轮播图定时器
      clearInterval(this.timer1);
      this.timer1=setInterval(()=>{
        this.index_id++;
        this.index_id=this.index_id%5;
      },3000);
    },
    //2主体
    getMainImages(){
      // this.axios.get()
    },
    //3今日推荐
    gettodayrec(){//获得列表
      this.axios.get("http://127.0.0.1:80/index/todayrec").then(res=>{
        this.today_list=res.data.data;
        this.today_list=this.today_list.concat(this.today_list.slice(0,4));//要实现无缝滚动，至少要多四张图
        console.log(this.today_list);
      })
    },
    prev(){
      if(new Date() - this.clickTime>500){
        this.clickTime=new Date();
        var ul=document.querySelector("#section>.today_rec>.scroll_box>.today_img");
        if(this.index==0){
          ul.style.transition="none";
          ul.style.marginLeft=-280*8+"px";
          this.index=8;
        }
        this.index--;
        var marginLeft=parseInt(getComputedStyle(ul).marginLeft);
        ul.style.transition="margin-left 0.5s ease-out";
        this.marginLeft=marginLeft+280;
      }
    },
    next(){
      // console.log(new Date() -this.clickTime);
      if( new Date() - this.clickTime >500){//第一次点击时this.clickTime是0,一定执行
        this.clickTime=new Date();//点击后this.clickTime转为当前时间，下次点击时，两次时间差需要大于500ms
        var ul=document.querySelector("#section>.today_rec>.scroll_box>.today_img");
        if(this.index==8){
          ul.style.transition="none";
          ul.style.marginLeft=0;
          this.index=0;
        }
        this.index++;
        var marginLeft=parseInt(getComputedStyle(ul).marginLeft);
        ul.style.transition="margin-left 0.5s ease-out";
        this.marginLeft=marginLeft-280;
      }
    },
    //4热门推荐
    gethotrec(){//获取列表
      this.axios.get("http://127.0.0.1:80/index/hotrec").then(res=>{
        this.hot_list=res.data.data;
      })
    },
    changeAnother(){//切换显示的商品列表
      var arr1=this.hot_list.slice(0,6);
      var arr2=this.hot_list.slice(6);
      this.hot_list=arr2.concat(arr1); 
    }
  },
  created(){
    this.gettodayrec();
    this.gethotrec();
    this.getcarousel();
  },
  mounted(){
    //1获得轮播图主体，鼠标进入清除，离开时重新添加
    var car_img=document.getElementsByClassName("car_img")[0];
    car_img.onmouseenter=(e)=>{
      clearInterval(this.timer1);
    }
    car_img.onmouseleave=(e)=>{
      this.carouselauto();
    }
    this.carouselauto();
    //2今日推荐
    var today_img=document.getElementsByClassName("today_img")[0];
    today_img.onmouseenter=(e)=>{//鼠标移入移出
      clearInterval(this.timer2);
    }
    today_img.onmouseleave=(e)=>{
      this.timer2=setInterval(this.next,3000);
    }
    //加载后就调用轮播
    this.timer2=setInterval(this.next,3000);
    //3主体
    //2F轮播
    this.myCarousel({el:"#section>.floor>.floor2>.box>.right>ul>li:first-child",num:2,width:440});//元素，图片张数，图片宽度，轮播间隔时间，时间曲线
    //3F轮播
    this.myCarousel({el:"#section .floor3 .right .my_carousel",num:2,width:396});
    
  },
  destroyed(){//组件销毁时，清除定时器
    clearInterval(this.timer1)
    clearInterval(this.timer2)
  }
}
</script>
<style scoped="">
/* 按钮的公共样式 */
#section .arrow>div{/* 两个按钮的公共样式 */
  position:absolute;
  width:28px;
  height:62px;
}
#section .arrow span{
  display:block;
  width:28px;
  height:62px;
  background:url("http://127.0.0.1:80/images/icons-2.png") no-repeat;
  cursor:pointer;
}
#section .arrow>.arrow-left>span{
  background-position:-28px 0px;
}

#section .arrow .arrow-left{
  top:50%;
  left:0px;
  transform:translateY(-50%);
}
#section .arrow .arrow-right{
  top:50%;
  left:100%;
  transform:translate(-100%,-50%);
}
/* 小圆点的公共样式 */
#section .index{
  position:absolute;
  top:100%;
  left:50%;
  transform:translate(-50%,-200%);
}
#section .index>div{
  float:left;
  margin-left:5px;
  width:14px;
  height:14px;
  border-radius:50%;
  background:#666666;
  cursor:pointer;
}
#section .index> .active{
  background:#CC336C;
}


/* a标签公共样式 */
#section a{
  color:#666666;
}
#section a:hover{
  color:#CC336C;
}
#section .left>ul>li>a{
  color:#888888;
}
#section .left>ul>li>a:hover{
  color:#CC336C;
}

/* 轮播图 */
#section>.carousel{
  width:100%;
  height:480px;
}
#section>.carousel>.car_img{
  width:1920px;
  height:410px;
  margin:0 auto;
  position:relative;
}
#section>.carousel>.car_img a{
  width:100%;
  height:410px;
  position:absolute;
  cursor:pointer;
}

#section>.carousel>.car_img .active{
 z-index:1;
}
#section>.carousel>.car_index{
  position:absolute;
  top:618px;
  left:50%;
  transform:translateX(-50%);
  width:95px;
  height:14px;
  display:inline-flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-around;
}
#section>.carousel>.car_index>li{
  width:14px;
  height:14px;
  background:#666666;
  border-radius:50%;
  float:left;
  cursor:pointer;
}
#section>.carousel>.car_index>li.active{
  background:#CC3333;
}
/* 今日推荐 */
#section>.today_rec{
  height:300px;
  position:relative;
}
#section>.today_rec>.title{
  position:absolute;
  height:100%;
  width:30px;
  padding:0 20px;
  text-align:center;
  background:url("http://127.0.0.1:80/images/icons-2.png") no-repeat -34px -410px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  font-size:24px;
  line-height:28px;
  font-weight:500;
  flex-wrap:wrap;
  color:#fff;
  z-index:10;
}
#section>.today_rec>.scroll_box{
  width:1120px;
  height:280px;
  overflow:hidden;
  border-width:10px 10px 10px 0px;
  border-style:solid;
  border-color:#DADADA;
  margin-left:64px;
}
#section>.today_rec ul.today_img{
  width:3360px;/* 12张图的长度 */
  height:280px;
}

#section>.today_rec .today_img li{
  float:left;
  height:280px;
  width:280px;
}

#section>.today_rec>div>span{
  display:block;
  width:28px;
  height:62px;
  background:url("http://127.0.0.1:80/images/icons-2.png") no-repeat;
  cursor:pointer;
}
#section>.today_rec>div.arrow-left>span{
  background-position:-28px 0px;
}
#section>.today_rec>div.arrow-left,#section>.today_rec>div.arrow-right{
  position:absolute;
  width:28px;
  height:62px;
  top:50%;
  transform:translateY(-50%);
  z-index:10;
}
#section>.today_rec>div.arrow-left{
  left:64px;
}
#section>.today_rec>div.arrow-right{
  left:1156px;
}
/*热门推荐*/

#section>.hot_rec{
  margin-top:20px;
  height:280px;
}
#section>.hot_rec>h1{
  font-weight:normal;
  padding-bottom:10px;
}
#section>.hot_rec>h1>.another{
  float:right;
  font-size:12px;
  cursor:pointer;
}
#section>.hot_rec>h1>.another:hover{
  color:#FF4500;
}
#section>.hot_rec>h1>.another>span:first-child{
  float:left;
  margin-top:4px;
  margin-right:6px;
}
#section>.hot_rec>h1>.another>.another_icon{
  display:inline-block;
  width:20px;
  height:20px;
  background:url("http://127.0.0.1:80/images/icons-2.png") no-repeat -3px -95px;
}
#section>.hot_rec>ul{
  height:240px;
  overflow:hidden;
  border:1px solid #D2D2D2;
}
#section>.hot_rec li{
  box-sizing:border-box;
  float:left;
  width:199px;
  height:240px;
  text-align:center;
  padding-top:15px;
}
#section>.hot_rec li a img{
  width:150px;
  height:150px;
  border-right:1px solid #F1F1F1;
  padding-right:25px;
  padding-left:27px;
}
#section>.hot_rec li p{
  width:150px;
  height:35px;
  text-align: left;
  margin:0 auto;
  line-height:20px;
}
#section>.hot_rec li>p:last-child{
  font-size:16px;
  color:#CC336C;
  line-height:2.5;
}
#section>.hot_rec li>p>span{
  font-weight: bold;
}
/* 首页1F */
#section>.floor h1{
  height:36px;
  padding-bottom: 10px;
  font-weight:normal;
  font-size:20px;
  margin-top:30px;
}
#section>.floor h1>.title{
  float:left;
}
#section>.floor h1>.title>span:first-child{
  display:inline-block;
  width:36px;
  height:36px;
  line-height: 36px;
  background:url("http://127.0.0.1:80/images/icons-2.png") no-repeat -56px 0px;
  color:#fff;
  text-align:center;
  font-size:16px;
  vertical-align: bottom;
}
#section>.floor h1>.icon{
  float:right;
  font-size:12px;
  height:22px;
  line-height: 22px;
  width:78px;
  background:#CC3333;
  border-radius:20px;
  margin-top:9px;
  text-align:center;
  position:relative;
  cursor:pointer;
}
#section>.floor h1>.icon>i{
  border-color:#CC3333 transparent transparent transparent;
  border-style:solid;
  border-width:5px;
  position:absolute;
  top:100%;
  left:50%;
  transform:translateX(-50%);
}
/* lF主体 */
#section>.floor .box>.left{
  height:480px;
  background:#F9F2F4;
  float:left;
}
#section>.floor .box>.left>ul{
  width:280px;
  margin:8px 20px;
}
#section>.floor .box>.left>ul>li{
  float:left;
  padding-right:25px;
  height:36px;
  line-height:3;
}

#section>.floor .box>.right{
  float: right;
  width: 880px;
}
#section>.floor .box>.right>ul{
  height:479px;
  border-bottom:1px solid #D2D2D2;
}
#section>.floor .box>.right>ul>li{
  float: left;
  box-sizing:border-box;
  width:220px;
  height:240px;
  text-align:center;
}
#section>.floor .box>.right>ul.common>li{
  border-width:1px 1px 0 0;
  border-style:solid;
  border-color:#D2D2D2;
  padding-top:10px;
}

#section>.floor .box>.right>ul li>a>img{
  width:150px;
  height:150px;
}
#section>.floor .box>.right ul.common>li>p{
  width:168px;
  height:40px;
  margin:0 34px;
  text-align:left;
  line-height:1.5;
}
#section>.floor .box>.right ul>li>p:nth-child(3){
  font-size:16px;
  color:#CC336C;
}
#section>.floor .box>.right ul>li>p:nth-child(3)>span{
  font-weight:bold;
}
/* 2F不同的改 */
#section>.floor>.floor2>.box>.right>ul>li:first-child{
  width:440px;
  overflow:hidden;
  padding-top:0;
  text-align:left;
  position:relative;
}

#section>.floor>.floor2>.box>.right>ul>li:first-child>ul:first-child>li{
  float:left;
  height:240px;
}
#section>.floor>.floor2>.box>.right>ul>li:first-child>ul>li>a>img{
  width:440px;
  height:240px;
}

/*3F不同改*/
#section>.floor>.floor3>.box>.left{
  width:210px;
}
#section>.floor>.floor3>.box>.left>ul {
    width: 160px;
    margin: 8px 20px;
}
#section>.floor>.floor3>.box>.right{
    width: 990px;
}
#section>.floor>.floor3>.box>.right ul li{
    float:left;
    width:198px;
    height:240px;
}
#section>.floor>.floor3>.box>.right>ul>li{
    width:198px;
    height:479px;
}
#section>.floor>.floor3>.box>.right>ul>li>ul>li{
  padding-top: 10px;
}
#section>.floor>.floor3>.box>.right>ul>li:not(:nth-child(1)){
    width:396px;
    height:479px;
}
#section>.floor>.floor3>.box>.right>ul>li:nth-child(2){
  overflow: hidden;
  border-right:1px solid #D2D2D2;
  position:relative;
}

#section>.floor>.floor3>.box>.right>ul>li:nth-child(2)>ul:first-child{
  height: 480px;
}
#section>.floor>.floor3>.box>.right>ul>li:nth-child(2)>ul:first-child>li{
    width:396px;
    height:479px;
    padding-top:0;
}
#section>.floor>.floor3>.box>.right>ul>li:nth-child(2)>ul:first-child>li img{
    width:396px;
    height:479px;
}

#section>.floor>.floor3>.box>.right>ul>li:nth-child(3)>ul{
  width:396px;
  height:479px;
}
#section>.floor>.floor3>.box>.right>ul>li>ul>li{
  border-width:1px 1px 0 0;
  border-style:solid;
  border-color:#D2D2D2;
  box-sizing:border-box;
}

#section>.floor>.floor3>.box>.right ul>li>p{
  height:36px;
  text-align: left;
  line-height:1;
  margin:0 24px;
}

</style>