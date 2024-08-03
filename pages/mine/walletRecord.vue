<template>
	<view class="search-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true">
				<view class="content">
					<view class="list-wrap px-2 mt-2">
						<div v-for="(item,i) in dataList" :key="i" class="bg-white radius-16 col mb-2 overflow-hidden">
							<view v-if="type==1" class="row p-2">
								<view class="col flex-1">
									<text class="font-15">{{item.mchOrderNo}}</text>
									<text class="font-12 u-tips-color" style="margin-top:4rpx;">{{item.createDate}}</text>
								</view>
								<view class="x-center line-height-1">
									<template v-if="item.rechargeAmount>0">
										<u-icon name="plus" color="#2979ff" size="28" />
										<view class="font-18 font-weight-500 ml-1 line-height-1" style="color:#2979ff">
											{{convertToAmount(item.rechargeAmount)}}</view>
									</template>
									<template v-else>
										<u-icon name="minus" color="#f29100" size="28" />
										<view class="font-18 font-weight-500 ml-1 line-height-1" style="color:#f29100">
											{{convertToAmount(item.rechargeAmount)}}</view>
									</template>
								</view>
							</view>
							<view v-else class="row p-2">
								<view class="col flex-1">
									<text class="font-15">{{item.notes}}</text>
									<view class="mb-1" style="margin-top:4rpx;">
										<text class="font-12 u-tips-color mr-4">
										变更前：{{item.changeBefore}}D币
										</text>
										<text class="font-12 u-tips-color">
										变更后：{{item.changeAfter}}D币
										</text>
									</view>
									<view class="font-12 u-tips-color">
										<text style="margin-top:4rpx;">{{item.createDate}}</text>
									</view>
								</view>
								<view class="x-center line-height-1">
									<template v-if="item.changeAfter-item.changeBefore>0">
										<u-icon name="plus" color="#2979ff" size="28" />
										<view class="font-18 font-weight-500 ml-1 line-height-1" style="color:#2979ff">
											{{item.changeAmount}}</view>
									</template>
									<template v-else>
										<u-icon name="minus" color="#f29100" size="28" />
										<view class="font-18 font-weight-500 ml-1 line-height-1" style="color:#f29100">
											{{item.changeAmount}}</view>
									</template>
								</view>
							</view>
						</div>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				titles: [
					'',
					'连续评论3天获赠D币10',
					'成功邀请1位好友获赠D币30',
					'投稿获赠D币100'
				],
				dataList: [
					// {
					// 	"id": "4b6773ec32724b5badbc8391c0a9f73a", 
					// 	"taskType": 1, 
					// 	"taskStatus": 1 
					// },
					// {
					// 	"id": "bd7972454ec540ab950752a304eb2169", 
					// 	"taskType": 2, 
					// 	"taskStatus": 1 
					// },
					// {
					// 	"id": "bd7972454ec540ab950752a304eb21a1", 
					// 	"taskType": 3, 
					// 	"taskStatus": 1 
					// }
				]
			}
		},
		onLoad(opt) {
			this.type = parseInt(opt.type || 1)
			uni.setNavigationBarTitle({
				title: this.type === 1 ? '充值记录' : '消费记录'
			})
		},
		methods: {
			reloadData() {
				this.$refs.paging.reload()
			},
			// 获取列表数据
			queryList(pageNo, pageSize) {
				let data = {}
				if (this.type === 1) {
					this.$api.getRechargeList(data, pageNo, pageSize).then(res => {
						this.$refs.paging.complete(res.data.list||[])
					}).finally(() => {
						this.$refs.paging.endRefresh()
					})
				} else {
					this.$api.getChangeList(data, pageNo, pageSize).then(res => {
						this.$refs.paging.complete(res.data.list || [])
					}).finally(() => {
						this.$refs.paging.endRefresh()
					})
				}
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
	page,
	uni-page-body {
		height: 100%;
	}

	.search-page {}
</style>