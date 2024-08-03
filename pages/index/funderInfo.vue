<template>
	<view v-if="info" class="info-page bg-white position-relative">
		
		<!-- swiper轮播图 -->
		<view class="lunboList w-100">
			<mt-swiper :list="lunboList" height="350" name="url" border-radius="0" />
		</view>
		
		<!-- 正在寻找 -->
		<view class="px-2 mt-2">
			<view class="title py-2">
				<text class="left-line font-15">正在寻找</text>
			</view>
			<view class="col pb-2">
				<view class="row align-center">
					<text class="flex-shrink">投资类型：</text>
					<div class="px-1">
						<u-tag :text="info.investType===1?'个人':'公司'" type="primary" bg-color="#fff" border-color="#48A5FE" />
					</div>
				</view>
				<view class="row align-center py-1">
					<text class="flex-shrink">投资意向：</text>
					<div class="px-1">
						<u-tag :text="info.investIntent" type="primary" bg-color="#fff" border-color="#48A5FE" />
					</div>
				</view>
				<view class="row align-center">
					<text class="flex-shrink">投资规模：</text>
					<div class="px-1">
						<u-tag :text="info.investScale+'万'" type="primary" bg-color="#fff" border-color="#48A5FE" />
					</div>
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
					<!-- <view class="row align-center">
						<u-avatar size="80" :src="info.userAvatar" />
						<view class="flex-1 ml-2">
							<view class="row align-center justify-between mb-1">
								<view class="row align-center">
									<u-icon :label="info.userNickname" :name="info.userSex===1?'woman':'man'" :color="info.userSex===1?'#FF6A6A':'#2979ff'" size="24" label-pos="left" />
								</view>
								<view class="">
									<u-rate v-model="info.userStarLevel" size="24" />
								</view>
							</view>
							<view class="row align-center justify-between" style="color:#808080;">
								<view class="row align-center line-height-1 font-12">
									<text>{{info.userTitle}}</text>
									<text class="u-border-left ml-1 pl-1">{{info.userIndustry}}</text>
								</view>
								<view class="row align-center line-height-1 font-12">
									<text class="mr-1">{{info.province+info.city}}</text>
									<u-icon name="map" color="#808080" size="24" />
								</view>
							</view>
						</view>
					</view> -->
				</div>
			</view>
		</view>
		
		<!-- 具体需求 -->
		<view class="px-2 mt-2 u-border-top">
			<view class="title py-2">
				<text class="left-line font-15">具体需求</text>
			</view>
			<view class="pb-1 pl-15">
				<view class="font-15">
					<!-- <u-input v-model="info.specificRequirement" :disabled="true" 
						:custom-style="{fontSize:'30rpx'}" :maxlength="-1"
						:auto-height="true" placeholder="" type="textarea" /> -->
					<html-text :html="info.specificRequirement" />
				</view>
				<!-- <view class="row align-center font-13 mt-1">
					<text class="u-content-color">联系方式：</text>
					<text class="text-primary mr-1">{{info.phoneNumber}}</text>
					<text style="color:#EF5859">(需消耗10个D币)</text>
					<text class="text-primary ml-1">D币充值</text>
				</view> -->
				<view class="row align-center font-13 mt-1">
					<text class="mr-1 u-content-color">联系方式：</text>
					<text v-if="info.contactAuthFlag" class="flex-1 font-14 font-weight-500 mr-1">{{info.phoneNumber}}</text>
					<view v-else class="row align-center flex-1">
						<text @click="showModel=true" class="font-14 text-primary mr-1 underline">{{info.phoneNumber}}</text>
						<text class="mr-1 font-12" style="color:#EF5859">(需消耗10个D币)</text>
					</view>
					<u-button @click="goRechargePage()" shape="circle" type="primary" :custom-style="{height:'60rpx',width:'150rpx',fontSize:'26rpx'}" plain>D币充值</u-button>
				</view>
			</view>
		</view>
		
		<!-- 评论列表 -->
		<view class="mt-2 u-border-top">
			<comment-list :tid="id" type="4" :collect="info.favoritesFlag" />
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
					需耗10D币
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
				info: null,
				showModel:false,
				lunboList: [],
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
			},
			initShareData(){
				const queryData = {
					changeType: 3,
					targetId: this.id,
					shareUserId: this._userInfo.userId,
					pagePath: `/pages/index/funderInfo`,
					pageId: this.id
				}
				console.log('queryData',queryData)
				let shareData = {
					title: '寻找资金方', // 默认为小程序名称
					path: `/pages/common/share?q=${JSON.stringify(queryData)}`, // 默认为当前页面路径
					imageUrl: '' // 默认为当前页面的截图
				}
				this.$u.mpShare = shareData
			},
			// 获取详情数据
			getDataInfo() {
				this.$api.getFunderInfo(this.id).then(res => {
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
					changeType: 3,
					targetId: this.id
				}
				this.$api.showPhone(data).then(res => {
					this.showModel = false
					this.getDataInfo()
				})
			},
			btnShowPhone(){
				let data = {
					changeType: 3,
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
				// this.$u.route('pages/mine/recharge')
				this.$u.route('pages/mine/luckyWheel')
			},
			// 跳转详情页面
			goPartnerPage() {
				this.$u.route('pages/index/partnerInfo')
			},
			// 跳转申请参加页面
			goJoinPage() {
				this.$u.route('pages/admin/partner/join')
			},
			// 跳转想参加的人页面
			goJoinerPage() {
				this.$u.route('pages/index/partnerJoiner')
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
