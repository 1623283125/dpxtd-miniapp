<template>
	<view class="footer-safe-area">
		<view :style="{height:height,width:'100%'}"></view>
		<view class="safe-area-inset-bottom15"></view>
		<view class="position-fixed left-0 right-0 bottom-0 z-index-5" :style="{background:bg}" :class="customClass">
			<view class="w-100">
				<slot></slot>
			</view>
			<view class="safe-area-inset-bottom15"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"footer-safe-area",
		props:{
			height:{
				type:String,
				default:'110rpx'
			},
			customClass:{
				type:String,
				default:''
			},
			bg:{
				type:String,
				default:'transparent'
			}
		}
	}
</script>

<style>

</style>
