<template>
	<view class="mine-page">
		
		<!-- 自定义导航栏 -->
		<u-navbar :title-color="titleColor" :is-back="false" :border-bottom="false" title="我的" :background="{background:'#48A5FE'}"></u-navbar>
		
		<!--  用户信息 -->
		<view style="background:#48A5FE;color:#fff">
			<!-- <image style="width: 750rpx;height: 512rpx;position: absolute;left: 0;top:0;z-index: 1;" src="/static/images/mine-bg.png"></image> -->
			<!-- 用户基本信息 -->
			<div class="user-wrap px-3 row py-2">
				<u-avatar @click="goMyProfilePage()" size="120" :src="_userInfo.avatar" />
				<view class="flex-1 ml-2 col justify-center">
					<view class="row align-center justify-between">
						<view class="row align-center font-18">
							<text>{{_userInfo.nickName}}</text>
							<view class="ml-2" style="margin-top: -6rpx;">
								<u-rate v-model="_userInfo.userLevel" size="24" active-color="#F3D958" inactive-color="#CCCCCC" :plain="true" disabled />
							</view>
						</view>
						<view @click="goSettingPage()" class="x-center">
							<u-icon name="setting" color="#fff"  size="40" />
						</view>
					</view>
					<view class="font-13">
						推荐码：{{_userInfo.code}}
					</view>
					<!-- <view class="row align-center font-13">
						<text class="mr-4">关注 99</text>
						<text class="mr-4">被关注 99</text>
						<text>访客 999</text>
					</view> -->
				</view>
			</div>
			<view style="height:120rpx;"></view>
			<!-- 用户操作按钮 -->
			<!-- <view class="action-wrap">
				<view class="row align-center pb-2">
					<view class="y-center flex-1">
						<text class="font-18">888</text>
						<text class="font-12" style="color:#E4EEFF">被关注</text>
					</view>
					<view class="line-border" />
					<view class="y-center flex-1">
						<text class="font-18">66</text>
						<text class="font-12" style="color:#E4EEFF">关注</text>
					</view>
					<view class="line-border" />
					<view class="y-center flex-1">
						<text class="font-18">999</text>
						<text class="font-12" style="color:#E4EEFF">访客</text>
					</view>
					<view class="line-border" />
					<view class="y-center flex-1">
						<text class="font-18">10000</text>
						<text class="font-12" style="color:#E4EEFF">积分</text>
					</view>
				</view>
			</view> -->
			
		</view>
		
		<!-- 会员卡片 -->
		<view class="vip-wrap px-2 mt-2" style="margin-top:-110rpx;">
			<view @click="goRechargePage()" class="radius-16 row align-center">
				<image src="/static/images/vip-card.png" style="width:710rpx;height:224rpx;" mode="widthFix" />
			</view>
		</view>
		
		<!-- 导航菜单 -->
		<view class="cell-group px-2 mt-2">
			<view class="bg-white radius-10 overflow-hidden">
				<u-cell-group :border="false">
					<u-cell-item @click="goPage('pages/mine/starAuth')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="开通星级会员" />
					<u-cell-item @click="goPage('pages/mine/starTask')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="星级任务" value="任务奖励待领取" />
					<u-cell-item @click="goPage('pages/mine/wallet')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="我的钱包" />
					<u-cell-item @click="goPage('pages/mine/myJoin')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="我的参与" />
					<u-cell-item @click="goPage('pages/mine/myPublish')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="我的发布" />
					<u-cell-item @click="goPage('pages/mine/myCollect')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="我的收藏" />
					<u-button open-type="share" :custom-style="{background:'transparent',border:'none',padding:0,height:'106rpx'}" :hair-line="false">
					<view class="w-100 h-100">
						<view class="h-100 row align-center justify-between px-3 u-border-bottom">
							<text class="font-15 flex-1 text-left" style="color:#606266;">分享地平线</text>
							<text class="font-13 mr-1" style="color:#909399;">送积分</text>
							<u-icon name="arrow-right" color="#909399" size="28" />
						</view>
					</view>
					</u-button>
					<!-- <u-cell-item @click="btnShare()" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="分享地平线" value="送积分" /> -->
					<u-cell-item @click="goPage('pages/mine/kefu')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="在线客服" />
					<u-cell-item @click="goPage('pages/mine/help')" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="帮助中心" />
				</u-cell-group>
			</view>
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
				isBus:0,
				scrollTopH: 80,
				titleColor:'transparent'
			}
		},
		onLoad() {
			this.initShareData()
			uni.$on('ReloadUserData',()=>{
				this.getUserInfo()
			})
		},
		onShow(){
			if(!this._token){
				// this.$u.route('/pages/common/login')
			}else{
				!this._userInfo.userId && this.getUserInfo()
			}
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
				this.getUserInfo()
			},
			initShareData(){
				const queryData = {
					changeType: -1,
					targetId: 0,
					shareCode: this._userInfo.code,
					shareUserId: this._userInfo.userId,
					pagePath: `/pages/index/index`,
					pageId: 0
				}
				let shareData = {
					title: '地平线跳动', // 默认为小程序名称
					path: `/pages/common/share?q=${JSON.stringify(queryData)}`, // 默认为当前页面路径
					imageUrl: '' // 默认为当前页面的截图
				}
				this.$u.mpShare = shareData
			},
			// 获取用户信息
			getUserInfo(){
				this.$api.getUserInfo().then(res=>{
					this.setUserInfo(res.data)
				})
			},
			// 设置用户信息
			setUserInfo(data){
				const userInfo = {
					userId: data.id,
					nickName: data.userNickname,
					userName: data.username,
					userLevel: parseInt(data.userStarLevel||0),
					phone: data.phone,
					avatar: data.userAvatar,
					gender: data.userSex,
					remark: data.selfIntroduction,
					openId: data.openId,
					code:data.extendCode
				}
				this.$u.vuex('_userInfo', userInfo)
			},
			// 个人信息
			goMyProfilePage(){
				this.$u.route('pages/mine/myProfile')
			},
			// 充值页面
			goRechargePage(){
				// this.$u.toast('暂未开放，敬请期待')
				// return
				// this.$u.route('pages/mine/recharge')
			},
			// 跳转页面
			goPage(page){
				this.$u.route(page)
			},
			// 设置页面
			goSettingPage(){
				this.$u.route('pages/mine/setting')
			},
			// 退出登录
			btnLogout(){
				this.$u.vuex('_token', '')
				this.$u.toast('已安全退出登录')
			}
		}
	}
</script>

<style lang="scss">
	.mine-page{
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
		.cell-group ::v-deep .u-default-hover{
			background-color: #f7f8f9 !important;
		}
	}
</style>
