<template>
	<view class="add-page px-3">
		<view class="x-center u-border-bottom">
			<u-tabs :list="tabsList" :current="tabsIndex" 
				@change="changeTabs" active-color="#48A5FE" />
		</view>

		<u-form v-show="tabsIndex===0" :model="model" ref="uForm" label-width="130" label-align="left" :errorType="['message']">
			
			<!-- <u-form-item label="姓名" prop="name">
				<u-input :disabled="disabled" v-model="model.name" placeholder="请输入姓名" input-align="right" />
			</u-form-item> -->
			
			<u-form-item label="性别" prop="sex">
				<u-input :disabled="disabled" type="select" :select-open="sex.show" v-model="sex.label" placeholder="请选择性别" @click="sex.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="所在城市">
				<u-input placeholder="请选择所在城市" v-model="address.area" type="select" :select-open="showArea" @click="showArea = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="所在行业" prop="industry">
				<u-input :disabled="disabled" type="select" :select-open="industry.show" v-model="industry.label" placeholder="请选择所在行业" @click="industry.show = true" input-align="right" />
			</u-form-item>
			
			<!-- <u-form-item label="教育经历" prop="education">
				<u-input :disabled="disabled" v-model="model.education" placeholder="请输入教育经历" input-align="right" />
			</u-form-item> -->
			
			<u-form-item prop="beGoodAt">
				<view class="row align-start w-100">
					<text class="mr-3">教育经历</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.education" height="100" placeholder="请输入教育经历" type="textarea" border />
					</view>
				</view>
			</u-form-item>
			
			<!-- <u-form-item label="工作经历" prop="work">
				<u-input :disabled="disabled" v-model="model.work" placeholder="请输入工作经历" input-align="right" />
			</u-form-item> -->
			
			<u-form-item prop="beGoodAt">
				<view class="row align-start w-100">
					<text class="mr-3">工作经历</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.work" height="100" placeholder="请输入工作经历" type="textarea" border />
					</view>
				</view>
			</u-form-item>
			
			<!-- <u-form-item label="我擅长" prop="tag">
				<div v-for="(item,i) in 3" :key="i" class="px-1">
					<u-tag text="技术支持" size="mini" color="#333333" bg-color="#E4EAF7" border-color="#E4EAF7" />
				</div>
				<view class="x-center px-2">
					<u-icon name="plus-circle-fill" color="#E4EAF7" size="40" />
				</view>
			</u-form-item> 
			
			<u-form-item label="想认识" prop="tag">
				<div v-for="(item,i) in 3" :key="i" class="px-1">
					<u-tag text="技术支持" size="mini" color="#4877FE" bg-color="#E4EAF7" border-color="#E4EAF7" />
				</div>
				<view class="x-center px-2">
					<u-icon name="plus-circle-fill" color="#E4EAF7" size="40" />
				</view>
			</u-form-item> -->
			
			<u-form-item prop="beGoodAt">
				<view class="row align-start w-100">
					<text class="mr-3">我擅长</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.beGoodAt" height="100" placeholder="请输入标签，多个用英文逗号(,)隔开" type="textarea" border />
					</view>
				</view>
			</u-form-item>
			
			<u-form-item prop="wannaMeet">
				<view class="row align-start w-100">
					<text class="mr-3">想认识</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.wannaMeet" height="100" placeholder="请输入标签，多个用英文逗号(,)隔开" type="textarea" border />
					</view>
				</view>
			</u-form-item>
			
			<!-- 认证按钮 -->
			<!-- <view class="mt-5">
				<u-button @click="btnSubmit(1)" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">
					{{auditStatus===0?'立即认证':(auditStatus===1?'审核中':'已认证')}}
				</u-button>
			</view> -->
			
			<!-- 认证按钮 -->
			<submit-star-auth @submit="btnSubmit(tabsIndex+1)" 
				:index="tabsIndex" :starLevel="starLevel" :auditStatus="auditStatus" />
			
		</u-form>
		
		<u-form v-show="tabsIndex===1" :model="model2" ref="uForm" label-width="130" label-align="left" :errorType="['message']">
			
			<u-form-item label-position="top" label="请上传创业计划书" prop="plan">
				<!-- <view class="upload-card">
					<u-upload :custom-btn="true" :maxCount="1" width="200" height="200">
						<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
							<u-icon name="plus" size="60" color="#808080"></u-icon>
						</view>
					</u-upload>
				</view> -->
				<view class="w-100 row">
					<upload-video mediaType="file" :defaultData="planList" :maxCount="1"
						@success="onFileSuccess($event,'model2','plan')" />
				</view>
			</u-form-item>
			
			<!-- 认证按钮 -->
			<submit-star-auth @submit="btnSubmit(tabsIndex+1)" 
				:index="tabsIndex" :starLevel="starLevel" :auditStatus="auditStatus" />
			
		</u-form>
		
		<u-form v-show="tabsIndex===2" :model="model3" ref="uForm" label-width="300" label-align="left" :errorType="['message']">
			
			<u-form-item label="个人姓名" prop="idCardName">
				<u-input :disabled="disabled" v-model="model3.idCardName" placeholder="请输入姓名" input-align="right" />
			</u-form-item> 
			
			<u-form-item label="认证证件" prop="sex">
				<u-input :disabled="disabled" type="select" :select-open="identityType.show" v-model="identityType.label" placeholder="请选择类型" @click="identityType.show = true" input-align="right" />
			</u-form-item> 
			
			<u-form-item label="请上传证件正反面" prop="remark">
				<view class="row justify-end w-100 mb-3">
					<view class="action row">
						<view class="upload-card">
						  <u-upload :maxCount="1" :index="1" :header="uploadHeader"
								@on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'model3.idCardImage')" 
								@on-remove="(a,b,c,d)=>onRemove(a,b,c,'image')" 
								action="https://wx.dpxtd.com//system/file/upload"
								:custom-btn="true" width="140" height="140">
								<view slot="addBtn" class="y-center radius-10" style="width:136rpx;height:136rpx;;background:#ebecee;">
									<u-icon name="plus" size="40" color="#c0c4cc" />
									<text class="font-12 color3 line-height-1 mt-1">正面</text>
								</view>
							</u-upload>
						</view>
						<view class="upload-card ml-3">
						  <u-upload :maxCount="1" :index="1"
						  	@on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'model3.idCardImage2')" 
						  	@on-remove="(a,b,c,d)=>onRemove(a,b,c,'image')" 
						  	:custom-btn="true" width="140" height="140">
								<view slot="addBtn" class="y-center radius-10" style="width:136rpx;height:136rpx;background:#ebecee;">
									<u-icon name="plus" size="40" color="#c0c4cc"></u-icon>
									<text class="font-12 color3 line-height-1 mt-1">反面</text>
								</view>
							</u-upload>
						</view>
					</view>
				</view>
			</u-form-item>
			
			<u-form-item  label="请上传证计划书视频" prop="planVideo">
				<view class="w-100 row justify-end">
					<upload-video mediaType="video" 
						:defaultData="planVideoList" :maxCount="2"
						@success="onVideoSuccess($event,'model3','planVideo')" />
				</view>
			</u-form-item>
			
			<!-- 认证按钮 -->
			<submit-star-auth @submit="btnSubmit(tabsIndex+1)" 
				:index="tabsIndex" :starLevel="starLevel" :auditStatus="auditStatus" />
			
		</u-form>
		
		<u-form v-show="tabsIndex===3" :model="model4" ref="uForm" label-width="300" label-align="left" :errorType="['message']">
			
			<!-- <u-form-item label-position="top" label="请上传个人证明材料及进度证明" prop="remark">
				<view class="col w-100 mb-3">
					<view class="action row">
						<view class="upload-card">
						  <u-upload :custom-btn="true" :maxCount="1" width="200" height="200">
								<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
									<u-icon name="plus" size="60" color="#808080"></u-icon>
									<text style="color:#808080;">证明材料</text>
								</view>
							</u-upload>
						</view>
						<view class="upload-card ml-3">
						  <u-upload :custom-btn="true" :maxCount="1" width="200" height="200">
								<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
									<u-icon name="plus" size="60" color="#808080"></u-icon>
									<text style="color:#808080;">进度证明</text>
								</view>
							</u-upload>
						</view>
					</view>
				</view>
			</u-form-item> -->
			
			<u-form-item label-position="top" label="请上传个人证明材料及进度证明" prop="plan">
				<view class="w-100 row">
					<upload-video mediaType="file" 
						:defaultData="personalInfoList" :maxCount="2"
						@success="onFileSuccess($event,'model4','personalMaterialsImage')" />
				</view>
			</u-form-item>
			
			<!-- 认证按钮 -->
			<submit-star-auth @submit="btnSubmit(tabsIndex+1)" 
				:index="tabsIndex" :starLevel="starLevel" :auditStatus="auditStatus" />
			
		</u-form>
		
		<u-form v-show="tabsIndex===4" :model="model5" ref="uForm" label-width="300" label-align="left" :errorType="['message']">
			
			<!-- <u-form-item label-position="top" label="请上传营业执照及平台推荐证明" prop="remark">
				<view class="col w-100 mb-3">
					<view class="action row">
						<view class="upload-card">
						  <u-upload :custom-btn="true" :maxCount="1" width="200" height="200">
								<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
									<u-icon name="plus" size="60" color="#808080"></u-icon>
									<text style="color:#808080;">营业执照</text>
								</view>
							</u-upload>
						</view>
						<view class="upload-card ml-3">
						  <u-upload :custom-btn="true" :maxCount="1" width="200" height="200">
								<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
									<u-icon name="plus" size="60" color="#808080"></u-icon>
									<text style="color:#808080;">推荐证明</text>
								</view>
							</u-upload>
						</view>
					</view>
				</view>
			</u-form-item> -->
			
			<u-form-item label-position="top" label="请上传营业执照及平台推荐证明" prop="plan">
				<view class="w-100 row">
					<upload-video mediaType="file" 
						:defaultData="businessList" :maxCount="2"
						@success="onFileSuccess($event,'model5','businessMaterialsImage')" />
				</view>
			</u-form-item>
			
			<u-form-item label-position="top" label="请上传平台投资证明" prop="plan">
				<view class="w-100 row">
					<upload-video mediaType="file" 
						:defaultData="investList" :maxCount="2"
						@success="onFileSuccess($event,'model5','investMaterialsImage')" />
				</view>
			</u-form-item>
			
			<!-- 认证按钮 -->
			<submit-star-auth @submit="btnSubmit(tabsIndex+1)" 
				:index="tabsIndex" :starLevel="starLevel" :auditStatus="auditStatus" />
			
		</u-form>
		
		<!-- 行业 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'industry','industry')" v-model="industry.show" :list="industry.list" />
		<!-- 性别 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'sex','gender')" v-model="sex.show" :list="sex.list" />
		<!-- 身份类型 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'identityType','identityType')" v-model="identityType.show" :list="identityType.list" />
		<!-- 省市区选择 -->
		<u-picker @confirm="confirmArea" mode="region" v-model="showArea" />
		
	</view>
