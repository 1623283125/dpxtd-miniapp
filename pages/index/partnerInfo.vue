<template>
	<view v-if="info" class="info-page bg-white position-relative">
		
		<!-- swiper轮播图 -->
		<view class="lunboList w-100">
			<mt-swiper :list="lunboList" height="350" name="url" border-radius="0" />
		</view>
		<view class="row align-center font-14 text-white p-1" style="background: rgba(0,0,0,0.6);">
			<view class="mr-4">
					预筹：<text class="font-18 font-weight-bold">{{info.intendAmount}}</text>万
			</view>
			<view class="flex-1">
				已筹：<text class="font-18 font-weight-bold">{{info.alreadyAmount}}</text>万
			</view>
			<text>截止：{{$u.timeFormat(info.deadline, 'yyyy-mm-dd')}}</text>
		</view>
		
		<!-- 正在寻找 -->
		<view class="px-2 mt-2">
			<view class="title py-2">
				<text class="left-line font-15">正在寻找</text>
			</view>
			<view class="row">
				<view class="tags flex-1 row flex-wrap pl-15" style="margin:0 -10rpx 10rpx;">
					<div v-for="(item,i) in info.lookFor.split(',')" :key="i" class="px-1 mb-2">
						<u-tag :text="item" type="primary" bg-color="#fff" border-color="#48A5FE" />
					</div>
				</view>
				<view class="col align-center mb-1" style="flex-shrink: 0;">
					<text class="font-12">回报方式</text>
					<text class="font-18 font-weight-500" style="color:#E48A20;">{{info.returnMethod}}</text>
				</view>
			</view>
		</view>
		
		<!-- 发布者 -->
		<view class="px-2 u-border-top">
			<view class="title py-2">
				<text class="left-line font-15">发布者</text>
			</view>
			<view class="list-wrap bg-white radius-10 pl-15">
				<div class="py-1">
					<user-card :user="info.user" :showContent="false" :showTags="false" />
					<view class="content">
						<view class="mt-2 font-15">
							{{info.title}}
						</view>
						<view class="tags row flex-wrap" style="margin: 10rpx -10rpx 0;">
							<div v-for="(label,x) in info.label.split(',')" :key="x" class="px-1 mt-2">
								<u-tag :text="label" type="info" size="mini" border-color="transparent" />
							</div>
						</view>
					</view>
				</div>
			</view>
		</view>
		
		<!-- 具体需求 -->
		<view class="px-2 mt-2 u-border-top">
			<view class="title py-2">
				<text class="left-line font-15">具体需求</text>
			</view>
			<view class="content pb-1 pl-15">
				<view class="font-15">
					<html-text :html="info.content" />
				</view>
				<view class="row align-center font-13 mt-1">
					<view class="">
						<view class="row align-center">
							<text class="mr-1 u-content-color">联系人：</text>
							<text class="font-14 flex-1 mr-1">{{info.contact}}</text>
						</view>
						<view class="row align-center">
							<text class="mr-1 u-content-color">联系方式：</text>
							<text v-if="info.contactAuthFlag" @click="btnCallPhone()" class="font-14 flex-1 font-weight-500 text-primary mr-1">{{info.contactInfo}}</text>
							<view v-else class="row align-center flex-1">
								<text @click="showModel = true" class="font-14 text-primary mr-1 underline">{{info.contactInfo}}</text>
								<text class="mr-1 font-12" style="color:#EF5859">(需消耗{{info.viewPayAmount}}个D币)</text>
							</view>
						</view>
					</view>
					<u-button @click="goRechargePage()" shape="circle" type="primary" :custom-style="{height:'60rpx',width:'150rpx',fontSize:'26rpx'}" plain>D币充值</u-button>
				</view>
			</view>
		</view>
		
		<!-- 感兴趣的人 -->
		<view v-if="joinData" class="px-2 mt-2 u-border-top">
			<view class="title py-2">
				<text class="left-line font-15">感兴趣的人</text>
			</view>
			<view class="row align-center" style="padding-left:25rpx;">
				<view @click="goJoinerPage()" class="row align-center">
					<div v-for="(item,i) in joinData.list" :key="i" class="x-center" style="margin-left:-10rpx;">
						<u-avatar size="60" :src="item.userAvatar" />
					</div>
					<div v-if="joinData.list.length===0" class="x-center" style="margin-left:-10rpx;">
						<u-avatar size="60" src="" />
					</div>
				</view>
				<text v-if="joinData.list.length>0" class="ml-1 flex-1 font-13">（{{joinData.count}}人）</text>
				<text v-else class="ml-1 flex-1 u-tips-color font-12">等待参与</text>
				<view @click="goJoinPage()" class="x-center text-white radius-30 font-13" style="background:#FFAF6C;width:150rpx;height:60rpx">
					<view style="margin-right:4rpx;">
						<u-icon name="plus" color="#fff" size="26" />
					</view> 想参加
				</view>
			</view>
		</view>
		
		<!-- 评论列表 -->
		<view class="mt-2 u-border-top">
			<comment-list :tid="id" type="1" :collect="info.favoritesFlag" />
		</view>
		
		<!-- 底部预留空间 -->
		<footer-arear />
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu />
		
		<!-- 联系方式弹窗 -->
		<u-popup v-model="showModel" mode="center" :mask-close-able="false" borderRadius="16" z-index="99">
			<view class="py-3 px-3" style="width: 650rpx;">
				<view class="font-15 font-weight-500 x-center my-3 pt-5">
					查看电话号码
				</view>
				<view class="font-22 x-center mb-5" style="color: red;">
					需耗{{info.viewPayAmount}}D币
				</view>
				<view class="row align-center justify-between px-5 pt-3">
					<view @click="btnShowPhone()" class="py-2 x-center radius-10" style="width: 230rpx;background:#39AD5D;color:#fff">确定</view>
					<view @click="showModel=false" class="py-2 x-center radius-10" style="width: 230rpx;background:#F1F1F2;color:#39AD5D">取消</view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				info:null,
				showModel:false,
				lunboList: [],
				joinData:{
					count:0,
					list:[]
				}
			}
		},
		onLoad(opt) {
			this.id = opt.id||''
			this.initData()
		},
		methods: {
			// 初始化数据
			initData() {
				this.getDataInfo()
				this.getJoinData()
			},
			initShareData(){
				const queryData = {
					changeType: 1,
					targetId: this.id,
					shareUserId: this._userInfo.userId,
					pagePath: `/pages/index/partnerInfo`,
					pageId: this.id
				}
				let shareData = {
					title: this.info.title||'地平线跳动', // 默认为小程序名称
					path: `/pages/common/share?q=${JSON.stringify(queryData)}`, // 默认为当前页面路径
					imageUrl: '' // 默认为当前页面的截图
				}
				this.$u.mpShare = shareData
			},
			// 获取详情数据
			getDataInfo() {
				this.$api.getPartnerInfo(this.id).then(res => {
					this.getLunboData(res.data)
					let info = res.data
					info.user = {
						id:info.userId,
						name:info.userNickname,
						sex: info.userSex,
						avatar: info.userAvatar,
						rate: +info.userStarLevel,
						content: '',
						city: info.city,
						province: info.province,
						userTitle: info.userTitle,
						industry: info.industry,
						userIndustry: info.userIndustry,
						tags: []
					}
					this.info = info
					this.initShareData()
				})
			},
			btnCallPhone(){
				uni.makePhoneCall({
				  phoneNumber: this.info.contactInfo,
				  success: function() {
				    console.log('拨打电话成功');
				  },
				  fail: function(error) {
				    console.log('拨打电话失败:', error);
				  }
				});
			},
			// 获取参加数据
			getJoinData() {
				this.$api.getJoinPartner(this.id).then(res => {
					this.joinData = res.data
				})
			},
			// 组装轮播数据
			getLunboData(data){
				let lunboList = []
				let {image,video} = data
				if(!this.$u.test.isEmpty(video)){
					let videos = video.split(',').map(v=>({
						url:v,
						type:'video'
					}))
					lunboList = [...videos]
				}
				if(!this.$u.test.isEmpty(image)){
					let images = image.split(',').map(v=>({
						url:v,
						type:'image'
					}))
					lunboList = [...lunboList,...images]
				}
				this.lunboList = lunboList
				console.log('lunboList',this.lunboList)
			},
			// 查看手机号码
			btnShowPhone(){
				console.info('用户点击确定');
				let data = {
					changeType: 1,
					targetId: this.id
				}
				this.$api.showPhone(data).then(res => {
					this.showModel = false
					this.getDataInfo()
				})
			},
			btnShowPhone1(){
				let data = {
					changeType: 1,
					targetId: this.id
				}
				uni.showModal({
					title: '需消耗10个D币',
					content: '确定要查看联系方式吗？',
					success: (res)=> {
						if (res.confirm) {
							console.info('用户点击确定');
							this.$api.showPhone(data).then(res => {
								this.getDataInfo()
							})
						} else if (res.cancel) {
							console.info('用户点击取消');
						}
					}
				})
			},
			// 充值页面
			goRechargePage(){
				// this.$u.toast('暂未开放，敬请期待')
				// return
				// this.$u.route('pages/mine/recharge')
				this.$u.route('pages/mine/luckyWheel')
			},
			// 跳转个人页面
			goUserProfile() {
				this.$u.route('pages/index/userProfile')
			},
			// 跳转申请参加页面
			goJoinPage() {
				this.$u.route('pages/admin/partner/join',{
					type: '1',
					id: this.id,
					uid: this.info.userId
				})
			},
			// 跳转想参加的人页面
			goJoinerPage() {
				this.$u.route('pages/index/partnerJoiner',{
					type: '1',
					id: this.id
				})
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('pages/admin/partner/add')
			},
			// 搜索
			btnSearch(i) {
				if(!this.keyword){
					this.$u.toast('输入搜索关键字')
					return 
				}
				this.$refs.paging.reload()
			},
		}
	}
</script>

<style lang="scss">
	page,uni-page-body{
		height: 100%;
	}
	.pl-15{
		padding-left: 15rpx;
	}
	.left-line {
		padding-left: 15rpx;
		position: relative;
		// font-weight: 500;
		&:before{
			content:'';
			position: absolute;
			height: 75%;
			width: 0px;
			top:50%;
			left:0rpx;
			transform: translateY(-50%);
			border-radius: 3px;
			border-left: 3px solid #48A5FE;
		}
	}
	.underline{
		text-decoration: underline;
	}
</style>
