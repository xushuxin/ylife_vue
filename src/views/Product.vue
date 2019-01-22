<template>
  <div v-cloak>
    <section id="section" >
      <div class="nav"> <!--面包屑导航-->
        <div class="container">
          <span>全部结果 > </span>
          <span>"<span>{{kwords}}</span>"</span>
        </div>
      </div>
      <div class="sift container" ><!-- 筛选 -->
        <ul :class="!isSpread?'unSpread':''">
          <li v-for="(item,i) of siftList" :key="i" :class="i>3?'hide':''">
            <span class="title">{{item.title}}:</span>
            <span v-for="(content,i) of item.content" :key="i"><a href="">{{content}}</a></span>
          </li>
        </ul>
        <div class="spread" @click="changeStyle">
          <span>{{isSpread?"收起":"展开"}}</span>
          <span :class="!isSpread?'unSpread':''"></span>
        </div>
      </div>
      <div class="products container clearfix"><!--主体-->
        <div class="aside fl">
          <p class="font_bold font_14">浏览过的商品</p>
          <div class="visited"></div>
        </div>
        <div class="main fl">
          <div class="filter">
            <div class="left">
              <span class="title">排序:</span>
              <span v-for="(item,i) of filterList" :key="i">{{item.content}}</span>
            </div>
            <div class="center">
              <input type="text" placeholder="￥">
              <span>-</span>
              <input type="text" placeholder="￥">
              <button class="font_white">确定</button>
            </div>
            <div class="right">
              <span>共{{count}}个商品</span>
              <span><span>{{pageCount==0?pno:pno+1}}</span>/{{pageCount}}</span>
              <span class="btn" :disabled="pno==0?true:false"  @click="prevPage">上一页</span>
              <span class="btn" :disabled="pno==pageCount-1 || pageCount==0?true:false" @click="nextPage">下一页</span>
            </div>
          </div>
          <div class="product_list">
            <ul class="clearfix">
              <li v-for="(item,i) of list" :key="i">
                <div>
                  <div class="img">
                    <router-link :to="{name:'detail',params:{id:item.id}}"><img :src="item.md" alt=""></router-link> 
                  </div>
                  <div class="price">￥{{item.price}}</div>
                  <div class="title"><router-link :to="{name:'detail',params:{id:item.id}}" v-color="{title:item.title,kwords}">{{item.title}}</router-link></div>
                  <div class="status">{{item.stock | countConvert}}</div>
                  <div class="operation clearfix">
                    <span @click="contrast" onselectstart="return false;">
                      <img src="http://127.0.0.1:80/images/no-check.jpg" alt="">对比
                    </span>
                    <span @click="attention" onselectstart="return false;">
                      <img src="http://127.0.0.1:80/images/g-love.png" alt="">关注
                    </span>
                    <span @click="add" :data-pid="item.id" onselectstart="return false;">
                      <img src="http://127.0.0.1:80/images/cart.png" alt="">加入购物车
                    </span>
                  </div>
                </div>
              </li> 
            </ul>        
          </div>
          <div class="change_page fr" v-if="count!=0">
            <button class="btn" :disabled="pno==0?true:false" @click="prevPage">上一页</button>
            <span v-for="(item,i) of pageCount" :key="i" :class="i==pno?'active':''" @click="change" :data-pno="i">{{i+1}}</span>
            <button class="btn" :disabled="pno==pageCount-1 || pageCount==0?true:false" @click="nextPage">下一页</button>
          </div>
          <div v-else class="noProduct">
            <h6>没有搜索到商品，修改一下搜索条件说不定会有意外收获哦！</h6>
            <h6>
              <span>大家正在搜：</span>
              <span>您也去看看吧！</span>
            </h6>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  inject:['reload'],//注入根组件的provide中的属性，注入后可以直接this.reload()使用绑定的标签上可以直接@事件名="reload"
  data(){
    return{
      siftList:[{title:"品牌",content:["大润窑","HAPPYCALL","赫曼德","大草源","宜阁","乐扣乐扣","膳魔师","裕华思羽","金龙鱼","龙的"]},
      {title:"价格",content:["0-100","101-200","201-300","301-400","401-500","501-700","701-900","901-1000","1000以上"]},
      {title:"材质",content:["06cr不锈钢","陶瓷","汝窑","不锈钢","青瓷","高硼硅玻璃","合金","其它"]},
      {title:"选购热点",content:["热卖款","高品质","耐高温"]},
      {title:"容量",content:["201-300ml","301-400ml","401-500ml","800ml以上"]},
      {title:"适用人群",content:["通用","儿童"]}
      ],
      isSpread:false,
      spreadStyle:{backgroundImage:"url(http://127.0.0.1:80/images/filter_down.gif)"},
      filterList:[{id:1,content:"销量"},{id:2,content:"价格"},{id:1,content:"人气"},{id:1,content:"上架时间"},],
      list:[],
      pno:0,  //当前页码
      pageSize:16,//每页商品条数
      pageCount:0,//总页数
      count:0,//总商品条数,
      kwords:"",
      hotSearchList:[{id:1,kword:"大润窑"},{id:2,kword:"公牛"},{id:3,kword:"锅"},{id:4,kword:"新榜样"},{id:5,kword:"加加"},{id:6,kword:"百安思"},{id:6,kword:"乐扣"}],  
    }
  },
  methods:{
    //1头部列表
    changeStyle(e){
      // console.log(this.$el);//this.$el获得当前监听元素
      // console.log(e.currentTarget);//e.currentTarget获得当前元素，e.target获得触发事件元素
      this.isSpread=!this.isSpread;//如果列表未展开，点击时展开
    },
    //2.商品列表
    getProductlist(){//加载页面时,默认页码1
      var pno=this.pno;
      this.kwords=decodeURIComponent(this.$route.query.kwords);
      if(this.kwords){
        this.axios.get("http://127.0.0.1:80/product/getProductlist?kwords="+this.kwords+"&pno="+pno).then(res=>{
          this.list=res.data.products;
          this.pageCount=res.data.pageCount;
          this.count=res.data.count;
        })
      }  
    },
    contrast(e){//对比
      var img=e.currentTarget.firstElementChild
      if(img.src.indexOf("no-check")!=-1){
       img.src='http://127.0.0.1:80/images/checked.jpg';
      }else{
       img.src='http://127.0.0.1:80/images/no-check.jpg'
      }
    },
    prevPage(){//上一页
      if(this.pno>0){
        this.pno--;
        // this.getProductlist();
      }
    },
    nextPage(){//下一页
      if(this.pno<this.pageCount-1){
        this.pno++;
        // this.getProductlist();
      }
    },
    change(e){//点击对应的数字按钮
      if(e.target.className.indexOf("active")==-1){//没有active的才能触发
        this.pno=parseInt(e.target.dataset.pno);
        // this.getProductlist();
      }
    },
    attention(e){//关注
      var img=e.currentTarget.firstElementChild;
      if(img.src.indexOf("g-love")!=-1){
       img.src='http://127.0.0.1:80/images/r-love.png';
      }else{
       img.src='http://127.0.0.1:80/images/g-love.png';
      }
    },
    add(e){
      var uid=sessionStorage.getItem("uid");
      var count=1;
      var pid=e.currentTarget.dataset.pid;
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
          })
        })
      }else{
        alert("请登录！")
      }
    },
    savePno(){
      localStorage.setItem("pno",this.pno);
    },
  },
  created(){
    var pno=localStorage.getItem("pno");
    pno&&(this.pno=parseInt(pno));//数字0,空字符串,null,undefined,NaN都会转为false
    localStorage.removeItem('pno')
    this.getProductlist();
  },
  mounted(){
    window.onbeforeunload=this.savePno;//监听页面刷新之前
  },
  watch: {//1.watch擅长处理的场景：一个数据影响多个数据 2.computed擅长处理的场景：一个数据受多个数据影响 
    pno:{
      handler(newval,oldval){
        if(newval!=oldval){//如果改变前后pno值不一样
          // this.$el.scrollIntoView();
          this.getProductlist();
          window.scrollTo(0,0);
        }
      }
    }
  },
  beforeRouteUpdate (to, from, next) { // 在当前路由改变，但是该组件被复用时调用// 可以访问组件实例 `this`
     window.onbeforeunload=null;
     next();
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，查询字符串不同也适用
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  },
  beforeRouteLeave (to, from, next) {// 导航离开该组件的对应路由时调用// 可以访问组件实例 `this`
    window.onbeforeunload=null;
    next();
  },
  directives:{//局部自定义命令v-color,
    color(el,binding){//bind 和 update 时触发相同行为，el为绑定v-color的元素,binding为绑定的属性
      var title=binding.value.title;//也可以通过el.dataset.title获得自定义:data-title属性值
      var kwords=binding.value.kwords;
      kwords=kwords.split(" ")//关键词用空格分割为数组
      for(var kw of kwords){//遍历关键词数组
        var reg=new RegExp(kw,"g");//创建正则表达式
        title=title.replace(reg,`<font style='color:#f00;'>${kw}</font>`)//替换title中关键词的内容
      }
      el.innerHTML=title;
    }
  }
}
</script>
<style scoped>

