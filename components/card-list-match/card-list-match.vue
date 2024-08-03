<template>
	<view class="list-wrap px-2">
		<div @click="goInfoPage(item)" v-for="(item,i) in dataList" :key="i" class="row py-2 bg-white radius-10 px-2">
			<view class="col justify-between flex-1 mr-1">
				<view class="title mb-2 u-line-2">
					{{item.title}}
				</view>
				<view class="row align-center font-12">
					<text class="color3">{{item.hostUnit}}</text>
					<!-- <text class="ml-3" style="color:#48A5FE">{{item.schoolName}}</text> -->
				</view>
			</view>
			<view class="x-center flex-shrink">
				<image :src="item.coverImage" style="width:240rpx;height:144rpx;border-radius: 6rpx;" mode="aspectFill" />
			</view>
		</div>
	</view>
</template>

<script>
	export default {
		name: "card-list-match",
		props:{
			dataList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {

			};
		},
		methods:{
			// 跳转详情页面
			goInfoPage(item) {
				this.$u.route('/pages/index/newsEventInfo',{
					id:item.id,
					type:'match'
				})
			},
		}
	}
</script>

<style>

</style>