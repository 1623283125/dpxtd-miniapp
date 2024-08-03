<template>
	<view v-if="info" class="info-page bg-white position-relative">

		<!-- swiper轮播图 -->
		<view class="lunboList w-100">
			<mt-swiper :list="lunboList" height="350" name="url" border-radius="0" />
		</view>

		<!-- 某某大学 -->
		<view class="px-2">
			<view class="title py-2 row align-center justify-between">
				<text class="left-line font-15">{{info.belongUnit}}</text>
				<view class="font-12 radius-4 line-height-1 px-2 py-1" @click="goWebsite(info.belongUnitWebsite)"
					style="background:#E4EAF7;color:#48A5FE;">
					进入官网
				</view>
			</view>
			<view class="pb-1 pl-15 py-1">
				<view class="font-16 font-weight-500">
					{{info.title}}
				</view>
				<view class="font-15 mt-2">
					<html-text :html="info.article" />
				</view>
			</view>
		</view>

		<!-- 评论列表 -->
		<view class="mt-2 u-border-top">
			<comment-list :tid="id" type="7" :collect="info.favoritesFlag" />
		</view>

		<!-- 底部预留空间 -->
		<footer-arear />

		<!-- 客服 - 悬浮按钮 -->
		<float-kefu />

	</view>
</template>

<script>
	import {
		uniCopy
	} from '@/common/utils/utils.js'
	export default {
		data() {
			return {
				id: '',
				info: null,
				lunboList: []
			}
		},
		onLoad(opt) {
			this.id = opt.id || ''
			this.initData()
		},
		methods: {
			// 初始化数据
			initData() {
				this.getLectureInfo()
			},
			// 获取详情数据
			getLectureInfo() {
				this.$api.getLectureInfo(this.id).then(res => {
					this.getLunboData(res.data)
					this.info = res.data
				})
			},
			// 组装轮播数据
			getLunboData(data) {
				let lunboList = []
				let {
					image,
					video
				} = data
				if (!this.$u.test.isEmpty(video)) {
					let videos = video.split(',').map(v => ({
						url: v,
						type: 'video'
					}))
					lunboList = [...videos]
				}
				if (!this.$u.test.isEmpty(image)) {
					let images = image.split(',').map(v => ({
						url: v,
						type: 'image'
					}))
					lunboList = [...lunboList, ...images]
				}
				this.lunboList = lunboList
				console.log('lunboList', this.lunboList)
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
			// 跳转官网
			goWebsite(url) {
				const isUrl = this.$u.test.url(url)
				if (!isUrl) {
					this.$u.toast('网址错误')
					return
				}
				// #ifdef H5
				// window.location.href = url
				// window.open(url)
				this.$u.route('pages/index/webview', {url})
				// #endif
				// #ifdef MP
				this.copyText(url)
				// #endif
			},
			// 复制
			copyText(content) {
				uni.setClipboardData({
				  data: content,
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
			// 搜索
			btnSearch(i) {
				if (!this.keyword) {
					this.$u.toast('输入搜索关键字')
					return
				}
				this.$refs.paging.reload()
			},
		}
	}
</script>

<style lang="scss">
	page,
	uni-page-body {
		height: 100%;
	}

	.pl-15 {
		padding-left: 15rpx;
	}

	.left-line {
		padding-left: 15rpx;
		position: relative;

		&:before {
			content: '';
			position: absolute;
			height: 75%;
			width: 0px;
			top: 50%;
			left: 0rpx;
			transform: translateY(-50%);
			border-radius: 3px;
			border-left: 3px solid #48A5FE;
		}
	}
</style>