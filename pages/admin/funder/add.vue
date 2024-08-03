<template>
	<view class="add-page px-3">
		<u-form :model="model" ref="uForm" label-width="160" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">
			
			<u-form-item label="资金类型" prop="funderType">
				<u-input :disabled="disabled" type="select" :select-open="funderType.show" v-model="funderType.label" placeholder="请选择资金类型" @click="funderType.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="投资类型" prop="investType">
				<u-input :disabled="disabled" type="select" :select-open="investType.show" v-model="investType.label" placeholder="请选择投资类型" @click="investType.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="行业" prop="industry">
				<u-input :disabled="disabled" type="select" :select-open="industry.show" v-model="industry.label" placeholder="请选择行业" @click="industry.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="地区">
				<u-input placeholder="请选择地区" v-model="address.area" type="select" :select-open="showArea" @click="showArea = true" input-align="right" />
			</u-form-item>
			
		<!-- 	<u-form-item label="电话" prop="phoneNumber">
				<u-input :disabled="disabled" v-model="model.phoneNumber" placeholder="请输入电话" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="微信" prop="wxNumber">
				<u-input :disabled="disabled" v-model="model.wxNumber" placeholder="请输入微信" type="text" input-align="right" />
			</u-form-item> -->
			
			<u-form-item label="投资意向" prop="investIntent">
				<u-input :disabled="disabled" v-model="model.investIntent" placeholder="请输入投资意向" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="投资规模" prop="investScale">
				<view class="w-100 row align-center">
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.investScale" placeholder="请输入投资规模" type="text" input-align="right" />
					</view>
					<text class="m-1">万</text> 
				</view>
			</u-form-item>
			
			<u-form-item label="封面图像" prop="coverImage">
				<view class="w-100 row justify-end">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'coverImage')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'coverImage')" max-count="1" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com//system/file/upload" :header="uploadHeader" :index="1">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:136rpx;height:136rpx;">
							<u-icon name="plus" size="50" color="#82848a" />
							<!-- <text style="color:#999">上传图片</text> -->
						</view>
					</u-upload>
				</view>
			</u-form-item>
			
			<u-form-item label="上传图片" prop="image">
				<view class="w-100 row justify-end">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'image')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'image')" max-count="9" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com//system/file/upload" :header="uploadHeader" :index="9">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:136rpx;height:136rpx;">
							<u-icon name="plus" size="50" color="#82848a" />
							<!-- <text style="color:#999">上传图片</text> -->
						</view>
					</u-upload>
				</view>
			</u-form-item>
			
			<u-form-item label="上传视频" prop="video">
				<view class="w-100 row justify-end">
					<upload-video @success="onVideoSuccess" />
				</view>
			</u-form-item>
			
			<u-form-item prop="specificRequirement" :border-bottom="false">
				<view class="row align-start w-100">
					<text class="mr-3">需求描述</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.specificRequirement" height="150" placeholder="请输入详细描述" type="textarea" :maxlength="-1" border />
					</view>
				</view>
			</u-form-item>
			
		</u-form>
		<view class="mt-5 safe-area-inset-bottom15">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">发布</u-button>
		</view>
		
		<!-- 资金类型 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'funderType','funderType')" v-model="funderType.show" :list="funderType.list" />
		<!-- 投资类型 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'investType','investType')" v-model="investType.show" :list="investType.list" />
		<!-- 行业 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'industry','industry')" v-model="industry.show" :list="industry.list" />
		<!-- 省市区选择 -->
		<u-picker @confirm="confirmArea" mode="region" v-model="showArea" />
		
	</view>
</template>

<script>
	import {industryData,typeData} from '@/common/config/data'
	export default {
		data() {
			return {
				orderNo:'',
				disabled:false,
				showEndDate:false,
				showArea:false,
				uploadHeader:{},
				industry:{},
				funderType:{},
				investType:{},
				address:{
					area:'',
					province:'',
					city:'',
					region:'',
					detail:'',
				},
				model: {
					id: '', //主键
					funderType: '', //资金方类型,1:个人 2:公司
					investType: '', //投资类型,1:个人 2:公司
					coverImage: '', //封面图
					image: '', //介绍图片,按逗号分割
					video: '', //介绍视频,按逗号分割
					investIntent: '', //投资意向
					investScale: '', //投资规模, 单位:万
					specificRequirement: '', //具体需求
					province: '', //省
					city: '', //市
					area: '', //区
					industry: '', //行业
					phoneNumber: '', //电话
					wxNumber: '', //微信
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
				this.funderType = this.$u.deepClone(typeData);
				this.investType = this.$u.deepClone(typeData);
				this.ajaxData()
			},
			// 网络请求数据
			ajaxData(){
				this.$api.getDicList().then(res=>{
					let industry = res.data.find(v=>v.type==='industry')
					this.industry.list = industry.items
					let funderType = res.data.find(v=>v.type==='funder_type')
					this.funderType.list = funderType.items
					let investType = res.data.find(v=>v.type==='invest_type')
					this.investType.list = investType.items
				})
			},
			// 确定提交数据
			btnSubmit() {
				console.log('model', this.model);
				// return
				this.$api.saveFunder(this.model).then(res => {
					this.$u.toast('提交成功')
					this.reloadData()
				})
			},
			// 监听视频上传
			onVideoSuccess(data){
				let urls = data.map(v=>v.url)
				this.model.video = urls.length>0?urls.join(','):''
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
		::v-deep .u-form-item{
			// padding: 10rpx 0;
			// font-size: 30rpx;
		}
	}
</style>