#section>.nav{
  border-bottom:1px solid #D1CFCF;
  height:36px;
  line-height:36px;
}
#section>.nav>div>:last-child>span{
 color:#DF1738;
 font-weight:bold;
}
#section>.sift{
  position:relative;
}
#section>.sift>ul{
  border:1px solid #EEEEEE; 
  z-index:1;
  margin-top:15px;
}
#section>.sift>ul>li{
  margin:0 auto;
  width:1180px;
  height:40px;
  line-height: 40px;
  border-bottom:1px solid #EEEEEE; 
}

#section>.sift>ul.unSpread>li:nth-child(4),#section>.sift>ul>li:last-child{
  border-bottom:0;
}
#section>.sift>ul.unSpread>li.hide{
  display:none;
}
#section>.sift>ul>li>span{
 padding-right:30px;
}
#section>.sift>ul>li>span>a{
 color:#666666;
}
#section>.sift>ul>li>span>a:hover{
 color:#DF1738;
}
#section>.sift>ul>li>span.title{
 padding-left:50px;
}
#section >.sift>.spread{
  position:absolute;
  left:50%;
  top:100%;
  margin-left:-41px;
  margin-top:-1px;
  width:80px;
  height:24px;
  border-width:1px;
  border-style:solid;
  border-color:#ffffff #EEEEEE #EEEEEE #EEEEEE;
  text-align:center;
  padding-right:5px;
  line-height: 24px;
  z-index:1;
  cursor:pointer;
}
#section >.sift>.spread:hover{
  color:#DF1738;
}
#section >.sift>.spread>:first-child{
  padding-right:5px;
}
#section >.sift>.spread>:last-child{
  display:inline-block;
  width:9px;
  height:6px;
  background:url(http://127.0.0.1:80/images/filter_up.gif) no-repeat;
}
#section >.sift>.spread>.unSpread{
  background:url(http://127.0.0.1:80/images/filter_down.gif) no-repeat;
}
#section>.products{
  margin-top:35px;
}
#section>.products>.aside{
  width:200px;
}
#section>.products>.aside>p{
  border:1px solid #EEEEEE;
  height:40px;
  line-height:40px;
  text-indent:20px;
}
#section>.products>.aside>.visited{
  border:1px solid #EEEEEE;
  border-top:0;
  padding:5px;
}
#section>.products>.main>.filter{
  width:988px;
  border:1px solid #EEEEEE;
  height:51px;
  margin-left:10px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

