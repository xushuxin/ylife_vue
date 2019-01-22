<template>
  <div id="header" v-cloak>
    <!--header1-->
    <div id="header1">
      <div class="container clearfix">
        <ul class="fr" >
          <li>您好{{name}}，欢迎来到优生活商城 <span>|</span></li>
          <li v-if="!isLogin">
            <router-link to="/login" class="font_gray1">[请登录]</router-link>
            <router-link to="/reg" class="font_gray1">[免费注册]</router-link><span>|</span>
          </li>
          <li v-else><a  class="font_gray1" @click="logout" >退出</a><span>|</span></li>
          <li>
            <div class="dropdown">
              <router-link to="/" class="font_gray1">会员中心<i class="rotate"></i></router-link>
              <div class="drop_content">
                  <router-link to="/" class="font_gray1">我的订单</router-link>
              </div>
            </div>
          </li>
          <li>
            <span>|</span>
            <router-link to="/" class="font_gray1">加入收藏</router-link>
            <span>|</span>
          </li>
          <li>
            <router-link to="/" class="font_gray1">分享给好友</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--header2-->
    <div id="header2" class="container">
        <router-link to="/"><img src="http://127.0.0.1:80/images/logo.jpg" alt="优生活商城"></router-link>
        <router-link to="/"><img src="http://127.0.0.1:80/images/kfrx.jpg" alt="客服热线"></router-link>
        <input type="text" class="searchBox" placeholder="膳魔师" v-focus v-model="kwords" @keyup.enter="search"><!-- v-focus自定义指令 v-model绑定输入框内容 keyup键抬起事件-->
        <div class="hot">
          <span>热门搜索：</span>
          <router-link v-for="(item,i) of hotSearchList" :key="i" :to="`/product?kwords=${item.kword}`" @click.native="reload">{{item.kword}}</router-link>
        </div>
        <button class="icon_box" @click="search">
            <i class="search_icon"></i>
        </button>
        <!-- 购物车 -->
        <div class="shopping_cart">
          <div class="drop_btn">
            <div>
              <router-link to="/" class="font_14">
                <span class="icon"></span>
                <span>我的购物车</span>
              </router-link>
            </div>
            <div class="count">{{count}}</div>
          </div>
          <div class="drop_list">
            <div class="no_shopping_list" v-if="!isAdd">购物车中还没有商品，再去逛逛吧！</div>
            <div class="shopping_list" v-else :style="shoplistStyle">
              <div class="shopping_item" v-for="(item,i) of cartList" :key="i" :style="i!=0?'border-top:1px solid #ddd;':''">
                <router-link :to="{name:'detail',params:{id:item.pid}}"><img :src="item.sm" alt=""></router-link> 
                <router-link :to="{name:'detail',params:{id:item.pid}}"><span>{{item.title}}</span></router-link> 
                <div class="PD">
                  <span>{{item.price.toFixed(2)}} x {{item.count}}</span>
                  <span @click="delItem" :data-id="item.id">删除</span>
                </div>
              </div>
            </div>
            <div class="balance">
              <span>共 {{count}} 件</span><span>￥{{getTotal}}</span><span><router-link to="/" class="font_white font_bold">结算</router-link></span>
            </div>
          </div>
        </div>
    </div>
    <!--nav-->
    <nav id="nav" class="container">
      <ul>
        <li class="fl font_14 drop_list">
          <div class=drop_btn>
            <router-link class="font_white" to="/">所有商品分类</router-link>
            <span class="arrow"></span>
          </div>
          <ul class="drop_menu" v-if="isIndex==true">
            <li v-for="(item,i) of nav_list" :key="i" class="side_list" :class="i==0?'first':'other'">
              <div class="side_btn">
                <img class="smallicon" :src="item.path">
                <router-link to="/">{{item.txt}}</router-link>
                <span class="small_arrow"></span>
              </div>
              <div class="side_menu">
                <div class="fl">
                  <h1><router-link to="/" v-for="(item1,i) of item.title" :key="i">{{item1}}</router-link></h1>
                  <div class="rec_list">
                    <router-link to="/" v-for="(item2,i) of item.index" :key="i">
                      <button class="rec_btn font_white">{{item2}}</button>
                    </router-link>
                  </div>
                </div>
                <div class="recommend fr">
                  <p>推荐品牌</p>
                  <div v-for="(item3,i) of item.rec_brand" :key="i">
                    <p><router-link to="/">{{item3.title}}</router-link></p>
                    <router-link to="/"><img :src="item3.img"></router-link>
                  </div>
                </div>
              </div>
              <div class="active" :style="`top:${item.id*60}px;`"></div>
            </li>
          </ul>
        </li>
        <li class="fl font_14"><router-link class="font_gray1" to="/">首页</router-link></li>
        <li class="fl font_14"><router-link class="font_gray1" to="/">帮助中心</router-link></li>
        <li class="fl font_14"><router-link class="font_gray1" to="/">兑换教程</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  inject:["reload"],
  data(){
    return{
      //头部导航栏下拉菜单
      nav_list:[
        {id:0,path:"http://127.0.0.1:80/images/category-pic-1.jpg", txt:"厨房用具",title:["家用电器"],index:["电饭煲","电磁炉","多功能锅","汤锅/奶锅","炒锅","锅具套装","瓜果刀/刨"],rec_brand:[{title:"HAPPYCALL",img:"http://127.0.0.1:80/images/happycall.jpg"},{title:"龙的",img:"http://127.0.0.1:80/images/longde.jpg"},{title:"伯尔尼斯",img:"http://127.0.0.1:80/images/brnc.jpg"}]},     
        {id:1,path:"http://127.0.0.1:80/images/category-pic-2.jpg", txt:"餐具茶具",title:["餐饮厨具"],index:["陶瓷杯","保温杯/壶","焖烧罐","玻璃杯","勺筷/刀叉","餐具套装"],rec_brand:[{title:"膳魔师",img:"http://127.0.0.1:80/images/shanmoshi.jpg"},{title:"乐扣乐扣",img:"http://127.0.0.1:80/images/lekou.jpg"},{title:"百安思",img:"http://127.0.0.1:80/images/bans.jpg"},{title:"申福",img:"http://127.0.0.1:80/images/shenfu.jpg"},{title:"大润窑",img:"http://127.0.0.1:80/images/darunyao.jpg"}]},  
        {id:2,path:"http://127.0.0.1:80/images/category-pic-3.jpg", txt:"生活电器",title:["家用电器"],index:["净化器","台灯","电风扇","加湿器 ","电吹风","剃须刀 ","理发器","煮蛋器","酸奶机","电水壶"],rec_brand:[{title:"宜阁",img:"http://127.0.0.1:80/images/yige.jpg"},{title:"公牛",img:"http://127.0.0.1:80/images/gongniu.jpg"}]},
        {id:3,path:"http://127.0.0.1:80/images/category-pic-4.jpg", txt:"毛巾洗浴",title:["家纺用品","居家生活","个护健康"],index:["肥皂","运动毛巾","浴巾","童巾"],rec_brand:[{title:"金号",img:"http://127.0.0.1:80/images/jinhao.jpg"}]},
        {id:4,path:"http://127.0.0.1:80/images/category-pic-5.jpg", txt:"家纺用品",title:["精品家纺","居家生活"],index:["床品套件","藤席系列","坐垫","冰垫" ],rec_brand:[{title:"天琴",img:"http://127.0.0.1:80/images/tianqin.jpg"}]},
        {id:5,path:"http://127.0.0.1:80/images/category-pic-6.jpg", txt:"居家收纳",title:["居家生活","精品家纺"],index:["衣架","居家小物件","收纳盒"],rec_brand:[{title:"好太太",img:"http://127.0.0.1:80/images/haotaitai.jpg"}]},
        {id:6,path:"http://127.0.0.1:80/images/category-pic-7.jpg", txt:"功能箱包",title:["居家生活"],index:["拉杆箱","双肩包"],rec_brand:[{title:"OLYMPIA",img:"http://127.0.0.1:80/images/olympia.jpg"}]}
      ],
      cartList:[],
      hotSearchList:[{id:1,kword:"大润窑"},{id:2,kword:"公牛"},{id:3,kword:"锅"},{id:4,kword:"新榜样"},{id:5,kword:"加加"},{id:6,kword:"百安思"},{id:6,kword:"乐扣"}],
      name:undefined,
      isLogin:false,
      isAdd:false,
      isIndex:false,
      kwords:"",
      count:0,
      shoplistStyle:{"overflow-y":""}
    } 
  },
  methods:{
    loginStatus(){// 登录状态
      //获取sessionStorage用户名
      this.name=sessionStorage.getItem("name");
      //如果有用户名
      if(this.name!=undefined) {
        sessionStorage.setItem("isLogin",true);
        this.isLogin=true;
      }
    },
    logout(){
      if(this.name!=undefined){
        this.axios.get("http://127.0.0.1:80/user/logout").then(res=>{
          alert(res.data.msg);
          sessionStorage.removeItem("name");
          this.name=undefined;
          sessionStorage.removeItem("isLogin");
          sessionStorage.removeItem("uid");
          this.isLogin=false;
        });
      }
    },
    search(){
      this.kwords=this.kwords.trim();//去掉两边空格
      if(this.kwords!==""){//如果关键词不为空
        this.$router.push({path:'/product',query:{kwords:this.kwords}});
      }
    },
    getCartItem(){
      var uid=sessionStorage.getItem("uid");
      if(uid!=undefined){
        this.axios.get("http://127.0.0.1:80/shopcart/getCartItem?uid="+uid).then(res=>{
          this.cartList=res.data.list;
          this.count=this.cartList.length;
          this.isAdd=this.count>0;
          if(this.count>2){
            this.shoplistStyle.overflowY="scroll";
          }
        })
      }else{
        this.isAdd=false;
      }
    },
    delItem(e){
      var id=e.target.dataset.id;
      var url="http://127.0.0.1:80/shopcart/delete"
      var params=`id=${id}`
      this.axios.post(url,params).then(res=>{
        // this.getCartItem();
      })
    }
  },
  created(){
    this.loginStatus();
  },
  watch:{
    "$route":{//监听地址参数的值，val既是值
      handler(val){
        if(this.$route.query.kwords){//如果地址栏有关键词
          this.kwords=decodeURIComponent(val.query.kwords);//decodeURIComponent解码数字以及字母汉字，decodeURI只解码空格
        }
        this.isIndex=this.$route.path=="/"//如果是首页
      },
      immediate:true//声明时立即执行
    },
    cartList:{//监听购物车列表
      handler:'getCartItem',//使用函数字面量名称
      immediate:true//声明时立即执行
    },
  },
  computed:{
    getTotal(){//计算购物车内所有商品价格的和
      var sum=0;
      for(var item of this.cartList){
        sum+=item.price*item.count;
      }
      return sum;
    }
  },
  directives:{
    focus:{ //局部自定义指令v-focus
      inserted(el){
        el.focus();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header{
  border-bottom:2px solid #EC2825;
}
/*header1*/
#header1{
  background:#F9F9F9;
  height:30px;
  line-height:30px; 
  border-bottom:1px solid #EFEFEF;
}
#header1 ul{
  margin-right:20px;
}
#header1 ul li{
  float:left;
}
#header1 ul li span{
  margin:0 5px;
}
#header1>div>ul>li>div>a>i{
  display:inline-block;
  vertical-align:middle;
  width:7px;
  height:4px;
  border:4px solid;
  border-color:#C7C7C9 transparent transparent transparent;
  background:url("http://127.0.0.1:80/images/icons-1.png") no-repeat 0px -40px;
  margin-left:5px;
  transition:transform linear 0.5s;
}

