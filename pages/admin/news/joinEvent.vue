<template>
	<view class="add-page px-3">
		<u-form :model="model" ref="uForm" label-width="160" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">
			
			<u-form-item label="姓名" prop="name">
				<u-input :disabled="disabled" v-model="model.name" placeholder="请输入姓名" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="性别" prop="sex">
				<u-input :disabled="disabled" type="select" :select-open="sex.show" v-model="sex.label" placeholder="请选择性别" @click="sex.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="身份证号码" prop="idCard">
				<u-input :disabled="disabled" v-model="model.idCard" placeholder="请输入身份证号码" type="text" input-align="right" />
			</u-form-item> 
			
			<u-form-item label="学校单位" prop="schoolName">
				<u-input :disabled="disabled" v-model="model.schoolName" placeholder="请输入学校单位" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="团队名称" prop="teamName">
				<u-input :disabled="disabled" v-model="model.teamName" placeholder="请输入团队名称" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="联系电话" prop="phone">
				<u-input :disabled="disabled" v-model="model.phone" placeholder="请输入联系电话" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label-position="top" label="备注" prop="notes" :border-bottom="false">
				<u-input :disabled="disabled" v-model="model.notes" height="150" placeholder="请输入备注" type="textarea" border />
			</u-form-item>
			
		</u-form>
		
		<view class="pt-5 safe-area-inset-bottom15">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">报名</u-button>
		</view>
		
		<!-- 性别 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'sex','sex')" v-model="sex.show" :list="sex.list" />
		
	</view>
</template>

<script>
	import {sexData} from '@/common/config/data'
	export default {
		data() {
			return {
				disabled:false,
				showEndDate:false,
				sex:{},
				model: {
					id: '', //主键
					matchId: '', //赛事id
					matchUserId: '', //赛事发布人id
					matchTitle: '', //赛事标题
					name: '', //姓名
					sex: '', //性别
					idCard: '', //身份证号码
					teamName: '', //团队名称
					schoolName: '', //学校名称
					notes: '', //备注
					phone: '', //电话
				}
			};
		},
		onLoad(opt) {
			console.log('opt',opt);
			this.model.matchId = opt.id
			this.model.matchUserId = opt.uid||''
			this.model.matchTitle = decodeURIComponent(opt.title)
			this.initData()
		},
		methods: {
			initData(){
				this.sex = this.$u.deepClone(sexData);
			},
			// 确定提交数据
			btnSubmit() {
				console.log('model', this.model);
				if(!this.$u.test.idCard(this.model.idCard)){
					this.$u.toast('无效的身份证号码')
					return
				}
				this.$api.saveMatchApplication(this.model).then(res => {
					this.$u.toast('提交成功')
					this.reloadData()
				})
			},
			// 监听行业选择变化
			changeSelect(e, model,key) {
				console.log(e, model);
				const item = e[0]
				this[model].label = item.label
				this.model[key] = item.value
			},
			// 刷新上个页面的数据
			reloadData(delta=1,timeout=500){
				const pages = getCurrentPages()
				const page = pages[pages.length - 2]
				page.$vm.initData()
				setTimeout(()=>{
					uni.navigateBack({
						delta
					})
				},timeout)
			}
		}
	};
</script>

<style lang="scss">
	uni-page{
		background: #fff !important;
	}
</style>

<style scoped lang="scss">
	.add-page {
		background: #fff;
	}
</style>
