<template>
	<view class="help-page h-100 col position-relative">
		<view class="cart-wrap flex-1">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" 
				:safe-area-inset-bottom="true" bg-color="#ffffff">
				<view class="p-2">
					<u-collapse @change="onChange">
						<u-collapse-item :ref="`ref${index+1}`" :title="`${index+1}.${item.title}`" :index="index"
							v-for="(item, index) in dataList" :key="index">
							<view v-if="item.isHas" class="">
								{{item.content}}
							</view>
							<view v-else class="x-center">
								<u-loading mode="flower" />
							</view>
						</u-collapse-item>
					</u-collapse>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				dataList:[]
			}
		},
		onLoad(opt) {
			this.type = opt.type||''
		},
		methods: {
			reloadData(){
				this.$refs.paging.reload()
			},
			// 帮助中心-列表
			queryList(pageNo, pageSize) {
				this.$api.getHelpList({
					helpType: this.type,
					pageNo,pageSize
				}).then(res => {
					const dataList = res.data.map(v=>({
						...v,
						content:'',
						isHas: false
					}))
					this.$refs.paging.complete(dataList)
				})
			},
			// 详情信息
			getHelpInfo(id,index) {
				this.$api.getHelpInfo({
					id
				}).then(res => {
					this.dataList[index].content = res.data.content
					this.dataList[index].isHas = true
					// console.log('this.dataList',this.dataList)
				})
			},
			onChange(e){
				// console.log('onChange', e)
				const id = this.dataList[e].id
				if(!this.dataList[e].isHas){
					this.getHelpInfo(id,e)
				}
			},
		}
	}
</script>

<style lang="scss">
	page, uni-page-body {
		height: 100%;
	}
</style>