<template>
	<view v-if="userInfo" class="search-page h-100 col position-relative">
		
		<!-- 用户信息 -->
		<div class="bg-white px-2 row py-3">
			<u-avatar size="120" :src="userInfo.userAvatar" :show-sex="true"
				:sex-bg-color="userInfo.userSex===0?'#FFDEDE':'#C2ECFE'"
				:sex-icon="`/static/images/sex-${userInfo.userSex}.png`" />
			<view class="flex-1 ml-2">
				<view class="row align-center mb-1">
					<text class="font-15 mr-1 font-weight-500">{{userInfo.userNickname}}</text>
					<view class="flex-1">
						<u-rate  v-model="userInfo.userStarLevel" size="24" active-color="#F3D958" inactive-color="#CCCCCC" :plain="true" disabled />
					</view>
					<!-- <view class="x-center">
						<u-button size="mini" shape="circle">关注+</u-button>
					</view> -->
				</view>
				<view class="row align-center line-height-1 font-12">
					<template v-if="userInfo.userTitle">
						<text class="user-title">
							{{userInfo.userTitle||''}}
						</text>
						<view class="u-border-right mx-1" style="height:24rpx;" />
					</template>
					<text v-if="userInfo.userIndustry">
						{{userInfo.userIndustry||''}}
					</text>
				</view>
				<view class="row align-center font-12 mt-1">
					<u-icon name="map" color="#808080" size="24" />
					<text class="mr-1">{{userInfo.userCity||''}}</text>
				</view>
				<view class="row align-center font-12 mt-1">
					{{userInfo.selfIntroduction||''}}
				</view>
			</view>
		</div>
		
		<!-- 合伙需求 -->
		<div class="bg-white px-2 mt-2">
			<view class="title py-3 u-border-bottom">
				<text class="font-15">合伙需求</text>
			</view>
			<view class="demand py-3">
				<text v-if="userInfo.partnershipRequire">{{userInfo.partnershipRequire}}</text>
				<view v-else class="x-center py-3">
					<text class="u-tips-color">他还没有填写需求~</text>
				</view>
			</view>
		</div>
		
		<!-- 创业标签 -->
		<div class="bg-white px-2 mt-2">
			<view class="title py-3 u-border-bottom">
				<text class="font-15">创业标签</text>
			</view>
			<view class="body mt-3 pb-2">
				<view class="row">
					<text class="u-tips-color flex-shrink">我擅长：</text>
					<view class="row align-center flex-wrap">
						<div v-for="item in getTagList(userInfo.beGoodAt)" :key="item" class="px-1 mb-2">
							<u-tag :text="item" size="mini" color="#333333" 
								bg-color="#E4EAF7" border-color="#E4EAF7" />
						</div>
					</view>
				</view>
				<view class="row">
					<text class="u-tips-color flex-shrink">想认识：</text>
					<view class="row align-center flex-wrap">
						<div v-for="item in getTagList(userInfo.wannaMeet)" :key="item" class="px-1 mb-2">
							<u-tag :text="item" size="mini" 
							color="#4877FE" bg-color="#E4EAF7" border-color="#E4EAF7" />
						</div>
					</view>
				</view>
			</view>
		</div>
		
		<!-- 工作经历 -->
		<div class="bg-white px-2 mt-2">
			<view class="title py-3 u-border-bottom">
				<text class="font-15">工作经历</text>
			</view>
			<view class="demand py-3">
				<text v-if="userInfo.workExperience">{{userInfo.workExperience}}</text>
				<view v-else class="x-center py-3">
					<text class="u-tips-color">他还没有填写工作经历~</text>
				</view>
			</view>
		</div>
				
		<!-- 教育经历 -->
		<div class="bg-white px-2 mt-2">
			<view class="title py-3 u-border-bottom">
				<text class="font-15">教育经历</text>
			</view>
			<view class="demand py-3">
				<text v-if="userInfo.eduExperience">{{userInfo.eduExperience}}</text>
				<view v-else class="x-center py-3">
					<text class="u-tips-color">他还没有填写教育经历~</text>
				</view>
			</view>
		</div>
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu></float-kefu>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:'',
				userInfo:null
			}
		},
		onLoad(opt) {
			this.userId = opt.id||''
			this.initData()
		},
		methods: {
			initData(){
				this.getOtherUserInfo()
			},
			// 获取列表数据
			getOtherUserInfo() {
				this.$api.getOtherUserInfo(this.userId).then(res => {
					this.userInfo = res.data
				})
			},
			// 跳转详情页面
			goPartnerPage() {
				this.$u.route('pages/index/partnerInfo')
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('pages/admin/partner/add')
			},
			// 标签列表
			getTagList(tags) {
				if(!tags){
					return []
				}else{
					return tags.split(',')
				}
			},
			// 搜索
			btnSearch(i) {
				if (!this.keyword) {
					this.$u.toast('输入搜索关键字')
					return
				}
				this.$refs.paging.reload()
			},
		}
	}
</script>

<style lang="scss">
	page,
	uni-page-body {
		height: 100%;
	}

	.search-page {}
</style>