#section>.products>.main>.filter>div>span{
  display: inline-block;
  margin:0 5px;
  height:30px;
  line-height: 30px;
  text-align:center;
  border:1px solid #EEEEEE;
  border-radius:3px;
  padding:0px 10px;
  vertical-align:middle;
}
#section>.products>.main>.filter>div>.title{
  margin-right:10px;
  border:0;
}
#section>.products>.main>.filter>.left>:not(.title):hover{
  cursor:pointer;
  color:#DF1738;
}

#section>.products>.main>.filter>.center>input{
  width:60px;
  height:30px;
  outline:0;
  border:1px solid #EEEEEE;
  border-radius:3px;
  vertical-align:middle;
}
#section>.products>.main>.filter>.center>button{
  width:40px;
  height:30px;
  background:#DF1738;
  border:0;
  border-radius:3px;
  font-size:12px;
  margin-left: 10px;
  outline:0;
  vertical-align:middle;
  cursor:pointer;
}
#section>.products>.main>.filter>.right>:nth-child(1),#section>.products>.main>.filter>.right>:nth-child(2)>span{
  color:#DF1738;
  font-weight:bold;
}
#section>.products>.main>.filter>.right>:nth-child(1){
  padding:0 20px;
}
#section>.products>.main>.filter>.right>:nth-child(2){
  margin:0 10px;
}
#section>.products>.main>.filter>.right>:nth-child(3){
  background:url(http://127.0.0.1:80/images/op_prev.gif) no-repeat 5% center;
}
#section>.products>.main>.filter>.right>:nth-child(4){
  background:url(http://127.0.0.1:80/images/op_next.gif) no-repeat 95% center;
}
/* 商品列表 */
#section>.products>.main>.product_list{
  width:1000px;
}
#section>.products>.main>.product_list>ul>li{
  width:238px;
  border:1px solid transparent;
  margin:20px 0px 0px 10px;
  float:left;
}
#section>.products>.main>.product_list>ul>li:hover{
  border-color:#faa;
}
#section>.products>.main>.product_list>ul>li>div{
  padding:5px 0px;
}
#section>.products>.main>.product_list>ul>li>div>.img{
  height:220px;
}
#section>.products>.main>.product_list>ul>li>div>div{
  width:220px;
  margin:5px auto;
}
#section>.products>.main>.product_list>ul>li>div>.img>a>img{
 width:220px;
 height:220px;
}
#section>.products>.main>.product_list>ul>li>div>.price{
 color:#DF1738;
 font-size: 26px;
}
#section>.products>.main>.product_list>ul>li>div>.title>a{
 font-size:16px;
 color:#666666;
}
#section>.products>.main>.product_list>ul>li>div>.status{
  text-align:right;
}

