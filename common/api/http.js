import globalConfig from '@/common/config'
const log = (...msg)=> {
	if (process.env.NODE_ENV === 'development') {
		console.log(...msg)
	}
}
let uuid = 1000
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl:globalConfig.getBaseUrl(),
		originalData: true, 
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'App-Type': 'cooke888' 
		}
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 是否需要Token验证
		// if(!globalConfig.urlWhiteList.includes(config.url)){
		// 	config.header.token = vm._token
		// }
		config.header.token = vm._token||''
		uuid++
		config.uuid = uuid
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res,config) => {
		log(`◆◆◆◆-------------------------------------------------- ${uuid}: ${config.uuid} ------------------------------------------------------`)
		log('|--->【请求参数】',config)
		log(`|`)
		log('|--->【返回结果】',res.data)
		log(`|`)
		if(res.statusCode===200){
			const data = res.data
			if (data.code === 200) {
				return data
			}else if (data.code === 2000) {
				vm.$u.toast(data.message);
				return data
			}else if (data.code === 401||data.code === 402){
				// vm.$u.toast('用户未授权，请登录后操作');
				// setTimeout(()=>{
				// 	vm.$u.vuex('_token', '')
				// 	uni.navigateTo({url:'/pages/common/login'});
				// },1500)
				if(config.url.includes('wx/loginByPhone')){
					vm.$u.toast(res.data.message);
					return 
				}
				vm.$u.vuex('_token', '')
				uni.showModal({
					title: '是否登录？',
					content: '请先登录以查看页面内容',
					confirmText: '去登录',
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({url:'/pages/common/login'})
						} else if (res.cancel) {
							uni.navigateBack()
						}
					}
				})
				return false
			}else if (data.code === 4001){
				vm.$u.toast('请先完成星级认证');
				setTimeout(()=>{
					uni.navigateTo({url:'/pages/mine/starAuth'});
				},1500)
				return false
			}else if (data.code === 4002){
				vm.$u.toast('请先完善个人图像');
				setTimeout(()=>{
					uni.navigateTo({url:'/pages/mine/editProfile'});
				},1500)
				return false
			}else{
				vm.$u.toast(data.message);
				return false
			}
		}else if(res.statusCode===400){
			vm.$u.toast(res.data.message);
			return false
		}else if(res.statusCode===403){
			// vm.$u.toast('用户未授权，请登录后操作');
			setTimeout(()=>{
				vm.$u.vuex('_token', '')
				uni.reLaunch({url: '/pages/common/login'});
			},0)
			return false
		}else if(res.statusCode===404){
			vm.$u.toast('请求错误，请稍后再试');
			return false
		}else if(res.statusCode===500){
			vm.$u.toast('服务器繁忙，请稍后再试');
			return false
		}else{
			vm.$u.toast('未知错误，请稍后再试');
			return false
		}
	}
}

export default {
	install
}
