<template>
	<view class="mr-progress-iem x-center position-relative">
		<view class="line position-absolute z-index-1" :style="[getStyles]" />
		<view class="position-relative z-index-2">
			<u-icon :label="item.label" :name="item.icon" label-pos="bottom" :color="item.id<=current?bgColor1:bgColor2" size="60" :label-color="item.id<=current?bgColor1:bgColor2"  label-size="26" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "mr-progress-item",
		props: ['item','current'],
		data() {
			return {
				bgColor1:'#48A5FE',
				bgColor2:'#CCCCCC',
				transparent:'transparent',
			};
		},
		computed:{
			getStyles(){
				let styles = {}
				let color1 = ''
				let color2 = ''
				if(this.item.order===1 || this.item.order===4){
					color1 = this.transparent
					color2 = this.item.id<=this.current?this.bgColor1:this.bgColor2
				}else{
					color1 = color2 = this.item.id<=this.current?this.bgColor1:this.bgColor2
				}
				styles.background = `linear-gradient(90deg, ${color1} calc(50% - 20rpx), transparent calc(50% - 20rpx), transparent calc(50% + 20rpx),${color2} calc(50% + 20rpx))`
				return styles
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mr-progress-iem {
		--bg-color:#48A5FE;
		.line {
			height: 1px;
			width: 100%;
			left: 0;
			top: 30rpx;
			// background: linear-gradient(90deg, #48A5FE calc(50% - 20rpx), transparent calc(50% - 20rpx), transparent calc(50% + 20rpx), #48A5FE calc(50% + 20rpx));
		}
	}
</style>