#header1 a:hover{
  color:#f00;
}
/*下拉菜单*/
#header1 ul li .dropdown{
  display:inline-block;
  position:relative;
  line-height: 20px;
  border:1px solid transparent;
}
#header1 ul li .dropdown>a{/* 让a标签定位设置下边框白色 */
  display:block;
  width:76px;
  height:20px;
  position:relative;
  border-bottom:1px solid #fff;
  z-index:2;
  padding:0 5px;
}
.drop_content{
  display:none;
  position:absolute;
  border: 1px solid #C7C7C9;
  width: 78px;
  left: -1px;
  top:20px;
  padding:12px 5px;
  background:#fff;
  z-index:1;
}
#header1>div>ul>li:nth-child(3) .dropdown:hover{
  border: 1px solid #C7C7C9;
  background:#fff;
}
#header1>div>ul>li:nth-child(3) .dropdown:hover .drop_content{
  display:block;
}
 #header1>div>ul>li:nth-child(3) .dropdown:hover .rotate{
  transform:rotate(180deg);
  transform-origin:center 5px;
}
/*header2*/
#header2{
  height:80px;
  padding-top:25px;
  position:relative;
}
#header2 a img{
  vertical-align:middle;
}
#header2>a:nth-child(1)>img{
  width:165px;
  height:40px;
}
#header2>a:nth-child(2)>img{
  width:150px;
  height:80px;
  margin-left:34px;
}
.searchBox{
  width:415px;
  height:34px;
  margin-left:51px;
  border:3px solid #CC3333;
  vertical-align:middle;
  outline:0;
  text-indent:10px;
  font-size:12px;
}
.icon_box{
  width:82px;
  height:40px;
  background-color:#CC3333;
  display:inline-block;
  vertical-align: middle;
  margin-left:-5px;
  border:0;
  outline:none;
  cursor:pointer;
}
.search_icon{
  display:block;
  background: url('http://127.0.0.1:80/images/icons-2.png') no-repeat -28px -67px;
  width: 24px;
	height: 25px;
  margin:7.5px auto;
}
/* 购物车 */
#header2 div{
  box-sizing:border-box;
}
#header2>.shopping_cart{
  width:200px;
  height: 40px;
  margin-top: 20px;
  line-height: 40px;
  float: right;
  position:relative;
}

