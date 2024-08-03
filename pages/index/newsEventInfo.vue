<template>
	<view v-if="info" class="info-page bg-white position-relative">
		 
		<!-- swiper轮播图 -->
		<view class="lunboList w-100">
			<mt-swiper :list="lunboList" height="350" name="url" border-radius="0" />
		</view>
		
		<!-- 大赛标题 -->
		<view class="px-2">
			<view class="title py-2 row align-center justify-between">
				<text class="left-line1 font-15 font-weight-500">{{info.title}}</text>
			</view>
			<view class="pb-3 pl-15">
				<view class="row align-center justify-between py-2">
					<view class="font-14" style="margin-left: -10rpx;transform: scale(1);">
						<u-steps :list="stepsList" :current="stepsIndex" fontSzie="30" />
					</view>
					<view class="font-12 radius-4 line-height-1 px-2 py-1" style="color:#48A5FE;border:1rpx solid #48A5FE;">
						{{info.tips}}
					</view>
				</view>
				<view class="font-13" style="color:#808080;">
					  大赛起止：{{getMatchTime(2)}}
				</view>
			</view>
		</view>
		
		<!-- 大赛详情 -->
		<view class="px-2 u-border-top">
			<view class="title py-2 row align-center justify-between">
				<text class="left-line font-15">大赛详情</text>
			</view>
			<view class="pb-1 pl-15 font-15">
				<view class="w-100 mb-1">
					<text class="color2">主办单位：</text>{{info.hostUnit}}
				</view>
				<view class="w-100 mb-1">
					<text class="color2">协办单位：</text>
					{{info.assistUnit}}
				</view>
				<view class="w-100 mb-1">
					<text class="color2">报名时间：</text>
					{{getMatchTime(1)}}
				</view>
				<view class="w-100 mb-1">
					<text class="color2">联 系 人 ：</text>
					{{info.contactName}}
				</view>
				<view class="w-100 mb-1">
					<text class="color2">联系电话：</text>
					{{info.phoneNumber}}
				</view>
				<view class="w-100 mb-1">
					<text class="color2">联系邮箱：</text>
					{{info.wxNumber}}
				</view>
				<view class="w-100 mb-1">
					<text class="color2">大赛地址：</text>
					{{info.address}}
				</view>
			</view>
		</view>
		
		<!-- 大赛描述 -->
		<view class="px-2 u-border-top">
			<view class="title py-2 row align-center justify-between">
				<text class="left-line font-15">大赛描述</text>
			</view>
			<view class="font-15 mt-2 pl-15">
				<html-text :html="info.content" />
			</view>
		</view>
		
		<!-- 最新报名 -->
		<view class="px-2 mt-3 u-border-top">
			<view class="title py-3 row align-center justify-between position-relative">
				<text class="left-line font-15">最新报名</text>
				<text v-if="joinList.length>0" class="font-13">更多></text>
				<view @click="goJoinEventPage()" class="y-center position-absolute font-12 radius-10 line-height-1 px-2 py-1" style="background:#48A5FE;color:#fff;top:-38rpx;right: 0;z-index: 2;" :style="{top:joinList.length>0?'-38rpx':'44rpx'}">
					<text class="font-12">我要报名</text>
					<text class="font-10" style="margin-top:4rpx;">
						{{$u.timeFormat(info.applicationTimeEnd, 'yyyy-mm-dd')}}截止
					</text>
				</view>
			</view>
			<view class="row align-center justify-between">
				<view v-if="joinList.length===0" class="ml-1 flex-1 u-tips-color font-12">
					等待参与
				</view>
				<div @click="goUserProfile()" v-for="(item,i) in joinList" :key="i" class="y-center">
					<u-avatar size="88" :src="item.userAvatar" />
					<text class="font-13">{{item.name}}</text>
					<!-- <text class="font-12">{{$u.timeFormat(info.applicationTimeEnd, 'mm-dd')}}</text> -->
				</div>
			</view>
			
		</view>
		
		<!-- 评论列表 -->
		<view class="mt-2 u-border-top">
			<comment-list :tid="id" type="6" :collect="info.favoritesFlag" />
		</view>
		
		<!-- 底部预留空间 -->
		<footer-arear />
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu />
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				type:'',
				info:null,
				lunboList: [],
				stepsIndex:0,
				stepsList:[
					{
						name: '报名中'
					}, {
						name: '比赛中'
					}, {
						name: '赛事完'
					}
				],
				joinList:[]
			}
		},
		onLoad(opt) {
			this.id = opt.id||''
			this.type = opt.type||'match'
			this.initData()
		},
		methods: {
			// 初始化数据
			initData() {
				this.getMatchInfo()
				this.getJoinData()
			},
			// 获取详情数据
			getMatchInfo() {
				let fn = this.type==='match'?'getMatchInfo':'getHsljInfo'
				this.$api[fn](this.id).then(res => {
					const {matchStatus} = res.data
					this.stepsIndex = matchStatus-1
					this.getLunboData(res.data)
					this.info = res.data
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
			// 获取参加数据
			getJoinData() {
				this.$api.getJoinMatch(this.id).then(res => {
					this.joinList = res.data
				})
			},
			// 跳转报名页面
			goJoinEventPage() {
				this.$u.route('pages/admin/news/joinEvent',{
					id: this.id,
					uid: this.info.userId,
					title: this.info.title
				})
			},
			// 跳转个人页面
			goUserProfile() {
				this.$u.route('pages/index/userProfile')
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
			// 赛事时间
			getMatchTime(type) {
				const {applicationTimeStart:start1,applicationTimeEnd:end1,
					holdingTimeStart:start2,holdingTimeEnd:end2} = this.info
				let start = type===1?start1:start2
				let end = type===1?end1:end2
				const startDt = this.$u.timeFormat(start, 'yyyy-mm-dd')
				const endDt = this.$u.timeFormat(end, 'yyyy-mm-dd')
				return `${startDt} 至 ${endDt}`
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
		font-weight: 500;
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
</style>
