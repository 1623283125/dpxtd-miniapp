<template>
	<view class="setting-page">
		<!-- 幸运抽奖 -->
		<view class="x-center py-5">
			<l-dialer :prizeList="prizeList" 
				@click="$u.throttle(btnStart,500)" @done="onDone" ref="dialer" />
		</view>
		<view class="px-3">
			<view class="bg-white radius-16 px-3 py-3">
				<view class="x-center font-18 font-weight-bold">
					活动规则
				</view>
				<view class="py-1 mt-1">
					1、注册账号后即可每天领取三次抽奖机会
				</view>
				<view class="py-1">
					2、D币将分为10D币，20D币，50D币，150D币，200D币，250D币，300D币
				</view>
				<view class="py-1">
					3、活动最终解释权归主办方所有。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:0,
				totalCount:0,
				prizeList: []
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData() {
				this.getLuckyWheel()
			},
			getLuckyWheel(){
				this.$api.getLuckyWheel().then(res=>{
					this.totalCount = res.data.remainDraw
					this.prizeList = res.data.awardSet
.map(v=>({
						...v,
						img: v.score>0?'https://img11.360buyimg.com/pop/jfs/t1/162790/37/15087/28046/6062a49aE8f2c10f2/5591ff0ff38a45e2.png':''
					}))
				})
			},
			startLuckyWheel(){
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				this.$api.startLuckyWheel().then(res=>{
					this.totalCount = res.data.remainDraw
					const index = this.prizeList.findIndex(v=>v.id===res.data.hit.id)
					this.$refs.dialer.run(index)
				}).finally(()=>{
					uni.hideLoading()
				})
			},
			// 开始抽奖
			btnStart(){
				if(this.totalCount>0){
					this.startLuckyWheel()
				}else{
					this.$u.toast('今日抽奖用完了～')
				}
			},
			// 抽奖结果
			onDone(index) {
				const prize = this.prizeList[index]
				uni.showModal({
					title: prize.score == 0 ? '很遗憾': '恭喜您',
					content: prize.name
				})
			}
		}
	}
</script>

<style lang="scss">
	.setting-page {
		.line-border {
			width: 1rpx;
			height: 50rpx;
			background: linear-gradient(0deg, rgba(203, 225, 255, 0), #CBE1FF, rgba(203, 225, 255, 0));
		}

		.line-border2 {
			width: 1rpx;
			height: 80rpx;
			background: linear-gradient(0deg, rgba(203, 225, 255, 0), #EEF2FF, rgba(203, 225, 255, 0));
		}
	}
</style>