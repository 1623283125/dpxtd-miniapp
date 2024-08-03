<template>
	<view @click.stop="goInfoPage(item)" class="bg-white radius-10 overflow-hidden mt-1" style="width:348rpx;"
		:style="styles">
		<view class="w-100 position-relative">
			<!-- <u-lazy-load :duration="300" :image="item.coverImage">
				</u-lazy-load> -->
			<u-image :src="item.coverImage" width="100%" mode="widthFix" bgColor="#fff" :minHeight="150">
				<view slot="loading" class="x-center w-100 h-100">
					<u-loading mode="flower" size="44"></u-loading>
				</view>
			</u-image>
			<!-- <view class="px-2 pb-2 pt-5 font-12 position-absolute left-0 right-0 bottom-0"
			style="background:linear-gradient(180deg,transparent,rgba(0,0,0,0.7));color:#fff">
				{{item.industryName}}
			</view> -->
		</view>
		<view class="p-2">
			<view class="mb-2 u-line-2 font-14">
				<view class="row align-center u-line-1">
					<text class="color3">投资意向：</text>
					<text class="u-line-1">{{item.investIntent}}</text>
				</view>
				<view class="row align-center u-line-1">
					<text class="color3">投资规模：</text>
					<text style="color:#F44336">{{item.investScale}}万元</text>
				</view>
			</view>
			<view @click.stop="goUserProfilePage(item)" class="row align-center">
				<view class="y-center line-height-1">
					<u-avatar size="40" :src="item.avatar" :sex-bg-color="item.sex===0?'#FFDEDE':'#C2ECFE'"
						:sex-icon="`/static/images/sex-${item.sex}.png`"></u-avatar>
				</view>
				<text class="flex-1 u-line-1 ml-1 font-12 font-weight-300 u-tips-color">{{item.name}}</text>
				<u-rate v-model="item.rate" size="18" active-color="#F3D958" disabled>
				</u-rate>
			</view>
			<view class="row align-center justify-between mt-2">
				<view class="font-12 u-tips-color">{{item.industryName}}</view>
				<view class="row align-center">
					<view class="line-height-1" style="margin-right: 6rpx;">
						<u-icon name="map" color="#808080" size="24"></u-icon>
					</view>
					<text class="font-12 u-tips-color">{{item.city}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "card-wrap",
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			styles: {
				type: String,
				default: '0 24rpx'
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
					margin: this.margin
				}
				return style
			}
		},
		methods: {
			// 跳转详情页面
			goInfoPage(item) {
				this.$u.route('pages/index/funderInfo', {
					id: item.id
				})
			},
			// 跳转个人页面
			goUserProfilePage(item) {
				this.$u.route('pages/index/userProfile', {
					id: item.userId
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.a {}
</style>