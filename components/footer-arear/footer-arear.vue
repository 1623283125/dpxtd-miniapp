<template>
	<!-- 底部预留空间 -->
	<view class="footer-area w-100 safe-area-inset-bottom">
		<view class="footer-content"></view>
	</view>
</template>

<script>
	export default {
		name:"footer-arear",
		data() {
			return {
				
			};
		}
	}
</script>           
 
<style scoped lang="scss">
	.footer-area{
		background: #F7F7F7;
		.footer-content{
				height:88rpx;
		} 
	} 
</style>