#header2>.shopping_cart>.drop_btn{
  float:left;
  width:100%;
  height:40px;
  cursor:pointer;
}
#header2>.shopping_cart>.drop_btn a{
  color:#666666;
}
#header2>.shopping_cart>.drop_btn:hover a{
  color:#f00;
}
#header2>.shopping_cart>.drop_btn>div{
  float:left;
}
#header2>.shopping_cart>.drop_btn>div:first-child{
  height:40px;
  width:160px;
  line-height: 40px;
  border:1px solid #EFEFEF;
  background-color:#F8F8F8;
}

#header2>.shopping_cart>.drop_btn>div:first-child>a>.icon{
  display:inline-block;
  background:url('http://127.0.0.1:80/images/icons-2.png') no-repeat -15px -213px;
  width:20px;
  height:20px;
  margin:-5px 10px;
}
#header2>.shopping_cart>.drop_btn>div:nth-child(2){
  float:right;
  width:40px;
  height:40px;
  background-color:#CC3333;
  color:#fff;
  font-weight:bold;
  font-size:15px;
  text-align: center;
}

#header2>.shopping_cart>.drop_list{
  display:none;
  position:absolute;
  width:333px;
  top:100%;
  right:0px;
  z-index:2;
}
#header2>.shopping_cart:hover>.drop_list{
  display:block;
}
/* 不设高度，由内容撑开 */
#header2>.shopping_cart>.drop_list>.shopping_list,.no_shopping_list{
  width:100%;
  border-width:1px 1px 0 1px;
  border-style:solid;
  border-color:#D5D4D4;
  background:#ffffff;
  max-height:144px;
}
/* 加入购物车的商品样式 */
.no_shopping_list{
  height:60px;
  text-align:center;
  line-height:60px;
}
#header2>.shopping_cart>.drop_list>.shopping_list>.shopping_item{
  width:100%;
  padding:10px;
  display: flex;
  flex-direction:row;
  line-height:normal;
  justify-content:space-between;
}
#header2>.shopping_cart>.drop_list>.shopping_list>.shopping_item>a:nth-child(2){
  width:50%;
}

