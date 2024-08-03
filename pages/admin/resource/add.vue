<template>
	<view class="add-page px-3">
		<u-form :model="model" ref="uForm" label-width="160" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">
			
			<u-form-item label="关联项目" prop="projectName">
				<u-input :disabled="disabled" type="select" :select-open="project.show" v-model="project.label" placeholder="请选择项目" @click="project.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="行业" prop="industry">
				<u-input :disabled="disabled" type="select" :select-open="industry.show" v-model="industry.label" placeholder="请选择行业" @click="industry.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="地区">
				<u-input placeholder="请选择省市区" v-model="address.area" type="select" :select-open="showArea" @click="showArea = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="群名" prop="groupName">
				<u-input :disabled="disabled" v-model="model.groupName" placeholder="请输入群名" type="text" input-align="right" />
			</u-form-item>
			
			<!-- <u-form-item label="群用途" prop="groupPurpose">
				<u-input :disabled="disabled" v-model="model.groupPurpose" placeholder="请输入群用途" type="text" input-align="right" />
			</u-form-item> -->
			
			<u-form-item label="群要求" prop="groupAsk">
				<u-input :disabled="disabled" v-model="model.groupAsk" placeholder="请输入群要求" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="群宗旨" prop="groupPurpose">
				<u-input :disabled="disabled" v-model="model.groupPurpose" placeholder="请输入群宗旨" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="群图像" prop="groupAvatar">
				<view class="w-100 row justify-end">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'groupAvatar')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'groupAvatar')" max-count="1" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com//system/file/upload" :header="uploadHeader" :index="1">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:136rpx;height:136rpx;">
							<u-icon name="plus" size="50" color="#82848a" />
							<!-- <text style="color:#999">上传图片</text> -->
						</view>
					</u-upload>
				</view>
			</u-form-item>
			
			<u-form-item label="群二维码" prop="groupQrCode">
				<view class="w-100 row justify-end">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'groupQrCode')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'groupQrCode')" max-count="9" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com//system/file/upload" :header="uploadHeader" :index="9">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:136rpx;height:136rpx;">
							<u-icon name="plus" size="50" color="#82848a" />
							<!-- <text style="color:#999">上传图片</text> -->
						</view>
					</u-upload>
				</view>
			</u-form-item>
			
			
		</u-form>
		<view class="mt-5 safe-area-inset-bottom15">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">发布</u-button>
		</view>
		
		<!-- 项目 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'project','projectId','projectName')" v-model="project.show" :list="project.list" />
		<!-- 行业 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'industry','industry')" v-model="industry.show" :list="industry.list" />
		<!-- 省市区选择 -->
		<u-picker @confirm="confirmArea" mode="region" v-model="showArea" />
		
	</view>
</template>

<script>
	import {industryData} from '@/common/config/data'
	export default {
		data() {
			return {
				orderNo:'',
				disabled:false,
				showEndDate:false,
				showArea:false,
				uploadHeader:{},
				industry:{},
				address:{
					area:'',
					province:'',
					city:'',
					region:'',
					detail:'',
				},
				model: {
					id: '', //主键
					groupType: 1, //群类型,1: 微信群
					groupAvatar: '', //群头像图片
					groupName: '', //群名
					projectId: '', //关联项目id
					projectName: '', //关联项目名称
					groupPurpose: '', //群宗旨
					groupAsk: '', //群要求
					province: '', //省
					city: '', //市
					area: '', //区
					industry: '', //行业
					groupQrCode: '', //群二维码图片
				},
				project: {
					show: false,
					label: '',
					value: '',
					list: [{
							label: '餐饮',
							value: 1,
						},
						{
							label: '电商',
							value: 2,
						},
						{
							label: '母婴',
							value: 3,
						}
					]
				}
			};
		},
		onLoad(opt) {
			console.log('opt',opt);
			this.initData()
		},
		methods: {
			initData(){
				this.uploadHeader = {Token: this._token||''}
				this.industry = this.$u.deepClone(industryData);
				this.getMyProject()
				this.ajaxData()
			},
			// 网络请求数据
			ajaxData(){
				this.$api.getDicList().then(res=>{
					let industry = res.data.find(v=>v.type==='industry')
					this.industry.list = industry.items
				})
			},
			// 确定提交数据
			btnSubmit() {
				console.log('model', this.model);
				// return
				this.$api.saveResource(this.model).then(res => {
					this.$u.toast('提交成功')
					this.reloadData()
				})
			},
			// 我发布的项目
			getMyProject(){
				this.$api.getMyPublish('project').then(res => {
					this.project.list = res.data.map(v=>({
						label: v.title,
						value: v.id
					}))
				})
			},
			// 监听图片上传
			onSuccess(res, index, lists, name, key){
				console.log('onSuccess', res, index, lists, name);
				
				let imgUrl = res.data.url
				let imgStr = this.model[key]
				let imgList = []
				if(imgStr){
					imgList = imgStr.split(',')
				}
				imgList.push(imgUrl)
				this.model[key] = imgList.join(',')
				console.log('model', this.model);
			},
			// 监听图片移动
			onRemove(index, lists, name, key){
				console.log('onRemove', index, lists, name, key);
				
				let imgStr = this.model[key]
				let imgList = []
				if(imgStr){
					imgList = imgStr.split(',')
				}
				imgList.splice(index,1)
				this.model[key] = imgList.join(',')
				console.log('model', this.model);
			},
			// 监听行业选择变化
			changeSelect(e,model,key,key1) {
				console.log(e, model);
				const item = e[0]
				this[model].label = item.label
				this.model[key] = item.value
				if(key1){
					this.model[key1] = item.label
				}
			},
			// 监听日历选择变化
			changeEndDate(e){
				console.log(e);
				this.endDateText = e.result
			},
			// 地区选择
			confirmArea(e){
				console.log('confirmArea',e)
				const {province,city,area} = e
				this.address.province = province.label
				this.address.city = city.label
				this.address.region = area.label
				this.address.area = province.label+' '+city.label+' '+area.label
				this.model.province = province.label
				this.model.city = city.label
				this.model.area = area.label
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
