<template>
	<view class="submit-star-auth">
		<!-- 认证按钮 -->
		<view v-if="starLevel===index&&auditStatus===2" class="mt-5">
			<u-button @click="btnSubmit()" shape="circle" type="primary"
				:custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}"
				hover-class="hover-class">
				立即认证
			</u-button>
		</view>

		<view v-if="starLevel===(index+1)" class="mt-5">
			<u-button @click="btnSubmit()" shape="circle" type="primary"
				:custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}"
				hover-class="hover-class">
				{{auditStatus===1?'审核中':'已认证'}}
			</u-button>
		</view>

		<view v-if="starLevel>(index+1)" class="mt-5">
			<u-button @click="btnSubmit()" shape="circle" type="primary"
				:custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}"
				hover-class="hover-class">
				已认证
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "submit-star-auth",
		props:{
			starLevel:{
				type:Number
			},
			auditStatus:{
				type:Number
			},
			index:{
				type:Number
			}
		},
		data() {
			return {

			};
		},
		methods:{
			btnSubmit(){
				this.$emit('submit')
			}
		}
	}
</script>

<style>

</style>