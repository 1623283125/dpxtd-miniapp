<template>
	<view class="search-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true">
				<view class="content">
					<view class="list-wrap bg-white radius-10 px-2">
						<div @click="goUserProfilePage(item)" v-for="(item,i) in dataList" :key="i" class="row py-3 u-border-top">
							<u-avatar size="88" :src="item.avatar" />
							<view class="flex-1 ml-2">
								<view class="row align-center justify-between mb-1">
									<view class="row align-center">
										<u-icon :label="item.name" label-pos="left" 
											:name="item.sex===1?'woman':'man'" size="24"
											:color="item.sex===1?'#FF6A6A':'#2979ff'" />
									</view>
									<!-- <view class="">
										<u-rate v-model="item.rate" size="24" />
									</view> -->
								</view>
								<view class="row align-center">
									<view class="tags row flex-wrap">
										<div v-for="item in 1" :key="item" class="px-1">
											<u-tag text="我中意的你" type="info" size="mini" />
										</div>
									</view>
									<view class="row align-center line-height-1 font-12">
										<text style="color:#808080;">{{item.likeReason}}</text>
									</view>
								</view>
								<view class="row align-center mt-1">
									<view class="tags row flex-wrap">
										<div v-for="item in 1" :key="item" class="px-1">
											<u-tag text="我的优势是" type="info" size="mini" />
										</div>
									</view>
									<view class="row align-center line-height-1 font-12">
										<text style="color:#808080;">{{item.mySpeciality}}</text>
									</view>
								</view>
							</view>
						</div>
					</view>
				</view>
				<!-- 客服 - 悬浮按钮 -->
				<float-kefu></float-kefu>
				
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				joinType: '',
				targetId: '',
				dataList: []
			}
		},
		onLoad(opt) {
			console.log('opt',opt);
			this.targetId = opt.id||''
			this.joinType = opt.type||''
		},
		methods: {
			// 获取列表数据
			queryList(pageNo, pageSize) {
				const data = {
					joinType: this.joinType,
					targetId: this.targetId
				}
				this.$api.getJoinList(data,pageNo,pageSize).then(res => {
					const dataList = res.data.map(v=>({
						id: v.id,
						userId: v.userId,
						name:v.userNickname,
						rate: +v.userStarLevel,
						sex: v.userSex,
						avatar: v.userAvatar,
						likeReason: v.likeReason,
						mySpeciality: v.mySpeciality
					}))
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					this.$refs.paging.endRefresh()
				})
				// this.$refs.paging.complete([])
			},
			// 跳转个人资料页面
			goUserProfilePage(item) {
				this.$u.route('pages/index/userProfile',{
					id: item.userId
				})
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('pages/admin/partner/add')
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