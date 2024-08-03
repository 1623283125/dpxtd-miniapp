<template>
	<view class="load-page y-center">
		<view v-if="isError" class="y-center">
			<u-empty text="出现错误" mode="page"></u-empty>
			<u-button @click="goHomePage()" type="primary" size="default">去首页看看</u-button>
		</view>
		<u-loading :show="!isError"  mode="flower" size="50" />
	</view>
</template>


<script>
	export default {
		data() {
			return {
				queryData:null,
				isError: false
			}
		},
		onLoad(opt) {
			const queryParams = decodeURIComponent(opt.q)
			console.log('onLoad',queryParams)
			const queryData = JSON.parse(queryParams)
			console.log('onLoad',queryData)
			this.queryData = queryData
			this.initData()
		},
		methods: {
			initData(){
				if (this._token) {
					this.showShare()
				}else{
					console.log('去登陆')
					this.$u.route('/pages/common/login')
				}
			},
			// 分享积分逻辑
			showShare() {
				const data = {...this.queryData}
				delete data.pagePath
				delete data.pageId
				if(data.changeType===-1){
					this.$api.showShareApp(data.shareCode).then(res => {
						this.goPage()
					}).catch(err=>{
						this.isError = true
					})
				}else{
					this.$api.showShare(data).then(res => {
						this.goPage()
					}).catch(err=>{
						this.isError = true
					})
				}
			},
			// 跳转目标页面
			goPage(){
				const data = this.queryData
				this.$u.route({
					type: 'redirect',
					url: data.pagePath,
					params:{
						id: data.pageId
					}
				})
			},
			goHomePage(){
				this.$u.route({
					type: 'tab',
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.load-page {
		background: #fff;
		min-height: 100vh;
	}
</style>
