<template>
	<view class="cart-wrap bg-white overflow-hidden" :style="[style]">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"card-wrap",
		props:{
			round:{
				type: [Number, String],
				default: 20
			},
			margin:{
				type: String,
				default: '0 24rpx'
			},
			padding:{
				type: String,
				default: '10rpx 30rpx'
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			style() {
				let style = {}
				style = {
					padding: this.padding,
					margin: this.margin,
					borderRadius: `${this.round}rpx`
				}
				return style
			}
		}
	}
</script>

<style>
.a{
	border-radius: ;
}
</style>