// 用户操作相关接口
export default (m) => ({
	// 用户登录(已有用户账号密码登录)
	login(username,password) {
		return m.post(`/client-api/wx/loginByPhone`, {
			username,
			password
		})
	},
	// 用户注册
	register(username,password) {
		return m.post(`/client-api/wx/userRegister`, {
			loginUserName: username,
			loginPassword: password
		})
	},
	// 获取微信OpenId
	getWxOpenId(code){
		return m.get(`/client-api/wx/getWechatOpenIdByCode`,{code})
	},
	// 微信登录
	wxLogin(data){
		return m.post(`/client-api/wx/decryptAndLogin`,data)
	},
	// 星级认证(1、2、3、4、5)
	starAuth(level,data){
		return m.post(`/client-api/starAuth/star${level}`,data)
	},
	// 星级认证详情
	getStarAuthInfo(){
		return m.get(`/client-api/starAuth/get`)
	},
	// 我的发布
	// [project、funder、roast、lecture、partnership、resourceGruop、comment、news、match]
	getMyPublish(name){
		return m.get(`/client-api/myPublish/${name}`)
	},
	// 获取用户信息
	getUserInfo(){
		return m.get(`/client-api/userInfo/userInfo`)
	},
	// 获取用户信息
	getOtherUserInfo(userId){
		return m.get(`/client-api/userInfo/checkOtherInfo?otherUserId=${userId}`)
	},
	// 编辑用户信息
	editUserInfo(data){
		return m.post(`/client-api/userInfo/updateUserInfo`,data)
	},
	// 我的参与type='match/partnership/project'
	myJoinList(type){
		return m.get(`/client-api/myJoin/${type}`)
	},
	// 我的发布data={type:'match/partnership/project',keyword:'模糊查询'}
	myPublishList(data){
		return m.get(`/client-api/myPublish/${data.type}?searchStr=${data.keyword}`)
	},
	// 我的收藏data={type:'match/partnership/project',keyword:'模糊查询'}
	myCollectList(data){
		return m.get(`/client-api/myFavorite/${data.type}?searchStr=${data.keyword}`)
	},
	// 查看手机号码
	showPhone(data){
		return m.get(`/client-api/scoreConsume/activeView`,data)
	},
	// 分享查看联系方式
	showShare(data){
		return m.get(`/client-api/scoreConsume/shareView`,data)
	},
	// 分享关联推荐人
	showShareApp(code){
		return m.get(`/client-api/userInfo/associatReferrer?extendCode=${code}`)
	},
	// 下单
	createOrder(data){
		return m.post(`/client-api/wxPay/unifiedorder`,data)
	},
	// 任务列表
	getTaskList(data,pageNum,pageSize){
		return m.post(`/client-api/starTask/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 领取任务
	saveTask(type){
		return m.post(`/client-api/starTask/save?taskType=${type}`)
	},
	// 钱包详情
	getWalletInfo(){
		return m.get(`/client-api/wallet/get`)
	},
	// 钱包充值记录: data={orderStatus:'0-7'}
	getRechargeList(data,pageNum,pageSize){
		return m.post(`/client-api/walletRecharge/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 钱包变更记录: data={changeType:'0-7'}
	getChangeList(data,pageNum,pageSize){
		return m.post(`/client-api/walletChange/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 奖品集合
	getLuckyWheel(){
		return m.get(`/client-api/draw/awardSet`)
	},
	// 点击抽奖
	startLuckyWheel(){
		return m.get(`/client-api/draw/start`)
	},
	// 上传图片/视频/文件
	upload(){
		return m.post(`/client-api/util/upload`)
	},
	// 帮助中心-列表
	getHelpList(data,pageNum,pageSize){
		return m.post(`/client-api/helpCenter/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 帮助中心-详情
	getHelpInfo(data){
		return m.get(`/client-api/helpCenter/get`,{...data})
	},
	
})
