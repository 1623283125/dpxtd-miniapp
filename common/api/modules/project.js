// 项目：Project
export default (m) => ({
	// 列表：data={industry:'行业',province:'省份',city:'城市'}
	getProjectList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/project/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 详情
	getProjectInfo(id) {
		return m.get(`/client-api/project/get`,{id})
	},
	// 保存：添加/编辑
	saveProject(data) {
		return m.post(`/client-api/project/save`,data)
	},
	// 删除
	delProject(id) {
		return m.delete(`/client-api/project/delete`,{id})
	},
	// 参加意向统计：感兴趣的人：id="找合伙记录id"
	getJoinProject(id) {
		return m.get(`/client-api/project/joinIntentCount`,{id})
	},
})
