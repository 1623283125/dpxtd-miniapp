<template>
	<view class="partner-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true">
				<view slot="top" class="bg-white col w-100">
					<view class="search-warp x-center px-3" style="height: 88rpx;">
						<u-search v-model="keyword" @search="(v)=>btnSearch(1)" @custom="(v)=>btnSearch(2)" :show-action="false"
							placeholder="搜索关键词" class="w-100" bg-color="rgba(0, 0, 0, 0.04)"
							:input-style="{background:'transparent'}" />
					</view>
					<view class="dropdown-wrap">
						<dropdown-list />
					</view>
				</view>
				<view class="content">
					<view class="list-wrap bg-white radius-10 px-2">
						<view @click="goInfoPage(item)" v-for="(item,i) in dataList" 
							:key="i" class="py-3 u-border-bottom">
							<user-card :user="item" />
						</view>
						
					</view>
				</view>
				<!-- 发布 - 悬浮按钮 -->
				<float-publish slot="bottom" @click="goPublishPage()" position="fixed" />
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				industry:'',
				province:'',
				city:'',
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
				let data = {}
				
				if(this.keyword){
					data.searchStr = this.keyword
				}
				if(this.industry){
					data.industry = this.industry
				}
				if(this.province){
					data.province = this.province
				}
				if(this.city){
					data.city = this.city
				}
				
				this.$api.getPartnerList(data,pageNo,pageSize).then(res => {
					const dataList = res.data.list.map(v=>({
						...v,
						name:v.userNickname,
						sex: v.userSex,
						avatar: v.userAvatar,
						rate: +v.userStarLevel,
						content: v.title,
						city: v.city,
						province: v.province,
						userId: v.userId,
						userTitle: v.userTitle,
						industry: v.industry,
						userIndustry: v.userIndustry,
						tags: v.label?v.label.split(','):[]
					}))
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					this.$refs.paging.endRefresh()
				})
			},
			// 跳转详情页面
			goInfoPage(item) {
				this.$u.route('/pages/index/partnerInfo',{
					id:item.id
				})
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('/pages/admin/partner/add')
			},
			// 搜索
			btnSearch(i) {
				// if (!this.keyword) {
				// 	this.$u.toast('输入搜索关键字')
				// 	return
				// }
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

	.partner-page {}
</style>