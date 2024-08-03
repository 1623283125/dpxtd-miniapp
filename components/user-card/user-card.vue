<template>
	<div class="user-card row align-start">
		<view @click.stop="goUserProfilePage()" class="x-center">
			<u-avatar size="80" :src="user.avatar"
				:sex-bg-color="user.sex===0?'#FFDEDE':'#C2ECFE'"
				:show-sex="showSex()" :sex-icon="`/static/images/sex-${user.sex}.png`" />
		</view>
		<view class="flex-1 ml-2 u-line-1">
			<view class="row align-center justify-between mb-08 line-height-15">
				<view class="row align-center u-line-1">
					<text class="font-15 u-line-1 mr-1 font-weight-500">{{user.name}}</text>
					<!-- <view class="x-center">
						<u-icon :name="`/static/images/sex-${user.sex}.png`"  size="24" />
					</view> -->
				</view>
				<view class="x-center">
					<u-rate v-model="user.rate" size="24" active-color="#F3D958" disabled />
				</view>
			</view>
			<view class="row align-center justify-between color3">
				<view class="row align-center line-height-1 font-12">
					<template v-if="user.userTitle">
						<text class="user-title">
							{{user.userTitle||''}}
						</text>
						<view class="u-border-right mx-1" style="height:24rpx;" />
					</template>
					<text v-if="user.industry">
						{{getIndustry(user.industry)}}
					</text>
				</view>
				<view class="row align-center line-height-1 font-12">
					<text class="mr-1">{{user.province+user.city}}</text>
					<u-icon name="map" color="#808080" size="24" />
				</view>
			</view>
			<view v-if="showContent&&user.content" class="font-15 mt-2 u-line-2">
				{{user.content}}
			</view>
			<view v-if="showTags&&user.tags.length>0" class="tags row flex-wrap">
				<div v-for="tag in user.tags" :key="tag" class="px-1 mt-2">
					<u-tag :text="tag" type="info" size="default" 
						border-color="transparent" />
				</div>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		name:"user-card",
		props:{
			showContent:{
				type:Boolean,
				default:true
			},
			showTags:{
				type:Boolean,
				default:true
			},
			showTap:{
				type:Boolean,
				default:true
			},
			user:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				industryList:[]
			};
		},
		created(){
			this.initData()
		},
		methods:{
			// 网络请求数据
			initData(){
				this.$api.getDicList().then(res=>{
					let industry = res.data.find(v=>v.type==='industry')
					this.industryList = industry.items
				})
			},
			goUserProfilePage(){
				console.log('this.user',this.user)
				if(this.showTap){
					const userId = this.user.userId||this.user.id
					this.$u.route('pages/index/userProfile',{
						id: userId
					})
				}
			},
			showSex(){
				let value = this.user.sex
				if (value === null || value === undefined || value === "") {
				  return false;
				}else{
					return true;
				}
			},
			getIndustry(type){
				let item = this.industryList.find(v=>v.value==type)
				if(item){
					return item.label
				}else{
					return ''
				}
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

<style lang="scss" scoped>
	.tags{
		margin: 10rpx -10rpx 0;
	}
</style>