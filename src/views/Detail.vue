<template>
  <div>
    <section id="section" v-cloak>
      <nav class="nav">
        <div class="container clearfix">
          <span class="font_14 font_bold"><a href="">{{product.cname}}</a></span>
          <span>></span>
          <span><a href="">{{product.secondCname}}</a></span>
          <span>></span>
          <span><a href="">{{product.thirdCname}}</a></span>
          <span>></span>
          <span>{{product.title}}</span>
        </div>     
      </nav>
      <div class="goods_intro container font_14 clearfix">
        <div class="left fl">
          <ul class="mImg" v-cloak>
            <li>
              <a href=""><img :src="mPic" alt=""></a>
            </li>
          </ul>
          <div class="sImg clearfix">
            <span class="arrow-left btn btn-lt fl"></span>
            <div class="fixed_box fl">
              <ul class="img fl">
                <li v-for="(pic,i) of pics" :key="i" >
                  <img :class="i==index?'active':''" :src="pic.sm" alt="" @mouseover="changeStyle" :data-id="i" :data-md="pic.md" :data-lg="pic.lg">
                </li>
              </ul> 
            </div>
            <span class="arrow-right btn btn-rt fl"></span>
          </div>
          <div class="mask" v-show="isMouseEnter" :style="`left:${maskLeft};top:${maskTop}`"></div><!-- 小方块 -->
          <div class="super-mask" @mousemove="handleMove" @mouseenter="handleEnter" @mouseleave="handleLeave"></div><!--宽高与md图片一样大的div，遮障层-->
          <div class="bigDiv" v-show="isMouseEnter" :style="`background-image:url(${bigImageUrl});background-position:${bigImagePosition};`"></div>
          <div class="share-atten clearfix" >
            <div class="share fl">
              <span>分享到：</span>
              <a href=""><img src="http://127.0.0.1:80/images/QQ1.png" alt=""></a> 
              <a href=""><img src="http://127.0.0.1:80/images/weibo1.png" alt=""></a> 
              <a href=""><img src="http://127.0.0.1:80/images/weixin.png" alt=""></a> 
              <a href=""><img src="http://127.0.0.1:80/images/friendCircle.png" alt=""></a> 
            </div>
            <div class="atten fr" @click="toggleImg" :class="isAtten?'attended':''">关注该商品</div>
          </div>
        </div>
        <div class="right fl">
          <div class="title font_16 font_bold">{{product.title}}</div>
          <div class="pd_info">
            <div class="price_promote">
              <div class="price clearfix">
                <dt>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格:</dt>
                <dd>
                  <span>￥</span>
                  <span class="font_24" v-if="product.price">{{product.price.toFixed(2)}}</span>
                </dd>  
              </div>
              <div class="promote clearfix">
                <dt>促销信息:</dt>
                <dd>{{product.PromoteMessage}}</dd>
              </div>
            </div>
            <div class="distribute clearfix">
              <dt>配&nbsp;&nbsp;送&nbsp;&nbsp;至:</dt>
              <dd class="addr dropdown"> 
                <div class="dropbtn">北京北京市西城区</div>
                <div class="dropdown-content clearfix">
                  <div class="province fl">北京</div>
                  <div class="city fl">北京市</div>
                  <div class="distict fl">西城区</div>
                </div>
              </dd>
              <dd class="font_bold font_gray1">{{product.stock | countConvert}}</dd>
            </div>
            <div class="service clearfix">
              <dt>服&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</dt> 
              <dd>由“{{product.store}}”直接销售和发货，并提供售后服务</dd>
            </div>
            <div class="prompt clearfix">
                <dt>温馨提示:</dt>
                <dd>收货时请检查好商品质量，如有问题，请联系客服400-8200-9900</dd>
            </div>
          </div>
          <div class="buy_info">
            <div class="goods_select">
              <div class="clearfix" v-for="(sp,i) of specs" :key="i">
                <dt>{{sp.title}}:</dt>
                <dd>
                  <div v-for="(item,j) of sp.vals" :key="j" @click="change" :class="[item.name==selectArr[i]?'active':'',item.canSelect?'':'disabled']" :data-i="i" :data-item="item.name">{{item.name}}</div>
                </dd>
              </div>
            </div>
            <div class="clearfix buy_count">
              <dt>购买数量:</dt>
              <dd class="font_16 font_bold">
                <span @click="reduce" onselectstart="return false;">-</span>
                <input type="text" v-model="count" maxlength="2">
                <span @click="increment" onselectstart="return false;">+</span>
              </dd>
            </div>
            <div class="selected clearfix">
              <dt>已&nbsp;&nbsp;选&nbsp;&nbsp;择:</dt>
              <dd class="font_bold">
                <span>
                  "{{product.specs}}"
                </span>
              </dd>
            </div>
            <div class="buy_cart clearfix">
              <button class="fl font_16 font_bold buy" :disabled="product.stock==0">立即购买</button>
              <button class="fl font_16 font_bold cart" :disabled="product.stock==0" :class="isFixed&&'btnFixed'" @click="addCart" data-pid="id">加入购物车</button>
            </div>
          </div>
        </div>
      </div>
      <div id="detail" class="goods_params_list container clearfix">
        <div class="side fl">
          <div class="relClass">
            <div class="title">相关分类</div>
            <ul>
              <li v-for="(item,i) of relClass" :key="i">
                <router-link :to="item.href">{{item.name}}</router-link>
              </li>
            </ul>
          </div>
          <div class="relBrand">
            <div class="title">相关品牌</div>
            <ul>
              <li v-for="(item,i) of relBrand" :key="i">
                <router-link :to="item.href">{{item.name}}</router-link>
              </li>
            </ul>
          </div>
          <div class="fBuy">
            <div class="title">浏览该商品的用户最终购买</div>
            <ul>
              <li v-for="(item,i) of fBuy" :key="i">
                <router-link :to="{name:'detail',params:{id:item.productId}}" @click.native="reload">
                  <img :src="item.img_url" :alt="item.title" :title="item.title">
                </router-link>
                <p class="goods_name">
                  <router-link :to="{name:'detail',params:{id:item.productId}}" @click.native="reload">{{item.title}}</router-link>
                </p>
                <p class="price font_14 font_bold">￥{{item.price.toFixed(2)}}</p>
              </li>
            </ul>
          </div>
          <div class="hotOrder">
            <div class="title">热销排行榜</div>
              <div class="nav clear_over">
                <div class="clearfix">
                  <div class="fl active">同价位</div>
                  <div class="fl">同品牌</div>
                  <div class="fl">同价位</div>
                </div>
              </div>
            <ul class="clearfix content">
              <li class="fl" v-for="(item,i) of hotOrder" :key="i">
                <span :class="i>2?'backGray':''">{{i+1}}</span>
                <router-link :to="{name:'detail',params:{id:item.productId}}"  @click.native="reload">
                  <img :src="item.img_url" :alt="item.title" :title="item.title">
                </router-link>
                <div class="fr">
                  <p>
                    <router-link :to="{name:'detail',params:{id:item.productId}}" @click.native="reload">{{item.title}}</router-link>
                  </p>
                  <p>¥ {{item.price.toFixed(2)}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="main fl">
          <div class="nav" data-toggle="fixed" :class="isFixed&&'divFixed'">
            <div class="clearfix">
              <div class="intro_detail fl" @click="tap" data-index=0 :class="index1==0?'active':''">商品介绍</div>
              <div class="params_detail fl"  @click="tap" data-index=1 :class="index1==1?'active':''">规格参数</div>
              <div class="comments fl" @click="tap" data-index=2 :class="index1==2?'active':''">商品评价</div>
              <div class="question fl" @click="tap" data-index=3 :class="index1==3?'active':''">商品咨询</div>
            </div>
          </div>
          <div class="content">
            <div class="clearfix" data-index=0 v-show="index1==0">
              <div class="mainContent fl">
                <ul class="clearfix message">
                  <li class="fl">商品名称：大润窑10头汝窑茶具</li>
                  <li class="fl">商品编号：201510201609141</li>
                  <li class="fl">店铺： 优生活商城</li>
                  <li class="fl">时间：2018-06-27 21:13:39</li>
                  <li class="fl">价格 ：0-299</li>
                  <li class="fl">材质 ：汝窑</li>
                  <li class="fl">选购热点 ：热卖款</li>
                </ul>
                <div class="goods_dimg">
                  <img src="http://127.0.0.1/images/details/1479197339131.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197331399.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197325358.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197318543.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197311212.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197307828.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197300574.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197297125.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197293060.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197286310.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197282862.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197280118.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197276755.jpg" alt="">
                  <img src="http://127.0.0.1/images/details/1479197272918.jpg" alt="">
                </div>
              </div>
              <div class="aside fr">
                <ul>
                  <li><a href="javascript:;" @click="skip" data-id="detail">商品详情</a></li>
                  <li><a href="javascript:;" @click="skip" data-id="ensure">售后保障</a></li>
                  <li><a href="javascript:;" @click="skip" data-id="declare">责任声明</a></li>
                </ul>
              </div>
            </div>
            <div data-index=1 v-show="index1==1">规格参数</div>
            <div data-index=2 v-show="index1==2">商品评价</div>
            <div data-index=3 v-show="index1==3">商品咨询</div>
          </div>
        </div>
      </div>
      <div id="ensure" class="container">我是售后保障</div>
      <div id="declare" class="container">我是责任声明</div>
    </section>
  </div>
</template>
<script>
export default {
  inject:['reload'],
  data(){
    return{
      id:null,
      product:{},
      specs:[],
      pics:[],
      difference:[],//存储所有同一详情页的商品信息id,stock,specs
      isAtten:false,//关注的爱心样式类名
      index:0,//指示器，当前第几张图片
      count:1,
      index1:0,//商品详情水平导航参数指示器
      selectArr:[],//用来存储改变后的参数,同时也是商品规格指示器,不确定有多少种规格，用数组来指示
      itemInfos:{},//用于存储对象形式的每种规格的id,stock,specs
      relClass:[{name:"茶具套装",href:"/"},{name:"保温杯/壶",href:"/"},{name:"水杯",href:"/"},{name:"陶瓷杯",href:"/"},{name:"玻璃杯",href:"/"},{name:"整套茶具",href:"/"},{name:"单套茶具罐",href:"/"},{name:"茶盘",href:"/"},{name:"膳魔师",href:"/"},{name:"百安思",href:"/"},{name:"啤酒杯",href:"/"},{name:"焖烧罐",href:"/"},],
      relBrand:[{name:"大润窑",href:"/"}],
      fBuy:[{id:1,title:"大润窑12头青花茶具",img_url:"http://127.0.0.1:80/images/index_4L2.jpg",price:75.00,productId:1},{id:2,title:"大润窑10头汝窑茶具",img_url:"http://127.0.0.1:80/images/index_4L8.jpg",price:85.00,productId:1},{id:3,title:"大润窑7头青花茶具",img_url:"http://127.0.0.1:80/images/details/1472007824999.jpg",price:20.00,productId:1},{id:4,title:"【2018】艾仕达多功能养身壶ZCW-YS01 1.8升",img_url:"http://127.0.0.1:80/images/details/1507882204910.jpg",price:85.00,productId:1}],
      hotOrder:[{id:1,title:"OLYMPIA 拉杆箱 PET-1000 29寸",img_url:"http://127.0.0.1:80/images/details/1459567770331.jpg",price:1978.00,productId:4},{id:2,title:"膳魔师不锈钢保温茶杯带茶隔JMZ-480(浅银红)",img_url:"http://127.0.0.1:80/images/details/1488959982805.jpg",price:336.00,productId:4},{id:3,title:"伯尔尼斯BERNESE尚爵汤蒸锅BENS-170",img_url:"http://127.0.0.1:80/images/details/1489210848541.jpg",price:138.00,productId:4},{id:4,title:"乐扣乐扣麦饭石炒锅(1个)",img_url:"http://127.0.0.1:80/images/details/1514959945971.jpg",price:299.00,productId:4},{id:5,title:"乐扣乐扣收纳箱",img_url:"http://127.0.0.1:80/images/details/1490163137427.jpg",price:79.00,productId:4},{id:6,title:"膳魔师儿童吸管杯FEC-280(蓝色)",img_url:"http://127.0.0.1:80/images/details/1488960209406.jpg",price:328.00,productId:4}],
      isFixed:false,
      mPic:"",
      bigImageUrl:"",
      isMouseEnter:false,
      maskLeft:0,
      maskTop:0,
      bigImagePosition:"0px 0px"
    }
    
  },
  methods:{
    getGoodsInfo(){
      this.axios.get("http://127.0.0.1:80/details?id="+this.id).then(res=>{
        this.product=res.data.product;
        this.difference=res.data.difference;
        this.specs=res.data.specs;
        this.pics=res.data.pics;
        this.bigImageUrl=this.pics[0].lg;
        this.mPic=this.pics[0].md;
        var num=this.pics.length;
        this.myCarousel({el:".sImg",num:num,showNum:5,width:62,isAuto:false,isCircle:false});
        var productSpecs=this.product.specs.split(",");//当前商品规格参数转为数组
        for(var i=0;i<productSpecs.length;i++){
          this.selectArr[i]=productSpecs[i];//每种规格名的参数设为当前商品的参数
        }
        this.difference.forEach((el,i)=>{
          this.itemInfos[el.specs]=el;//把每种规格的不同数据放到一个对象中，便于后面比较
        })
        this.checkItem();
      })
    },
    handleEnter(e){
      this.isMouseEnter=true;
    },
    handleLeave(){
      this.isMouseEnter=false;
    },
    handleMove(e){
      var maskSize=150;
      var left=e.offsetX-maskSize/2;
      var top=e.offsetY-maskSize/2;
      if(left<=0){
        left=0;
      }
      if(left>=e.target.offsetWidth-maskSize){
        left=e.target.offsetWidth-maskSize;
      }
      if(top<=0){
        top=0;
      }
      if(top>=e.target.offsetHeight-maskSize){//e.target.offsetHeight获得当前元素的高度，只读
        top=e.target.offsetHeight-maskSize;
      }
      this.maskLeft=left+e.target.offsetLeft+"px";//因为有外边距要加上
      this.maskTop=top+e.target.offsetTop+"px";
      this.bigImagePosition=`${-800/350*left}px ${-800/350*top}px`
    },
    checkItem(){
      var options=this.specs;//数组是引用类型，所以对options操作等于是对this.specs操作
      var result=[]
      for(var i in options){//所有选中的值放入新数组中，两个数组名没有指向同一个引用地址
         result[i]=this.selectArr[i];
      }
      // var result=this.selectArr;//此种方式，则表示两个数组名指向同一个数组，对任意一个操作都会改变原数组
      options.forEach((el,i)=>{//每个规格参数添加一个参数canSelect,控制是否可选中
        // var last=result[i];//当前值保存在字符串中（这里如果是result和this.selectArr指向同一个数组，那么在遍历替换之前必须保存原来选中的值,遍历完成之后还原）
        for(var key in el.vals){
          el.vals[key]={name:el.vals[key]};
          result[i]=el.vals[key].name;
          el.vals[key].canSelect=this.isMay(result);//根据对比的结果设置canSelect开关(强行赋值)
        } 
        // result[i]=last//还原为当前选中的值
        // console.log(result,this.selectArr)
      })
    },
    isMay(result){//根据返回的结果查询对应规格库存是否为0(数组会隐式转换为字符串)
      return this.itemInfos[result].stock==0? false:true
    },
    change(e){
      var i=e.target.dataset.i;//外层规格名的指示器，i=0表示规格1
      var item=e.target.dataset.item;//内层规格参数的指示器，直接用参数值来指示
      if(this.selectArr[i]!=item){
        this.selectArr[i]=item;//改变存储的规格列表中对应规格名的参数值为当前点击的值
        this.id=this.itemInfos[this.selectArr].id;
        this.getGoodsInfo();//请求新的数据
        this.$forceUpdate();//重绘
      }
    },
    changeStyle(e){
      this.index=e.target.dataset.id;
      this.mPic=e.target.dataset.md;
      this.bigImageUrl=e.target.dataset.lg;
    },
    toggleImg(){//添加/删除样式类名
      this.isAtten=!this.isAtten;
    },
    skip(e){//点击锚点跳转位置
      var id=e.target.dataset.id;
      document.getElementById(id).scrollIntoView();//视图与元素顶部对齐
    },
    tap(e){
      this.index1=e.target.dataset.index;
    },
    addCart(e){
      // 获得三个参数
      var uid=sessionStorage.getItem("uid");
      var count=parseInt(this.count);
      var pid=this.id;
      if(uid!=undefined){
        this.axios.get("http://127.0.0.1:80/shopcart/isAdd?uid="+uid+"&pid="+pid).then(res=>{
          var url="http://127.0.0.1:80/shopcart"
          if(res.data.code==0){
            url+="/addCart";
            var params=`pid=${pid}&uid=${uid}&count=${count}`;
          }
          if(res.data.code==1){
            url+="/update";
            count+=res.data.count;
            var id=res.data.id;
            var params=`id=${id}&count=${count}`;
          }
          this.axios.post(url,params).then(res=>{
            alert(res.data.msg);
            this.bus.$emit('addCart');
          })
        })
      }else{
        alert("请登录！")
        this.$router.push("/login")
      }
    },
    increment(){
      if(this.count<99){
        this.count++;
        this.count=this.count.toString();//转为字符串类型，否则无法使用字符串的API
      }
    },
    reduce(){
      if(this.count>1){
        this.count--;
        this.count=this.count.toString();//转为字符串类型，否则无法使用字符串的API
      }
    }
     
  },
  created(){
      this.id=this.$route.params.id;
      this.getGoodsInfo();//获得商品详情信息
      this.$nextTick(()=>{//必须窗口加载后执行，否则获得的offsetTop是相对于当前组件最外层元素
        var divTop=document.querySelector("[data-toggle=fixed]").offsetTop;//获得元素距离浏览器顶部的距离
        window.onscroll=()=>{//滚动条滚动时
          var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;//获得页面滚动过的距离(兼容ie)
          this.isFixed=scrollTop>divTop;
        }
    })
  },
  watch:{
    count(val){
      if(val.length==1){
        this.count=val.replace(/[^1-9]/g,'')//不是除1~9以外的转为空字符
      }else{
        this.count=val.replace(/\D/g,'')//非数字转为空字符
      }
    }
  },
}
</script>
<style scoped>
#section{
  background:#F5F5F5;
}
#section .nav,#section>.goods_intro,#section>.goods_params_list>.side>div,#section>.goods_params_list .mainContent{
  background:#fff;
}
/* 导航 */

