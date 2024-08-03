<template>
	<view class="add-page px-3">
		<u-form :model="model" ref="uForm" label-width="160" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">
			
			<!-- <u-form-item label="账号" prop="phone">
				<u-input :disabled="disabled" v-model="model.phone" placeholder="请输入账号" type="text" input-align="right" />
			</u-form-item> -->
			
			<u-form-item label="标题" prop="title">
				<u-input :disabled="disabled" type="text" v-model="model.title" placeholder="请输入标题"  input-align="right" />
			</u-form-item> 
			
			<u-form-item label-position="top" prop="content">
				<view class="col w-100 mb-3">
					<!-- 消息内容 -->
					<view class="content">
						<u-input :disabled="disabled" v-model="model.content" height="150" placeholder="分享自己的经验和想法" type="textarea" :maxlength="-1" border />
					</view>
					<!-- <view class="action row mt-3">
						<view class="upload-card">
						  <u-upload :custom-btn="true" :maxCount="9" width="200" height="200">
								<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
									<u-icon name="photo" size="60" color="#808080"></u-icon>
									<text style="color:#808080;">照片</text>
								</view>
							</u-upload>
						</view>
						
						<view class="upload-card ml-3">
						  <u-upload :custom-btn="true" :maxCount="9" width="200" height="200">
								<view slot="addBtn" class="y-center radius-10" style="width:200rpx;height:200rpx;;background:#f4f5f6;">
									<u-icon name="play-circle" size="60" color="#808080"></u-icon>
									<text style="color:#808080;">视频</text>
								</view>
							</u-upload>
						</view>
						
					</view> -->
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
			
			<u-form-item label="所在地区">
				<u-input placeholder="请选择省市区" v-model="address.area" type="select" :select-open="showArea" @click="showArea = true" input-align="right" />
			</u-form-item>
			
			<!-- <u-form-item label="" prop="tag">
				<view class="w-100 row align-center justify-between">
					<text>邀请您参与讨论</text>
					<text style="color:#808080">查看更多></text>
				</view>
			</u-form-item> -->
			
		</u-form>
		<view class="pt-5 safe-area-inset-bottom15">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">发布</u-button>
		</view>
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu></float-kefu>
		
		
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
				showEndDate:false,
				showArea:false,
				address:{
					area:'',
					province:'',
					city:'',
					region:'',
					detail:'',
				},
				model: {
					id: '', //主键
					title: '', //标题
					image: '', //图片,按逗号分割
					video: '', //视频,按逗号分割
					content: '', //吐槽内容
					comeFrom: '', //发布地址
				},
				uploadHeader:{},
			};
		},
		onLoad(opt) {
			console.log('opt',opt);
			this.initData()
			},
		methods: {
			initData(){
				this.uploadHeader = { Token: this._token||'' }
			},
			// 确定提交数据
			btnSubmit() {
				console.log('model', this.model);
				const checkData = {
					type:4,
					content:this.model.content,
					openid:this._userInfo.openId,
				}
				this.$api.msgSecCheck(checkData).then(res => {
					console.log('msgSecCheck',res)
					if(res.data.errcode===0){
						this.$api.saveRoast(this.model).then(res => {
							this.$u.toast('提交成功')
							this.reloadData()
						})
					}else{
						this.$u.toast('内容不通过')
					}
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
			// 地区选择
			confirmArea(e){
				console.log('confirmArea',e)
				const {province,city,area} = e
				this.address.province = province.label
				this.address.city = city.label
				this.address.region = area.label
				this.address.area = province.label+' '+city.label
				this.model.comeFrom = city.label
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
