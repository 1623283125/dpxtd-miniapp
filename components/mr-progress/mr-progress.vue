<template>
	<view class="mr-progress pr-5 position-relative">
		<view class="row flex-wrap">
			<view class="py-3" v-for="item in progressList" :key="item.id" style="width:33.33333%;"  :style="{order:item.order}">
				<mr-progress-item :item="item" :current="current" />
			</view>
		</view>
		<view class="line-right position-absolute" style="right:50rpx;width: 1px;top:60rpx;bottom:90rpx" :style="[getRightLine]" />
	</view>
</template>

<script>
	export default {
		name: "mr-progress",
		props:['current'],
		data() {
			return {
				progressList:[
					{
						id:1,
						order:1,
						status:true,
						label:'发布需求',
						icon:'checkmark-circle-fill'
					},
					{
						id:2,
						order:2,
						status:true,
						label:'地平线投标',
						icon:'checkmark-circle-fill'
					},
					{
						id:3,
						order:3,
						status:true,
						label:'雇主选标',
						icon:'checkmark-circle-fill'
					},
					{
						id:4,
						order:6,
						status:false,
						label:'托管资金',
						icon:'checkmark-circle-fill'
					},
					{
						id:5,
						order:5,
						status:false,
						label:'地平线找工作',
						icon:'checkmark-circle-fill'
					},
					{
						id:6,
						order:4,
						status:false,
						label:'验收付款',
						icon:'checkmark-circle-fill'
					}
				]
			};
		},
		computed:{
			getRightLine(){
				let styles = {}
				if(this.current>=4){
					styles.background = `#48A5FE`
				}else{
					styles.background = `#CCCCCC`
				}
				return styles
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mr-progress {
		
	}
</style>