</template>

<script>
	import {industryData,sexData,identityTypeData} from '@/common/config/data'
	export default {
		data() {
			return {
				id:'',
				starLevel:1,
				auditStatus:0,
				disabled:false,
				uploadHeader:{},
				// 行业选择
				industry: {},
				// 性别选择 
				sex: {},
				// 身份类型
				identityType: {},
				showArea: false,
				address: {
					province: '',
					city: '',
					region: '',
					area: '',
					detail: '',
				},
				model: {
					gender: '', //性别
					province: '', //省
					city: '', //市
					industry: '', //行业
					beGoodAt: '', //擅长
					work: '', //工作经历
					education: '', //教育经历
					wannaMeet: '', //想认识
				},
				planList:[],
				model2:{
					plan: '', //计划书
				},
				planVideoList:[],
				model3:{
					identityType: '', //身份类型,1:企业认证 2:残疾人认证 3:国家专利认证 4:获奖认证 5:投资人认证 6:大学生认证
					idCardName: '', //身份证姓名
					idCardImage: '', //身份证图片
					planVideo: '', //计划书视频
				},
				personalInfoList:[],
				model4:{
					personalMaterialsImage: '', //个人证明材料及进度证明
				},
				businessList:[],
				investList:[],
				model5:{
					businessMaterialsImage: '', //营业执照及平台推荐证明
					investMaterialsImage: '', //平台投资证明
				},
				endDateText:'',
				tabsIndex:0,
				tabsList:[
					{
						id:1,
						name: '✦'
					}, {
						id:2,
						name: '✦✦'
					}, {
						id:3,
						name: '✦✦✦'
					}, {
						id:4,
						name: '✦✦✦✦'
					}, {
						id:5,
						name: '✦✦✦✦✦'
					}
				],
				
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
				this.sex = this.$u.deepClone(sexData);
				this.identityType = this.$u.deepClone(identityTypeData);
				
				this.getStarAuthInfo()
			},
			// 确定提交数据
			btnSubmit(type) {
				let data = {}
				if(type===1){
					data = this.model
				}else{
					data = this['model'+type]
				}
				console.log('btnSubmit',type,data);
				// return
				this.$api.starAuth(this.tabsIndex+1,data).then(res => {
					this.$u.toast('提交成功')
					uni.navigateBack({
						delta:1
					})
				})
			},
			// 获取用户认证信息
			getStarAuthInfo(){
				this.$api.getStarAuthInfo().then(res => {
					const data = res.data
					if(data){
						this.id = data.id
						this.auditStatus = data.auditStatus
						this.starLevel = data.starLevel
						// this.disabled = data.auditStatus===1?true:false
						this.initModelData(data,this.model)
						this.initFileData(data,this.model2,'plan','planList')
						this.initFileData(data,this.model3,'planVideo','planVideoList')
						this.initFileData(data,this.model4,'personalMaterialsImage','personalInfoList')
						this.initFileData(data,this.model5,'businessMaterialsImage','businessList')
						this.initFileData(data,this.model5,'investMaterialsImage','investList')
					}else{
						// 未认证用户 
					}
				})
			},
			initFileData(data,model,key1,key2){
				let resList = []
				if(data[key1]){
					resList = data[key1].split(',').map(v=>({
						type: 2,
						url: v
					}))
				}
				console.log(key1,resList)
				this[key2] = resList
			},
			initModelData(data,model){
				for (let key in model) {
					model[key] = data[key]
				}
				
				this.initSelectData(this.industry,this.model.industry)
				this.initSelectData(this.sex,this.model.gender)
				this.initAddressData(this.model.city)
			},
			initSelectData(data,modelKey){
				if(modelKey!==''){
					const item = data.list.find(v => v.value == modelKey)
					data.label = item.label
				}
			},
			initAddressData(modelKey){
				if(modelKey!==''){
					this.address.area = this.model.province+' '+this.model.city
				}
			},
			// 监听视频上传
			onVideoSuccess(data,model,key) {
				let urls = data.map(v=>v.url)
				this[model][key] = urls.length>0?urls.join(','):''
				console.log(model,this[model])
			},
			// 监听图片上传
			onSuccess(res, index, lists, name, key){
				console.log('onSuccess', res, index, lists, name, key);
				let imgUrl = res.data.url
				let imgStr = this.model[key]
				let imgList = []
				if(imgStr){
					imgList = imgStr.split(',')
				}
				imgList.push(imgUrl)
				let value = imgList.join(',')
				this.setDataVal(key,value)
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
			// 监听文件上传
			onFileSuccess(data,model,key){
				console.log('onFileSuccess',data,model,key);
				let urls = data.map(v=>v.url)
				this[model][key] = urls.length>0?urls.join(','):''
				console.log(model,this[model])
			},
			// 监听Tabs切换
			changeTabs(e){
				this.tabsIndex = e
			},
			// 监听行业选择变化
			changeSelect(e, model,key) {
				console.log(e, model);
				const item = e[0]
				this[model].label = item.label
				this.model[key] = item.value
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
				this.address.area = province.label+' '+city.label
				this.model.province = province.label
				this.model.city = city.label
			},
			// 刷新上个页面的数据
			reloadDetailData(type){
				const pages = getCurrentPages()
				const page = pages[pages.length - 2]
				page.$vm.reloadData(type)
			},
			// 通过字符串 'data.a.c' 设置 data 的属性值
			setDataVal(str,val){
				let keys = str.split('.')
				let data = keys.shift()
				// console.log('keys',keys)
				let currentObj = {...this[data]}
				for (var i = 0; i < keys.length-1; i++) {
					let key = keys[i]
					console.log('key',key)
					if (currentObj[key] === undefined || typeof currentObj[key] !== 'object') {
						// 如果属性不存在或不是对象，则无法继续深入，抛出错误或返回
						throw new Error('无法设置值，属性路径中的某些属性不存在或不是对象');
					}
					currentObj = currentObj[key]
				}
				let finalKey = keys[keys.length - 1]; // 最后一个属性名
				console.log('finalKey',finalKey)
				currentObj[finalKey] = val; // 修改最终属性的值
				const model = this[data] = currentObj
				console.log('model',model)
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
