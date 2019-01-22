<template>
  <div>
    <div id="header">
			<div class="header1 container">
				<router-link to="/"><img src="http://127.0.0.1:80/images/logo.jpg" alt="优生活"></router-link>
				<h1>欢迎注册</h1>
			</div>
			<div class="header2">
				<span>我已经注册，现在就</span><router-link to="/login">登录</router-link>
			</div>
		</div>
		<!--主体，注册框-->
		<div id="section" class="container clearfix">
			<div class="reg_form">
				<form>
				<table>
					<tr>
						<td align="right">
								<span class="x_red">*</span>
								<span class="font_16">手机号：</span>
						</td>
						<td>
							<div class="form_row" :class="trueUname?'True':'False'">
								<input type="text" v-model="uname" id="uname" class="text checkInput" @focus="unameFocus" @blur="checkUname">
								<span class="showPropMsg">{{unameMsg}}</span>
							</div>
						</td>
					</tr>
					<tr>
						<td align="right">
							<span class="x_red">*</span>
							<span class="font_16">设置密码：</span>
						</td>
						<td>
							<div class="form_row" :class="trueUpwd?'True':'False'">
								<input type="password" v-model="upwd" id="upwd" class="text checkInput" maxlength="20" @focus="upwdFocus" @blur="checkUpwd">
								<span class="showPropMsg">{{upwdMsg}}</span>
							</div>
						</td>
					</tr>
					<tr>
						<td align="right">
							<span class="x_red">*</span>
							<span class="font_16">确认密码：</span>
						</td>
						<td>
							<div class="form_row" :class="trueCpwd?'True':'False'">
								<input type="password" v-model="cpwd" id="cpwd" class="text checkInput" maxlength="20" @focus="cpwdFocus" @blur="confirmUpwd">
								<span class="showPropMsg">{{cpwdMsg}}</span>
							</div>
						</td>
					</tr>
					<tr>
						<td align="right">
							<span class="x_red">*</span>
							<span class="font_16">验证码：</span></td>
						<td>
							<div class="form_row" :class="trueCnumber?'True':'False'">
								<input type="text" v-model="cnumber" id="cnumber" class="text checkInput" @focus="cnumFocus">
								<span class="showPropMsg">{{cnumberMsg}}</span>
								<img id="checkCodeImg" class="vm ml5" src="https://www.ylife.cn/patchca.htm?090739?0.4653741105140141?0.8804619806741674?0.15501243255699237?0.1559770520545698?0.6091637132762837?0.6957633197908335?0.36701861435441363?0.15109044379624592?0.3673523214898706?0.1885642755181367?0.9219287778490215?0.5055921492324755?0.44958938728333053?0.5947628370857951?0.11115932024907238" alt="验证码" style="cursor:pointer;" onclick="this.src=this.src+'?'+Math.random();">
								<span style="margin-left:10px;">
									看不清？
									<a href="javascript:;" style="color: #005AA0;">换一张</a>
								</span>
							</div>
						</td>
					</tr>
					<tr>
						<td align="right" >
							<span class="x_red">*</span>
							<span class="font_16">邮箱设置：</span>
						</td>
						<td>
							<div class="form_row" :class="trueEmail?'True':'False'">
								<input type="text" v-model="email" id="email" class="text checkInput" @focus="emailFocus" @blur="checkEmail">
								<span class="showPropMsg">{{emailMsg}}</span>
							</div>
						</td>
					</tr>
					<tr>
						<td></td>
						<td class="pt_10">
							<div class="form_row" :class="!trueAgree&&'False'">
								<div>
									<input class="checkInput" type="checkbox" id="agree" v-model="isAgree">
									<label for="agree">我已阅读并同意</label>
									<a href="javascript:;" class="reg_pro" @click="showPro">《商城用户注册协议》</a>
								</div>
								<span class="showPropMsg">{{proMsg}}</span>
							</div>
						</td>
					</tr>
					<tr>
						<td></td>
						<td class="pb_10">
							<input type="button" value="同意并注册" id="reg_btn" @click="checkReg">
						</td>
					</tr>
				</table>
				</form>
			</div>
			<div class="extra_login">
				<router-link to="/login">新浪微博登录</router-link>
				<a href="/login">腾讯QQ登录</a>
			</div>
		</div>
		<!-- 注册协议模态框 -->
		<div class="proFrame" v-show="isShowPro">
			<div class="proContent">
				<h3>优生活商城用户协议</h3>
				<div class="mainContent">
					<h4>用户注册协议</h4>
					<p>本协议是您与网站（简称"本站"，网址：www.ylife.cn）所有者（以下简称为"优生活商城"）之间就网站服务等相关事宜所订立的契约，请您仔细阅读本注册协议，您点击"同意并继续"按钮后，本协议即构成对双方有约束力的法律文件。</p>
					<div>
						<dt>第1条 本站服务条款的确认和接纳</dt>
						<dd>1.1本站的各项电子服务的所有权和运作权归所有。用户同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。用户确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。</dd>
						<dd>1.2用户点击同意本协议的，即视为用户确认自己具有享受本站服务、下单购物等相应的权利能力和行为能力，能够独立承担法律责任。</dd>
						<dd>1.3如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。</dd>
						<dd>1.4保留在中华人民共和国大陆地区法施行之法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。</dd>
					</div>
					<div>
						<dt>第2条 本站服务</dt>
						<dd>2.1通过互联网依法为用户提供互联网信息等服务，用户在完全同意本协议及本站规定的情况下，方有权使用本站的相关服务。</dd>
						<dd>2.2用户必须自行准备如下设备和承担如下开支：（1）上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；（2）上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。</dd>
					</div>
					<div>
						<dt>第3条 用户信息</dt>
						<dd>3.1用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且保留终止用户使用各项服务的权利。</dd>
						<dd>3.2用户在本站进行浏览、下单购物等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。</dd>
						<dd>3.3用户注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定改变您的密码。用户应谨慎合理的保存、使用其用户名和密码。用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通知本站并向公安机关报案。</dd>
						<dd>3.4用户同意，拥有通过邮件、短信电话等形式，向在本站注册、购物用户、收货人发送订单信息、促销活动等告知信息的权利。</dd>
						<dd>3.5用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。</dd>
						<dd>3.6用户同意，有权使用用户的注册信息、用户名、密码等信息，登录进入用户的注册账户，进行证据保全，包括但不限于公证、见证等。</dd>
					</div>
					<div>
						<dt>第4条 用户依法言行义务</dt>
						<dd>本协议依据国家相关法律法规规章制定，用户同意严格遵守以下义务：</dd>
						<dd>（1）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；</dd>
						<dd>（2）从中国大陆向境外传输资料信息时必须符合中国有关法规；</dd>
						<dd>（3）不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；</dd>
						<dd>（4）不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；</dd>
						<dd>（5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；</dd>
						<dd>（6）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；</dd>
						<dd>（7）不得教唆他人从事本条所禁止的行为；</dd>
						<dd>（8）不得利用在本站注册的账户进行牟利性经营活动；</dd>
						<dd>（9）不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；</dd>
						<dd>用户应不时关注并遵守本站不时公布或修改的各类合法规则规定。</dd>
						<dd>本站保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。</dd>
						<dd>若用户未遵守以上规定的，本站有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。</dd>
					</div>
					<div>
						<dt>第5条 商品信息</dt>
						<dd>本站上的商品价格、数量、是否有货等商品信息随时都有可能发生变动，本站不作特别通知。由于网站上商品信息的数量极其庞大，虽然本站会尽最大努力保证您所浏览商品信息的准确性，但由于众所周知的互联网技术因素等客观原因存在，本站网页显示的信息可能会有一定的滞后性或差错，对此情形您知悉并理解；欢迎纠错，并会视情况给予纠错者一定的奖励。</dd>
						<dd>为表述便利，商品和服务简称为"商品"或"货物"。</dd>
					</div>
					<div>
						<dt>第6条 订单</dt>
						<dd>6.1在您下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人与用户本人不一致的，收货人的行为和意思表示视为用户的行为和意思表示，用户应对收货人的行为及意思表示的法律后果承担连带责任。</dd>
						<dd>6.2除法律另有强制性规定外，双方约定如下：本站上销售方展示的商品和价格等信息仅仅是要约邀请，您下单时须填写您希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址（合同履行地点）、合同履行方式等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售方发出的合同要约；销售方收到您的订单信息后，只有在销售方将您在订单中订购的商品从仓库实际直接向您发出时（ 以商品出库为标志），方视为您与销售方之间就实际直接向您发出的商品建立了合同关系；如果您在一份订单里订购了多种商品并且销售方只给您发出了部分商品时，您与销售方之间仅就实际直接向您发出的商品建立了合同关系；只有在销售方实际直接向您发出了订单中订购的其他商品时，您和销售方之间就订单中该其他已实际直接向您发出的商品才成立合同关系。您可以随时登录您在本站注册的账户，查询您的订单状态。</dd>
						<dd>6.3由于市场变化及各种以合理商业努力难以控制的因素的影响，本站无法保证您提交的订单信息中希望购买的商品都会有货；如您拟购买的商品，发生缺货，您有权取消订单。</dd>
					</div>
					<div>
						<dt>第7条 配送</dt>
						<dd>7.1销售方将会把商品（货物）送到您所指定的收货地址，所有在本站上列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。</dd>
						<dd>7.2因如下情况造成订单延迟或无法配送等，销售方不承担延迟配送的责任：</dd>
						<dd>（1）用户提供的信息错误、地址不详细等原因导致的；</dd>
						<dd>（2）货物送达后无人签收，导致无法配送或延迟配送的；</dd>
						<dd>（3）情势变更因素导致的；</dd>
						<dd>（4）不可抗力因素导致的，例如：自然灾害、交通戒严、突发战争等。</dd>
					</div>
					<div>
						<dt>第8条 所有权及知识产权条款</dt>
						<dd>8.1用户一旦接受本协议，即表明该用户主动将其在任何时间段在本站发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给所有，用户同意有权就任何主体侵权而单独提起诉讼。</dd>
						<dd>8.2本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2011年版著作权法确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于用户在网站上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</dd>
						<dd>8.3用户同意并已充分了解本协议的条款，承诺不将已发表于本站的信息，以任何形式发布或授权其它主体以任何方式使用（包括但限于在各类网站、媒体上使用）。</dd>
						<dd>8.4是本站的制作者,拥有此网站内容及资源的著作权等合法权利,受国家法律保护,有权不时地对本协议及本站的内容进行修改，并在本站张贴，无须另行通知用户。在法律允许的最大限度范围内，对本协议及本站内容拥有解释权。</dd>
						<dd>8.5除法律另有强制性规定外，未经明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本站的信息内容，否则，有权追究其法律责任。</dd>
						<dd>8.6本站所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是或其内容提供者的财产，受中国和国际版权法的保护。本站上所有内容的汇编是的排他财产，受中国和国际版权法的保护。本站上所有软件都是或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。</dd>
					</div>
					<div>
						<dt>第9条 责任限制及不承诺担保</dt>
						<dd>除非另有明确的书面说明,本站及其所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品（包括软件）和服务，均是在"按现状"和"按现有"的基础上提供的。</dd>
						<dd>除非另有明确的书面说明,不对本站的运营及其包含在本网站上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。</dd>
						<dd>不担保本站所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品（包括软件）和服务、其服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。</dd>
						<dd>如因不可抗力或其它本站无法控制的原因使本站销售系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，会合理地尽力协助处理善后事宜。</dd>
					</div>
					<div>
						<dt>第10条 协议更新及用户关注义务</dt>
						<dd>根据国家法律法规变化及网站运营需要，有权对本协议条款不时地进行修改，修改后的协议一旦被张贴在本站上即生效，并代替原来的协议。用户可随时登录查阅最新协议；用户有义务不时关注并阅读最新版的协议及网站公告。如用户不同意更新后的协议，可以且应立即停止接受网站依据本协议提供的服务；如用户继续使用本网站提供的服务的，即视为同意更新后的协议。建议您在使用本站之前阅读本协议及本站的公告。 如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。</dd>
					</div>
					<div>
						<dt>第11条 法律管辖和适用</dt>
						<dd>本协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区适用之有效法律（但不包括其冲突法规则）。 如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其它有效条款继续有效。 如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向有管辖权的中华人民共和国大陆地区法院提起诉讼。</dd>
					</div>
					<div>
						<dt>第12条 其他</dt>
						<dd>12.1网站所有者是指在政府部门依法许可或备案的网站经营主体。</dd>
						<dd>12.2尊重用户和消费者的合法权利，本协议及本网站上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户和消费者提供服务。本站欢迎用户和社会各界提出意见和建议，将虚心接受并适时修改本协议及本站上的各类规则。</dd>
						<dd>12.3本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请用户着重阅读。</dd>
						<dd>12.4您点击本协议下方的"同意并继续"按钮即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。</dd>
					</div>
				</div>
				<button @click="agreePro">同意并继续</button>
				<img @click="cancel" src="http://127.0.0.1:80/images/agree_close.gif" alt="取消">
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
			isAgree:false,
			isShowPro:false,
			ischeckUname:false,//定义变量设置初始值flase,验证通过改为true，所有为true验证通过
			ischeckUpwd:false,
			ischeckCpwd:false,
			ischeckEmail:false,
			trueUname:true,
			trueUpwd:true,
			trueCpwd:true,
			trueCnumber:true,
			trueEmail:true,
			trueAgree:true,
			uname:"",
			upwd:"",
			cpwd:"",
			cnumber:"",
			email:"",
			unameMsg:"",
			upwdMsg:"",
			cpwdMsg:"",
			cnumberMsg:"",
			emailMsg:"",
			proMsg:""
		}
	},
	methods:{
		showPro(){
			this.isShowPro=true;
		},
		agreePro(){
			this.isAgree=true;
			this.isShowPro=false;
		},
		cancel(){
			this.isShowPro=false;
		},
		unameFocus(){
			this.unameMsg="请输入手机号";
			this.trueUname=true;
		},
		upwdFocus(){
			this.upwdMsg="请填写密码";
			this.trueUpwd=true;
		},
		cpwdFocus(){
			this.cpwdMsg="请再次填写密码";
			this.trueCpwd=true;
		},
		cnumFocus(){
			this.cnumberMsg="请填写右图中显示的验证码";
			this.trueCnumber=true;
		},
		emailFocus(){
			this.emailMsg="请填写邮箱";
			this.trueEmail=true;
		},
		checkUname(e){//1.异步检测手机号
     this.axios.get("http://127.0.0.1:80/user/checkUname?uname="+this.uname).then(res=>{
			 	if(res.data.code==1){
				//检测手机号格式
				var reg=/^1[3-8]\d{9}$/;
				if(reg.test(this.uname)){
						this.unameMsg="该手机可以注册"
						this.ischeckUname=true;
					}else{
						this.unameMsg="请输入正确格式的手机号";
						this.ischeckUname=false;
						this.trueUname=false;
					}
				}else if(res.data.code==0){
					this.unameMsg="手机号已被占用";
					this.ischeckUname=false;
					this.trueUname=false;
				}else{
					//异步请求的结果是undefined
					this.unameMsg="手机号不能为空";
					this.ischeckUname=false;
					this.trueUname=false;
				}
		 });
		},
		//2.检测用户是否填写密码
    checkUpwd(){
      var reg=/^\w{6,20}$/;
      if(reg.test(this.upwd)){
				this.upwdMsg="";
        this.ischeckUpwd=true;
      }else{
				this.trueUpwd=false;
				this.upwdMsg="密码必须是6~20位字母、数字或下划线";
        this.ischeckUpwd=false;
      }
      //当失去焦点时如果cpwd不为空,验证两次密码是否一致
      if(this.cpwd!==""){
        this.confirmUpwd();
      }
    },
		//3.验证两次密码是否一致
    confirmUpwd(){
      var reg=/^\w{6,20}$/;
      if(!reg.test(this.cpwd)){
				this.trueCpwd=false;
				this.cpwdMsg="密码必须是6~20位字母、数字或下划线"
        this.ischeckCpwd=false;
      }else if(this.upwd==this.cpwd){
				this.trueCpwd=true;
				this.cpwdMsg="两次密码一致"
        this.ischeckCpwd=true;
      }else{
				this.trueCpwd=false;
				this.cpwdMsg="两次填写的密码必须一致"
        this.ischeckCpwd=false;
      }
    },
		//4.异步验证邮箱是否可用
    checkEmail(){
			this.axios.get("http://127.0.0.1:80/user/checkEmail?email="+this.email).then(res=>{
				if(res.data.code==1){
					//如果数据库中未查到，验证邮箱格式
					var reg=/\w+@[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)+/;
					if(reg.test(this.email)){
						this.trueEmail=true;
						this.emailMsg="邮箱可用"
						this.ischeckEmail=true;
					}else{
						this.trueEmail=false;
						this.emailMsg="请输入正确格式的邮箱";
						this.ischeckEmail=false;
					}
				}else if(res.data.code==0){
					this.trueEmail=false;
					this.emailMsg="邮箱已被占用";
					this.ischeckEmail=false;
				}else{
					this.trueEmail=false;
					this.emailMsg="邮箱不能为空";
					this.ischeckEmail=false;
				}
			})
		},
		checkPro(){
			if(!this.isAgree){
				this.trueAgree=false;
				this.proMsg="请接受服务条款";
			}else{
				this.proMsg="";
			}
		},
	  //点击按钮时判断是否可以注册，注册成功后跳转登录页面
    checkReg(){
      if(this.ischeckUname&& this.ischeckUpwd&&this.ischeckCpwd&&this.ischeckEmail&&this.isAgree){
				this.axios.post("http://127.0.0.1:80/user/register","uname="+this.uname+"&upwd="+this.upwd+"&email="+this.email).then(res=>{
					if(res.data.code==1){
						alert("注册成功");
						this.$router.push("/login");
					}
				})
      }else{
        this.checkUname();
        this.checkUpwd();
        this.confirmUpwd();
				this.checkEmail();
				this.checkPro();
      }
    }
	},
  components:{
    Footer
  }
}
</script>
<style scoped>
/*header*/
#header{
	height:110px;
	padding-top:20px;
	background:url(http://127.0.0.1:80/images/headbg.jpg) repeat-x left bottom;
}
.header1{
	height:43px;
	margin-bottom:20px;
}
.header1 a img{
	float:left;
	height:45px;
}
.header1 h1{
	float:left;
	font: normal 25px "微软雅黑";
	height:43px;
	line-height:43px;
	border-left:1px solid #c8c8c8;
	margin-left:20px;
	padding-left:20px;
}
.header2{
	width:950px;
	height:14px;
	text-align:right;
	margin:10px auto;
	font-size:14px;
}
.header2 a{
	color:#EC6A1E;
}
/*主体*/
.reg_form{
	margin-top:30px;
	float:left;
}
.reg_form table{
	width:620px;
	height:500px;
	padding-right:160px;
	border-right:1px solid #e6e6e6;
}
.reg_form table td{
	padding-right:15px;
	padding-top:10px;
	padding-bottom:20px;
}
.reg_form table tr td .text{
	width:324px;
	height:30px;
	border:1px solid #C8C8C8;
	border-radius:5px;
	outline:0;
}
#agree{
	vertical-align: middle;
}
.x_red{
	color:#f00;
	vertical-align:middle;
}
#checkCodeImg{
	vertical-align:middle;
	margin-left:15px;
}
#cnumber{
	width:116px;
}
table td .form_row{
	position:relative;
}

