// 消息：News
export default (m) => ({
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人',title:'消息标题'}
	getNewsList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/news/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人'}
	getNewsTopList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/news/list_top`,{
			...data,
			pageNum,
			pageSize
		})
	},
	// 详情
	getNewsInfo(id) {
		return m.get(`/client-api/news/get`,{id})
	},
	// 保存：添加/编辑
	saveNews(data) {
		return m.post(`/client-api/news/save`,data)
	},
	// 删除
	delNews(id) {
		return m.delete(`/client-api/news/delete`,{id})
	}
})
