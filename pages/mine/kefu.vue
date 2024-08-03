<template>
	<view class="mine-page">
		
		<!--  用户信息 -->
		<view style="background:#48A5FE;color:#fff;padding-bottom: 120rpx;">
			<!-- 用户基本信息 -->
			<div class="user-wrap px-3 row align-center pb-2">
				<image src="/static/images/kefu-ai.png" 
					style="width: 170rpx;height:164rpx;" />
				<view class="flex-1 ml-2">
					<view class="font-30">
						Hi~
					</view>
					<view class="font-24">
						我是地平线智能客服
					</view>
					<view class="row align-center font-15">
						请选择您的问题，开启高效智能诊断
					</view>
				</view>
			</div>
			
		</view>
		
		<!-- 导航菜单 -->
		<view class="px-2" style="margin-top: -120rpx;">
			<view class="bg-white radius-16 overflow-hidden">
				<u-cell-group :border="false">
					<u-cell-item @click="goInfoPage(1)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="使用规范" />
					<u-cell-item @click="goInfoPage(2)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="账号个人信息" />
					<u-cell-item @click="goInfoPage(3)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="人脉体系" />
					<u-cell-item @click="goInfoPage(4)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="项目发布管理" />
					<u-cell-item @click="goInfoPage(5)" :title-style="{fontSize:'30rpx'}" :icon-style="{color:'#105FFF'}" title="其他问题" />
				</u-cell-group>
			</view>
		</view>
		
		<view class="px-2 mt-5">
			<u-button open-type="contact" :custom-style="{background:'#48A5FE',border:'none'}" :hair-line="false">
				<u-icon label="在线客服" name="kefu-ermai" color="#fff" size="32"
					label-color="#fff" label-size="28" label-pos="right" />
			</u-button>
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
	.mine-page{
		.line-border{
			width: 1rpx;
			height: 50rpx;
			background:linear-gradient(0deg,rgba(203,225,255,0),#CBE1FF,rgba(203,225,255,0));
		}
		.line-border2{
			width: 1rpx;
			height: 80rpx;
			background:linear-gradient(0deg,rgba(203,225,255,0),#EEF2FF,rgba(203,225,255,0));
		}
	}
</style>
