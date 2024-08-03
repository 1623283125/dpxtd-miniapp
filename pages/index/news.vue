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
						<div @click="goInfoPage(item)" v-for="(item,i) in dataList" :key="i" class="row py-2 u-border-top">
							<view class="col justify-between flex-1">
								<view class="font-15 font-weight-500 mb-2 u-line-2">
									{{item.title}}
								</view>
								<view v-if="item.isTop" class="row align-center font-12">
									<text style="color:#48A5FE">置顶</text>
									<text class="ml-3 color3">{{item.pvCount}}浏览量</text>
								</view>
								<view v-else class="row align-center font-12">
									<text class="color3">{{item.author}}</text>
									<!-- <text class="ml-3" style="color:#48A5FE">校长演讲正在进行</text> -->
								</view>
							</view>
							<view v-if="!item.isTop" class="x-center flex-shrink ml-2">
								<image :src="item.img" style="width:240rpx;height:144rpx;border-radius: 6rpx;" mode="aspectFill" />
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
				type:1,
				pages:[
					{
						title:'大学生创业'
					},
					{
						title:'退伍军人创业'
					},
					{
						title:'残疾人创业'
					}
				],
				keyword: '',
				tabsIndex:0,
				tabsList:[
					{
						id:1,
						name: '消息',
						type: 'news',
						info: '/pages/index/newsInfo',
						publish: '/pages/admin/news/add'
					},{
						id:2,
						name: '赛事',
						type: 'match',
						info: '/pages/index/newsEventInfo',
						publish: '/pages/admin/news/addEvent'
					},{
						id:3,
						name: '讲座',
						type: 'lecture',
						info: '/pages/index/newsLectureInfo',
						publish: '/pages/admin/news/addLecture'
					}
				],
				dataList: []
			}
		},
		onLoad(opt) {
			this.type = opt.type || 1
			uni.setNavigationBarTitle({
				title:this.pages[this.type-1].title
			})
		},
		methods: {
			reloadData(){
				// console.log('data',data);
				this.$refs.paging.reload()
			},
			// 获取列表数据
			queryList(pageNo, pageSize) {
				const data = {
					groupOriented: this.type
				}
				if(this.keyword){
					data.title = this.keyword
				}
				if(this.tabsIndex===0){
					this.getNewsList(data,pageNo,pageSize)
				}else if(this.tabsIndex===1){
					this.getMatchList(data,pageNo,pageSize)
				}else if(this.tabsIndex===2){
					this.getLectureList(data,pageNo,pageSize)
				}
				
			},
			// 消息列表
			getNewsList(data,pageNo,pageSize){
				this.$api.getNewsList(data,pageNo,pageSize).then(res => {
					const list = res.data.list || []
					const dataList = list.map(v=>({
						id: v.id,
						title: v.title,
						img: v.coverImage,
						author: v.belongUnit,
						pvCount: v.pvCount,
						isTop: false
					}))
					this.$api.getNewsTopList(data).then(res => {
						const dataList1 = res.data.map(v=>({
							id: v.id,
							title: v.title,
							img: v.coverImage,
							author: v.belongUnit,
							pvCount: v.pvCount,
							isTop: true
						}))
						this.$refs.paging.complete([...dataList1,...dataList])
					}).finally(()=>{
						this.$refs.paging.endRefresh()
					})
					// this.$refs.paging.complete(dataList)
				}).finally(()=>{
					// this.$refs.paging.endRefresh()
				})
			},
			// 赛事列表
			getMatchList(data,pageNo,pageSize){
				this.$api.getMatchList(data,pageNo,pageSize).then(res => {
					const list = res.data.list || []
					const dataList = list.map(v=>({
						id: v.id,
						title: v.title,
						img: v.coverImage,
						author: v.hostUnit,
						pvCount: v.pvCount,
						isTop: false
					}))
					this.$api.getMatchTopList(data).then(res => {
						const dataList1 = res.data.map(v=>({
							id: v.id,
							title: v.title,
							img: v.coverImage,
							author: v.belongUnit,
							pvCount: v.pvCount,
							isTop: true
						}))
						this.$refs.paging.complete([...dataList1,...dataList])
					}).finally(()=>{
						this.$refs.paging.endRefresh()
					})
					// this.$refs.paging.complete(dataList)
				}).finally(()=>{
					// this.$refs.paging.endRefresh()
				})
			},
			// 讲座列表
			getLectureList(data,pageNo,pageSize){
				this.$api.getLectureList(data,pageNo,pageSize).then(res => {
					const list = res.data.list || []
					const dataList = list.map(v=>({
						id: v.id,
						title: v.title,
						img: v.coverImage,
						author: v.belongUnit,
						pvCount: v.pvCount,
						isTop: false
					}))
					this.$api.getLectureTopList(data).then(res => {
						const dataList1 = res.data.map(v=>({
							id: v.id,
							title: v.title,
							img: v.coverImage,
							author: v.belongUnit,
							pvCount: v.pvCount,
							isTop: true
						}))
						this.$refs.paging.complete([...dataList1,...dataList])
					}).finally(()=>{
						this.$refs.paging.endRefresh()
					})
					// this.$refs.paging.complete(dataList)
				}).finally(()=>{
					// this.$refs.paging.endRefresh()
				})
			},
			// 监听Tabs切换
			changeTabs(e){
				this.tabsIndex = e
				this.reloadData()
			},
			// 跳转详情页面
			goInfoPage(item) {
				let i = this.tabsIndex
				this.$u.route(this.tabsList[i].info,{
					id:item.id,
					type:this.tabsList[i].type
				})
			},
			// 跳转发布页面
			goPublishPage() {
				let i = this.tabsIndex
				this.$u.route(this.tabsList[i].publish,{
					type:this.type
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