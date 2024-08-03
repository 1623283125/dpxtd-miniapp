<template>
	<view class="search-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true">
				<view class="content">
					<view class="list-wrap bg-white radius-10">
						<div @click="goInfoPage(item)" v-for="(item,i) in dataList" :key="i" class="row py-3 u-border-top px-2">
							<u-image :src="item.coverImg" :border-radius="0" width="130" height="130" :lazy-load="true" border-radius="10">
								<u-loading slot="loading" />
							</u-image>
							<view class="flex-1 ml-2 col justify-between" style="padding:6rpx 0;">
								<view class="mb-1">
									{{item.title}}
								</view>
								<view class="row align-center line-height-1 color3">
									<text class="font-12">{{item.createDate}}</text>
									<text class="font-12 ml-3">{{item.pvCount}}人浏览</text>
								</view>
							</view>
						</div>
					</view>
				</view>
				<!-- 客服 - 悬浮按钮 -->
				<float-kefu />
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				dataList: []
			}
		},
		onLoad(opt) {
			this.type = opt.type||''
		},
		methods: {
			// 获取列表数据
			queryList(pageNo, pageSize) {
				this.$api.getHsljMoreList(this.type,pageNo,pageSize).then(res => {
					const dataList = res.data.map(v=>({
						id: v.id,
						title: v.title,
						coverImg: v.image,
						pvCount: v.pvCount,
						createDate: v.createDate
					}))
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					this.$refs.paging.endRefresh()
				})
			},
			// 跳转详情页面
			goInfoPage(item) {
				this.$u.route('/pages/index/newsEventInfo',{
					id: item.id
				})
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('/pages/roast/add')
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