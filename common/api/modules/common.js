// 公开接口
export default (m) => ({
	// 首页-广告位
	getHomeAdList() {
		return m.get(`/client-api/index/adList`)
	},
	// 首页-项目路演
	getHomeProjectList() {
		return m.get(`/client-api/index/prjectList`)
	},
	// 对评论点赞或取消: targetId="被点赞记录id"
	switchLike(targetId) {
		return m.post(`/client-api/likes/switchLikes`,{targetId})
	},
	// 所有业务字典项
	getDicList() {
		return m.get(`/client-api/dic/businessItems`)
	},
})