#section>.nav{
 border-bottom:1px solid #D1CFCF;
 padding:5px 0;
}
#section>.nav>div{
  height:30px;
  line-height:30px;
}
#section>.nav>div>span{
  float:left;
  margin:0 1px;
}
#section>.nav>div>span>a:hover{
  color:#CC3333;
}
/* 商品介绍 */
#section>.goods_intro{
  margin-top:5px;
  padding:20px 0px;
  position:relative;
}
#section>.goods_intro>.left{
  width:350px;
  margin:0 20px;
}
#section>.goods_intro>.left>ul{
  position:relative;
  height:350px;
  margin:0 auto;
  margin-bottom:30px;
}
#section>.goods_intro>.left .super-mask{
  width:350px;
  height:350px;
  position:absolute;
  top:20px;
  left:20px;
  z-index: 100;
}
#section>.goods_intro>.left>ul>li{
  position:absolute;
  height:350px;
  transition:all 0.5s linear;
}
#section>.goods_intro>.left>.mImg img{
  width:350px;
  height:350px;
}
#section>.goods_intro>.left .sImg .fixed_box{
  width:300px;
  overflow:hidden;
}

#section>.goods_intro>.left .sImg ul{
  width:1000px;
}
#section>.goods_intro>.left .sImg ul>li{
  float:left;
  height:52px;
  margin-right:10px;
  cursor:pointer;
}
#section>.goods_intro>.left .sImg img{
  width:50px;
  height:50px;
  border:1px solid #fff;
}
#section>.goods_intro>.left .sImg img.active{
  border:1px solid #DF1738;
}
#section>.goods_intro>.left .bigDiv{
  position:absolute;
  width:350px;
  height:350px;
  left:380px;
  top:20px;
  z-index: 100;
  background-repeat:no-repeat;
}
#section>.goods_intro>.left .mask{
  position:absolute;
  width:150px;
  height:150px;
  z-index: 100;
  background:#ff0;
  opacity:0.3;
}
#section>.goods_intro>.left .btn{
  display:block;
  width:25px;
  height:52px;
  background:url(http://127.0.0.1:80/images/thumb_btns.gif) no-repeat left  -57px;
  cursor:pointer;
}
#section>.goods_intro>.left .btn.btn-rt{
  background-position:right -57px;
}
#section>.goods_intro>.left>.share-atten{
  margin-top:30px;
}
#section>.goods_intro>.left .share>:nth-child(n){
  float:left;
}
#section>.goods_intro>.left .share img{
  width:24px;
  height:24px;
  vertical-align: middle;
  padding-left:5px;
}
#section>.goods_intro>.left .atten{
  width:100px;
  text-indent:29px;
  background:url("http://127.0.0.1:80/images/s-love.png") no-repeat left center;
  background-size:24px 24px;
  cursor:pointer;
}
#section>.goods_intro>.left .attended{
  background-Image:url("http://127.0.0.1:80/images/sd-love.png");
  background-size:22px 22px;
}
#section>.goods_intro>.left .atten:hover{
  color:#CC3333;
}

