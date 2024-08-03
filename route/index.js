import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import store from '@/store/index.js';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES],
	// [重要]:配置解锁,关闭跳转路由锁
    detectBeforeLock: (router, to, navType) => { 
        router.$lockStatus = false
    }
});

// 配置无需授权登录的白名单：页面路由列表
const whiteList = ['/','/pages/common/index', '/pages/common/login','/pages/common/logins',  '/pages/common/share']

const blackList = ['/pages/mine/indexs','/pages/mine/order']

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	const token = store.state._token
	// console.log('to--->',to,from)
	if (token) {
		console.log('已授权登录')
		next()
	} else {
		if (!blackList.includes(to.path)) {
			console.log('白名单页面')
			next();
		} else {
			const path = to.fullPath
			const param = path.includes('?')?'?'+path.split('?')[1]:''
			console.log('未授权登录',to,to.path,param)
			uni.reLaunch({
				url: '/pages/common/login'+param
			})
		}
	}
});

const getUserId = (query)=>{
	if(query && query.hasOwnProperty('userId')){
		// getApp().globalData.inviteId = query.userId
		uni.setStorageSync('userId', query.userId);
	}else{
		// getApp().globalData.inviteId = ''
		uni.setStorageSync('userId', '');
	}
	
}

// 测试
// router.beforeEach((to, from, next) => {
// 	const token = store.state._token
// 	console.log('to',token)
// 	next()
// })

// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log('跳转结束')
})

export {
	router,
	RouterMount
}
