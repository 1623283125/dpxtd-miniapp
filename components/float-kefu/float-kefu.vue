<template>
	<view class="kefu bg-white x-center radius-circle position-fixed" style="top:45%;right:30rpx;z-index: 99;">
		<!-- <image src="/static/images/kefu.png" mode="widthFix" style="width:60rpx" /> -->
		<u-button :custom-style="{background:'transparent',border:'none',width:'60rpx',height:'60rpx'}" :hair-line="false" open-type="contact">
			<u-icon name="/static/images/kefu.png" size="60" />
		</u-button>
	</view>
</template>

<script>
	export default {
		name:"float-kefu",
		data() {
			return {
				
			};
		},
		methods:{
			// 客服页面
			goKefuPage() {
				this.$u.toast('客服页面')
				// this.$u.route('pages/admin/partner/add')
			},
		}
	}
</script>

<style>

</style>