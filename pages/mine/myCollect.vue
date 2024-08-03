<template>
	<view class="collect-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true">
				<view slot="top" class="bg-white col w-100">
					<!-- <view class="search-warp x-center px-3" style="height: 88rpx;">
						<u-search v-model="keyword" @search="(v)=>btnSearch(1)" @custom="(v)=>btnSearch(2)" :show-action="false"
							placeholder="搜索关键词" class="w-100" bg-color="rgba(0, 0, 0, 0.04)"
							:input-style="{background:'transparent'}" />
					</view> -->
					<view class="nav-wrap bg-white position-relative u-border-bottom" style="height:92rpx">
						<view class="position-absolute" style="left:0;right:0rpx;z-index:999;">
							<view class="tabs-wrap">
								<u-tabs :list="tabsList" :current="tabsIndex" :is-scroll="true"
									@change="changeTabs" active-color="#48A5FE" :gutter="20" />
							</view>
						</view>
						<!-- <view class="dropdown-wrap">
							<u-dropdown title-size="30">
								<u-dropdown-item v-for="item in dropdowns" :key="item.id" 
								:height="item.height" v-model="item.value" :title="item.title" 
								:options="item.options" />
							</u-dropdown>
						</view> -->
					</view>
				</view>
				<view class="content py-1">
					<card-list-partner v-if="tabsIndex===0" :show="false" :dataList="dataList" />
					<card-list-resource v-if="tabsIndex===1" :show="false" :dataList="dataList" />
					<card-list-project v-if="tabsIndex===2" :show="false" :dataList="dataList" />
					<card-list-funder v-if="tabsIndex===3" :show="false" :dataList="dataList" />
					<card-list-news v-if="tabsIndex>=4" :show="false" :dataList="dataList" />
				</view>
				
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				tabsIndex:0,
				tabsList:[
					// {
					// 	id:1,
					// 	name: '全部'
					// }, 
					{
						id:1,
						type:'partnership',
						name: '找合伙'
					}, {
						id:2,
						type:'resourceGruop',
						name: '找资源'
					}, {
						id:3,
						type:'project',
						name: '找项目'
					}, {
						id:4,
						type:'funder',
						name: '资金方'
					}, {
						id:5,
						type:'news',
						name: '消息'
					}, {
						id:6,
						type:'match',
						name: '赛事'
					}, {
						id:7,
						type:'lecture',
						name: '讲座'
					}, {
						id:8,
						type:'roast',
						name: '吐槽'
					}
				],
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
				let type = this.tabsList[this.tabsIndex].type
				const data = {
					type,
					keyword: this.keyword
				}
				this.$api.myCollectList(data,pageNo,pageSize).then(res => {
					let dataList = res.data.map(v=>({
						...v,
						_type:type,
						hostUnit:v.hostUnit||v.belongUnit,
						hostName:v.address||v.schoolName
					}))
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					this.$refs.paging.endRefresh()
				})
			},
			// 监听Tabs切换
			changeTabs(e){
				this.tabsIndex = e
				this.dataList = []
				this.reloadData()
			},
			// 跳转详情页面
			goPartnerPage() {
				this.$u.route('pages/index/partnerInfo')
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('pages/admin/partner/add')
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

<style lang="scss" >
	page,
	uni-page-body {
		height: 100%;
	}

	.collect-page {
		.tabs-wrap{
			width: 100%;
			position: relative;
			// box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
			&::after{
				content: '';
				position: absolute;
				right:-16rpx;
				width: 16rpx;
				top:20rpx;
				bottom:30rpx;
				// background: linear-gradient(90deg, rgba(13, 13, 13, 0.01) 40%, rgba(13, 13, 13, 0.1), rgba(13, 13, 13, 0.18));
				box-shadow:-10px -1px 16px 0px rgba(0, 0, 0, 0.3);
				
			}
		}
		.dropdown-wrap ::v-deep .u-dropdown__menu__item{
			padding:0 20rpx;
			margin-bottom: 4rpx;
			justify-content: end !important;
		}
	}
</style>