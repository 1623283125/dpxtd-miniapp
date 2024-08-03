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
				<view class="content bg-white">
					<!-- 精彩绽放:Splendor -->
					<view v-if="topList.length>0" class="mb-1">
						<view class="row px-2 py-2 align-center justify-between">
							<text class="title">精彩绽放</text>
							<view @click="goTopListPage()" class="x-center tab-extend">
								<u-icon label="更多" label-size="24" label-pos="left" size="24" name="arrow-right" color="#808080" label-color="#808080" margin-right="0" />
							</view>
						</view>
						<scroll-view class="w-100" scroll-x="true" style="white-space: nowrap;">
							<view @click="goInfoPage(item)" v-for="(item,i) in topList" :key="i" class="pr-1" style="display: inline-block;" :class="i===0?'pl-2':''"> 
								<view class="bg-white radius-10 overflow-hidden" style="width:150rpx;">
									<u-image :src="item.img" :border-radius="0" width="150" height="150" :lazy-load="true">
										<u-loading slot="loading"></u-loading>
									</u-image>
									<view class="w-100 px-1 py-1">
										<view class="u-line-2 font-12" style="white-space:wrap;">
											{{item.title}}
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<!-- 赛事列表 -->
					<view class="list-wrap radius-10">
						<div @click="goInfoPage(item)" v-for="(item,i) in dataList" :key="i" class="row align-center px-2 py-3 u-border-top">
							<view class="font-15 u-line-2 flex-1 mr-2">
								{{item.title}}
							</view>
							<view class="font-13 flex-shrink" style="color:#808080;">
								正在报名>
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
				tabsIndex:0,
				tabsList:[
					{
						id:1,
						name: '全国赛事',
						type: 'quanguo',
						info: 'pages/index/newsEventInfo',
						publish: 'pages/hslj/add'
					},{
						id:2,
						name: '省内赛事',
						type: 'shengnei',
						info: 'pages/index/newsEventInfo',
						publish: 'pages/hslj/add'
					}
				],
				topList: [],
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
					type: this.tabsList[this.tabsIndex].type
				}
				if(this.keyword){
					data.title = this.keyword
				}
				this.$api.getHsljList(data,pageNo,pageSize).then(res => {
					let dataList = []
					if(res.data.list){
						dataList = res.data.list.map(v=>({
							id: v.id,
							title: v.title
						}))
					}
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					this.$refs.paging.endRefresh()
				})
				this.getHsljTopList(data.type)
			},
			getHsljTopList(data){
				this.$api.getHsljTopList(data).then(res => {
					const dataList = res.data.map(v=>({
						id: v.id,
						title: v.title,
						img: v.image
					}))
					this.topList = dataList
				})
			},
			// 监听Tabs切换
			changeTabs(e){
				this.tabsIndex = e
				this.reloadData()
			},
			// 跳转精彩绽放页面
			goTopListPage() {
				this.$u.route('pages/hslj/topList',{
					type: this.tabsList[this.tabsIndex].type
				})
			},
			// 跳转详情页面
			goInfoPage(item) {
				let i = this.tabsIndex
				this.$u.route(this.tabsList[i].info,{
					id: item.id,
					type:'hslj'
				})
			},
			// 跳转发布页面
			goPublishPage() {
				let i = this.tabsIndex
				this.$u.route(this.tabsList[i].publish,{
					type:this.tabsIndex+1
				})
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