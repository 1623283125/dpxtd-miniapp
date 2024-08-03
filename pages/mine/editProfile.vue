<template>
	<view class="add-page px-3">

		<u-form :model="model" ref="uForm" label-width="130" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">
			
			<u-form-item label-position="top" label="基本信息" prop="avatar" :border-bottom="false">
				<view class="w-100 x-center">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'avatar')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'avatar')" :file-list="fileList" max-count="1" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com//system/file/upload" :header="uploadHeader" :index="1">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:140rpx;height:140rpx;border-radius: 50%;">
							<u-icon name="photo" size="50" :color="$u.color['lightColor']" />
						</view>
					</u-upload>
				</view>
			</u-form-item>
			
			<u-form-item label="姓名" prop="nickname">
				<u-input :disabled="disabled" v-model="model.nickname" placeholder="请输入姓名" input-align="right" />
			</u-form-item> 
			
			<u-form-item label="性别" prop="sex">
				<!-- <u-input :disabled="disabled" type="select" :select-open="sex.show" v-model="sex.label" placeholder="请选择性别" @click="sex.show = true" input-align="right" /> -->
				<radio-sex v-model="model.sex" />
			</u-form-item>
			
			<u-form-item label="所在行业" prop="industry">
				<u-input :disabled="disabled" type="select" :select-open="industry.show" v-model="industry.label" placeholder="请选择行业" @click="industry.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="所在城市">
				<u-input placeholder="请选择省市区" v-model="address.area" type="select" :select-open="showArea" @click="showArea = true" input-align="right" />
			</u-form-item>
			
			<!-- <u-form-item label="我擅长" prop="beGoodAt">
				<div v-for="(item,i) in 3" :key="i" class="px-1">
					<u-tag text="技术支持" size="mini" color="#333333" bg-color="#E4EAF7" border-color="#E4EAF7" />
				</div>
				<view class="x-center px-2">
					<u-icon name="plus-circle-fill" color="#E4EAF7" size="40" />
				</view>
			</u-form-item> 
			
			<u-form-item label="想认识" prop="wannaMeet">
				<div v-for="(item,i) in 3" :key="i" class="px-1">
					<u-tag text="技术支持" size="mini" color="#4877FE" bg-color="#E4EAF7" border-color="#E4EAF7" />
				</div>
				<view class="x-center px-2">
					<u-icon name="plus-circle-fill" color="#E4EAF7" size="40" />
				</view>
			</u-form-item> -->
			
			<u-form-item prop="beGoodAt">
				<view class="row align-start w-100">
					<text class="mr-3 font-15">我擅长(标签)</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.beGoodAt" height="100" placeholder="请输入标签，多个用英文逗号(,)隔开" type="textarea" border />
					</view>
				</view>
			</u-form-item>
			
			<u-form-item prop="wannaMeet">
				<view class="row align-start w-100">
					<text class="mr-3 font-15">想认识(标签)</text>
					<view class="flex-1">
						<u-input :disabled="disabled" v-model="model.wannaMeet" height="100" placeholder="请输入标签，多个用英文逗号(,)隔开" type="textarea" border />
					</view>
				</view>
			</u-form-item>
			
			<u-form-item label-position="top" label="自我介绍" prop="selfIntroduction">
				<u-input :disabled="disabled" v-model="model.selfIntroduction" height="100" placeholder="这个人很懒，什么都没留下。" type="textarea" border />
			</u-form-item>
			
		</u-form>
		
		<view class="py-3">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',background: '#48A5FE'}" hover-class="hover-class">保存</u-button>
		</view>
		
		<!-- 行业 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'industry','industry','industry')" v-model="industry.show" :list="industry.list" />
		<!-- 性别 - 下拉框选择 -->
		<!-- <u-select @confirm="changeSelect($event,'sex','sex')" v-model="sex.show" :list="sex.list" /> -->
		<!-- 省市区选择 -->
		<u-picker @confirm="confirmArea" mode="region" v-model="showArea" />
		
	</view>
</template>

<script>
	import {industryData} from '@/common/config/data'
	export default {
		data() {
			return {
				disabled:false,
				showArea:false,
				address:{
					area:'',
					province:'',
					city:'',
					region:'',
					detail:'',
				},
				fileList:[],
				uploadHeader:{},
				// 行业选择
				industry:{},
				model: {
					nickname: '', //
					avatar: '', //
					sex: '', //
					industry: '', //
					province: '', //
					city: '', //
					beGoodAt: '', //
					wannaMeet: '', //
					selfIntroduction: '', //
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
				this.getUserInfo()
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
				this.$api.editUserInfo(this.model).then(res => {
					this.$u.toast('提交成功')
					this.reloadData()
				})
			},
			// 获取用户信息
			getUserInfo(){
				this.$api.getUserInfo().then(res=>{
					this.setUserInfo(res.data)
				})
			},
			// 设置用户信息
			setUserInfo(data){
				const userInfo = {
					nickname: data.userNickname,
					avatar: data.userAvatar,
					sex: data.userSex,
					city: data.userCity,
					province: data.province,
					industry: data.userIndustry,
					beGoodAt: data.beGoodAt,
					wannaMeet: data.wannaMeet,
					selfIntroduction: data.selfIntroduction
				}
				this.model = userInfo
				
				this.fileList = [{url:data.userAvatar}]
				// const industry = this.industry.list.find(v=>v.value == data.userIndustry)
				// this.industry.label = industry?industry.label:''
				this.industry.label = data.userIndustry
				this.address.area = (data.province||'') + (data.userCity||'')
			},
			// 监听图片上传
			onSuccess(res, index, lists, name, key){
				console.log('onSuccess', res, index, lists, name);
				this.model[key] = res.data.url
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
			changeSelect(e, model,key,key1) {
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
				this.address.area = province.label+' '+city.label
				this.model.city = city.label
				this.model.province = province.label
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
