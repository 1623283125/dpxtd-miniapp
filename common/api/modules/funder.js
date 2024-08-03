// 资金：Funder
export default (m) => ({
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人',title:'资金标题'}
	getFunderList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/funder/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 详情
	getFunderInfo(id) {
		return m.get(`/client-api/funder/get`,{id})
	},
	// 保存：添加/编辑
	saveFunder(data) {
		return m.post(`/client-api/funder/save`,data)
	},
	// 删除
	delFunder(id) {
		return m.delete(`/client-api/funder/delete`,{id})
	},
})
