<template>
  <div>
    <div id="header" class="container clearfix">
			<router-link to="/"><img src="http://127.0.0.1:80/images/logo.jpg" alt="优生活"></router-link>
			<h1 class="font_26">欢迎登录</h1>
		</div>
		<div id="section">
			<div class="container clear_over">
				<div class="login_form ">
					<form @submit.prevent="login">
						<div class="font_18">
							<a href="javascript:;" class="normal_login" :class="loginMode=='normal'?'font_bold font_orange1':'font_gray1'" @click="changeMode" data-mode="normal" >账号密码登录</a>
							<a href="javascript:;" class="wx_login" :class="loginMode=='weixin'?'font_bold font_orange1':'font_gray1'" @click="changeMode" data-mode="weixin">微信扫码登录</a>
						</div>
						<!-- 登陆 主体-->
						<div class="login_box">
							<div class="normal_login_box" v-show="loginMode=='normal'">
								<div class="rel">
									<img class="img_user" src="http://127.0.0.1:80/images/user.png"/>
									<input class="text" type="text" placeholder="已验证手机/邮箱/用户名" v-model="uname">
									<p class="err" v-show="nameErr">{{msg1}}</p>
								</div>
								<div class="rel">
									<img class="img_code" src="http://127.0.0.1:80/images/code.png"/>
									<input class="text" type="password" placeholder="密码" v-model="upwd">
									<p class="err" v-show="pwdErr">{{msg2}}</p>
								</div>
								<div><a href="#" class="ml_263 font_gray1">忘记密码？</a></div>
								<div>
									<input class="font_white bg_orange1 login_btn" type="submit" value="登 录">
								</div>
							</div>
								<!-- 微信扫码登陆-->
							<div class="wx_login_box" v-show="loginMode=='weixin'"><img src="http://127.0.0.1:80/images/erweima.jpg" alt=""></div>
						</div>

						<!-- 登陆框footer-->
						<div>
							<router-link to="/" class="font_gray1">
								<img src="http://127.0.0.1:80/images/q3.png" alt="微博">微博
							</router-link>
							<span class="line">|</span>
							<router-link to="#" class="font_gray1">
								<img src="http://127.0.0.1:80/images/q1.png" alt="QQ">QQ
							</router-link>
							<router-link to="/reg" class="ml_121 font_orange1 font_bold">
								立即注册
							</router-link>
						</div>
					</form>
				</div>
			</div>
		</div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'
export default {
	data(){
		return{
			loginMode:"normal",
			uname:"",
			upwd:"",
			nameErr:false,
			pwdErr:false,
			msg1:"",
			msg2:""
		}
	},
	methods:{
		changeMode(e){
			this.loginMode=e.target.dataset.mode;
		},
		login(e){
			var reg=/^\w{6,20}$/;//6——20位字母或者数字
			var uname=this.uname;
			var upwd=this.upwd;
			if(reg.test(uname)&&upwd!=""){//如果格式验证通过，并且密码不为空
				this.axios.post("http://127.0.0.1:80/user/login","uname="+uname+"&upwd="+upwd).then(res=>{
					if(res.data.code==200){
						this.nameErr=false;
						this.pwdErr=false;
						this.msg2=""
						alert(res.data.msg);
						var user_name=res.data.user_name;
						var uid=res.data.uid;
						user_name&&(name=user_name) || (name=this.uname)
						sessionStorage.setItem("name",name);
						sessionStorage.setItem("uid",uid)
						this.$router.push("/");
					}else{
						this.nameRrr=false;
						this.pwdErr=true;
						this.msg2="密码和账户不匹配，请重新输入"
					}
				})
			}else{//单独判断每个输入框
				if(!reg.test(uname)){
					console.log(2)
					this.nameErr=true;
					this.msg1="请输入6-20位数字、字母或下划线组成的用户名";
				}else{
					this.nameErr=false;
					this.msg1=""
				}
				if(upwd==""){
					this.pwdErr=true;
					this.msg2="请输入密码"
				}else{
					this.pwdErr=false;
					this.msg2=""
				}
			}
		},
	},
  components:{
    Footer
  }
}
</script>
<style scoped>
/*header*/
#header{
	padding:20px 0px;
}
#header img{
	float:left;
	margin-left:100px;
}
#header h1{
	float:left;
	margin-left:20px;
	padding-left:20px;
	border-left:1px solid #C8C8C8;
	font-weight:normal;
	color:#000000;
	height:39px;
	line-height:39px;
}
/*section主体部分*/
#section{
	height:420px;
	background:url("http://127.0.0.1:80/images/login_big.jpg") no-repeat center center;
}
#section .container{
	height:100%;
	position:relative;
}
#section .login_form{
	width:350px;
	height:360px;
	border:5px solid rgba(255,255,255,0.4);
	border-radius:3px;
	position:absolute;
	top: 25px;
	left:685px;
}
#section .login_form form{
	height:100%;
	background:#ffffff;
	border:1px solid #ffffff;
	border-radius:3px;
}
#section .login_form form>div:first-child{
	height:48px;
	line-height:48px;
	border-bottom:1px solid #e8e8e8;
}
#section .login_form form>div:first-child a{
	padding:0 31px;
}
#section .login_form form input{
	width:300px;
	height:36px;
	margin:0 25px 25px;
	border:1px solid #D3D3D3;
	border-radius:3px;
	outline:0;
	font-size:12px;
}
#section .login_form form .text{
	text-indent:45px;
}
#section .login_form form .rel{
	position:relative;
}
#section .login_form form .img_user{
	position:absolute;
	left:40px;
	top:9px;
}
#section .login_form form .img_code{
	position:absolute;
	left:40px;
	top:7.5px;
}
#section .login_form form .ml_263{
	margin-left:263px;
}
#section .login_form form .login_box>.normal_login_box>div:nth-child(3){
	margin-bottom:22px;
}
#section .login_form form input.login_btn{
	height:40px;
	font-size:16px;
	border:1px solid #EE6A1E;
	margin-bottom:20px;
	cursor: pointer;
}
#section .login_form form>div:last-child{
	margin:0 25px;
	border-top:1px solid #e6e6e6;
	padding-top:12px;
}
#section .login_form form>div:last-child img{
	width:25px;
	height:25px;
	vertical-align: middle;
}
.line{
	padding:0 10px;
	color:#CFCFDA;
}
.ml_121{
	margin-left:121px;
}
p.err{
	float:left;
	margin-left: 26px;
	margin-top: -20px;
	background: url(http://127.0.0.1:80/images/x.png) no-repeat left center;
	text-indent: 18px;
}
#section .login_box{
	width:100%;
	height:254px;
	position:relative;
}
#section .login_box>.normal_login_box{
	padding-top:33px;
}
#section .wx_login_box{
	position:absolute;
	left:50%;
	top:50%;
	transform:translate(-50%,-50%);
	border:1px solid #C8C8C8;
}
#section .wx_login_box img{
	width:200px;
	height:200px;
}


</style>

