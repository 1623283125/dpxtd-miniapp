<template>
	<view class="list-wrap px-2">
		<view v-for="(item,i) in dataList" :key="i" class="bg-white radius-10 px-2 mb-1">
			<view v-if="show" @click="goEditPage(item.id)" class="row align-center justify-between py-2">
				<text class="font-12" :class="'status-'+item.auditStatus">
					{{getStatus(item.auditStatus)}}
				</text>
				<u-icon name="arrow-right" color="#999" size="28" />
			</view>
			<view @click="goInfoPage(item.id)" class="row py-3 u-border-top">
				<u-avatar size="88" :src="item.groupQrCode" mode="square" />
				<view class="flex-1 ml-2">
					<view class="row align-center justify-between">
						<view class="row align-center line-height-14 font-12">
							<text class="font-14 font-weight-500">{{item.groupName}}</text>
						</view>
						<!-- <view class="row align-center line-height-12 font-12">
							<text class="mr-1 color3">{{item.province+item.city}}</text>
							<u-icon name="map" color="#808080" size="24" />
						</view> -->
					</view>
					<view class="mt-1">
						{{item.projectName}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"card-list-resource",
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
				status:['审核中','审核通过','审核拒绝']
			};
		},
		methods:{
			// 跳转详情页面
			goInfoPage(id) {
				this.$u.route('/pages/index/resourceInfo',{id})
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