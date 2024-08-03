// 月光宝盒：Toolbox
export default (m) => ({
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人',title:'月光宝盒标题'}
	getToolboxList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/toolbox/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 详情
	getToolboxInfo(id) {
		return m.get(`/client-api/toolbox/get`,{id})
	},
	// 保存：添加/编辑
	saveToolbox(data) {
		return m.post(`/client-api/toolbox/save`,data)
	},
	// 删除
	delToolbox(id) {
		return m.delete(`/client-api/toolbox/delete`,{id})
	},
})
