<template>
	<view class="index-page">
		
		<!-- 顶部预留位置 -->
		<!-- <view class="top row align-center justify-between">
			<div v-for="item in 5" :key="item" class="flex-1 x-center">
				<text class="font-12 py-2" style="color:#808080">预留位置</text>
			</div>
		</view> -->
		
		<!-- swiper轮播图 -->
		<view v-if="lunboList.length>0" class="lunboList w-100 px-2 mt-2">
			<u-swiper @click="btnLunbo" :list="lunboList" height="260" />
		</view>
		
		<!-- Nav导航 -->
		<view class="navigation mt-2 px-2">
			<view class="bg-white py-1 radius-10 overflow-hidden">
				<u-grid @click="goNavPage" :border="false" col="4">
					<u-grid-item v-for="(item,index) in navList" :key="index" :customStyle="{padding:'8rpx 0'}" :index="item.page" bgColor="#fff">
						<u-image width="80rpx" height="80rpx" 
							:src="item.icon" shape="circle" />
						<text class="font-12 line-height-12 u-content-color">{{item.name}}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		
		<!-- 幸运转盘抽奖 -->
		<view class="lucky-wheel px-2 mt-2">
			<view @click="goLuckyWheelPage()" class="radius-10 text-white x-center">
				<image src="/static/images/lucky.png" mode="widthFix" 
					style="width:710rpx;height:100rpx;" />
			</view>
		</view>
		
		<!-- swiper轮播图 -->
		<!-- <view v-if="lunboList2.length>0" class="lunboList2 px-2 mt-2">
			<u-swiper :list="lunboList2" height="168"></u-swiper>
		</view> -->
		
		<view class="row align-center">
			<u-tabs :list="tabsList" :current="tabsIndex" inactive-color="#999" bg-color="transparent" active-color="#48A5FE" :active-item-style="{color:'#111'}" @change="changeTabs" />
		</view>
		
		<!-- 列表内容 -->
		<view v-if="tabsIndex===0" class="content">
			<view class="list-wrap px-2">
				<div @click="goProjectInfoPage(item)" v-for="(item,i) in projectList" :key="i" class="bg-white radius-10 row px-2 py-2 mb-2 overflow-hidden">
					<view class="col justify-between flex-1">
						<view class="font-15 font-weight-500 mb-2 u-line-2">
							{{item.title}}
						</view>
						<view class="row align-center justify-between font-12">
							<text class="color3">截止：{{item.endTime}}</text>
							<text class="color3">{{item.pvCount}}浏览</text>
						</view>
					</view>
					<view class="x-center flex-shrink ml-2" style="width:240rpx;height:144rpx;">
						<image :src="item.coverImage" style="width:240rpx;height:144rpx;border-radius: 12rpx;" mode="aspectFill" />
					</view>
				</div>
			</view>
		</view>
		<view v-if="tabsIndex===1" class="content">
			<view class="list-wrap px-2">
				<div @click="goPartnerInfoPage(item)" v-for="(item,i) in partnerList" :key="i" class="bg-white radius-10 row px-2 py-2 mb-2 overflow-hidden">
					<view class="col justify-between flex-1">
						<view class="font-15 font-weight-500 mb-2 u-line-2">
							{{item.title}}
						</view>
						<!-- <view class="row align-center font-12">
							<text class="color3 flex-1">{{item.type}}</text>
							<u-icon name="map" color="#808080" size="24"></u-icon>
							<text class="color3">{{item.city}}</text>
						</view> -->
					</view>
					<view class="x-center flex-shrink ml-2" style="width:240rpx;height:144rpx;">
						<image :src="item.coverImage" style="width:240rpx;height:144rpx;border-radius: 12rpx;" mode="aspectFill" />
					</view>
				</div>
			</view>
		</view>
		
		<!-- 微信隐私弹窗协议 -->
		<!-- #ifdef MP-WEIXIN -->
		<wxxy-agree-privacy />
		<!-- #endif -->	
		
	</view>
</template>

<script>
	import WaterfallProject from './components/WaterfallProject'
	export default {
		components:{
			WaterfallProject
		},
		data() {
			return {
				lunboList: [],
				lunboList2: [],
				navList:[
					{
						name:'找合伙',
						icon:'/static/images/nav-1.png',
						page:'/pages/index/partner'
					},
					{
						name:'找资源',
						icon:'/static/images/nav-2.png',
						page:'/pages/index/resource'
					},
					{
						name:'找项目',
						icon:'/static/images/nav-3.png',
						page:'/pages/index/project'
					},
					{
						name:'找资金',
						icon:'/static/images/nav-4.png',
						page:'/pages/index/funder'
					},
					{
						name:'大学生创业',
						icon:'/static/images/nav-5.png',
						page:'/pages/index/news?type=1'
					},
					{
						name:'退伍军人创业',
						icon:'/static/images/nav-6.png',
						page:'/pages/index/news?type=2'
					},
					{
						name:'残疾人创业',
						icon:'/static/images/nav-7.png',
						page:'/pages/index/news?type=3'
					},
					{
						name:'月光宝盒',
						icon:'/static/images/index-nav-new.png',
						page:'/pages/index/toolbox'
					}
				],
				tabsIndex: 0,
				tabsList:[
					{
						id:1,
						name: '项目路演',
					},{
						id:2,
						name: '合伙路演',
					}
				],
				partnerList: [],
				projectList:[]
			}
		},
		onLoad() {
			this.initData()
		},
		// 下拉刷新
		onPullDownRefresh(){
			console.log('下拉刷新')
			this.initData()
		},
		methods: {
			initData(){
				this.getHomeAdList()
				this.getHomeProjectList()
			},
			// 监听Tabs切换
			changeTabs(e){
				this.tabsIndex = e
				if(e===0){
					this.getHomeProjectList()
				}else{
					this.getHomeAdList()
				}
			},
			// 项目路演
			getHomeProjectList(){
				this.$api.getHomeProjectList().then(res=>{
					const projectList = res.data.map(v=>({
						...v,
						endTime: '2024-12-31',
						pvCount: 111
					}))
					this.projectList = projectList
				}).finally(()=>{
					uni.stopPullDownRefresh()
				})
			},
			// 广告位-轮播图
			getHomeAdList(){
				this.$api.getHomeAdList(0).then(res=>{
					const lunbo1 = res.data.projectAdList  
					const lunbo2 = res.data.partnershipAdList
					this.lunboList = lunbo1.map(v=>({
						id: v.id,
						url: '',
						title: v.title,
						image: v.coverImage
					}))
					this.partnerList = lunbo2.map(v=>({
						...v,
						type: '行业',
						city: '武汉市'
					}))
				})
			},
			goLuckyWheelPage(){
				this.$u.route('pages/mine/luckyWheel')
			},
			// 跳转合伙详情页面
			goPartnerInfoPage(item) {
				this.$u.route('pages/index/partnerInfo',{
					id:item.id
				})
			},
			// 跳转项目详情页面
			goProjectInfoPage(item) {
				this.$u.route('pages/index/projectInfo',{
					id:item.id
				})
			},
			// 跳转导航页面
			goNavPage(page){
				if(page){
					if(page.includes('roast')){
						this.$u.route({
							url: page,
							type:'switchTab'
						})
					}else{
						this.$u.route(page)
					}
				}else{
					this.$u.toast('开发中')
				}
			},
			// 轮播点击
			btnLunbo(i){
				this.$u.route('pages/index/projectInfo',{
					id: this.lunboList[i].id
				})
			},
		}
	}
</script>

<style lang="scss">
	.index-page {
		
	}
</style>
