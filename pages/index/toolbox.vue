<template>
	<view class="search-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true">
				<!-- 顶部固定 -->
				<view slot="top" class="bg-white col w-100">
					<view class="search-warp x-center px-3" style="height: 88rpx;">
						<u-search v-model="keyword" @search="(v)=>btnSearch(1)" 
							@custom="(v)=>btnSearch(2)" :show-action="false"
							placeholder="搜索关键词" class="w-100" bg-color="rgba(0, 0, 0, 0.04)"
							:input-style="{background:'transparent'}" />
					</view>
					<view class="x-center u-border-bottom">
						<u-tabs :list="tabsList" :current="tabsIndex" 
							active-color="#48A5FE" @change="changeTabs" />
					</view>
				</view>
				<!-- 列表内容 -->
				<view class="content">
					<view class="list-wrap bg-white radius-10 px-2">
						<div @click="goInfoPage(item)" v-for="(item,i) in dataList" :key="i" class="row py-3 u-border-top">
							<view class="font-15">
								{{item.title}}
							</view>
						</div>
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
				tabsIndex:0,
				tabsList:[
					{
						id:1,
						name: '创业资料',
						info: 'pages/index/toolboxInfo',
						publish: 'pages/admin/toolbox/add'
					},{
						id:2,
						name: '软件中心',
						info: 'pages/index/toolboxInfo',
						publish: 'pages/admin/toolbox/add'
					},{
						id:3,
						name: '营销工具',
						info: 'pages/index/toolboxInfo',
						publish: 'pages/admin/toolbox/add'
					},{
						id:4,
						name: '网站模版',
						info: 'pages/index/toolboxInfo',
						publish: 'pages/admin/toolbox/add'
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
				let data = {
					toolType:this.tabsIndex+1
				}
				if(this.keyword){
					data.searchStr = this.keyword
				}
				this.$api.getToolboxList(data,pageNo,pageSize).then(res => {
					const list = res.data.list || []
					const dataList = list.map(v=>({
						id: v.id,
						title: v.title
					}))
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					this.$refs.paging.endRefresh()
				})
			},
			// 监听Tabs切换
			changeTabs(e){
				this.tabsIndex = e
				this.$refs.paging.reload()
			},
			// 跳转详情页面
			goInfoPage(item) {
				let i = this.tabsIndex
				this.$u.route(this.tabsList[i].info,{
					id:item.id
				})
			},
			// 跳转发布页面
			goPublishPage() {
				let i = this.tabsIndex
				this.$u.route(this.tabsList[i].publish,{
					type:this.tabsList[i].id
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