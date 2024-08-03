<template>
	<view class="add-page px-3">
		<u-form :model="model" ref="uForm" label-width="160" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">

			<u-form-item required label="标题" prop="title">
				<u-input :disabled="disabled" v-model="model.title" placeholder="请输入标题" type="text" input-align="right" />
			</u-form-item>

			<u-form-item label="行业" prop="industry">
				<u-input :disabled="disabled" type="select" :select-open="industry.show" v-model="industry.label" placeholder="请选择行业" @click="industry.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="联系人" prop="contact">
				<u-input :disabled="disabled" v-model="model.contact" placeholder="请输入联系人" type="text" input-align="right" />
			</u-form-item>
			
			<!-- <u-form-item label="联系方式" prop="contactInfo">
				<u-input :disabled="disabled" v-model="model.contactInfo" placeholder="请输入联系方式" type="text" input-align="right" />
			</u-form-item> -->
			
			<u-form-item label="性别" prop="sex">
				<!-- <u-input :disabled="disabled" type="select" :select-open="sex.show" v-model="sex.label" placeholder="请选择性别" @click="sex.show = true" input-align="right" /> -->
				
				<radio-sex v-model="model.sex" />
				
			</u-form-item>

			<u-form-item label="地区">
				<u-input placeholder="请选择省市区" v-model="address.area" type="select" :select-open="showArea" @click="showArea = true" input-align="right" />
			</u-form-item>

			<u-form-item label="预筹" prop="intendAmount">
				<view class="w-100 row align-center">
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.intendAmount" placeholder="请输入预筹金额" type="text" input-align="right" />
					</view>
					<text class="m-1">万</text> 
				</view>
			</u-form-item>

			<u-form-item label="已筹" prop="alreadyAmount">
				<view class="w-100 row align-center">
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.alreadyAmount" placeholder="请输入已筹金额" type="text" input-align="right" />
					</view>
					<text class="m-1">万</text> 
				</view>
			</u-form-item>

			<u-form-item label="截止时间" prop="deadline">
				<u-input :disabled="disabled" v-model="model.deadline" placeholder="请选择截止时间" type="select"
					:select-open="showEndDate" @click="showEndDate = true" input-align="right" />
			</u-form-item>

			<u-form-item prop="label">
				<view class="row align-start w-100">
					<text class="mr-3 font-15">我的标签</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.label" height="100" placeholder="请输入标签，多个用英文逗号(,)隔开" type="textarea" :maxlength="100" border />
					</view>
				</view>
			</u-form-item>
			
			<u-form-item prop="lookFor">
				<view class="row align-start w-100">
					<text class="mr-3 font-15">正在寻找</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.lookFor" height="100" placeholder="请输入标签，多个用英文逗号(,)隔开" type="textarea" :maxlength="100" border />
					</view>
				</view>
			</u-form-item>
			
			<u-form-item label="回报方式" prop="returnMethod">
				<u-input :disabled="disabled" v-model="model.returnMethod" height="100" placeholder="请输入回报方式" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="封面图片" prop="coverImage">
				<view class="w-100 row justify-end">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'coverImage')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'coverImage')" max-count="1" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com/system/file/upload" :header="uploadHeader" :index="1">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:136rpx;height:136rpx;">
							<u-icon name="plus" size="50" color="#82848a" />
							<!-- <text style="color:#999">上传图片</text> -->
						</view>
					</u-upload>
				</view>
			</u-form-item>
			
			<u-form-item label="上传图片" prop="image">
				<view class="w-100 row justify-end">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'image')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'image')" max-count="9" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com/system/file/upload" :header="uploadHeader" :index="9">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:136rpx;height:136rpx;margin-left:10rpx;">
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
			
			<u-form-item prop="content" :border-bottom="false">
				<view class="row align-start w-100">
					<text class="mr-3 font-15">需求描述</text>
					<view class="flex-1">
					<u-input :disabled="disabled" v-model="model.content" height="150" placeholder="请输入详细描述" type="textarea" :maxlength="-1" border />
					</view>
				</view>
			</u-form-item>

			<!-- <u-form-item label-position="top" label="描述" prop="content">
				<u-input :disabled="disabled" v-model="model.content" height="150" placeholder="请描述问题情况，详细的描述有助于更好地解决问题" type="textarea" border />
			</u-form-item> -->

		</u-form>
		<view class="mt-5 safe-area-inset-bottom15">
			<u-button @click="btnSubmit()" shape="circle" type="primary"
				:custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">发布</u-button>
		</view>

		<!-- 行业 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'industry','industry')" v-model="industry.show" :list="industry.list" />
		<!-- 截止时间 - 下拉框选择 -->
		<u-calendar @change="changeEndDate" v-model="showEndDate" mode="date" :max-date="maxDate" />
		<!-- 省市区选择 -->
		<u-picker @confirm="confirmArea" mode="region" v-model="showArea" />

	</view>
</template>

<script>
	import {industryData} from '@/common/config/data'
	export default {
		data() {
			return {
				orderNo: '',
				disabled: false,
				showEndDate: false,
				showArea: false,
				maxDate:'',
				uploadHeader:{},
				// 行业选择
				industry:{},
				address: {
					province: '',
					city: '',
					region: '',
					area: '',
					detail: '',
				},
				model: {
					id: '', //主键
					title: '', //标题
					industry: '', //行业
					contact: '', //联系人
					sex: '', //性别,1:男 0:女
					province: '', //省
					city: '', //市
					area: '', //区
					coverImage: '', //封面图
					image: '', //图片,按逗号分割
					video: '', //视频,按逗号分割
					label: '', //标签
					lookFor: '', //正在寻找
					returnMethod: '', //回报方式
					intendAmount: '', //预筹,单位:万
					alreadyAmount: '', //已筹,单位:万
					deadline: '', //截至时间
					content: '', //详述
					contactInfo: '', //联系方式
				}
			};
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData(){
				this.maxDate = '2030-12-31'
				this.uploadHeader = {Token: this._token||''}
				this.industry = this.$u.deepClone(industryData);
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
				if(this.model.title.length<20){
					this.$u.toast('标题字数不少于20个')
					return
				}
				// return
				this.$api.savePartner(this.model).then(res => {
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
			// 选择图像
			chooseAvatar() {
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// console.log('chooseAvatar',res);
						const path = res.tempFilePaths[0];
						this.$api.uploadImg(path, (url) => {
							// console.log('url',url);
							this.model.cover = url
						})
					}
				});
			},
			// 监听行业选择变化
			changeSelect(e, model,key) {
				console.log(e, model);
				const item = e[0]
				this[model].label = item.label
				this.model[key] = item.value
			},
			// 监听日历选择变化
			changeEndDate(e) {
				console.log(e);
				this.model.deadline = e.result
			},
			// 地区选择
			confirmArea(e) {
				console.log('confirmArea', e)
				const { province, city, area } = e
				this.address.province = province.label
				this.address.city = city.label
				this.address.region = area.label
				this.address.area = province.label + ' ' + city.label + ' ' + area.label
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
	uni-page {
		background: #fff !important;
	}
</style>

<style scoped lang="scss">
	.add-page {
		background: #fff;
	}
</style>