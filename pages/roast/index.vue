<template>
	<view class="search-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true">
				<view slot="top" class="bg-white col w-100">
					<view class="search-warp x-center px-3" style="height: 88rpx;">
						<u-search v-model="keyword" @search="(v)=>btnSearch(1)" @custom="(v)=>btnSearch(2)" :show-action="false"
							placeholder="搜索关键词" class="w-100" bg-color="rgba(0, 0, 0, 0.04)"
							:input-style="{background:'transparent'}" />
					</view>
				</view>
				<view class="content">
					<view class="list-wrap bg-white radius-10">
						<div v-for="(item,index) in dataList" :key="index" class="row py-3 u-border-top px-2">
							<!-- <u-avatar size="80" :src="item.avatar" /> -->
							<view @click="goUserProfilePage(item)" class="avatar-wrap">
								<u-avatar size="80" :src="item.avatar"
									:sex-bg-color="item.sex===0?'#FFDEDE':'#C2ECFE'"
									:show-sex="showSex(item)" 
									:sex-icon="`/static/images/sex-${item.sex}.png`" />
							</view>
							<view class="flex-1 ml-2 u-line-1">
								<view class="row align-center justify-between mb-1">
									<view class="row align-center u-line-1">
										<text class="font-15 u-line-1 mr-1 font-weight-500">{{item.name}}</text>
										<view class="x-center" style="transform:scale(0.8);">
											<u-rate v-model="item.rate" size="32" 
												active-color="#F3D958" disabled />
										</view>
									</view>
									<!-- <view class="x-center tab-extend">
										<u-icon name="more-dot-fill" color="#808080" size="32" />
									</view> -->
								</view>
								<view class="row align-center line-height-1 color3">
									<text class="font-12">{{item.createDate}}</text>
									<text class="font-12 ml-3">来自{{item.comeFrom}}</text>
								</view>
								<!-- 内容区域 -->
								<view @click="goInfoPage(item)" class="content-wrap">
									<!-- 内容文字区域 -->
									<view class="font-15 py-2 u-line-4">
										{{item.content}}
									</view>
									<!-- 图片/视频 -->
									<view class="row flex-wrap" style="margin:0 -6rpx;">
										<div @click.stop="btnViewImg(item,i)" style="padding:5rpx;" 
											v-for="(img,i) in item.images" :key="i">
											<u-image v-if="item.images.length===1" :src="img"
												width="290" height="290" />
											<u-image v-else :src="img" width="196" height="196" />
										</div>
									</view>
								</view>
								<!-- 转发/评论 -->
								<!-- <view class="row align-center mt-3">
									<view class="x-center flex-1">
										<u-icon label="转发" name="zhuanfa" color="#666" label-color="#666" label-size="24" size="28" label-pos="right" />
									</view>
									<view class="x-center flex-1 u-border-left">
										<u-icon label="评论" name="chat" color="#666" label-color="#666" label-size="24" size="28" label-pos="right" />
									</view>
								</view> -->
							</view>
						</div>
					</view>
				</view>
				<!-- 发布 - 悬浮按钮 -->
				<float-publish slot="bottom" @click="goPublishPage()" position="relative" />
			</z-paging>
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
				keyword: '',
				dataList: []
			}
		},
		onLoad() {

		},
		methods: {
			reloadData(){
				this.$refs.paging.reload()
			},
			// 获取列表数据
			queryList(pageNo, pageSize) {
				const data = {
					title: this.keyword
				}
				this.$api.getRoastList(data,pageNo,pageSize).then(res => {
					let list = res.data.list
					const dataList = !list?[]: res.data.list.map(v=>({
						...v,
						name:v.userNickname,
						rate: +v.userStarLevel,
						sex: v.userSex,
						avatar: v.userAvatar,
						content: v.title,
						province: v.province,
						city: v.city,
						images: this.getImageList(v.image),
						userTitle: v.userTitle,
						userIndustry: v.userIndustry
					}))
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					this.$refs.paging.endRefresh()
				})
			},
			getImageList(images){
				let imageList = []
				if(images){
					imageList = images.split(',')
				}
				// console.log('imageList',imageList)
				return imageList
			},
			btnViewImg(item,i){
				uni.previewImage({
					current:i,
					urls:item.images
				})
			},
			// 跳转详情页面
			goInfoPage(item) {
				this.$u.route('pages/roast/info',{
					id:item.id
				})
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('pages/roast/add')
			},
			// 个人页面
			goUserProfilePage(item){
				console.log('this.user',item)
				const userId = item.userId||item.id
				this.$u.route('pages/index/userProfile',{
					id: userId
				})
			},
			// 搜索
			btnSearch(i) {
				// if (!this.keyword) {
				// 	this.$u.toast('输入搜索关键字')
				// 	return
				// }
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
	page,
	uni-page-body {
		height: 100%;
	}

	.search-page {}
</style>