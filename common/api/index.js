// 导入所有API模块
const files = require.context('./modules/', true, /\.js$/)

// 加载所有API
const loadApis = (r,m)=>{
	let apis = {}
	// console.log('r:',r.keys());
	r.keys().forEach((key) => {
		const api = r(key).default
		apis = {...apis,...api(m)}
	})
	return apis
}

// Vue插件：install方法
const install = (Vue, vm) => {
	// console.log('m:',vm.$u);
	// 1：vm.$u.api = {login};
	// 2：Vue.prototype.$api = {login};
	// console.log('files',files);
	Vue.prototype.$api = loadApis(files,vm.$u);
}

export default {
	install
}