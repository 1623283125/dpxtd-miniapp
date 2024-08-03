/*
 * @Author: cooke888
 * @Gitee: https://gitee.com/cooke888
 * @Date: 2023-07-28 10:10:10
 * @LastEditors: cooke888
 * @LastEditTime: 2023-09-28 13:18:14
 * @Description: 启动配置
 */
const TransformPages = require("uni-read-pages");
const { webpack } = new TransformPages();

module.exports = {
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
			proxy: {
				'': {
					target: 'https://wx.dpxtd.com',
					changeOrigin: true,
					secure: false,
					// pathRewrite:{
					// 	'^/api': ''
					// }
				}
			}
		},
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ["path", "name", "meta", "aliasPath"],
					});
					return JSON.stringify(tfPages.routes);
				}, true),
			}),
		]
	},
	chainWebpack: (config) => {
		// 发行或运行时启用了压缩时会生效
		config.optimization.minimizer('terser').tap((args) => {
			const compress = args[0].terserOptions.compress
			// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
			compress.drop_console = true
			compress.pure_funcs = [
				'__f__', // App 平台 vue 移除日志代码
				// 'console.debug' // 可移除指定的 console 方法
			]
			return args
		})
	}
};
