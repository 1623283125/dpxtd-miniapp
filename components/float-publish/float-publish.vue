<template>
	<view @click="goPublishPage()" :class="position==='fixed'?'float-fixed':'float-relative'">
		<view class="float-publish">
			<image src="/static/images/publish.png" mode="widthFix" style="width:144rpx;height:96rpx;" />
		</view>
	</view>
</template>

<script>
	export default {
		name:"float-publish",
		props:{
			position:{
				type:String,
				default:'fixed'
			}
		},
		data() {
			return {
				goPublishPage(){
					this.$emit('click')
				},
			};
		}
	}
</script>

<style lang="scss" scoped>
	.float-fixed{
		right:30rpx;
		bottom:50rpx;
		z-index: 99;
		position: fixed;
		.float-publish{
			
		}
	}
	.float-relative{
		position: relative;
		.float-publish{
			right:30rpx;
			bottom:50rpx;
			z-index: 99;
			position: absolute;
		}
	}
</style>