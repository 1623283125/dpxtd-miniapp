<template>
	<view class="dropdown-list">
		<u-dropdown ref="refDropdown">
			<u-dropdown-item v-for="(item,index) in dropdowns" :key="index" 
				:height="item.height" v-model="item.value"
				:title="item.title" :options="item.options" />
		</u-dropdown>
	</view>
</template>

<script>
	export default {
		name: "dropdown-list",
		props: {
			show:{
				type: Boolean,
				default: true
			},
			options: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				dropdowns: [
					{
						type: 'area',
						title: '按地区',
						value: '',
						height: '40vh',
						options: [
							{
								label: '北京',
								value: 1,
							},
							{
								label: '上海',
								value: 2,
							},
							{
								label: '南京',
								value: 3,
							},
							{
								label: '重庆',
								value: 4,
							},
							{
								label: '武汉',
								value: 5,
							},
							{
								label: '深圳',
								value: 6,
							},
							{
								label: '广州',
								value: 7,
							},
							{
								label: '成都',
								value: 8,
							},
							{
								label: '杭州',
								value: 9,
							},
							{
								label: '天津',
								value: 10,
							}
						]
					},
					{
						type: 'industry',
						title: '按行业',
						value: '',
						height: '40vh',
						options: [
							{
								label: '餐饮',
								value: 1,
							},
							{
								label: '电商',
								value: 2,
							},
							{
								label: '母婴',
								value: 3,
							}
						]
					},
				],
			};
		},
		methods:{
			menuClick(index){
				this.$refs.refDropdown.menuClick(index)
			},
			close(){
				this.$refs.uDropdown.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dropdown-list {}
</style>