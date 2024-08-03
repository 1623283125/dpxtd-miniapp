<template>
	<view class="list-wrap bg-white radius-10 mt-2 px-2">
		<!-- loading -->
		<view v-if="loading===0" class="x-center py-2">
			<u-loadmore status="loading" />
		</view>
		<!-- 暂无评论 -->
		<view v-if="dataList.length===0 && loading===1" class="x-center pb-2">
			<u-empty text="还没有人评论，抢沙发～" icon-size="320"
				src="/static/images/data-bg-comment.png" />
		</view>
		<!-- 评论列表 -->
		<div v-for="(item,i) in dataList" :key="i" class="row py-3 u-border-top">
			<u-avatar @click="goUserProfilePage(item)" size="72" :src="item.userAvatar" />
			<view class="flex-1 ml-2">
				<view class="row align-center">
					<view class="row align-center">
						<text style="color:#636363">{{item.userNickname}}</text>
						<view class="x-center mx-1">
							<u-icon :name="`/static/images/sex-${item.userSex||0}.png`" size="24" />
						</view>
					</view>
					<view class="x-center">
						<u-rate v-model="item.userStarLevel" size="24" 
							active-color="#F3D958" disabled />
					</view>
				</view>
				<view class="mt-08 font-15">
					{{item.comment}}
				</view>
				<view class="row align-center justify-between mt-1 color3">
					<view class="row align-center font-12">
						<text>{{item.createDate}}</text>
						<text class="u-border-left ml-1 pl-1">来自{{item.comeFrom}}</text>
					</view>
					<view class="row align-center font-12">
						<view class="x-center pr-1">
							<u-icon :label="item.replyCount" name="chat" color="#999" 
								label-color="#999" label-size="24" size="24"
								label-pos="right" />
						</view>
						<view class="x-center pl-1">
							<u-icon @click="btnSwitchLike(item.id)" :label="item.likesCount" 
								name="thumb-up" color="#999" 
								label-color="#999" label-size="24" size="24"
								label-pos="right" />
						</view>
					</view>
				</view>
			</view>
		</div>
		<!-- 转发/评论 -->
		<comment-input :isCollect="isCollect" 
			@confirm="btnAddComment" @collect="btnCollect" />
	</view>
</template>

<script>
	export default {
		name: "comment-list",
		props:{
			tid:{
				type:String
			},
			type:{
				type:String
			},
			collect:{
				type:Boolean,
				default:false
			},
		},
		data() {
			return {
				loading:0,
				dataList: [],
				isCollect:false
			};
		},
		created(){
			this.getDataList()
		},
		watch:{
			collect:{
				handler(newVal, oldVal) {
					// 首次加载时也会执行
					this.isCollect = newVal
					console.log('collect',this.isCollect,newVal)
				},
				immediate: true
			}
		},
		methods:{
			// 获取详情数据
			getDataList() {
				const data = {
					targetId: this.tid,
					commentType: this.type
				}
				this.$api.getCommentList(data).then(res => {
					let dataList = res.data.list
					if(!dataList){
						dataList = []
					}
					this.dataList = dataList
					this.loading = 1
				})
			},
			// 添加评论
			btnAddComment(content){
				const data = {
					comment: content,
					targetId: this.tid,
					commentType: this.type
				}
				console.log('btnAddComment',data)
				const checkData = {content,type:2,openid:this._userInfo.openId}
				this.$api.msgSecCheck(checkData).then(res => {
					console.log('msgSecCheck',res)
					if(res.data.errcode===0){
						this.$api.saveComment(data).then(res => {
							this.getDataList()
						})
					}else{
						this.$u.toast('内容不通过')
					}
				})
			},
			// 收藏/取消收藏
			btnCollect(){
				const data = {
					targetId: this.tid,
					favoritesType: this.type
				}
				console.log('btnCollect',data)
				// return
				this.$api.saveCollect(data).then(res => {
					this.isCollect = !this.isCollect
				})
			},
			// 点赞或取消
			btnSwitchLike(id){
				this.$api.switchLike(id).then(res => {
					this.getDataList()
				})
			},
			goUserProfilePage(item){
				console.log('this.item',item)
				const userId = item.userId||item.id
				this.$u.route('/pages/index/userProfile',{
					id: userId
				})
			},
		}
	}
</script>

<style>

</style>