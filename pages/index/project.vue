<template>
	<view class="search-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true" :default-page-size="15">
				<view slot="top" class="bg-white col w-100">
					<view class="search-warp x-center px-3" style="height: 88rpx;">
						<u-search v-model="keyword" @search="(v)=>btnSearch(1)" @custom="(v)=>btnSearch(2)" :show-action="false"
							placeholder="搜索关键词" class="w-100" bg-color="rgba(0, 0, 0, 0.04)"
							:input-style="{background:'transparent'}" />
					</view>
					<view class="dropdown-wrap">
						<dropdown-list />
					</view>
				</view>
				<view class="content">
					<view class="list-wrap bg-white radius-10 px-2">
						<div @click="goInfoPage(item)" v-for="(item,i) in dataList" :key="i" class="row py-3 u-border-top">
							<u-avatar size="140" :src="item.coverImage" mode="square" />
							<view class="flex-1 ml-2 overflow-hidden">
								<view class="row align-center mb-1">
									<view class="row align-center flex-1 mr-1 u-line-2">
										<view class="font-15 font-weight-500 u-line-1">
											{{item.name}}
										</view>
									</view>
									<view class="row align-center line-height-1 font-12" style="flex-shrink: 0;">
										<text class="mr-1 color3">{{item.province+item.city}}</text>
										<u-icon name="map" color="#808080" size="24" />
									</view>
								</view>
								<view class="row align-center justify-between color3">
									<view class="row align-center line-height-1 font-12">
										<text>预筹{{item.intendAmount}}万</text>
										<text class="u-border-left ml-1 pl-1">{{item.pvCount}}人浏览</text>
									</view>
									<view v-if="isNewDate(item.endTime)" class="row align-center line-height-1 font-12" style="background: linear-gradient(90deg,#47A5FC,#7EBFFC,#47A5FC);padding:6rpx 10rpx;color:#fff;border-radius: 4rpx;">
										截止{{$u.timeFormat(item.endTime, 'yyyy年mm月dd日')}}
									</view>
									<view v-else class="row align-center line-height-1 font-12" style="background: linear-gradient(90deg,#FF9032,#FFB96F,#FF9032);padding:6rpx 10rpx;color:#fff;border-radius: 4rpx;">
										<!-- 截止{{$u.timeFormat(item.endTime, 'yyyy年mm月dd日')}} -->
										已停止
									</view>
								</view>
								<view class="font-15 mt-2 u-line-2">
									<!-- <rich-text style="word-wrap: break-word;word-break: break-all;" :nodes="getRichHtml(item.content)" /> -->
									{{item.content}}
								</view>
							</view>
						</div>
					</view>
				</view>
				<!-- 发布 - 悬浮按钮 -->
				<float-publish slot="bottom" @click="goPublishPage()" position="fixed" />
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				dataList: []
			}
		},
		onLoad() {

		},
		methods: {
			reloadData(){
				this.$refs.paging.reload()
			},
			// 获取列表数据
			queryList(pageNo, pageSize) {
				let data = {}
				
				if(this.keyword){
					data.searchStr = this.keyword
				}
				if(this.industry){
					data.industry = this.industry
				}
				if(this.province){
					data.province = this.province
				}
				if(this.city){
					data.city = this.city
				}
				
				this.$api.getProjectList(data,pageNo,pageSize).then(res => {
					if(!res.data.list){
						this.$refs.paging.complete([])
						return
					}
					const dataList = res.data.list.map(v=>({
						...v,
						name:v.title,
						rate: +v.userStarLevel,
						sex: v.userSex,
						avatar: v.userAvatar,
						content: v.content,
						province: v.province,
						city: v.city,
						endTime: v.deadline,
						userTitle: v.userTitle,
						userIndustry: v.userIndustry,
						labels: v.label?v.label.split(','):[]
					}))
					this.$refs.paging.complete(dataList)
				}).finally(()=>{
					this.$refs.paging.endRefresh()
				})
			},
			// 跳转详情页面
			goInfoPage(item) {
				this.$u.route('/pages/index/projectInfo',{
					id:item.id
				})
			},
			// 跳转发布页面
			goPublishPage() {
				this.$u.route('/pages/admin/project/add')
			},
			// 日期比较
			isNewDate(dtString) {
			  // 将目标日期字符串转换为日期对象
			  const targetDate = new Date(dtString);
			  // 获取当前日期时间
			  const currentDate = new Date();
			  // 比较日期
			  return targetDate >= currentDate
			},
			// 搜索
			btnSearch(i) {
				// if (!this.keyword) {
				// 	this.$u.toast('输入搜索关键字')
				// 	return
				// }
				this.$refs.paging.reload()
			},
			getRichHtml(content,line=2){
				let html = `<div style="overflow: hidden;
											word-break: break-all;
											text-overflow: ellipsis;
											display: -webkit-box;
											line-clamp: ${line};
											-webkit-line-clamp: ${line};
											-webkit-box-orient: vertical;">
										${content}
										</div>`
				return html
			}
		}
	}
</script>

<style lang="scss">
	page,
	uni-page-body {
		height: 100%;
	}

	.search-page {}
</style>