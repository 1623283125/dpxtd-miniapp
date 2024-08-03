<template>
	<view class="col">
		
		<!-- 项目进程 -->
		<view class="px-2">
			<view class="title py-2">
				<text class="left-line font-15">项目进程</text>
			</view>
			<view class="content">
				<mr-progress :current="currentIndex" />
			</view>
		</view>
		
		<!-- 任务要求 -->
		<view class="px-2 mt-2 u-border-top">
			<view class="title py-2">
				<text class="left-line font-15">任务要求</text>
			</view>
			<view class="content pl-15">
				<view class="body">
					任务要求任务要求任务要求任务要求任务要求任务
				</view>
			</view>
		</view>
		
		<!-- 任务附件 -->
		<view class="px-2 mt-2 u-border-top">
			<view class="title py-2">
				<text class="left-line font-15">任务附件</text>
			</view>
			<view class="content pl-15">
				<view class="body">
					附件说明附件说明，附件说明附件说明附件，说明
				</view>
			</view>
		</view>
		
		<!-- 温馨提示 -->
		<view class="px-2 pt-5 mt-2 u-border-top">
			<view class="col pl-15 font-12" style="color:#808080;">
				<text class=" font-13">温馨提示：</text>
				<text class="mt-2 line-height-12">1.温馨提示温馨提示温馨提示温馨提示</text>
				<text class="mt-1 line-height-12">2.温馨提示温馨提示温馨提示温馨提示</text>
				<text class="mt-1 line-height-12">3.温馨提示温馨提示温馨提示</text>
			</view>
		</view>
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu></float-kefu>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:1,
				progressList:[
					{
						order:1,
						status:true,
						label:'发布需求',
						icon:'checkmark-circle-fill'
					},
					{
						order:2,
						status:true,
						label:'地平线投标',
						icon:'checkmark-circle-fill'
					},
					{
						order:3,
						status:true,
						label:'雇主选标',
						icon:'checkmark-circle-fill'
					},
					{
						order:6,
						status:false,
						label:'托管资金',
						icon:'checkmark-circle-fill'
					},
					{
						order:5,
						status:false,
						label:'地平线找工作',
						icon:'checkmark-circle-fill'
					},
					{
						order:4,
						status:false,
						label:'验收付款',
						icon:'checkmark-circle-fill'
					}
				]
			}
		},
		onLoad() {
			// console.log('app',app)
		},
		computed:{
			getRightLine(){
				let styles = {}
				let hasItem = this.progressList.find(v=>v.status&&v.order===6)
				if(hasItem){
					styles.background = `#48A5FE`
				}else{
					styles.background = `#CCCCCC`
				}
				return styles
			}
		},
		methods: {
			btnSearch(i) {
				
			}
		}
	}
</script>


<style lang="scss">
	page,uni-page-body{
		height: 100%;
	}
	.pl-15{
		padding-left: 15rpx;
	}
	.left-line {
		padding-left: 15rpx;
		position: relative;
		&:before{
			content:'';
			position: absolute;
			height: 75%;
			width: 0px;
			top:50%;
			left:0rpx;
			transform: translateY(-50%);
			border-radius: 3px;
			border-left: 3px solid #48A5FE;
		}
	}
</style>