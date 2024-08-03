<template>
	<view class="my-upload" :class="fileType===2?'w-100':''">
		<htz-image-upload :mediaType="mediaType" :dataType="1" :max="maxCount" v-model="uploadData" action="https://wx.dpxtd.com/client-api/util/upload" :headers="uploadHeader" @uploadSuccess="onSuccess" @uploadFail="onFail" @imgDelete="onDelete" />
	</view>
</template>

<script>
	export default {
		name:"upload-video",
		props:{
			mediaType:{
				type:String,
				default:'video'
			},
			defaultData:{
				type:Array,
				default:()=>[]
			},
			maxCount:{
				type:Number,
				default:1
			}
		},
		data() {
			return {
				uploadHeader:{},
				uploadData:[],
				fileType:0,
			};
		},
		created(){
			this.initData()
		},
		watch: {
			defaultData(val, oldVal) {
				this.uploadData = val
				console.log('uploadData',this.uploadData)
			},
		},
		methods:{
			initData(){
				this.uploadHeader = {Token: this._token||''}
			},
			// 上传成功
			onSuccess(e){
				console.log('onSuccess',e)
				let uploadData = this.uploadData
				console.log('uploadData',uploadData)
				if(e.statusCode===200){
					const res = JSON.parse(e.data)
					console.log('res',res)
					if(res.code===200){
						uploadData.push({
							type: e.fileType,
							url: res.data.url
						})
						this.fileType = e.fileType
					}
				}
				this.uploadData = uploadData
				this.$emit('success',this.uploadData)
			},
			// 上传失败
			onFail(e){
				console.log('onFail',e)
			},
			onDelete(e){
				console.log('onDelete',e)
				// let url = e.del.url
				// this.uploadData = this.uploadData.filter(v=>v.url!==url)
				// console.log('uploadData',this.uploadData)
				this.$emit('success',this.uploadData)
			}
		}
	}
</script>

<style lang="scss">

</style>