<template>
	<view class="w-100 row align-center justify-end">
		<view class="radio-group" style="margin-right: -20rpx;">
			<u-radio-group @change="radioGroupChange" v-model="defaultValue">
				<u-radio 
					v-for="(item, index) in sex.list" :key="index" 
					:name="item.value"
				>
					{{item.label}}
				</u-radio>
			</u-radio-group>
		</view>
	</view>
</template>

<script>
	import {sexData} from '@/common/config/data'
	export default {
		name:"radio-sex",
		props:{
			value:{
				type:[String,Number],
				default: '-1'
			}
		},
		data() {
			return {
				sex: {},
				defaultValue:this.value===''?'-1':this.value
			};
		},
		created(){
			this.initData()
		},
		watch:{
			value(nVal, oVal) {
				this.defaultValue = nVal
				console.log('defaultValue1',this.defaultValue)
				if(nVal !== oVal){
					this.radioGroupChange(nVal)
				}
			}
		},
		methods: {
			initData(){
				this.sex = this.$u.deepClone(sexData)
				console.log('defaultValue2',this.defaultValue)
			},
			radioGroupChange(e){
				console.log('radioGroupChange',e)
				this.$emit('input',e)
			},
		}
	}
</script>

<style>

</style>