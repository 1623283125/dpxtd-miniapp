<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="webUrl">

		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl:'',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(opt) {
			this.webUrl = opt.url||''
			this.initData()
		},
		methods: {
			initData(){
				
			}
		}
	}
</script>

<style>
</style>