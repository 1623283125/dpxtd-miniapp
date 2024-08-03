<template>
	<view class="login-page px-5">
		<view class="y-center" style="padding:50rpx 0rpx;">
			<image class="logo radius-20" src="/static/logo.jpeg" style="width: 200rpx;height: 200rpx;"></image>
			<view class="x-center mt-1 font-20 font-weight-bold">
			   地平线跳动             
			</view>
		</view>
		<view v-if="isWxAuth" class="login-wrap">
			<view class="login-msg py-3 col u-border-top">
				<text class="font-14">为了给您提供更好的服务，请授权以下权限</text>
				<view class="mt-3">
					<text class="font-12 mr-2" style="color:#999">•</text>
					<text class="font-12" style="color:#999">获取您的手机号码，以便为您提供更优质的会员服务</text>
				</view>
				<view class="mt-1">
					<text class="font-12 mr-2" style="color:#999">•</text>
					<text class="font-12" style="color:#999">使用手机号码登录方便快捷，确保账户安全防止盗用</text>
				</view>
			</view>
			<view class="mt-3">
				<u-button open-type="getPhoneNumber" @getphonenumber="btMobileAuthLogin" type="primary" :custom-style="{background:'#48A5FE',fontSize:'30rpx'}">手机号快捷登录</u-button>
			</view>
			<view class="mt-3">
				<u-button type="info" plain :custom-style="{background:'#F7F7F7',color:'#999',fontSize:'30rpx',opacity:0.5}" @click="goHomePage()">暂不登录再看看</u-button>
			</view>
		</view>
		<view v-else class="login-wrap u-border-top">
			<u-form :model="form" ref="uForm" label-width="140">
				<u-form-item label="账号">
					<u-input v-model="form.username" type="number" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label="密码">
					<u-input v-model="form.password" placeholder="请输入密码" />
				</u-form-item>
				<u-form-item v-show="isRegister" label="确认密码">
					<u-input v-model="form.password1" placeholder="请再次输入密码" />
				</u-form-item>
				<view @click="btnShowRegister" v-show="!isRegister" class="font-14 row items-center justify-end">
					<text class="py-2 font-weight-600">没有账号？立即注册 ></text>
				</view>
				<view @click="btnShowLogin" v-show="isRegister" class="font-12 row items-center justify-end">
					<text class="py-2 font-weight-600">去登录 ></text>
				</view>
				<view class="row items-center flex-wrap font-14 py-1">
					<u-checkbox-group>
						<u-checkbox v-model="isAgree" name="toAgree" activeColor="#48A5FE" icon-size="30" size="34" />{{isRegister?'注册':'登录'}}后表明您已阅读并同意</u-checkbox>
					</u-checkbox-group>
					<text style="color:#1890ff">《用户隐私协议》</text>和
					<text style="color:#1890ff">《地平线跳动服务协议》</text>
				</view>
				<view class="mt-5 pt-5">
					<u-button :disabled="!isAgree" @click="btLogin" type="primary" :custom-style="{background:'#48A5FE',fontSize:'30rpx'}">{{isRegister?'注册':'登录'}}</u-button>
				</view>
			</u-form>
		</view>
		<!-- 微信隐私弹窗协议 -->
		<!-- #ifdef MP-WEIXIN -->
		<wxxy-agree-privacy />
		<!-- #endif -->	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isReload:false,
				isWxAuth:false,
				isAgree:false,
				isRegister:false,
				model: {
					wxOpenId:'',
					sessionKey:'',
					userName:'',
					password:''
				},
				form:{
					username: '',
					password: '',
					password1: ''
				}
			}
		},
		onLoad(opt) {
			if(opt&&opt.reload==='ok'){
				this.isReload = true
			}
			this.initData()
		},
		methods: {
			// 登录
			initData(){
				if(this.isWxAuth){
					this.getWxCode()
				}
			},
			btnShowRegister(){
				this.isRegister = true
			},
			btnShowLogin(){
				this.isRegister = false
			},
			// 手机号密码登陆
			btLogin(){
				console.log('data',this.form)
				if(!this.form.username){
					this.$u.toast('手机号码不能为空')
					return
				}
				if(!this.$u.test.mobile(this.form.username)){
					this.$u.toast('请输入正确的手机号')
					return 
				}
				if(!this.form.password){
					this.$u.toast('登录密码不能为空')
					return 
				}
				if(this.isRegister){
					if(this.form.password!==this.form.password1){
						this.$u.toast('两次密码不一致')
						return 
					}
					this.$api.register(this.form.username,this.form.password).then(res=>{
						console.log('register-data',res)
						this.$u.toast(res.data)
						this.isRegister = false
					})
				}else{
					this.$api.login(this.form.username,this.form.password).then(res=>{
						console.log('login-data',res)
						this.$u.toast('登录成功')
						this.$u.vuex('_token', res.data)
						this.reloadData()
					})
				}
			},
			// 手机号授权登陆
			btMobileAuthLogin(e){
				const res = e.detail
				if (res.errMsg == 'getPhoneNumber:ok') { 
					const data = {
						iv:res.iv,
						nickname:`微信用户${this.wxOpenId}`,
						wxOpenId:this.wxOpenId,
						sessionKey:this.sessionKey,
						encryptedData:res.encryptedData
					}
					console.log('data',res,data)
					this.$api.wxLogin(data).then(res=>{
						this.$u.vuex('_token', res.data.token)
						this.reloadData()
					})
				}                             
			},
			// 刷新上个页面的数据
			reloadData(delta=1,timeout=50){
				const pages = getCurrentPages()
				const page = pages[pages.length - 2]
				page.$vm.initData()
				setTimeout(()=>{
					uni.navigateBack({
						delta
					})
				},timeout)
			},
			// 微信登录获取Code
			getWxCode() {
				uni.login({
					provider: 'weixin',
					success: ret => {
						const code = ret.code;
						if (code) {
							console.log('1:获取用户登录凭证：' + code);
							this.$api.getWxOpenId(code).then(res=>{
								this.wxOpenId = res.data.openId
								this.sessionKey = res.data.sessionKey
								this.getUserInfo()
							})
						} else {
							console.log('1:获取用户登录态失败：' + res.errMsg);
						}
					}
				})
			},
			// 获取微信用户信息
			getUserInfo() {
				// 查看是否授权
				wx.getSetting({
					success: (res)=>{
						console.log('success:getSetting',res)
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							wx.getUserInfo({
								success: (res)=> {
									console.log('userInfo',res.userInfo)
								}
							})
						}
					},
					fail:(err)=>{
						console.log('fail:getSetting',err)
					}
				})
			},
			// 跳转首页
			goHomePage() {
				// this.$u.route({
				// 	type:'tab',
				// 	url:'pages/index/index'
				// })
				uni.navigateBack({
					delta:2
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff;
	}
	.login-page {
		
	}
</style>
