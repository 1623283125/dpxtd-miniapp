<template>
	<view class="search-page h-100 col position-relative">
		<template v-if="userInfo">
		<!-- 用户信息 -->
		<div class="bg-white px-2 row py-3">
			<!-- <u-avatar size="120" :src="userInfo.userAvatar" /> -->
			<u-avatar size="120" :src="userInfo.userAvatar" :show-sex="true" 
				:sex-bg-color="userInfo.userSex===0?'#FFDEDE':'#C2ECFE'"
				:sex-icon="`/static/images/sex-${userInfo.userSex}.png`" />
			<view class="flex-1 ml-2 u-line-1">
				<view class="row align-center mb-1 u-line-1">
					<!-- <view class="row align-center">
						<u-icon :label="userInfo.userNickname" label-pos="left" 
							:name="userInfo.userSex===0?'woman':'man'" size="24"
							:color="userInfo.userSex===0?'#FF6A6A':'#2979ff'" />
					</view> -->
					<view class="flex-1 row align-center u-line-1">
						<text class="font-15 mr-1 u-line-1 font-weight-500">{{userInfo.userNickname}}</text>
						<u-rate  v-model="userInfo.userStarLevel" size="24" active-color="#F3D958" inactive-color="#CCCCCC" :plain="true" disabled />
					</view>
					<view class="x-center" style="color:#808080;">
						<u-button @click="goEditProfilePage()" size="mini" shape="circle">编辑资料</u-button>
					</view>
				</view>
				<view class="row align-center line-height-1 font-12">
					<template v-if="userInfo.userTitle">
						<text class="user-title">
							{{userInfo.userTitle}}
						</text>
						<view class="u-border-right mx-1" style="height:24rpx;" />
					</template>
					<text v-if="userInfo.userIndustry">
						{{userInfo.userIndustry}}
					</text>
				</view>
				<view v-if="userInfo.userCity" class="row align-center font-12 mt-1">
					<u-icon name="map" color="#808080" size="24" />
					<text class="mr-1">{{userInfo.userCity}}</text>
				</view>
				<view v-if="userInfo.selfIntroduction" class="row align-center font-12 mt-1">
					{{userInfo.selfIntroduction}}
				</view>
			</view>
		</div>
		
		<!-- 合伙需求 -->
		<div class="bg-white px-2 mt-2">
			<view class="title py-3 u-border-bottom">
				<text class="font-15">合伙需求</text>
			</view>
			<view class="demand py-3">
				<view class="py-3">
					<!-- <u-icon name="plus-circle-fill" color="#48A5FE" size="36" />
					<text style="color:#48A5FE">添加合伙需求</text> -->
					<text v-if="userInfo.partnershipRequire">{{userInfo.partnershipRequire}}</text>
					<u-empty v-else text="暂无数据" mode="data" />
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
					<text class="flex-shrink">我擅长：</text>
					<view class="row align-center flex-wrap">
						<div v-for="item in getTagList(userInfo.beGoodAt)" :key="item" class="px-1 mb-2">
							<u-tag :text="item" size="mini" color="#333333" 
								bg-color="#E4EAF7" border-color="#E4EAF7" />
						</div>
					</view>
				</view>
				<view class="row">
					<text class="flex-shrink">想认识：</text>
					<view class="row align-center flex-wrap">
						<div v-for="item in getTagList(userInfo.wannaMeet)" :key="item" class="px-1 mb-2">
							<u-tag :text="item" size="mini" 
							color="#4877FE" bg-color="#E4EAF7" border-color="#E4EAF7" />
						</div>
					</view>
				</view>
			</view>
		</div>
		
		<!-- 联系方式 -->
		<div class="bg-white px-2 mt-2">
			<view class="title py-3 u-border-bottom">
				<text class="font-15">联系方式</text>
			</view>
			<view class="contact">
				<view class="row align-center py-2 u-border-bottom">
					<u-icon name="/static/images/weixin-icon.png" color="#48A5FE" size="60" />
					<view class="col font-12 flex-1 px-1">
						<text style="color:#333333;line-height:1;margin-bottom:4rpx;">微信</text>
						<text style="color:#808080;line-height:1;">关联后可一键登录</text>
					</view>
					<view @click="goSplendorPage()" class="x-center tab-extend">
						<u-icon label="未填写" label-size="24" label-pos="left" size="24" name="arrow-right" color="#808080" label-color="#808080" margin-right="0" />
					</view>
				</view>
				<view class="row align-center py-2 u-border-bottom">
					<u-icon name="/static/images/douyin-icon.png" color="#48A5FE" size="60" />
					<view class="col font-12 flex-1 px-1">
						<text style="color:#333333;line-height:1;margin-bottom:4rpx;">抖音</text>
						<text style="color:#808080;line-height:1;">关联后可一键登录</text>
					</view>
					<view @click="goSplendorPage()" class="x-center tab-extend">
						<u-icon label="未填写" label-size="24" label-pos="left" size="24" name="arrow-right" color="#808080" label-color="#808080" margin-right="0" />
					</view>
				</view>
				<view class="row align-center py-2 u-border-bottom">
					<u-icon name="/static/images/qq-icon.png" color="#48A5FE" size="60" />
					<view class="col font-12 flex-1 px-1">
						<text style="color:#333333;line-height:1;margin-bottom:4rpx;">QQ</text>
						<text style="color:#808080;line-height:1;">关联后可一键登录</text>
					</view>
					<view @click="goSplendorPage()" class="x-center tab-extend">
						<u-icon label="未填写" label-size="24" label-pos="left" size="24" name="arrow-right" color="#808080" label-color="#808080" margin-right="0" />
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
				<view class="x-center py-3">
					<!-- <u-icon name="plus-circle-fill" color="#48A5FE" size="36" />
					<text style="color:#48A5FE">添加工作经历</text> -->
					<text v-if="userInfo.workExperience">{{userInfo.workExperience}}</text>
					<u-empty v-else text="暂无数据" mode="data" />
				</view>
			</view>
		</div>
				
		<!-- 教育经历 -->
		<div class="bg-white px-2 mt-2">
			<view class="title py-3 u-border-bottom">
				<text class="font-15">教育经历</text>
			</view>
			<view class="demand py-3">
				<view class="x-center py-3">
					<!-- <u-icon name="plus-circle-fill" color="#48A5FE" size="36" />
					<text style="color:#48A5FE">添加教育经历</text> -->
					<text v-if="userInfo.eduExperience">{{userInfo.eduExperience}}</text>
					<u-empty v-else text="暂无数据" mode="data" />
				</view>
			</view>
		</div>
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu></float-kefu>
		</template>
		<view v-else class="y-center flex-1">
			<u-loading mode="flower" size="60" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:null,
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData(){
				this.getUserInfo()
			},
			// 获取用户信息
			getUserInfo(){
				this.$api.getUserInfo().then(res=>{
					this.userInfo = res.data
					// console.log('getUserInfo')
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
				console.log('userInfo',userInfo)
				this.$u.vuex('_userInfo', userInfo)
			},
			// 跳转详情页面
			goEditProfilePage() {
				this.$u.route('pages/mine/editProfile')
			},
			// 标签列表
			getTagList(tags) {
				if(!tags){
					return []
				}else{
					return tags.split(',')
				}
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