<template>
	<view class="success-page y-center px-3">
		<view class="y-center">
			<u-icon name="checkmark-circle-fill" size="104" color="#68BB8D" />
			<view class="mt-3" style="font-size: 48rpx;">上传成功</view>
			<view class="py-2" style="color:#808080">上传成功，请耐心等待发布者验收</view>
			<view class="mt-5 pt-3">
				<u-button @click="btnBack()" shape="circle" type="primary" :custom-style="{width: '550rpx',height: '88rpx',fontSize: '30rpx',background: '#48A5FE'}" hover-class="hover-class">返回</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods: {
			// 返回
			btnBack() {
				uni.navigateBack({
					delta:2
				})
			},
			// 刷新上个页面的数据
			reloadDetailData(type){
				const pages = getCurrentPages()
				const page = pages[pages.length - 2]
				page.$vm.reloadData(type)
			}
		}
	};
</script>

<style lang="scss">
	uni-page,uni-page-body{
		height: 100%;
	}
</style>

<style scoped lang="scss">
	.success-page {
		height: 100%;
	}
</style>
