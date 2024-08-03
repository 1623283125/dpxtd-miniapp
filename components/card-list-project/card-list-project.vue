<template>
	<view class="list-wrap px-2">
		<view v-for="(item,i) in dataList" :key="i" class="bg-white radius-10 px-2 mb-1">
			<view v-if="show" @click="goEditPage(item.id)" class="row align-center justify-between py-2">
				<text class="font-12" :class="'status-'+item.auditStatus">
					{{getStatus(item.auditStatus)}}
				</text>
				<u-icon name="arrow-right" color="#999" size="28" />
			</view>
			<view @click="goInfoPage(item.id)" class="row py-3 u-border-top">
				<u-avatar size="140" :src="item.coverImage" mode="square" />
				<view class="flex-1 ml-2 overflow-hidden">
					<view class="row align-center mb-1">
						<view class="row align-center flex-1 mr-1 u-line-2">
							<view class="font-14 mr-1 font-weight-500 u-line-1">
								{{item.userNickname}}
							</view>
						</view>
						<view class="row align-center line-height-1 font-12" style="flex-shrink: 0;">
							<text class="mr-1" style="color:#808080;">{{item.province+item.city}}</text>
							<u-icon name="map" color="#808080" size="24" />
						</view>
					</view>
					<view class="row align-center justify-between" style="color:#808080;">
						<view class="row align-center line-height-1 font-12">
							<text>500以上</text>
							<text class="u-border-left ml-1 pl-1">{{item.pvCount}}人浏览</text>
						</view>
						<view v-if="isNewDate(item.deadline)" class="row align-center line-height-1 font-12"
							style="background: linear-gradient(90deg,#47A5FC,#7EBFFC,#47A5FC);padding:6rpx 10rpx;color:#fff;border-radius: 4rpx;">
							截止{{$u.timeFormat(item.deadline, 'yyyy年mm月dd日')}}
						</view>
						<view v-else class="row align-center line-height-1 font-12"
							style="background: linear-gradient(90deg,#FF9032,#FFB96F,#FF9032);padding:6rpx 10rpx;color:#fff;border-radius: 4rpx;">
							已停止
						</view>
					</view>
					<view class="mt-2 u-line-2" style="color:#4D4D4D;">
						{{item.content}}
						<!-- <u-parse :html="getRichHtml(item.content)" 
							:show-with-animation="true" /> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "card-list-project",
		props: {
			dataList: {
				type: Array,
				default: () => []
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				status: ['审核中', '审核通过', '审核拒绝']
			};
		},
		methods: {
			// 跳转详情页面
			goInfoPage(id) {
				this.$u.route('/pages/index/projectInfo', {
					id
				})
			},
			// 跳转编辑页面
			goEditPage(id){
				console.log('goEditPage',id)
			},
			getStatus(status) {
				let i = +status - 1
				return this.status[i]
			},
			// 日期比较
			isNewDate(dtString) {
			  // 将目标日期字符串转换为日期对象
			  const targetDate = new Date(dtString);
			  // 获取当前日期时间
			  const currentDate = new Date();
			  // 比较日期
			  return targetDate >= currentDate
			},
		}
	}
</script>

<style lang="scss" scoped>
	.status-1 {
		color: #FCAE47;
	}

	.status-2 {
		color: #48A5FE;
	}

	.status-3 {
		color: #FE5148;
	}
</style>