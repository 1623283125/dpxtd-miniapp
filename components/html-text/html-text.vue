<template>
	<!-- #ifndef MP-WEIXIN -->
	<view class="w-100">
	<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
	<view class="w-100" style="margin:0 -8rpx;">
	<!-- #endif -->
		<textarea v-model="html" disabled auto-height :maxlength="-1" placeholder=""
		 style="width:100%;font-size:30rpx;line-height:1.5;padding:0;margin:0;" />
	</view>
</template>

<script>
	export default {
		name:"html-text",
		props:['html'],
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>