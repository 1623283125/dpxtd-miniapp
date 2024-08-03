<template>
	<view class="add-page px-3">
		<u-form :model="model" ref="uForm" label-width="200" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">
			
			<u-form-item label="类型" prop="matchType">
				<u-input :disabled="disabled" type="select" :select-open="matchType.show" v-model="matchType.label" placeholder="请选择赛事类型" @click="matchType.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="标题" prop="title">
				<u-input :disabled="disabled" v-model="model.title" placeholder="请输入标题" type="text" input-align="right" />
			</u-form-item>
			
			<!-- <u-form-item label="赛事类型" prop="phone">
				<u-input :disabled="disabled" type="select" :select-open="showTag" v-model="TagText" placeholder="请选择赛事类型" @click="showTag = true" input-align="right" />
			</u-form-item> -->
			
			<u-form-item label="举办起止日期" prop="holdingTimeEnd">
				<u-input :disabled="disabled" v-model="activeDate.label" placeholder="请选择时间" type="select" :select-open="activeDate.show" @click="activeDate.show=true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="报名起止日期" prop="applicationTimeEnd">
				<u-input :disabled="disabled" v-model="joinDate.label" placeholder="请选择时间" type="select" :select-open="joinDate.show" @click="joinDate.show=true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="主办单位" prop="hostUnit">
				<u-input :disabled="disabled" v-model="model.hostUnit" placeholder="请输入主办单位" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="协办单位" prop="assistUnit">
				<u-input :disabled="disabled" v-model="model.assistUnit" placeholder="请输入协办单位" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="联系人" prop="contactName">
				<u-input :disabled="disabled" v-model="model.contactName" placeholder="请输入联系人" type="text" input-align="right" />
			</u-form-item>
			
			<!-- <u-form-item label="联系电话" prop="phoneNumber">
				<u-input :disabled="disabled" v-model="model.phoneNumber" placeholder="请输入联系电话" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="联系手机" prop="mobileNumber">
				<u-input :disabled="disabled" v-model="model.mobileNumber" placeholder="请输入联系手机" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="联系微信" prop="wxNumber">
				<u-input :disabled="disabled" v-model="model.wxNumber" placeholder="请输入联系微信" type="text" input-align="right" />
			</u-form-item> -->
			
			<u-form-item label="大赛地址" prop="address">
				<view class="col w-100">
					<view class="w-100">
						<u-input placeholder="请选择地区" v-model="address.area" type="select"  :select-open="showArea" @click="showArea = true" input-align="right" />
					</view>
					<view class="w-100" v-show="address.area" label="详细地址">
						<u-input :disabled="disabled" v-model="model.address" placeholder="请输入大赛详细地址" type="text" input-align="right" />
					</view>
				</view>
			</u-form-item>
			
			<u-form-item label="温馨提示" prop="tips">
				<u-input :disabled="disabled" v-model="model.tips" placeholder="请输入温馨提示" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item label="赛事状态" prop="matchStatus">
				<u-input :disabled="disabled" type="select" :select-open="matchStatus.show" v-model="matchStatus.label" placeholder="请选择赛事状态" @click="matchStatus.show = true" input-align="right" />
			</u-form-item>
			
			<u-form-item label="封面图片" prop="coverImage">
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
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'image')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'image')" max-count="3" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com//system/file/upload" :header="uploadHeader" :index="3">
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
			
			<u-form-item label-position="top" label="赛事描述" prop="content" :border-bottom="false">
				<u-input :disabled="disabled" v-model="model.content" height="150" placeholder="请输入赛事描述" type="textarea" :maxlength="-1" border />
			</u-form-item>
			
		</u-form>
		<view class="mt-5 safe-area-inset-bottom15">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">发布</u-button>
		</view>
		
		<!-- 赛事类型 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'matchType','matchType')" v-model="matchType.show" :list="matchType.list" />
		<!-- 赛事状态 - 下拉框选择 -->
		<u-select @confirm="changeSelect($event,'matchStatus','matchStatus')" v-model="matchStatus.show" :list="matchStatus.list" />
		<!-- 举办起止日期 - 下拉框选择 -->
		<u-calendar @change="changeDate($event,'activeDate','holdingTimeStart','holdingTimeEnd')" v-model="activeDate.show" mode="range" :max-date="maxDate1" toolTip="选择日期范围" />
		<!-- 报名起止日期 - 下拉框选择 -->
		<u-calendar @change="changeDate($event,'joinDate','applicationTimeStart','applicationTimeEnd')" v-model="joinDate.show" mode="range" :max-date="maxDate2" toolTip="选择日期范围" />
		<!-- 省市区选择 -->
		<u-picker @confirm="confirmArea" mode="region" v-model="showArea" />
		
	</view>
