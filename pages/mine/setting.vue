<template>
	<view class="setting-page">
		<!-- 导航菜单 -->
		<view class="mt-1">
			<!-- <view class="bg-white overflow-hidden">
				<u-cell-group :border="false">
					<u-cell-item @click="goPage('/pages/mine/starAuth')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="绑定手机号" />
					<u-cell-item @click="goPage('/pages/mine/orderList')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="绑定邮箱" />
					<u-cell-item @click="goPage('/pages/mine/project')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="修改密码" />
					<u-cell-item @click="goPage('/pages/mine/publish')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="忘记密码" />
				</u-cell-group>
			</view> -->
			<view v-if="_token" @click="btnLogout()" class="bg-white x-center mt-1 py-3">
				退出当前账号
			</view>
			<view v-else @click="btnLoin()" class="bg-white x-center mt-1 py-3">
				登录账号
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBus:0,
				scrollTopH: 80,
				titleColor:'transparent',
				userInfo:{
					userId:'',
					avatar:'',
					nickname:'',
					rate:0,
					remark:'您还没有填写自我介绍哦~'
				}
			}
		},
		onLoad() {
			// this.getUserInfo()
		},
		onShow(){
			// this.getUserInfo()
		},
		onPageScroll(obj) {
			const height = this.scrollTopH
			const scrollTop = obj.scrollTop
			// console.log('obj',obj)	
			if (scrollTop > height) {
				this.titleColor = '#fff'
			} else {
				this.titleColor = 'transparent'
			}
		},
		methods: {
			initData(){
				uni.navigateBack()
			},
			reloadData(){
				this.getUserInfo()
			},
			// 获取用户信息
			getUserInfo(){
				this.$api.getUserInfo().then(res=>{
					this.userInfo = res.data
					this.isBus = res.data.busId
				})
			},
			// 跳转页面
			goPage(page){
				return 
				this.$u.route(page)
			},
			// 经销商注册
			goApplyBusPage(){
				// return 
				if(this.isBus){
					this.$u.toast('你已经是经销商')
				}else{
					this.$u.route('/pages/mine/applyBus')
				}
			},
			goQrcodePage(){
				this.$u.route('/pages/mine/qrcode')
			},
			btnLoin(){
				this.$u.route('/pages/common/login')
			},
			// 退出登录
			btnLogout(){
				this.clearUserInfo()
				this.$u.toast('已安全退出登录')
				this.$u.route({
					type:'tab',
					url:'/pages/index/index'
				})
			},
			// 用户信息
			clearUserInfo(){
				const userInfo = {
					userId: '',
					userName: '',
					nickName:'未登陆用户',
					userLevel: 0,
					phone: '',
					avatar: '',
					gender: 0,
					remark: '',
					code:''
				}
				this.$u.vuex('_token', '')
				this.$u.vuex('_userInfo', userInfo)
			},
		}
	}
</script>

<style lang="scss">
	.setting-page{
		.line-border{
			width: 1rpx;
			height: 50rpx;
			background:linear-gradient(0deg,rgba(203,225,255,0),#CBE1FF,rgba(203,225,255,0));
		}
		.line-border2{
			width: 1rpx;
			height: 80rpx;
			background:linear-gradient(0deg,rgba(203,225,255,0),#EEF2FF,rgba(203,225,255,0));
		}
	}
</style>
