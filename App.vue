<script>
	export default {
		globalData: { 
			gData:null
		}, 
		onLaunch: function(opt) {
			console.log('App launch',opt)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "common/styles/common.css";
	/*每个页面公共css */
	
	/* start--iPhoneX底部安全区定义--start */
	.safe-area-inset-bottom {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.safe-area-inset-bottom15 {
		padding-bottom: calc(constant(safe-area-inset-bottom) - 15px);
		padding-bottom: calc(env(safe-area-inset-bottom) - 15px);
	}
</style>
