// 赛事：Match
export default (m) => ({
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人',title:'赛事标题'}
	getMatchList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/match/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人'}
	getMatchTopList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/match/list_top`,{
			...data,
			pageNum,
			pageSize
		})
	},
	// 详情
	getMatchInfo(id) {
		return m.get(`/client-api/match/get`,{id})
	},
	// 保存：添加/编辑
	saveMatch(data) {
		return m.post(`/client-api/match/save`,data)
	},
	// 删除
	delMatch(id) {
		return m.delete(`/client-api/match/delete`,{id})
	},
	// 列表：matchId='赛事id'
	getJoinMatch(matchId) {
		return m.post(`/client-api/matchApplication/list`,{matchId})
	},
	// 保存：添加/编辑
	saveMatchApplication(data) {
		return m.post(`/client-api/matchApplication/save`,data)
	},
})