#section>.goods_intro>.right{
  width:560px;
}
#section>.goods_intro>.right>.title{
  color:#333333;
}
#section>.goods_intro .right dt,#section>.goods_intro .right dd{
  float:left;
  margin-left:10px;
}
#section>.goods_intro .right dt{
  width:70px;
  text-align:right;
}
#section>.goods_intro>.right>.pd_info{
  padding-bottom:5px; 
  border-bottom:1px solid#EEEEEE;
}
#section>.goods_intro>.right>.pd_info>div{
  margin:10px 0;
}
#section>.goods_intro>.right>.pd_info>.price_promote{
  background:#F5F5F5;
  padding:15px 0;
}
#section>.goods_intro>.right>.pd_info .price{
  padding-bottom:10px;
}
#section>.goods_intro>.right>.pd_info .price>:nth-child(n){
  height:31px;
  line-height:31px;
}
#section>.goods_intro>.right>.pd_info .price span{
  color:#DF1738;
}
#section>.goods_intro>.right>.pd_info .promote dd{
  background:#EA5870;
  width:20px;
  height:20px;
  line-height:20px;
  text-align:center;
  color:#fff;
}

#section .dropbtn{
  border:1px solid #DDDDDD;
  padding:0 5px;
}
#section .buy_info{
  margin-top:20px;
}
#section .buy_count>dd>span,#section .goods_select dd>div,button,.goods_params_list .main .nav>div>div{
  cursor:pointer;
}
#section .buy_info>div,#section .buy_info>.goods_select>:not(:last-child){
  margin-bottom:20px;
}
#section>.goods_intro .goods_select dd{
  width:460px;
}
#section>.goods_intro .goods_select dd>div{
  border:1px solid #DDDDDD;
  padding:2px 7px;
  margin-bottom:5px;
  margin-right:10px;
  float:left;
}
#section>.goods_intro .goods_select dd>div:hover{
  color:#DF1738;
}
#section .goods_select dd>div.active{
  border:2px solid #DF1738;
  height:22px;
  line-height: 22px;
  background:url("http://127.0.0.1:80/images/selected_icon.png") 102% 100% no-repeat;
}
#section .goods_select dd>div.disabled,#section .buy_info .buy_cart>:nth-child(n)[disabled]{
 pointer-events: none;
 opacity: 0.3;
}

