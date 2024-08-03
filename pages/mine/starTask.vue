<template>
	<view class="search-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :safe-area-inset-bottom="true">
				<view slot="top" class="bg-white col w-100">
					<view class="tabs-wrap">
						<u-tabs :list="tabsList" :current="tabsIndex" :is-scroll="false" @change="changeTabs" active-color="#48A5FE"
							:gutter="20" />
					</view>
				</view>
				<view class="content">
					<view class="list-wrap px-2">
						<div v-for="(item,i) in dataList" :key="i" class="bg-white radius-16 col mb-2 overflow-hidden">
							<view class="row align-center p-2">
								<view class="col flex-1">
									<text class="font-15 font-weight-500">{{taskList.find(v=>v.taskType===item.taskType).title}}</text>
									<text class="font-12 color3"
										style="margin-top:4rpx;">{{taskList.find(v=>v.taskType===item.taskType).desc}}</text>
								</view>
								<template v-if="tabsIndex===0">
									<u-button v-if="item.isGet" disabled type="primary" shape="circle"
										:custom-style="{background: '#48A5FE'}">已领取</u-button>
									<u-button v-else @click="btnGetTask(item)" type="primary" shape="circle"
										:custom-style="{background: '#48A5FE'}">待领取</u-button>
								</template>
								<!-- <u-button v-else @click="btnAction(item)" type="primary" shape="circle" :custom-style="{background: '#48A5FE'}">{{taskList.find(v=>v.taskType===item.taskType).action}}</u-button> -->
								<template v-else>
									<u-button v-if="item.taskType===2" open-type="share" type="primary" shape="circle" :custom-style="{background: '#48A5FE'}">去邀请</u-button>
									<u-button v-else @click="btnAction(item)" type="primary" shape="circle" :custom-style="{background: '#48A5FE'}">{{taskList.find(v=>v.taskType===item.taskType).action}}</u-button>
								</template>
							</view>
							<image :src="`/static/images/bg-task-${item.taskType}.png`" style="width: 100%;" mode="widthFix" />
						</div>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsIndex: 0,
				tabsList: [{
					id: 1,
					type: 'partnership',
					name: '任务列表'
				}, {
					id: 2,
					type: 'resourceGruop',
					name: '我的任务'
				}],
				taskList: [{
						id: 1,
						taskType: 1,
						isGet: false,
						title: '连续评论3天获赠D币10',
						desc: '210位合伙人已经领取任务',
						action: '去评论'
					},
					{
						id: 2,
						taskType: 2,
						isGet: false,
						title: '成功邀请1位好友获赠D币30',
						desc: '210位合伙人已经领取任务',
						action: '去邀请'
					},
					{
						id: 3,
						taskType: 3,
						isGet: false,
						title: '投稿获赠D币100',
						desc: '210位合伙人已经领取任务',
						action: '去投稿'
					}
				],
				dataList: []
			}
		},
		onLoad() {
			this.initShareData()
		},
		methods: {
			reloadData() {
				this.$refs.paging.reload()
			},
			initShareData(){
				const queryData = {
					changeType: -1,
					targetId: 0,
					shareCode: this._userInfo.code,
					shareUserId: this._userInfo.userId,
					pagePath: `/pages/index/index`,
					pageId: 0
				}
				let shareData = {
					title: '地平线跳动', // 默认为小程序名称
					path: `/pages/common/share?q=${JSON.stringify(queryData)}`, // 默认为当前页面路径
					imageUrl: '' // 默认为当前页面的截图
				}
				this.$u.mpShare = shareData
			},
			// 获取列表数据
			queryList(pageNo, pageSize) {
				let data = {}
				this.getTaskList(data, pageNo, pageSize)
			},
			getTaskList(data, pageNo, pageSize) {
				this.$api.getTaskList(data, pageNo, pageSize).then(res => {
					if (this.tabsIndex === 0) {
						if (res.data.length > 0) {
							this.taskList.map(v => {
								let item = res.data.find(item => item.taskType === v.taskType)
								v.isGet = item ? true : false
							})
						}
						this.$refs.paging.complete(this.taskList)
					} else {
						this.$refs.paging.complete(res.data)
					}
				}).finally(() => {
					this.$refs.paging.endRefresh()
				})
			},
			// 监听Tabs切换
			changeTabs(e) {
				this.tabsIndex = e
				this.reloadData()
			},
			// 领取任务
			btnGetTask(item) {
				this.$api.saveTask(item.taskType).then(res => {
					this.$u.toast('领取成功')
					this.reloadData()
				})
			},
			// 前往做任务
			btnAction(item) {
				console.log('item', item)
				if (item.taskType === 3) {
					this.$u.route('/pages/roast/add')
				} else {
					this.$u.route({
						type: 'tab',
						url: '/pages/index/index'
					})
				}
			},
			// 跳转详情页面
			goInfoPage(item) {
				this.$u.route('pages/index/funderInfo', {
					id: item.id
				})
			},
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