.showPropMsg{
	display:none;
	position:absolute;
	left:0px;
	top:115%;
	line-height:16px;
	padding-left:20px;
	background: url(http://127.0.0.1:80/images/tips_icon.png) no-repeat left bottom;
}
table td .form_row.True .checkInput{
	border-color:#C8C8C8;
}
table td .form_row.True>.showPropMsg{
	display:block !important;
	background-position-y:top !important;
}
table td .form_row.False .checkInput{
	border-color:#f00;
}
table td .form_row.False>.showPropMsg{
	display:block !important;
}
.reg_form table td.pt_10{
	padding-top:10px;
}
.reg_form table td.pb_10{
	padding-bottom:10px;
}
.reg_pro{
	color:#0376cf;
}
.reg_pro:hover{
	color:#F25221;
}
#reg_btn{
	width:320px;
	height:38px;
	background:#f25221;
	color:#fff;
	font:18px "微软雅黑";
	cursor:pointer;
	border:0;
	border-radius:5px;
	outline:0;
}
.extra_login{
	float:right;
	border:1px solid #ddd;
	border-radius:5px;
	margin-right:75px;
	margin-top:20px;
}
.extra_login a{
	width:155px;
	height:36px;
	margin:20px 35px;
	display:block;
	text-indent:-9999px;
}
.extra_login a:nth-child(1){
	background:url("http://127.0.0.1:80/images/weibo.png") no-repeat top left;
	padding-bottom:22px;
	border-bottom:1px solid #ddd;
}
.extra_login a:nth-child(2){
	background:url("http://127.0.0.1:80/images/qq.png") no-repeat top left;
}
.proFrame{
	position:fixed;
	top:0;
	left:0;
	background:rgba(0,0,0,0.5);
	/* opacity:0.5; */
	width:100%;
	height:100%;
	z-index: 100;
}
.proContent{
	position:fixed;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	background:#fff;
	width: 910px;
	height: 490px;
	border: 5px solid rgba(238,238,238,.5);
}
.proContent>h3{
	background:#EEEEEE;
	text-align: center;
	padding:5px;
}
.proContent>.mainContent{
	overflow-y:scroll;
	margin:15px 0;
	padding:0 20px;
	height:360px;
}
.proContent>button{
	display: block;
	color:#fff;
	background:#EB6122;
	width:200px;
	height:30px;
	border:0;
	outline: 0;
	margin:0 auto;
	cursor:pointer;
	border-radius:3px;
}
.proContent>img{
	position:absolute;
	top:0;
	right:0;
	cursor:pointer;
}
</style>
