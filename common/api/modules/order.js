// 订单相关接口
export default (m) => ({
	getMyShoppingCartList(pageNum=1,pageSize=15){
		return m.post(`/doorh5/order/getMyShoppingCart`,{
			pageNum,
			pageSize
		})
	},
	// 加入购物车
	addMyShoppingCart(data) {
		return m.post(`/doorh5/order/addMyShoppingCart`,data)
	},
	// 修改购物车数量
	editShoppingCartNum(scid,num) {
		return m.post(`/doorh5/order/updateShoppingCartNumById`,{num,shoppingCartId:scid})
	},
	// 删除购物车
	delShoppingCartById(id) {
		return m.post(`/doorh5/order/delShoppingCartById?id=${id}`)
	},
	// 确认订单(没有创建订单)
	confirmOrder(data) {
		return m.post(`/doorh5/order/confirmOrder`,data)
	},
	// 订单再次确认
	confirmOrderAgain(orderId) {
		return m.post(`/doorh5/order/confirmOrderAgain?orderId=${orderId}`)
	},
	// 下单
	createOrder(data) {
		return m.post(`/doorh5/order/createOrder`,data)
	},
	// 取消订单
	cancelOrder(orderId) {
		return m.post(`/doorh5/order/cancelOrder?orderId=${orderId}`)
	},
	// 获取我的订单status
	getMyOrderList(data,pageNum=1,pageSize=15) {
		return m.post(`/doorh5/order/getMyOrder`,{
			...data,
			pageNum,
			pageSize
		})
	},
	// 获取订单详情
	getOrderDetail(orderId) {
		return m.post(`/doorh5/order/getOrderDetail?orderId=${orderId}`)
	},
})
