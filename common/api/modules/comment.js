// 评论：Comment
export default (m) => ({
	// 列表：data={groupOriented:'1:大学生 2:退役军人 3:残疾人',title:'评论标题'}
	getCommentList(data,pageNum=1,pageSize=15) {
		return m.get(`/client-api/comment/list`,{
			...data,
			current:pageNum,
			size:pageSize
		})
	},
	// 详情
	getCommentInfo(id) {
		return m.get(`/client-api/comment/get`,{id})
	},
	// 保存：添加/编辑
	saveComment(data) {
		return m.post(`/client-api/comment/save`,data)
	},
	// 删除
	delComment(id) {
		return m.delete(`/client-api/comment/delete`,{id})
	},
	// 收藏/取消收藏
	saveCollect(data) {
		return m.post(`/client-api/favorites/save`,data)
	},
	// 评论安全检测
	msgSecCheck(data) {
		return m.post(`/client-api/wx/msgSecCheck?content=${data.content}&scene=${data.type}&openid=${data.openid}`)
	},
})
