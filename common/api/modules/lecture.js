// 讲座：Lecture
export default (m) => ({
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人',title:'讲座标题'}
	getLectureList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/lecture/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人'}
	getLectureTopList(data,pageNum=1,pageSize=15) {
		return m.post(`/client-api/lecture/list_top`,{
			...data,
			pageNum,
			pageSize
		})
	},
	// 详情
	getLectureInfo(id) {
		return m.get(`/client-api/lecture/get`,{id})
	},
	// 保存：添加/编辑
	saveLecture(data) {
		return m.post(`/client-api/lecture/save`,data)
	},
	// 删除
	delLecture(id) {
		return m.delete(`/client-api/lecture/delete`,{id})
	},
})
