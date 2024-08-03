<template>
	<view class="index-page y-center">
		<image style="width: 100%;" src="/static/images/door.gif" mode=""></image>
	</view>
</template>


<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData(){
				setTimeout(()=>{
					this.goPage()
				},3000)
			},
			// 首页
			goPage(){
				this.$u.route({
					url:'pages/index/index',
					type:'tab'
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-page {
		background: #fff;
		min-height: 100vh;
	}
</style>