#section .goods_select dt,#section .goods_select dd>div{
  height:24px;
  line-height: 24px;
}

#section .buy_count span{
  width:40px;
  font-size:22px;
  font-weight:bold;
  color:#666666;
  border:1px solid #DDDDDD;
}
#section .buy_count>dd>input{
  border:1px solid #DDDDDD;
  width: 60px;
}
#section .buy_count>:nth-child(n){
  height:26px;
  line-height: 26px;
}
#section .buy_count>dd>:nth-child(n){
  box-sizing:content-box;
  float:left;
  height:24px;
  line-height: 24px;
}

#section .buy_count>dd>:nth-child(n){
  margin-right:5px;
  text-align: center;
}
#section .buy_info .buy_cart{
  margin-left:90px;
  margin-bottom:0;
}
#section .buy_info .buy_cart>:nth-child(n){
  width:140px;
  height:40px;
  border-radius:5px;
  outline:0;
}
#section .buy_info .buy_cart>.buy{
  color:#DF1738;
  background:#FCDDE2;
  border:1px solid #F58B9D;
  margin-right:20px;
}
#section .buy_info .buy_cart>.cart{
  color:#ffffff;
  background:#DF1738;
  border:1px solid #F58B9D;
}
.goods_params_list{
  margin-top:10px;
}
.goods_params_list .side{
  width:200px;
  margin-right:10px;
}
.goods_params_list .main{
  width:990px;
}
.goods_params_list a:hover{
  color:#DF1738;
}
.goods_params_list .side>div{
  margin-bottom:10px;
}
.goods_params_list .side .title{
  padding-left:10px;
  font-size:14px;
  font-weight:bold;
} 

