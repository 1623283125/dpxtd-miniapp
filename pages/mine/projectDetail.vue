<template>
	<view class="add-page px-3">
		
		<view class="steps-wrap py-3">
			<u-steps :list="stepsList" :current="stepsIndex" />
		</view>
		<view class="py-1" style="background:#F7F7F7;margin:0 -30rpx;" />
		
		<u-form v-show="stepsIndex===0" :model="model" ref="uForm" label-width="160" label-align="left" :errorType="['message']">
			
			<u-form-item label="选择项目" prop="phone">
				<u-input :disabled="disabled" type="select" :select-open="showTag" v-model="TagText" placeholder="请选择项目" @click="showTag = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="合伙方式" prop="phone">
				<u-input :disabled="disabled" type="select" :select-open="showTag" v-model="TagText" placeholder="请选择方式" @click="showTag = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="开始时间" prop="phone">
				<u-input :disabled="disabled" v-model="endDateText" placeholder="请选择时间" type="select" :select-open="showEndDate" @click="showEndDate = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="项目佣金" prop="phone">
				<u-input :disabled="disabled" v-model="model.phone" placeholder="请输入金额" type="text" input-align="right" />
				<text class="m-1">万</text>
			</u-form-item>
			
			<u-form-item label="结算方式" prop="phone">
				<u-input :disabled="disabled" type="select" :select-open="showTag" v-model="TagText" placeholder="请选择方式" @click="showTag = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="项目验收" prop="phone">
				<u-input :disabled="disabled" v-model="model.phone" placeholder="请输入" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="周期时间" prop="phone">
				<u-input :disabled="disabled" v-model="model.phone" placeholder="请输入" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="周期佣金" prop="phone">
				<u-input :disabled="disabled" v-model="model.phone" placeholder="请输入金额" type="text" input-align="right" />
				<text class="m-1">万</text>
			</u-form-item>
			
			<view class="mt-5">
				<u-button @click="btnSubmit(0)" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',background: '#48A5FE'}" hover-class="hover-class">提交</u-button>
			</view>
			
		</u-form>
		
		<u-form v-show="stepsIndex===1" :model="model" ref="uForm" label-width="160" label-align="left" :errorType="['message']">
			
			<u-form-item label-position="top" label="请上传合同" prop="remark">
				<view class="upload-card">
					<u-upload :custom-btn="true" :maxCount="1" width="200" height="200">
						<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
							<u-icon name="plus" size="60" color="#808080"></u-icon>
						</view>
					</u-upload>
				</view>
			</u-form-item>
			
			<view class="mt-5">
				<u-button @click="btnSubmit(1)" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',background: '#48A5FE'}" hover-class="hover-class">上传</u-button>
			</view>
			
		</u-form>
		
		<u-form v-show="stepsIndex===2" :model="model" ref="uForm" label-width="160" label-align="left" :errorType="['message']">
			
			<u-form-item label-position="top" label="" prop="remark">
				<view class="upload-card w-100">
					<view class="row align-center justify-between">
						<text>请上传项目附件</text>
						<text class="font-12" style="color:#48A5FE;">第二阶段</text>
					</view>
					<u-upload :custom-btn="true" :maxCount="1" width="200" height="200">
						<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
							<u-icon name="plus" size="60" color="#808080"></u-icon>
						</view>
					</u-upload>
					<view class="row align-center justify-between font-12">
						<text style="color:#808080;">2023-08-27  10:30</text>
						<text style="color:#48A5FE;">未验收</text>
					</view>
				</view>
			</u-form-item>
			
			<u-form-item label-position="top" label="" prop="remark">
				<view class="upload-card w-100">
					<view class="row align-center justify-between">
						<text>请上传项目附件</text>
						<text class="font-12">第一阶段</text>
					</view>
					<u-upload :custom-btn="true" :maxCount="1" width="200" height="200">
						<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
							<u-icon name="plus" size="60" color="#808080"></u-icon>
						</view>
					</u-upload>
					<view class="row align-center justify-between font-12">
						<text class="" style="color:#808080;">2023-08-01  10:30</text>
						<text style="color:#333333;">已验收</text>
					</view>
				</view>
			</u-form-item>
			
			<view class="mt-5">
				<u-button @click="btnSubmit(2)" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',background: '#48A5FE'}" hover-class="hover-class">发起验收</u-button>
			</view>
			
		</u-form>
		
		<!-- 弹窗-确认验收是否通过 -->
		<u-modal @confirm="confirmModal" @cancel="cancelModal" v-model="showModal" title="" confirm-text="通过" cancel-text="未通过" show-cancel-button :confirm-style="{color:'#fff',background:'#48A5FE'}" :cancel-style="{background:'#eee'}">
			<view class="x-center py-3 mb-3">
				请选择验收请求，是否通过？
			</view>
		</u-modal>
		
		<!-- 下拉框选择 -->
		<u-select v-model="showTag" :list="tagList" />
		<!-- 截止时间 - 下拉框选择 -->
		<u-calendar @change="changeEndDate" v-model="showEndDate" mode="date" />
		<!-- 省市区选择 -->
		<u-picker @confirm="confirmArea" mode="region" v-model="showArea" />
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderNo:'',
				disabled:false,
				showModal:true,
				showEndDate:false,
				showArea:false,
				stepsIndex:1,
				stepsList: [
					{
						name: '①项目需求'
					}, {
						name: '②上传合同'
					}, {
						name: '③项目验收'
					} 
				],
				address:{
					area:'',
					province:'',
					city:'',
					region:'',
					detail:'',
				},
				model: {
					Tag: '',
					phone:'',
					remark:''
				},
				endDateText:'',
				TagText:'',
				showTag:false,
				tagList: [{
						value: 1,
						label: '全职'
					},
					{
						value: 2,
						label: '兼职'
					},
					{
						value: 3,
						label: '前端'
					},
					{
						value: 4,
						label: '后端'
					}
				],
			};
		},
		onLoad(opt) {
			console.log('opt',opt);
			this.orderNo = opt.orderNo
			this.model.money = opt.money
		},
		methods: {
			// 确定提交数据
			btnSubmit(type) {
				// this.$api.applyOrder(this.orderNo).then(res => {
				// 	this.$u.toast('提交成功')
				// 	uni.navigateBack({
				// 		delta:2
				// 	})
				// })
				
				if(type===0){
					
				}else if(type===1){
					this.$u.route('pages/mine/projectStatus')
				}else if(type===2){
					
				}
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
						this.$api.uploadImg(path,(url)=>{
							// console.log('url',url);
							this.model.cover = url
						})
					}
				});
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
			},
			// 刷新上个页面的数据
			reloadDetailData(type){
				const pages = getCurrentPages()
				const page = pages[pages.length - 2]
				page.$vm.reloadData(type)
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
