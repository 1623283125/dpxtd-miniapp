// 资源：Resource
export default (m) => ({
	// 置顶
	getResourceTop(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/resourceGroup/list_top`)
	},
	// 列表：data={industry:'行业',province:'省份',city:'城市'}
	getResourceList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/resourceGroup/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 详情
	getResourceInfo(id) {
		return m.get(`/client-api/resourceGroup/get`,{id})
	},
	// 保存：添加/编辑
	saveResource(data) {
		return m.post(`/client-api/resourceGroup/save`,data)
	},
	// 删除
	delResource(id) {
		return m.delete(`/client-api/resourceGroup/delete`,{id})
	},
})