.goods_params_list .side .title{
  line-height: 39px;
  height:39px;
  border-bottom:1px solid #EEEEEE;
} 
.goods_params_list .side>.relClass>ul,.goods_params_list .side>.relBrand>ul{
  padding:15px 0px 5px 15px;
} 
.goods_params_list .side>div>ul:after{
  content:"";
  display:block;
  overflow: hidden;
  clear: both;
} 
.goods_params_list .side>.relClass>ul>li,.goods_params_list .side>.relBrand>ul>li{
  float:left;
  margin-right:40px;
  margin-bottom:10px;
  min-width:48px;
} 

.goods_params_list .side .fBuy  li{
  text-align:center;
  border-bottom:1px solid #EEEEEE;
  padding:10px;
} 
.goods_params_list .side .fBuy  img{
  width:120px;
  height:120px;
} 
.goods_params_list .side .fBuy  .price{
  color:#DF1738;
} 

.goods_params_list .side .hotOrder .nav{
  height:39px;
  border-bottom:1px solid #EEEEEE;
} 
.goods_params_list .side .hotOrder .nav>div{
  width:160px;
  margin:0 auto;
  margin-top:14px;
} 
.goods_params_list .side .hotOrder .nav>div>div{
  border:1px solid #EEEEEE;
  border-bottom:0;
  width:48px;
  text-align:center;
  background:#FAFAFA;
  height: 24px;
  line-height:24px;
} 
.goods_params_list .side .hotOrder .nav>div>div.active{
  height:25px;
  margin-bottom:-1px;
  border-bottom:none;
  background:#ffffff;
  font-weight:bold;
  color:#DF1738;
} 
.goods_params_list .side .hotOrder .nav>div>div:not(:nth-child(1)){
  margin-left:5px;
} 

