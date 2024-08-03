<template>
	<view class="join-page px-3">
		<view class="from">
			<view class="from-label row align-center py-3">
				<text class="font-15">您正在申请参加他的团队</text>
			</view>
			<view class="from-item py-2">
				<view class="from-label row align-center">
					<text>您中意这个项目的原因？</text>
					<text class="font-12 u-tips-color">（请控制在30字以内）</text>
				</view>
				<view class="px-2 radius-10 mt-2" style="background:#F5F5F5;">
					<u-input v-model="model.likeReason" height="150" placeholder="请输入" type="textarea" />
				</view>
			</view>
			<view class="from-item py-2">
				<view class="from-label row align-center">
					<text>您能为这个项目带来？</text>
					<text class="font-12 u-tips-color">（请控制在30字以内）</text>
				</view>
				<view class="px-2 radius-10 mt-2" style="background:#F5F5F5;">
					<u-input v-model="model.mySpeciality" height="150" placeholder="请输入" type="textarea" />
				</view>
			</view>
		</view>
		<view class="mt-5">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">申请参加</u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled:false,
				model: {
					id: '', //主键
					joinType: '', //参加意向类型,1:找合伙 2:找项目
					targetId: '', //意向目标id
					targetUserId: '', //意向目标用户id
					likeReason: '', //喜欢理由
					mySpeciality: '', //我的特长
				}
			};
		},
		onLoad(opt) {
			console.log('opt',opt);
			this.model.targetId = opt.id||''
			this.model.joinType = opt.type||''
			this.model.targetUserId = opt.uid||''
		},
		methods: {
			// 确定提交数据
			btnSubmit() {
				this.$api.saveJoinIntent(this.model).then(res => {
					this.$u.toast('提交成功')
					this.reloadData()
				})
			},
			// 监听日历选择变化
			changeEndDate(e){
				console.log(e);
				this.endDateText = e.result
			},
			// 刷新上个页面的数据
			reloadData(){
				const pages = getCurrentPages()
				const page = pages[pages.length - 2]
				page.$vm.initData()
				uni.navigateBack({
					delta:1
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.join-page {
		background: #fff;
	}
</style>
