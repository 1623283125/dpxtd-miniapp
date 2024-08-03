<template>
	<view class="bg-white position-fixed left-0 right-0 bottom-0" style="z-index:9;" :class="{'safe-area-inset-bottom':bottom===0}" :style="{bottom:bottom}">
		<view v-if="showCommnet" class="row align-center" style="height:88rpx;">
			<view class="w-100 px-2">
				<u-input v-model="commnet" placeholder="评论" cursor-spacing="50" :adjust-position="false" :clearable="false" focus border @blur="onBlurComment" @confirm="onSubmit" />
			</view>
		</view>
		<view v-else class="row align-center u-border-top" style="height: 88rpx;">
			<view class="x-center flex-1 u-border-left" style="height: 58rpx;">
				<view @click="btnCollect()" class="x-center p-3">
					<u-icon :label="isCollect?'已收藏':'收藏'" 
						:name="isCollect?'heart-fill':'heart'" 
						:color="isCollect?'red':'#666'" 
						label-color="#666" label-size="28" size="32" label-pos="right" />
				</view>
			</view>
			<view class="x-center flex-1 u-border-left" style="height: 58rpx;">
				<u-button open-type="share" :custom-style="{background:'transparent',border:'none',padding:0}" :hair-line="false">
					<u-icon label="转发" name="zhuanfa" color="#666" label-color="#666" label-size="28" size="32" label-pos="right" />
				</u-button>
			</view>
			<view class="x-center flex-1 u-border-left" style="height: 58rpx;">
				<view @click="btnShowCommnet()" class="x-center p-3">
					<u-icon label="评论" name="chat" color="#666" label-color="#666" label-size="28" size="34" label-pos="right" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"comment-input",
		props:{
			isCollect:{
				type:Boolean,
				default:false
			},
		},
		data() {
			return {
				commnet:'',
				bottom: 0,
				showCommnet: false,
			};
		},
		created(){
			uni.onKeyboardHeightChange(res => {
				this.bottom = res.height+'px'
			})
		},
		methods:{
			// 用户 确定/按回车键/右下角的"搜索"键时触发
			onSubmit(e){
				console.log('onSubmit',e)
				if(this.$u.trim(e)){
					this.$emit('confirm',this.commnet)
				}else{
					this.$u.toast('评论不能为空')
				}
			},
			// 收藏/取消收藏
			btnCollect(){
				this.$emit('collect')
			},
			// 显示评论输入框
			btnShowCommnet(){
				this.showCommnet = !this.showCommnet
			},
			// 评论框失去焦点
			onBlurComment(e){
				// console.log('blurComment',e)
				this.showCommnet=false
				// // #ifdef H5
				// this.$emit('confirm',this.commnet)
				// // #endif
				this.bottom = 0
			}
		}
	}
</script>

<style>

</style>