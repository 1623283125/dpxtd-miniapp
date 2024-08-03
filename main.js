// #ifdef MP-WEIXIN
import '@/common/utils/mtj-wx-sdk';
// #endif
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import { router, RouterMount } from '@/route/index.js'
Vue.use(router)

// 全局数据状态管理
import store from '@/store'
const vuexStore = require("@/store/mixin.js")
Vue.mixin(vuexStore)

// 小程序分享
const mpShare = require('@/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	store,
	...App
})

import httpInterceptor from '@/common/api/http.js'
Vue.use(httpInterceptor, app)

import httpApi from '@/common/api/'
Vue.use(httpApi, app)

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount();
// #endif