#header2>.shopping_cart>.drop_list>.shopping_list>.shopping_item img{
 width:50px;
 height:50px;
 border:1px solid #C9C8C6;
 margin-right:5px;
}
#header2>.shopping_cart>.drop_list>.shopping_list>.shopping_item>a>span:hover{
  color:#D40000;
}
#header2>.shopping_cart>.drop_list>.shopping_list>.shopping_item .PD{
  width:25%;
  display:flex;
  flex-direction:column;
}
#header2>.shopping_cart>.drop_list>.shopping_list>.shopping_item .PD :nth-child(1){
  color:#D40000;
  font-weight:bold;
}
#header2>.shopping_cart>.drop_list>.shopping_list>.shopping_item .PD :nth-child(2){
  margin-top:5px;
  cursor:pointer;
}
/* 结算 */
#header2>.shopping_cart>.drop_list>.balance{
  width:100%;
  height:40px;
  border:1px solid #CC3333;
}
#header2>.shopping_cart>.drop_list>.balance span{
  display:inline-block;
  width:65px;
  height:38px;
  text-align:center;
  background:#F4F4F4;
}
#header2>.shopping_cart>.drop_list>.balance span:first-child{
  padding-left:5px;
  font-weight:bold;
}
#header2>.shopping_cart>.drop_list>.balance span:nth-child(2){
  padding-left:116px;
  padding-right:15px;
  color:#f00;
}
#header2>.shopping_cart>.drop_list>.balance span:last-child{
  background:#CC3333;
}


