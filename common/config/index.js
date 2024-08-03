// 不同小程序的配置
const Index = 0

// 配置不同小程序的类型
const appType = ['cooke','cooke888']

// 生产环境（测试、正式）
const prodUrls = ['https://wx.dpxtd.com','https://wx.dpxtd.com']

// 针对不同平台的baseUrl
const apiHttp = {
	// #ifdef H5
	dev:'',//可以本地走代理跨域请求
	// #endif
	// #ifndef H5
	// dev:'http://121.37.247.249:8090',//线上开发环境
	dev:prodUrls[0],
	// #endif
	prod: prodUrls[Index]
}

//配置不需要Token的Url白名单
const urlWhiteList = ['/api/v1/session/', '/api/v1/wechat/auth/']

//图片上传路径，暂时没有用到
const imageApi = 'https://www.cooke.com'

const getAppType = ()=>{
	return appType[Index]
}

export default {
	appType:getAppType(),
	urlWhiteList,
	getBaseUrl: env => {
		if (process.env.NODE_ENV === 'development') {
			if (env) return apiHttp[env]
			return apiHttp.dev
		} else {
			return apiHttp.prod
		}
	},
	addBaseUrl: url => {
		const baseList = ['mock', 'test', 'dev']
		const key = baseList.find(s => url.indexOf(`{${s}}`) > -1)
		if (process.env.NODE_ENV === 'development') {
			if (key) return url.replace(`{${key}}`, apiHttp[key])
			return apiHttp.dev + url
		} else if (key) {
			return url.replace(`{${key}}`, apiHttp.prod)
		}
		return apiHttp.prod + url
	},
	imageApi: imageApi,
	enableLoginCheck: true,
}
