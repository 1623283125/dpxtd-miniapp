// 伙伴：Partner
export default (m) => ({
	// 列表：data={industry:'行业',province:'省份',city:'城市'}
	getPartnerList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/partnership/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 详情
	getPartnerInfo(id) {
		return m.get(`/client-api/partnership/get`,{id})
	},
	// 保存：添加/编辑
	savePartner(data) {
		return m.post(`/client-api/partnership/save`,data)
	},
	// 删除
	delPartner(id) {
		return m.delete(`/client-api/partnership/delete`,{id})
	},
	// 参加意向统计：感兴趣的人：id="找合伙记录id"
	getJoinPartner(id) {
		return m.get(`/client-api/partnership/joinIntentCount`,{id})
	},
	// 列表：data={joinType:'参加意向类型,1:找合伙 2:找项目',targetId:'意向目标id'}
	getJoinList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/joinIntent/list`,{
			...data,
			pageNum,
			pageSize
		})
	},
	// 保存：添加/编辑
	saveJoinIntent(data) {
		return m.post(`/client-api/joinIntent/save`,data)
	},
	// 删除
	delJoinIntent(id) {
		return m.delete(`/client-api/joinIntent/delete`,{id})
	},
})
