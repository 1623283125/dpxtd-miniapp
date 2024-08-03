import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import config from '@/store/config.js'

// 本地永久保存的数据
let lifeData = uni.getStorageSync('lifeData') || {}
// 永久存储在state中的变量名
let saveStateKeys = []


// 处理config配置文件里的数据，得到state
const getStateData = function() {
	const state = {},data = config.stateKeys
	data.forEach(item=>{
		let stateValue = item.default
		if(item.isStorage){
			saveStateKeys.push(item.name)
			stateValue = lifeData[item.name] || item.default
		}
		state[item.name] = stateValue
	})
	return state
}

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
	if (saveStateKeys.indexOf(key) != -1) {
		let tmp = uni.getStorageSync('lifeData') || {}
		tmp[key] = value
		uni.setStorageSync('lifeData', tmp)
	}
}

const store = new Vuex.Store({
	state:getStateData(config),
	mutations: {
		$uStore(state, payload) {
			let nameArr = payload.name.split('.')
			let saveKey = ''
			let len = nameArr.length
			if (len >= 2) {
				let obj = state[nameArr[0]]
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]]
				}
				obj[nameArr[len - 1]] = payload.value
				saveKey = nameArr[0]
			} else {
				state[payload.name] = payload.value
				saveKey = payload.name
			}
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
