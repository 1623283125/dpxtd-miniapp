<template>
	<view class="list-wrap px-2">
		<view v-for="(item,i) in dataList" :key="i" class="bg-white radius-10 px-2 mb-1">
			<view v-if="show" @click="goEditPage(item.id)" class="row align-center justify-between py-2">
				<text class="font-12" :class="'status-'+item.auditStatus">
					{{getStatus(item.auditStatus)}}
				</text>
				<u-icon name="arrow-right" color="#999" size="28" />
			</view>
			<view @click="goInfoPage(item)" class="row py-3 u-border-top">
				<view class="col justify-between flex-1 mr-1">
					<view class="title mb-2 font-15 u-line-2">
						{{item.title}}
					</view>
					<view class="row align-center font-12">
						<text class="color3">{{item.hostUnit}}</text>
						<!-- <text class="ml-3" style="color:#48A5FE">{{item.hostName}}</text> -->
					</view>
				</view>
				<view class="x-center flex-shrink">
					<image :src="item.coverImage" style="width:240rpx;height:144rpx;border-radius:6rpx;" mode="aspectFill" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"card-list-news",
		props:{
			dataList:{
				type:Array,
				default:()=>[]
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				status:['审核中','审核通过','审核拒绝'],
				pages:{
					news: '/pages/index/newsInfo',
					match:'/pages/index/newsEventInfo',
					lecture: '/pages/index/newsLectureInfo',
				}
			};
		},
		methods:{
			// 跳转详情页面
			goInfoPage(item) {
				console.log('item',item)
				let path = this.pages[item._type]
				this.$u.route(path,{
					id:item.id,
					type:item._type
				})
			},
			// 跳转编辑页面
			goEditPage(id){
				console.log('goEditPage',id)
			},
			getStatus(status){
				let i = +status-1
				return this.status[i]
			},
		}
	}
</script>

<style lang="scss" scoped>
	.status-1{
		color:#FCAE47;
	}
	.status-2{
		color:#48A5FE;
	}
	.status-3{
		color:#FE5148;
	}
</style>