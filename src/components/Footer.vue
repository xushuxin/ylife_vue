<template>
  <div id="footer" class="container">
    <div class="footer1">
      <dl>
        <dt>购物指南</dt>
        <dd><router-link to="/">电子券兑换产品方法</router-link></dd>
        <dd><router-link to="/">交易条款</router-link></dd>
        <dd><router-link to="/">积分说明</router-link></dd>
      </dl>
      <dl>
        <dt>支付方式</dt>
        <dd><router-link to="/">和包支付</router-link></dd>
        <dd><router-link to="/">和包电子券</router-link></dd>
        <dd><router-link to="/">支付宝</router-link></dd>
        <dd><router-link to="/">电子券使用方法</router-link></dd>
      </dl>
      <dl>
        <dt>售后服务</dt>
        <dd><router-link to="/">退款说明</router-link></dd>
        <dd><router-link to="/">发票制度</router-link></dd>
        <dd><router-link to="/">售后服务总则</router-link></dd>
      </dl>
      <dl>
        <dt>关于我们</dt>
        <dd><router-link to="/">公司简介</router-link></dd>
        <dd><router-link to="/">联系方式</router-link></dd>
      </dl>
      <dl>
        <dt>商务合作</dt>
        <dd><router-link to="/">商户入驻</router-link></dd>
        <dd><router-link to="/">集团采购</router-link></dd>
      </dl>
    </div>
    <div class="footer2">
      <div class="clearfix">
        <ul>
          <li><router-link to="/">关于我们</router-link><span>|</span></li>
          <li><router-link to="/">联系我们</router-link><span>|</span></li>
          <li><router-link to="/">人才招聘</router-link><span>|</span></li>
          <li><router-link to="/">商家入驻</router-link><span>|</span></li>
          <li><router-link to="/">广告服务</router-link><span>|</span></li>
          <li><router-link to="/">友情链接</router-link><span>|</span></li>
          <li><router-link to="/">销售联盟</router-link><span>|</span></li>
          <li><router-link to="/">English Site</router-link></li>
        </ul>
      </div>	
      <p>
        ICP:<router-link to="/">苏ICP备12002596号-1</router-link>
        增值电信业务经营许可证:<router-link to="/">B2-20150281</router-link>
      </p>
      <p>Copyright &copy; 2005-2025 江苏优生活传媒科技股份有限公司 版权所有</p>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
#footer{
  margin:20px auto;
}
#footer a:hover{
	color:#FF6633;
}
#footer .footer1{
	border-top:1px solid #e6e6e6;
	border-bottom:1px solid #e6e6e6;
	width:100%;
	height:165px;
}
#footer .footer1 dl{
	float: left;
	margin: 30px 0px 30px 137px;
}
#footer .footer1 dl dt{
	font:bold 14px/2 微软雅黑;
}
#footer a{
	color:#666666;
	font:12px/1.5 微软雅黑;
}
#footer .footer2 div{
	position:relative;
	width:100%;
	height:40px;
	margin-top:20px;
}
#footer .footer2 ul{
	float:left;
	position:absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
}
#footer .footer2 ul li{
	float:left;
}
#footer .footer2 ul li span{
	padding:10px;
}
#footer .footer2 p{
	text-align:center;
	margin-bottom:20px;
}
#footer .footer2 p a{
	font-weight:bold;
}

</style>

