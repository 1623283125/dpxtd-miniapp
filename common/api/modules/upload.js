// 文件图片上传相关接口
export default (m) => ({
	// 获取七牛云上传授权信息
	getQiniuAuth() {
		return m.post('/doorh5/oss/qiniu/getUploadToken')
	},
	// 上传图片
	uploadImg(path, fn) {
		uni.showLoading()
		this.getQiniuAuth().then(res => {
			const data = {
				url:'https://up-z2.qiniup.com',
				formData:{
					key: new Date().getTime(),
					token: res.data
				}
			}
			this.doUploadImg(path,data).then(res=>{
				fn&&fn(res)
			}).catch(err=>{
				m.toast('上传失败')
			})
		}).catch(err => {
			uni.hideLoading();
			m.toast('上传失败')
		})
	},
	// 上传图片业务处理
	doUploadImg(filePath, data) {
		return new Promise((resolve, reject) => {
			if (!filePath) {
				uni.showModal({
					title: '图片错误',
					content: '请重试',
					showCancel: false,
				})
				reject('图片错误');
			}
			console.log('上传图片中...');
			uni.uploadFile({
				url: data.url,
				filePath: filePath, // 要上传文件资源的路径
				name: 'file', // 必须填file
				formData: data.formData,
				method: "POST",
				success: function(res) {
					if (res.statusCode === 200) {
						const data = JSON.parse(res.data)
						console.log('上传成功:data:', data)
						if (res.errMsg === 'uploadFile:ok') {
							// const url = 'http://jx-source.17tongx.com/'+data.key
							const url = data.key
							resolve(url)
						} else {
							// this.$u.toast('上传失败')
							reject(new Error('上传错误:' + JSON.stringify(res)));
						}
					} else {
						// this.$u.toast('上传失败')
						reject(new Error('上传错误:' + JSON.stringify(res)));
					}
				},
				fail: function(err) {
					reject(err);
				},
				complete: (res) => {
					uni.hideLoading();
				}
			})
		})
	},
})
