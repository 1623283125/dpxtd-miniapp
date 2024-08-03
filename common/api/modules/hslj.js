// 华山论剑：Hslj
export default (m) => ({
	// 列表
	getHsljList(data,pageNum=1,pageSize=15) {
		return m.get(`/client-api/hslj/${data.type}/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 绽放列表
	getHsljTopList(type,pageNum=1,pageSize=15) {
		return m.get(`/client-api/hslj/${type}/jczf`,{
			pageNum,
			pageSize
		})
	},
	// 更多绽放列表
	getHsljMoreList(type,pageNum=1,pageSize=15) {
		return m.get(`/client-api/hslj/${type}/jczf_list`,{
			current:pageNum,
			size:pageSize
		})
	},
	// 详情
	getHsljInfo(id) {
		return m.get(`/client-api/hslj/detail?id=${id}`)
	}
})
