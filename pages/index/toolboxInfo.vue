<template>
	<view v-if="info" class="info-page bg-white position-relative">
			
		<!-- 发布者 -->
		<!-- <view class="bg-white p-2">
			<div v-for="(item,i) in dataList.slice(0,1)" :key="i" class="row align-center">
				<u-avatar size="70" :src="item.avatar" />
				<view class="flex-1 ml-2">
					<view class="row align-center justify-between">
						<view class="row align-center">
							<u-icon :label="item.name" :name="item.sex===1?'woman':'man'" :color="item.sex===1?'#FF6A6A':'#2979ff'" size="24" label-pos="left" />
						</view>
						<view class="">
							<u-rate v-model="item.rate" size="24" />
						</view>
					</view>
					<view class="row align-center justify-between" style="color:#808080;margin-top:4rpx;">
						<view class="row align-center line-height-1 font-12">
							<text>创始人</text>
							<text class="u-border-left ml-1 pl-1">互联网软件</text>
						</view>
						<view class="row align-center line-height-1 font-12">
							<text class="mr-1">湖北武汉</text>
							<u-icon name="map" color="#808080" size="24" />
						</view>
					</view>
				</view>
			</div>
		</view> -->
		
		<!-- 某某大学 -->
		<view class="px-2 pb-1 u-border-top">
			<view class="font-15 pt-2">
				<!-- {{info.title}} -->
				<html-text :html="info.title" />
			</view>
			<!-- <view class="u-content-color font-13 mt-2">
				{{info.title}}
			</view> -->
			<view class="row align-center font-13 mt-1">
				<text class="mr-1 u-content-color">下载地址：</text>
				<view v-if="info.contactAuthFlag" class="row align-center flex-1 u-line-1 mr-2">
					<text class="font-14 u-line-1 font-weight-500">{{info.downloadUrl}}</text>
					<view @click="btnCopyText()" class="text-primary px-1">
						复制
					</view>
				</view>
				<view v-else class="row align-center flex-1">
					<text @click="showModel = true" class="font-14 text-primary mr-1 underline">
						点击查看
					</text>
					<text class="mr-1 font-12" style="color:#EF5859">(需消耗{{info.viewPayAmount}}个D币)</text>
				</view>
				<u-button @click="$u.route('pages/mine/recharge')" shape="circle" type="primary" :custom-style="{height:'60rpx',width:'150rpx',fontSize:'26rpx'}" plain>D币充值</u-button>
			</view>
		</view>
		
		<!-- 评论列表 -->
		<!-- <view class="px-2 u-border-top">
			<comment-list :tid="id" type="9" />
		</view> -->
		
		<!-- 底部预留空间 -->
		<footer-arear />
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu />
		
		<!-- 联系方式弹窗 -->
		<u-popup v-model="showModel" mode="center" :mask-close-able="false" borderRadius="16" z-index="99">
			<view class="py-3 px-3" style="width: 650rpx;">
				<view class="font-15 font-weight-500 x-center my-3 pt-5">
					查看下载地址
				</view>
				<view class="font-22 x-center mb-5" style="color: red;">
					需耗{{info.viewPayAmount}}D币
				</view>
				<view class="row align-center justify-between px-5 pt-3">
					<view @click="btnShowDownUrl()" class="py-2 x-center radius-10" style="width: 230rpx;background:#39AD5D;color:#fff">确定</view>
					<view @click="showModel=false" class="py-2 x-center radius-10" style="width: 230rpx;background:#F1F1F2;color:#39AD5D">取消</view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				info: null,
				showModel:false,
				showDownUrl:false
			}
		},
		onLoad(opt) {
			this.id = opt.id||''
			this.initData()
		},
		methods: {
			// 初始化数据
			initData() {
				this.getDataInfo()
			},
			// 获取详情数据
			getDataInfo() {
				this.$api.getToolboxInfo(this.id).then(res => {
					this.info = res.data
				})
			},
			// 查看下载地址
			btnShowDownUrl(){
				console.info('用户点击确定');
				let data = {
					changeType: 9,
					targetId: this.id
				}
				this.$api.showPhone(data).then(res => {
					this.showModel = false
					this.getDataInfo()
				})
			},
			btnCopyText(){
				uni.setClipboardData({
				  data: this.info.downloadUrl,
				  success: function () {
				    console.log('复制成功')
						// uni.getClipboardData()
						uni.showToast({
							title: '已复制',
							icon: 'success'
						})
				  },
				  fail: function (err) {
				    console.log('复制失败',err)
				  }
				}) 
			},
			// 跳转个人页面
			goUserProfile() {
				this.$u.route('pages/index/userProfile')
			},
			// 跳转申请参加页面
			goJoinPage() {
				this.$u.route('pages/admin/partner/join')
			},
			// 跳转想参加的人页面
			goJoinerPage() {
				this.$u.route('pages/index/partnerJoiner')
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('pages/admin/partner/add')
			},
			// 搜索
			btnSearch(i) {
				if(!this.keyword){
					this.$u.toast('输入搜索关键字')
					return 
				}
				this.$refs.paging.reload()
			},
		}
	}
</script>

<style lang="scss">
	page,uni-page-body{
		height: 100%;
	}
	.pl-15{
		padding-left: 15rpx;
	}
	.left-line {
		padding-left: 15rpx;
		position: relative;
		&:before{
			content:'';
			position: absolute;
			height: 75%;
			width: 0px;
			top:50%;
			left:0rpx;
			transform: translateY(-50%);
			border-radius: 3px;
			border-left: 3px solid #48A5FE;
		}
	}
</style>
