<template>
	<view class="list-wrap px-2">
		<view v-for="(item,i) in dataList" :key="i" class="bg-white radius-10 px-2 mb-1">
			<view v-if="show" @click="goEditPage(item.id)" class="row align-center justify-between py-2">
				<text class="font-12" :class="'status-'+item.auditStatus">
					{{getStatus(item.auditStatus)}}
				</text>
				<u-icon name="arrow-right" color="#999" size="28"></u-icon>
			</view>
			<view @click="goInfoPage(item.id)" class="row py-3 u-border-top">
				<u-avatar size="72" :src="item.userAvatar" />
				<view class="flex-1 ml-2">
					<view class="row align-center justify-between mb-08 line-height-13">
						<view class="row align-center">
							<text class="font-14 mr-1 font-weight-500">{{item.userNickname}}</text>
							<view class="x-center">
								<u-icon :name="`/static/images/sex-${item.userSex}.png`"  size="24" />
							</view>
							<view class="font-12 ml-2" style="color:#F33D3D">
								投资规模：{{item.investScale}}万元
							</view>
						</view> 
						<view class="x-center">
							<u-rate v-model="item.userStarLevel" size="24" 
								active-color="#F3D958" disabled />
						</view>
					</view>
					<view class="row align-center justify-between color3">
						<view class="row align-center line-height-1 font-12">
							<text>意向：{{item.investIntent}}</text>
						</view>
						<view class="row align-center line-height-1 font-12">
							<text class="mr-1">{{item.province+item.city}}</text>
							<u-icon name="map" color="#808080" size="24" />
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "card-list-funder",
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
				this.$u.route('/pages/index/funderInfo', {
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