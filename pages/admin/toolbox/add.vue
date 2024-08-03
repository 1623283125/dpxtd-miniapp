<template>
	<view class="add-page px-3">
		<u-form :model="model" ref="uForm" label-width="180" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">
			
			<u-form-item label="标题内容" prop="title">
				<u-input :disabled="disabled" type="text" v-model="model.title" placeholder="请输入标题内容"  input-align="right" />
			</u-form-item> 
			
			<u-form-item label="下载地址" prop="downloadUrl">
				<u-input :disabled="disabled" v-model="model.downloadUrl" placeholder="请输入下载地址" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="所属类型" prop="toolType">
				<u-input :disabled="disabled" type="select" :select-open="toolbox.show" v-model="toolbox.label" placeholder="请选择行业" @click="toolbox.show = true" input-align="right" />
			</u-form-item>
			
		</u-form>
		<view class="mt-5 safe-area-inset-bottom15">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">发布</u-button>
		</view>
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu></float-kefu>
		
		<!-- 赛事状态 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'toolbox','toolType')" v-model="toolbox.show" :list="toolbox.list" />
		
	</view>
</template>

<script>
	import {toolTypeData} from '@/common/config/data'
	export default {
		data() {
			return {
				type:'1',
				disabled:false,
				uploadHeader:{},
				toolbox:{},
				model: {
					id: '', //主键
					title: '', //标题
					toolType: '', //工具类型,1:创业资料 2:软件中心 3:营销工具 4:网站模板
					downloadUrl: '', //下载地址
				}
			};
		},
		onLoad(opt) {
			console.log('opt',opt);
			this.model.toolType = opt.type||'1'
			this.initData()
		},
		methods: {
			initData(){
				this.uploadHeader = {Token: this._token||''}
				this.toolbox = this.$u.deepClone(toolTypeData)
				this.ajaxData()
			},
			// 网络请求数据
			ajaxData(){
				this.$api.getDicList().then(res=>{
					let toolbox = res.data.find(v=>v.type==='tool_type')
					this.toolbox.list = toolbox.items
					let item = toolbox.items.find(v=>v.value===this.model.toolType)
					this.toolbox.label = item.label
				})
			},
			// 确定提交数据
			btnSubmit() {
				console.log('model', this.model);
				// return
				this.$api.saveToolbox(this.model).then(res => {
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
				page.$vm.reloadData()
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