#section>.products>.main>.product_list>ul>li>div>.operation>span{
  float:left;
  line-height:30px;
  height:30px;
  text-align:center;
  width:59px;
  border:1px solid #EEEEEE;
  border-right:0;
  cursor:pointer;
}
#section>.products>.main>.product_list>ul>li>div>.operation>span:nth-child(3){
  width:98px;
  border:1px solid #EEEEEE;
  color:#DF1738;
}
#section>.products>.main>.product_list>ul>li>div>.operation>span>img{
  vertical-align:middle;
  padding-right: 5px;
}

#section>.products>.main>.change_page{
  margin:30px 0px;
  float:right;
}
  #section>.products>.main>.change_page>:nth-child(n){/* 所有子元素 */
  float:left;
  border:1px solid #CCCCCC;
  margin:0 5px;
  font-size:14px;
  font-weight:500;
  color:#666666;
  border-radius:3px;
}

#section>.products>.main>.change_page>span{
  width:36px;
  height:36px;
  text-align:center;
  line-height: 36px;
  cursor:pointer;
}
#section>.products>.main>.change_page>button{
  width:60px;
  height:38px;
  outline:0;
  background:#fee;
}
#section>.products>.main>.change_page>span.active{
  background:#DF1738;
  border:0;
  color:#fff;
}
#section>.products>.main .btn[disabled]{
  opacity:0.3;
}
#section>.products>.main>.change_page>span:not([class~="active"]):hover{/* 类名含有active的span*/
  color:#DF1738;
}
#section>.products>.main .btn:not([disabled]):hover{
  color:#DF1738;
  cursor:pointer;
}

.noProduct{/* 未搜索到商品 */
  text-align: center;
  padding-top:40px;
  padding-bottom:20px;
  line-height: 2;
}
.noProduct a{
  color:#DF1738;
  margin-right:5px;
}
</style>

