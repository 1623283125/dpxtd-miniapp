<template>
	<view class="mine-page">
		
		<!-- 会员卡片 -->
		<view class="vip-wrap px-2 mt-2">
			<view class="radius-16 row align-center text-white" style="background:linear-gradient(90deg,#5CB3F4,#60b4f9,#53a3f2,#3C9BE0);width:100%;height:300rpx;">
				<view class="row align-center w-100">
					<view class="y-center flex-1">
						<text class="font-12">累计充值(元)</text>
						<text class="font-24 font-weight-bold">{{convertToAmount(wallet.rechargeTotalAmount)}}</text>
					</view>
					<view class="y-center flex-1">
						<text class="font-12">D币(个)</text>
						<text class="font-24 font-weight-bold">{{wallet.scoreBalance}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 导航菜单 -->
		<view class="px-2 mt-2">
			<view class="bg-white radius-10 overflow-hidden">
				<u-cell-group :border="false">
					<u-cell-item @click="goRecordPage(1)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="充值记录" />
					<u-cell-item @click="goRecordPage(2)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="消费记录" />
				</u-cell-group>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wallet:{
					rechargeTotalAmount:0.00,
					scoreBalance:0
				}
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData(){
				this.getWalletInfo()
			},
			// 获取用户信息
			getWalletInfo(){
				this.$api.getWalletInfo().then(res=>{
					this.wallet = res.data
				})
			},
			// 充值记录/消费记录
			goRecordPage(type){
				this.$u.route('pages/mine/walletRecord',{
					type
				})
			},
			// 金额格式化
			convertToAmount(n) {
			  // 检查输入是否合法
			  if (typeof n !== 'number' || n < 0) {
			    return "-"
			  }
			  // 计算金额
			  const amount = n * 0.01
			  return amount.toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.mine-page{
		.line-border{
			width: 1rpx;
			height: 50rpx;
			background:linear-gradient(0deg,rgba(203,225,255,0),#CBE1FF,rgba(203,225,255,0));
		}
		.line-border2{
			width: 1rpx;
			height: 80rpx;
			background:linear-gradient(0deg,rgba(203,225,255,0),#EEF2FF,rgba(203,225,255,0));
		}
	}
</style>
