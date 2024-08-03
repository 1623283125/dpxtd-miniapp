<template>
	<view class="recharge-page px-3">
		<!-- <view class="py-2 mt-3">
			<text>费用总计：</text>
			<text class="font-16 font-weight-500" style="color:red">¥100</text>
		</view> -->
		<view class="row align-center flex-wrap justify-between py-2">
			<view @click="btnCheckItem(i)" v-for="(item,i) in moneyList" :key="i" class="money-item y-center mt-2 radius-10 py-2 line-height-1" :class="{active:moneyIndex===i}">
				<view class="money mb-08">
					<text class="font-20 font-weight-500">{{item.money}}</text>
					<text class="font-14">元</text>
				</view>
				<text class="money font-12 color3">{{item.title}}D币</text>
			</view>
		</view>
		<view class="row align-center py-2 mt-2">
			<text>支付方式：</text>
			<view class="row align-center justify-between">
				<view class="x-center px-3 radius-10 line-height-1" style="border: 1rpx solid #a0cfff;height: 74rpx;background:#ecf5ff;">
					<u-icon label="微信支付" name="weixin-fill" label-color="#48A5FE"
						color="#00C801" size="32" label-size="26" label-pos="right" />
				</view>
				<view class="x-center px-3 font-13 radius-10 ml-2 line-height-1" style="border: 1rpx solid #c0c4cc;height: 74rpx;">
					其他支付方式
				</view>
			</view>
		</view>
		<view class="mt-5">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',background: '#48A5FE'}" hover-class="hover-class">马上充值</u-button>
		</view>
		<view class="row align-center py-2">
			<u-checkbox v-model="isAgree" label-size="26" active-color="#48A5FE">我已阅读并同意</u-checkbox>
			<text class="font-13" style="color:#48A5FE">星级评判标准</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAgree:false,
				moneyIndex:0,
				moneyList:[
					{
						id:1,
						money:'30',
						payMoney: 3000,
						title:'300'
					},
					{
						id:2,
						money:'50',
						payMoney: 5000,
						title:'500'
					},
					{
						id:3,
						money:'100',
						payMoney: 10000,
						title:'1000'
					},
					{
						id:4,
						money:'200',
						payMoney: 20000,
						title:'2000'
					},
					{
						id:5,
						money:'300',
						payMoney: 30000,
						title:'3000'
					},
					{
						id:6,
						money:'500',
						payMoney: 50000,
						title:'5000'
					}
				]
			}
		},
		onLoad() {
		},
		onShow(){
		},
		methods: {
			reloadData(){
				this.getUserInfo()
			},
			// 获取用户信息
			getUserInfo(){
				this.$api.getUserInfo().then(res=>{
					this.userInfo = res.data
					this.isBus = res.data.busId
				})
			},
			// 提交支付
			btnSubmit(){
				if(!this.isAgree){
					this.$u.toast('请勾选同意后在操作')
					return
				}
				let data = {
					openId: this._userInfo.openId,
					rechargeAmount: this.moneyList[this.moneyIndex].payMoney
					// rechargeAmount: 0.01
				}
				this.$api.createOrder(data).then(res=>{
					let data = JSON.parse(res.data)
					console.log('data',data)
					this.orderPay(data)
				})
			},
			// 订单支付
			orderPay(data){
				uni.requestPayment({
					provider: "wxpay", 
					...data,
					success(res) {
						console.log('res',res)
					},
					fail(err) {
						console.log('err',err)
						this.$u.toast('支付失败')
					}
				})
			},
			// 选中充值金额
			btnCheckItem(i){
				this.moneyIndex = i
			}
		}
	}
</script>

<style lang="scss">
	.recharge-page{
		.money-item{
			width: 30%;
			// height: 100rpx;
			border: 1rpx solid #c0c4cc;
		}
		.active{
			background-color: #fef0f0;
			border: 1rpx solid #fab6b6;
			.money{
				color: #fa3534;
			}
		}
	}
</style>
