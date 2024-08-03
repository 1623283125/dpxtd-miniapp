const config = {
	stateKeys: [{
			name: "_app", //app基本配置信息
			isStorage: false,
			default: {
				version: "1.0.0",
				name: '地平线跳动',
				logo: '/static/logo.png'
			}
		},
		{
			name: "_userInfo", //用户登录信息
			isStorage: true,
			default: {
				userId: '',
				userName: '',
				nickName:'未登陆用户',    
				userLevel: 0,
				phone: '',
				avatar: '',
				gender: 0,
				remark: '',
				openId: '',
				code:''
			},
		},
		{
			name: "_token", //登录Token
			isStorage: true,
			// #ifdef MP-WEIXIN
			default: ""
			// #endif
			// #ifdef H5
			default: ""
			// default: "3f28d5ef-3e25-48c4-9c43-7c0723826e76"
			// #endif
		},
		{
			name: "_showWxPrivacy", // 是否显示隐私协议
			isStorage: false,
			default: 'init',
		}
	],
};

export default config;