.goods_params_list .side .hotOrder .content{
  padding:10px 10px 0px 10px;
}
.goods_params_list .side .hotOrder .content img{
  width:50px;
  height:50px;
}
.goods_params_list .side .hotOrder .content li>div>p:nth-child(2){
  color:#DF1738;
  font-weight:bold;
  font-size:16px;
}
.goods_params_list .side .hotOrder .content li>div{
  width:100px;
  margin-left:10px;
} 
.goods_params_list .side .hotOrder .content li{
  border-bottom: 1px solid #eeeeee;
  padding:10px 0;
} 
.goods_params_list .side .hotOrder .content li>span{
  display:inline-block;
  width:15px;
  height:15px;
  border-radius:50%;
  background:#DF1738;
  color:#ffffff;
  text-align:center;
  line-height:15px;
  vertical-align:top;
} 
.goods_params_list .side .hotOrder .content li>.backGray{
  color:#999999;
  background:#dddddd;
} 
.goods_params_list .main .nav{
  border-bottom:1px solid #EEEEEE;
  height:39px;
} 
.goods_params_list .main .nav>div>div{
  width:120px;
  height:39px;
  line-height:40px;
  text-align:center;
  font-size: 14px;
} 
.goods_params_list .main .nav>div>div.active{
  width:116px;
  height:38px;
  font-weight:bold;
  color:#DF1738;
  border:2px solid #DF1738;
  background:#ffffff;
  border-bottom:0;
  margin-bottom:-1px;
} 
.goods_params_list .mainContent{
  width:780px;
  padding:30px;
}
.goods_params_list .main .aside{
  width:150px;
  font-size:14px;
}
.goods_params_list .mainContent ul.message{
  border-bottom:1px solid #EEEEEE;
  padding-bottom:20px;
  margin-bottom:20px;
}
.goods_params_list .mainContent li{
  width:250px;
  margin:10px 0px 10px 10px;
}
.goods_params_list .goods_dimg img{
  display:block;
}

.goods_params_list .main .aside ul{
  width:86px;
  margin:0 auto;
  margin-top:20px;
}
.goods_params_list .main .aside li{
  margin-bottom:10px;
  padding-left:30px;
  background:url("http://127.0.0.1/images/details/g-quan.png") no-repeat left center;
}
.goods_params_list .main .aside li:hover{
  background-Image:url("http://127.0.0.1/images/details/r-quan.png");
}

.divFixed{
  position:fixed;
  border:0 !important;
  width:840px;
  top:0;
}
.divFixed>div{
  border-bottom: 1px solid #eeeeee;
}
.btnFixed{
  position:fixed;
  width:150px !important;
  top:0;
  left:1225px;
  border:0 !important;
  border-radius:0 !important;
  z-index:10;
}
</style>