/* 热门搜索*/
#header2>.hot{
  position:absolute;
  left:408px;
  top:90px;
}
#header2>.hot>span{
  color:#999999;
}
#header2>.hot>a{
  padding-right:5px;
  color:#666666;
}
/*nav*/
#nav>ul{
  height:36px;
  line-height: 36px;
  font-weight:bold;
}
#nav>ul>li:first-child{
  width:212px;
  height:36px;
  background:#D40000;
  text-indent:10px;
}
#nav>ul>li:not(:first-child){
  padding:0 20px;
}
#nav>ul>li:not(:first-child) a:hover{
  color:#D40000;
}
#nav .arrow{
  float:right;
  border:5px solid;
  border-color: #fff transparent transparent transparent;
  margin-right:12px;
  margin-top:16px;
}
#nav .drop_list{
  position:relative;
}
#nav>ul>li.drop_list .drop_menu{
  position:absolute;
  top:36px;
  z-index: 100;
  border-top:0;
  border-bottom:1px solid #E5E5E5;
}
#nav .drop_list:hover .drop_menu{
  display:block !important;
}

#nav .drop_list .drop_menu .side_list{
  width:210px;
  height:54px;
  padding-top:4px;
  background:#FAFAFA;
  border-width:1px;
  border-style:solid;
  border-color:transparent #E5E5E5;
}
#nav .drop_list .drop_menu .side_list:hover{
  background:#ffffff;
}
#nav .drop_list .drop_menu .side_list .side_btn{
  position:relative;
  z-index:3;
}
#nav .drop_list .drop_menu .side_list .active{
  display:none;
  position:absolute;
  width:207px;
  height:58px;
  left:0px;
  top:0px;
  border-top:1px solid #D40000; 
  border-right:1px solid #fff ;
  border-bottom:1px solid #D40000;
  border-left:4px solid #D40000;
  z-index: 2; 
}
#nav .drop_list .drop_menu .side_list:hover .active{
  display:block;
}
#nav .drop_list .drop_menu>.side_list:hover .side_menu{
  display:block;
  background:#fff;
}
#nav .drop_list .drop_menu>.side_list.first:hover .side_menu{
  top:0px;
}
#nav .drop_list .drop_menu li:nth-child(2n){
  background:#F0F0F0;
}
#nav .drop_list .side_btn>.smallicon{
  -webkit-filter:grayscale(100%)  opacity(50%); 
  filter:grayscale(100%) opacity(50%);/*设置滤镜，灰度和透明度*/
  vertical-align:middle;
  margin:0 5px 0 8px;
}
#nav .drop_list .drop_menu .side_list:hover .smallicon{
  -webkit-filter:grayscale(0%)  opacity(0%); 
  filter:grayscale(0%) opacity(100%);/*设置滤镜，灰度和透明度*/
}
#nav .drop_list .drop_menu .side_list:hover .side_btn>a{
  color:#D40000;
}
#nav .drop_list>ul>li>div>a{
 color:#333333; 
}
#nav .small_arrow{
  float:right;
  width:10px;
  height:10px;
  margin-top:23px;
  margin-right:8px;
  background:url("http://127.0.0.1:80/images/top_bg.png") no-repeat -150px -10px;
}
#nav .side_menu{
  display:none;
  position:absolute;
  left:211px;
  top:14px;
  width:700px;
  height:410px;
  border:1px solid #f00;
  z-index: 1;
}
#nav .side_menu>div:first-child{
  width:544px;
  height:390px;
}
#nav .side_menu>div>h1>a{
  display:inline-block;
  color:#C9033B;
  font-size:15px;
  height:30px;
}

#nav .side_menu>div>.rec_list>a{
  margin-left:13px;
}
#nav .side_menu>div>.rec_list>a>.rec_btn{
  width:115px;
  height:29px;
  border:0;
  border-radius:3px;
  background:#FB7523;
  cursor:pointer;
}
#nav .side_menu>div>.rec_list>a>.rec_btn:hover{
  background:#D40000;
}
#nav .side_menu>div>.rec_list{
  margin-left:4px;
  text-indent:0;
}
#nav .side_menu>.recommend{
  margin-right:0px;;
  margin-top:0px;
  width:155px;
  height:390px;
  border-left:1px solid #E5E5E5;
  color:#C9033B;
  font-size:15px;
}
#nav .side_menu>.recommend>div{
  width:120px;
  margin:5px auto;
  text-align:center;
  text-indent:0;
  line-height: 20px;
  font-weight:normal;
  border:1px solid #EFEFEF;
}
#nav .side_menu>.recommend>div>a{
  color:#333333;
  font-size: 12px;
}
#nav .side_menu>.recommend>div a:hover{
  color:#C9033B;
}
</style>
