<template>
	<view class="partner-page h-100 col position-relative">
		<!-- 顶部搜索 -->
		<view class="bg-white col w-100">
			<view class="search-warp x-center px-3" style="height: 88rpx;">
				<u-search v-model="keyword" @search="(v)=>btnSearch(1)" @custom="(v)=>btnSearch(2)" :show-action="false"
					placeholder="搜索关键词" class="w-100" bg-color="rgba(0, 0, 0, 0.04)" :input-style="{background:'transparent'}" />
			</view>
			<view class="dropdown-wrap">
				<dropdown-list />
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="list-wrap flex-1 px-2 pb-3">
			<u-waterfall ref="refWaterfall" v-model="dataList">
				<template v-slot:left="{leftList}">
					<WaterfallFunder :item="v" v-for="(v, i) in leftList" :key="i" styles="margin-top:14rpx"></WaterfallFunder>
				</template>
				<template v-slot:right="{rightList}">
					<WaterfallFunder :item="v" v-for="(v, i) in rightList" :key="i" styles="margin:14rpx 0 0 14rpx;"></WaterfallFunder>
				</template>
			</u-waterfall>

			<view v-if="pageNo>1" class="py-2">
				<u-loadmore :status="loadStatus" @loadmore="loadMoreData"></u-loadmore>
			</view>
			<view v-if="pageNo===1" class="x-center py-2">
				<u-empty v-if="isEmpty" text="暂无数据～" icon-size="320" src="/static/images/empty.png" />
				<u-loadmore v-else :status="loadStatus"></u-loadmore>
			</view>
		</view>
		<!-- 发布 - 悬浮按钮 -->
		<float-publish @click="goPublishPage()" position="fixed" />
	</view>
	</view>
</template>

<script>
	import WaterfallFunder from './components/WaterfallFunder'
	export default {
		components:{
			WaterfallFunder
		},
		data() {
			return {
				keyword: '',
				pageNo: 1,
				pageSize: 15,
				hasMore: true,
				isRefresh: false,
				isEmpty:false,
				loadStatus: 'loading',
				dataList: [],
				industryList:[]
			}
		},
		onLoad() {
			this.initData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.reloadData()
		},
		// 触底触发
		onReachBottom() {
			if (this.hasMore) {
				this.pageNo++
				this.loadStatus = 'loading'
				this.loadMoreData()
			}
		},
		methods: {
			initData() {
				this.getDicData()
			},
			reloadData(){
				this.pageNo = 1
				this.isRefresh = true
				this.isEmpty = false
				this.loadStatus = 'loading'
				this.initData()
			},
			loadMoreData() {
				this.getDataList()
			},
			// 获取列表数据
			getDataList() {
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
				
				this.$api.getFunderList(data,this.pageNo, this.pageSize).then(res => {
					if (this.isRefresh) {
						this.isRefresh = false
						this.$refs.refWaterfall.clear()
					}
					this.$nextTick(() => {
						this.renderData(res.data)
					})
				}).finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			renderData(data) {
				if (!data.list||data.list.length===0) {
					this.dataList = []
					this.isEmpty = this.pageNo === 1
					return
				}
				const dataList = data.list.map(v=>({
					...v,
					id: v.id,
					name:v.userNickname,
					rate: +v.userStarLevel,
					sex: v.userSex,
					avatar: v.userAvatar,
					content: v.investIntent,
					province: v.province,
					industryName: this.getIndustry(v.industry),
					city: v.province.includes('市') ? v.province : v.city,
					money: v.investScale
				}))
				if (this.pageNo === 1) {
					console.log('11111')
					this.dataList = [...dataList]
				} else {
					this.dataList = [...this.dataList, ...dataList]
				}
				if (dataList.length < this.pageSize) {
					this.hasMore = false
					this.loadStatus = 'nomore'
				} else {
					this.hasMore = true
					this.loadStatus = 'loading'
				}
				console.log('dataList', this.dataList)
			},
			// 字典请求数据
			getDicData() {
				this.$api.getDicList().then(res => {
					let industry = res.data.find(v => v.type === 'industry')
					this.industryList = industry.items
					this.getDataList()
				})
			},
			// 获取行业
			getIndustry(type) {
				let item = this.industryList.find(v => v.value == type)
				if (item) {
					return item.label
				} else {
					return ''
				}
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('pages/admin/funder/add')
			},
			// 搜索
			btnSearch(i) {
				// if (!this.keyword) {
				// 	this.$u.toast('输入搜索关键字')
				// 	return
				// }
				this.pageNo = 1
				this.loadStatus = 'loading'
				this.isRefresh = true
				this.isEmpty = false
				this.getDataList()
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