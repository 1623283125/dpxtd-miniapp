// 吐槽：Roast
export default (m) => ({
	// 列表：data={industry:'行业',province:'省份',city:'城市'}
	getRoastList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/roast/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 详情
	getRoastInfo(id) {
		return m.get(`/client-api/roast/get`,{id})
	},
	// 保存：添加/编辑
	saveRoast(data) {
		return m.post(`/client-api/roast/save`,data)
	},
	// 删除
	delRoast(id) {
		return m.delete(`/client-api/roast/delete`,{id})
	}
})
