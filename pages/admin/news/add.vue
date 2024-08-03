<template>
	<view class="add-page px-3">
		<u-form :model="model" ref="uForm" label-width="180" label-align="left" :errorType="['message']" :label-style="{fontSize:'30rpx'}">
			
			<u-form-item :label="type==='1'?'发布学校':'发布单位'" prop="belongUnit">
				<u-input :disabled="disabled" v-model="model.belongUnit" placeholder="请输入名称" type="text" input-align="right" />
			</u-form-item>
			
			<u-form-item :label="type==='1'?'学校官网':'单位官网'" prop="belongUnitWebsite">
				<u-input :disabled="disabled" v-model="model.belongUnitWebsite" placeholder="网址必须以 http 或 https 开头" type="text" input-align="right" />
			</u-form-item>
			
			<!-- <u-form-item label="行业" prop="tag">
				<u-input :disabled="disabled" type="select" :select-open="showTag" v-model="TagText" placeholder="请选择行业" @click="showTag = true" input-align="right" />
			</u-form-item> -->
			
			<u-form-item label="消息标题" prop="title">
				<u-input :disabled="disabled" type="text" v-model="model.title" placeholder="请输入标题"  input-align="right" />
			</u-form-item> 
			
			<!-- 消息内容 -->
			<u-form-item label-position="top" prop="article">
				<view class="w-100 mb-1">
					<u-input :disabled="disabled" v-model="model.article" height="150" placeholder="分享自己的经验和想法" type="textarea" :maxlength="-1" border />
				</view>
			</u-form-item> 
			
			<u-form-item prop="coverImage">
				<view class="row mr-2 my-1">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'coverImage')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'coverImage')" max-count="1" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com//system/file/upload" :header="uploadHeader" :index="1">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:200rpx;height:200rpx;">
							<u-icon name="photo" size="50" color="#808080" />
							<text class="font-12" style="color:#808080;">封面图片(1张)</text>
						</view>
					</u-upload>
				</view>
				<view class="w-100 row my-1">
					<u-upload @on-success="(a,b,c,d)=>onSuccess(a,b,c,d,'image')" @on-remove="(a,b,c,d)=>onRemove(a,b,c,'image')" max-count="9" :custom-btn="true" width="140" height="140" action="https://wx.dpxtd.com//system/file/upload" :header="uploadHeader" :index="9">
						<view slot="addBtn" class="y-center font-12 radius-10" style="background:#ebecee;width:200rpx;height:200rpx;">
							<u-icon name="photo" size="50" color="#808080" />
							<text class="font-12" style="color:#808080;">消息图片(多张)</text>
						</view>
					</u-upload>
				</view>
			</u-form-item>
			
			<u-form-item label="上传视频" prop="video">
				<view class="w-100 row justify-end">
					<upload-video @success="onVideoSuccess" />
				</view>
			</u-form-item>
			
		</u-form>
		<view class="mt-5 safe-area-inset-bottom15">
			<u-button @click="btnSubmit()" shape="circle" type="primary" :custom-style="{width: '690rpx',height: '88rpx',fontSize: '30rpx',marginTop: '40rpx',background: '#48A5FE'}" hover-class="hover-class">发布</u-button>
		</view>
		
		<!-- 客服 - 悬浮按钮 -->
		<float-kefu></float-kefu>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'1',
				disabled:false,
				uploadHeader:{},
				model: {
					id: '', //主键
					groupOriented: '', //面向群体,1:大学生 2:退役军人 3:残疾人
					title: '', //标题
					belongUnit: '', //所属单位
					belongUnitWebsite: '', //所属单位官网
					coverImage: '', //封面图
					image: '', //图片,按逗号分割
					video: '', //视频,按逗号分割
					article: '', //文章
				},
			};
		},
		onLoad(opt) {
			console.log('opt',opt);
			this.type = opt.type||'1'
			this.initData()
		},
		methods: {
			initData(){
				this.uploadHeader = {Token: this._token||''}
			},
			// 确定提交数据
			btnSubmit() {
				this.model.groupOriented = this.type
				console.log('model', this.model);
				if(!this.$u.test.url(this.model.belongUnitWebsite)){
					this.$u.toast('官网格式输入错误')
					return
				}
				// return
				this.$api.saveNews(this.model).then(res => {
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