</template>

<script>
	import {matchStatusData,matchTypeData} from '@/common/config/data'
	export default {
		data() {
			return {
				orderNo:'',
				disabled:false,
				showArea:false,
				uploadHeader:{},
				matchStatus:{},
				matchType:{},
				maxDate1:'',
				maxDate2:'',
				activeDate:{
					show:false,
					label: '',
					value: '',
				},
				joinDate:{
					show:false,
					label: '',
					value: '',
				},
				address:{
					area:'',
					province:'',
					city:'',
					region:'',
					detail:'',
				},
				model: {
					id: '', //主键
					matchType:'1',//发布类型:1全国;2省内
					groupOriented: '4', //面向群体,1:大学生 2:退役军人 3:残疾人 4:华山论剑
					title: '', //标题
					holdingTimeStart: '', //大赛时间_开始
					holdingTimeEnd: '', //大赛时间_截至
					applicationTimeStart: '', //报名时间_开始
					applicationTimeEnd: '', //报名时间_截至
					hostUnit: '', //主办单位
					assistUnit: '', //协办单位
					coverImage: '', //封面图
					image: '', //图片,按逗号分割
					video: '', //视频,按逗号分割
					content: '', //大赛详情
					address: '', //举办地址
					addressLongitude: '0', //地址经度
					addressLatitude: '0', //地址纬度
					contactName: '', //联系人
					phoneNumber: '', //联系人电话
					mobileNumber: '', //联系人手机
					wxNumber: '', //联系人微信
					matchStatus: '', //赛事状态,1:报名中 2:比赛中 3:已结束
					tips: '', //温馨提示
				}
			};
		},
		onLoad(opt) {
			console.log('opt',opt);
			if(opt.type){
				this.model.matchType = opt.type
			}
			this.initData()
		},
		methods: {
			initData(){
				this.maxDate1 = '2099-12-31'
				this.maxDate2 = '2099-12-31'
				this.uploadHeader = {Token: this._token||''}
				this.matchType = this.$u.deepClone(matchTypeData)
				this.matchStatus = this.$u.deepClone(matchStatusData)
				const matchType = this.model.matchType
				if(matchType){
					let item = this.matchType.list.find(v=>v.value==matchType)
					if(item){
						this.matchType.label = item.label
					}
				}
			},
			// 确定提交数据
			btnSubmit() {
				console.log('model', this.model);
				// return
				this.$api.saveMatch(this.model).then(res => {
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
			// 监听赛事状态选择变化
			changeSelect(e,model,key) {
				console.log(e,model,key);
				const item = e[0]
				this[model].label = item.label
				this.model[key] = item.value
			},
			// 监听日历选择变化
			changeDate(e,model,key1,key2){
				console.log(e,model,key1,key2);
				if(e.error){
					console.log('changeDate', e);
					this.$u.toast(`请选择${e.error===1?'开始':'结束'}日期`)
					return;
				}
				const {startDate,endDate} = e
				if(model==='activeDate'){
					let maxDate2 = this.getPreviousDay(startDate)
					console.log('changeDate', maxDate2);
					this.maxDate2 = maxDate2
					this.model.applicationTimeStart = ''
					this.model.applicationTimeEnd = ''
					this.joinDate.label = ''
				}
				
				this[model].label = startDate +' 至 '+ endDate
				this.model[key1] = startDate
				this.model[key2] = endDate
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
			reloadData(delta=1,timeout=500){
				const pages = getCurrentPages()
				const page = pages[pages.length - 2]
				page.$vm.reloadData()
				setTimeout(()=>{
					uni.navigateBack({
						delta
					})
				},timeout)
			},
			getPreviousDay(dateString) {
			  // 将目标日期字符串转换为日期对象
			  const targetDate = new Date(dateString);
			
			  // 从目标日期中减去一天的时间（24小时 * 60分钟 * 60秒 * 1000毫秒）
			  const previousDayTimestamp = targetDate.getTime() - (24 * 60 * 60 * 1000);
			
			  // 创建表示前一天的日期对象
			  const previousDay = new Date(previousDayTimestamp);
			
			  return this.$u.timeFormat(previousDay, 'yyyy-mm-dd');
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
