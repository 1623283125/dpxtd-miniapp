<template>
	<view class="help-page">
		<view class="bg-white overflow-hidden">
			<u-cell-group :border="false">
				<u-cell-item @click="goInfoPage(1)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="使用规范" />
				<u-cell-item @click="goInfoPage(2)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="账号个人信息" />
				<u-cell-item @click="goInfoPage(3)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="人脉体系" />
				<u-cell-item @click="goInfoPage(4)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="项目发布管理" />
				<u-cell-item @click="goInfoPage(5)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="其他问题" />
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			// 跳转详情页面
			goInfoPage(type){
				this.$u.route('pages/mine/kefuInfo',{
					type
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
