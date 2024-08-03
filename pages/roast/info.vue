<template>
	<view v-if="info" class="info-page bg-white position-relative">
		
		<!-- swiper轮播图 -->
		<!-- <view class="lunboList w-100">
			<mt-swiper :list="lunboList" height="350" name="url" border-radius="0" />
		</view> -->
		
		<!-- 发布者 -->
		<view class="bg-white p-2">
			<view class="row align-center">
				<view @click="goUserProfilePage(item)" class="y-center">
					<u-avatar size="80" :src="info.user.avatar"
						:sex-bg-color="info.user.sex===0?'#FFDEDE':'#C2ECFE'"
						:show-sex="showSex(info.user)" 
						:sex-icon="`/static/images/sex-${info.user.sex}.png`" />
				</view>
				<view class="flex-1 ml-2 u-line-1">
					<view class="row align-center justify-between">
						<view class="row align-center u-line-1">
							<text class="font-15 u-line-1 mr-1 font-weight-500">{{info.user.name}}</text>
							<view class="x-center" style="transform:scale(0.8);">
								<u-rate v-model="info.user.rate" size="32" 
									active-color="#F3D958" disabled />
							</view>
						</view>
						<!-- <view class="x-center tab-extend">
							<u-icon name="more-dot-fill" color="#808080" size="32" />
						</view> -->
					</view>
					<view class="row align-center color3">
						<text class="font-12">{{info.createDate}}</text>
						<text class="font-12 ml-3">来自{{info.comeFrom}}</text>
					</view>
				</view>
			</view>
			<div v-if="false" class="w-100"> 
				<user-card :user="info.user" :showContent="false" :showTags="false" />
				<!-- <u-avatar size="70" :src="info.userAvatar" />
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
							<text>{{info.userTitle||'-'}}</text>
							<text class="u-border-left ml-1 pl-1">{{info.userIndustry||'-'}}</text>
						</view>
						<view class="row align-center line-height-1 font-12">
							<text class="mr-1">{{info.comeFrom}}</text>
							<u-icon name="map" color="#808080" size="24" />
						</view>
					</view>
				</view> -->
			</div>
		</view>
		
		<!-- 内容区域 -->
		<view class="px-2 pb-1">
			<view class="font-16 font-weight-500 pt-2">
				{{info.title}}
			</view>
			<view class="font-15 mt-2">
				<html-text :html="info.content" />
			</view>
			<!-- 图片/视频 -->
			<view class="row flex-wrap" style="margin:30rpx -5rpx;">
				<div @click="btnViewImg(lunboList,i)" style="padding:5rpx;" 
					v-for="(item,i) in lunboList" :key="i">
					<u-image v-if="lunboList.length===1" :src="item.url"
						width="710" mode="widthFix" />
					<u-image v-else :src="item.url" width="230" height="230" />
				</div>
			</view>
		</view>
		
		<!-- 评论列表 -->
		<view class="px-2 u-border-top">
			<comment-list :tid="id" type="8" :collect="info.favoritesFlag" />
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
				id:'',
				info:null,
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
				this.getRoastInfo()
			},
			// 获取详情数据
			getRoastInfo() {
				this.$api.getRoastInfo(this.id).then(res => {
					this.getLunboData(res.data)
					let info = res.data
					info.user = {
						id:info.userId,
						name:info.userNickname,
						sex: info.userSex,
						avatar: info.userAvatar,
						rate: +info.userStarLevel,
						content: '',
						city: info.comeFrom,
						province: '',
						userTitle: info.userTitle,
						userIndustry: info.userIndustry,
						tags: []
					}
					this.info = info
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
			btnViewImg(item,i){
				let images = item.filter(v=>v.type==='image').map(v=>v.url)
				console.log('images',images)
				uni.previewImage({
					current:i,
					urls:images
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
			// 搜索
			btnSearch(i) {
				if(!this.keyword){
					this.$u.toast('输入搜索关键字')
					return 
				}
				this.$refs.paging.reload()
			},
			showSex(user){
				let value = user.sex
				if (value === null || value === undefined || value === "") {
				  return false;
				}else{
					return true;
				}
			}
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
</style>
