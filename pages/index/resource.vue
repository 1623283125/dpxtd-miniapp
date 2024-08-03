<template>
	<view class="search-page h-100 col position-relative">
		<view class="flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true" @scroll="onScrollPage">
				<view slot="top" class="bg-white col w-100">
					<!-- 顶部搜索 -->
					<view class="search-warp x-center px-3" style="height: 88rpx;">
						<u-search v-model="keyword" @search="(v)=>btnSearch(1)" @custom="(v)=>btnSearch(2)" :show-action="false"
							placeholder="搜索关键词" class="w-100" bg-color="rgba(0, 0, 0, 0.04)"
							:input-style="{background:'transparent'}" />
					</view>
					<!-- 查询条件 -->
					<view class="dropdown-wrap">
						<u-dropdown ref="refDropdown">
								<u-dropdown-item v-model="dropdownCity.value" :title="dropdownCity.title" :options="dropdownCity.options">
									<view class="city-wrap">
										<city-select v-model="showCtiy" @city-change="cityChange" />
									</view>
								</u-dropdown-item>
								<u-dropdown-item v-model="dropdownIndustry.value" :title="dropdownCity.title" :height="dropdownIndustry.height" :options="dropdownIndustry.options" @change="dropdownChange" />
							</u-dropdown>
					</view>
					
					<!-- <view class="dropdown-wrap" v-show="showDropdown">
						<dropdown-list ref="refDropdown" />
					</view> -->
				</view>
				<!-- 头部内容 -->
				<view class="bg-white header">
					<!-- <view class="bg-white col w-100">
						<view class="search-warp x-center px-3" style="height: 88rpx;">
							<u-search v-model="keyword" @search="(v)=>btnSearch(1)" @custom="(v)=>btnSearch(2)" :show-action="false"
								placeholder="搜索关键词" class="w-100" bg-color="rgba(0, 0, 0, 0.04)"
								:input-style="{background:'transparent'}" />
						</view>
					</view> -->
					<view class="grid-wrap">
						<u-grid :col="3" :border="false">
							<u-grid-item @click="goResourcePage(item.id)" v-for="(item,index) in groupList" :key="index" :custom-style="{padding:'20rpx 10rpx'}">
								<image class="radius-20" :src="item.icon" style="width: 140rpx;height: 140rpx;">
								<view class="px-1 x-center w-100 mt-1">
									<text class="u-line-1 font-12">{{item.name}}</text>
								</view>
							</u-grid-item>
						</u-grid>
					</view>
					<view style="margin: 10rpx -10rpx 0;">
						<image src="/static/images/vip-add-group.png" style="width: 100%;" mode="widthFix" />
					</view>
					<!-- <u-sticky>
					<view class="dropdown-wrap bg-white">
						<u-dropdown>
							<u-dropdown-item v-for="item in dropdowns" :key="item.id" :height="item.height" v-model="item.value" :title="item.title" :options="item.options" />
						</u-dropdown>
					</view>
					</u-sticky> -->
				</view>
				
				<view id="listContent" v-if="false">
					<!-- <view class="dropdown-wrap bg-white">
						<u-dropdown ref="showDropdown2" @open="openDropdown">
							<u-dropdown-item v-for="(item,index) in dropdowns" :key="index" :height="item.height" v-model="item.value" :title="item.title" :options="item.options" />
						</u-dropdown>
					</view> -->
					<view class="bg-white row align-center">
						<view @click="openDropdown(index)" v-for="(item,index) in dropdowns" :key="index" class="x-center flex-1" style="height:80rpx;">
							<text class="mr-1">{{item.title}}</text>
							<u-icon name="arrow-down" color="#c0c4cc" size="24" />
						</view>
					</view>
				</view>
				
				<!-- 列表内容 -->
				<view class="content" :style="{minHeight: `${listHeight}px`}">
					<view class="list-wrap bg-white radius-10 px-2">
						<div @click="goResourcePage(item.id)" v-for="(item,i) in dataList" :key="i" class="row py-3 u-border-top">
							<u-avatar size="88" :src="item.avatar" mode="square" />
							<view class="flex-1 col justify-center ml-2">
								<view class="row align-center justify-between">
									<view class="row align-center line-height-1 font-12">
										<text class="font-15 font-weight-500">{{item.name}}</text>
									</view>
									<view v-if="item.province" class="row align-center line-height-1 font-12">
										<text class="mr-1 color3">{{item.province+item.city}}</text>
										<u-icon name="map" color="#808080" size="24" />
									</view>
								</view>
								<view class="font-14 line-height-1 mt-2 color3">
									{{item.content}}
								</view>
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
				industry:'',
				province:'',
				city:'',
				showDropdown:false,
				showCtiy:true,
				listHeight:667,
					
				dropdownCity:{
					type: 'area',
					title: '按地区',
					value: '',
					height: '40vh'
				},
				dropdownIndustry:{
					type: 'industry',
					title: '按行业',
					value: '',
					height: '870rpx',
					options:[{
						label: '默认',
						value: 0,
					}]
				},
				dropdowns: [
					{
						type: 'area',
						title: '按地区',
						value: '',
						height: '40vh',
						options: [
							{
								label: '北京',
								value: 1,
							},
							{
								label: '上海',
								value: 2,
							},
							{
								label: '南京',
								value: 3,
							},
							{
								label: '重庆',
								value: 4,
							},
							{
								label: '武汉',
								value: 5,
							},
							{
								label: '深圳',
								value: 6,
							},
							{
								label: '广州',
								value: 7,
							},
							{
								label: '成都',
								value: 8,
							},
							{
								label: '杭州',
								value: 9,
							},
							{
								label: '天津',
								value: 10,
							}
						]
					},
					{
						type: 'industry',
						title: '按行业',
						value: '',
						height: '40vh',
						options: [
							{
								label: '默认',
								value: 0,
							}
						]
					},
				],
				groupList:[],
				dataList: []
			}
		},
		onLoad() {
			let app = this.$u.sys()
			// console.log('app',app)
			this.listHeight = app.safeArea.height
			this.getResourceTop()
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
				this.$api.getResourceList(data,pageNo,pageSize).then(res => {
					if(!res.data.list){
						this.$refs.paging.complete([])
						// this.$refs.paging.endRefresh()
						return
					}
					const dataList = res.data.list.map(v=>({
						...v,
						name:v.groupName,
						avatar: v.groupAvatar,
						// avatar: 'https://wx.dpxtd.com' + v.groupAvatar,
						content: v.projectName,
						province: v.province,
						city: v.city,
						userTitle: v.userTitle,
						userIndustry: v.userIndustry
					}))
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					uni.stopPullDownRefresh()
				})
			},
			// 置顶
			getResourceTop(){
				this.$api.getResourceTop().then(res => {
					let dataList = res.data.list.map(v=>({
						id:v.id,
						name:v.groupName,
						icon:v.groupAvatar
					}))
					console.log('dataList',dataList)
					this.groupList = dataList.slice(0, 9)
				})
				this.getDicList()
			},
			onScrollPage(e){
				let scrollTop = e.detail.scrollTop
				// console.log('onScrollPage',scrollTop)
				this.showDropdown = (scrollTop >= 447)
			},
			openDropdown(index){
				console.log('index',index)
				this.showDropdown = true
				console.log('refDropdown',this.$refs.refDropdown)
				this.$nextTick(()=>{
					this.$refs.refDropdown.menuClick(index)
					this.$refs.paging.scrollIntoViewById('listContent')
				})
			},
			cityChange(e){
				console.log('cityChange',e)
				this.city = e? e.city.label:''
				this.$refs.refDropdown.close()
				this.$refs.paging.reload()
			},
			dropdownChange(e){
				console.log('cityChange',e)
				const data = this.dropdownIndustry.options
				this.industry = e===0?'':data[e].value
				this.$refs.paging.reload()
			},
			// 跳转详情页面
			goResourcePage(id) {
				this.$u.route('pages/index/resourceInfo',{id})
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('pages/admin/resource/add')
			},
			// 网络请求数据
			getDicList(){
				this.$api.getDicList().then(res=>{
					let industry = res.data.find(v=>v.type==='industry')
					this.dropdownIndustry.options = [{
						label: '默认',
						value: 0,
					},...industry.items]
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