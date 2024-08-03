<template>
	<view v-if="info" class="resourceInfo-page col px-3">
		<view class="row align-center justify-between py-3 u-border-bottom">
			<text class="label flex-shrink">群名称</text>
			<text class="u-tips-color">{{info.groupName}}</text>
			<!-- <u-icon name="arrow-right" color="#c0c4cc" size="28"></u-icon> -->
		</view>
		<view class="row align-center justify-between py-3 u-border-bottom">
			<text class="label flex-shrink">关联项目</text>
			<text class="u-tips-color">{{info.projectName}}</text>
		</view>
		<view class="row align-center justify-between py-3 u-border-bottom">
			<text class="label flex-shrink">群宗旨</text>
			<text class="u-tips-color">{{info.groupPurpose}}</text>
		</view>
		<!-- <view class="row align-center justify-between py-3 u-border-bottom">
			<text>群用途</text>
			<text class="u-tips-color">{{info.groupPurpose}}</text>
		</view> -->
		<view class="row align-center justify-between py-3 u-border-bottom">
			<text class="label flex-shrink">群要求</text>
			<text class="u-tips-color">{{info.groupAsk}}</text>
		</view>
		<view class="row align-center justify-between py-3 u-border-bottom">
			<text class="label">入群二维码</text>
			<view class="row align-center">
				<u-avatar v-for="(v,i) in info.groupQrCodes" :key="i" 
					@click="btnViewImg(i)" size="100"
					mode="square" :src="info.groupQrCode" />
			</view>
			
		</view>
		<!-- <view class="mt-5">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '240rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">加入</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				info:null
			}
		},
		onLoad(opt) {
			this.id = opt.id||''
			this.initData()
		},
		methods: {
			// 初始化数据
			initData() {
				this.getResourceInfo()
			},
			// 获取详情数据
			getResourceInfo(){
				this.$api.getResourceInfo(this.id).then(res => {
					let groupQrCodeList = []
					if(res.data.groupQrCode){
						groupQrCodeList = res.data.groupQrCode.split(',')
					}
					this.info = {...res.data,groupQrCodes:groupQrCodeList}
				})
			},
			btnViewImg(i){
				console.log('btnViewImg',i)
				uni.previewImage({
					current:i,
					urls:this.info.groupQrCodes
				})
			},
		}
	}
</script>

<style lang="scss">
	page,
	uni-page-body {
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.resourceInfo-page {
		.label{
			width: 160rpx;
		}
	}
</style>