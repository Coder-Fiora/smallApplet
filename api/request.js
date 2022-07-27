
import { http } from './http'; 

function queryIndex(params) { 
  http('index/getCarousel', 'post', params)  
} 
function queryControdition(params) { 
    http('index/getIntroductionMore', 'post', params)  
} 
function queryIndexFood(params) { 
    http('index/getFoodMore', 'post', params)  
} 
function queryCanting(params) { 
    http('index/getFoodMoreDesc', 'post', params)  
} 
function queryRoom(params) { 
    http('index/getRoomMore', 'post', params)  
} 
function queryRoomdetail(params) { 
    http('index/getRoomMoreDesc', 'post', params)  
} 
function queryThree(params) { 
    http('index/getThreeMore', 'post', params)  
} 
function queryThreedetail(params) { 
    http('index/getThreeMoreDesc', 'post', params)  
} 
function queryFour(params) { 
    http('index/getFourMore', 'post', params)  
} 
function queryFourDetail(params) { 
    http('index/getFourMoreDesc', 'post', params)  
} 
function queryMall(params) { 
    http('mall/mallIndex', 'post', params)  
} 
function queryMallList(params) { 
    http('mall/getMallListByType', 'post', params)  
} 
function queryMallDetail(params) { 
    http('mall/getMallDesc', 'post', params)  
} 
function queryLookshopping(params) { 
    http('mall/checkShoppingCart', 'post', params)  
} 
function queryAddshopping(params) { 
    http('mall/joinInShoppingCart', 'post', params)  
} 
function queryChangeshopping(params) { 
    http('mall/updateInShoppingCart', 'post', params)  
} 
function queryAddaddress(params) { 
    http('mall/saveShippingAddress', 'post', params)  
} 
function queryAddressList(params) { 
    http('mall/getShippingAddress', 'post', params)  
} 
function queryChangeaddress(params) { 
    http('mall/updateShippingAddress', 'post', params)  
} 
function queryDefaultaddress(params) { 
    http('mall/updateDefaultAddress', 'post', params)  
}
// 商城订单
function getMallOrderList(params) { 
    http('personal/getMallOrder', 'post', params)  
} 
// 客房订单
function getRoomOrderList(params) { 
    http('/personal/getGuestRoomOrder', 'post', params)  
} 
// 客房订单详情
function getRoomOrderDetail(params) { 
    http('/personal/roomOrderDesc', 'post', params)  
} 
// 修改订单状态
function CancelMallOrder(params) { 
    http('order/updateOrderStatus', 'post', params)  
} 
// 商城订单新增
function saveMallOrd(params) { 
    http('order/saveOrderMall', 'post', params)  
} 
// 商城购物车订单新增
function saveMallCarOrd(params) { 
    http('order/saveOrderShoppingCart', 'post', params)  
} 
// 客房订单新增
function saveRoomOrd(params) { 
    http('order/saveOrderRoom', 'post', params)  
} 
// 订单删除
function deleteOrder(params) { 
    http('order/deleteOrder', 'post', params)  
} 
// 商城获取优惠券
function getCoupon(params) { 
    http('mall/getCoupon', 'post', params)  
} 
// 房间首页
function guestRoomIndex(params) { 
    http('guest/guestRoomIndex', 'post', params)  
} 
// 房间列表
function guestRoomIndexLoad(params) { 
    http('guest/guestRoomIndexLoad', 'post', params)  
} 
// 房间详情
function guestRoomTypeDetails(params) { 
    http('guest/guestRoomTypeDetails', 'post', params)  
} 
function queryDeletaddress(params) { 
    http('mall/delAddress', 'post', params)  
} //删除地址
// 美食列表
function guestFoodlist(params) { 
    http('food/getFoodIndexInfo', 'post', params)  
} 
// 美食详情
function guestFoodDetail(params) { 
    http('food/getFoodInfoDesc', 'post', params)  
} 
// 个人信息
function guestPerson(params) { 
    http('personal/personalIndex', 'post', params)  
} 
// 个人信息修改
function changePerson(params) { 
    http('personal/updateUserInfo', 'post', params)  
} 
// 获取发票列表
function guestBill(params) { 
    http('personal/getBillInfo', 'post', params)  
} 
// 获取优惠券列表
function getCouponList(params) { 
    http('personal/getCoupon', 'post', params)  
} 
// 新建保存发票
function guestAddBill(params) { 
    http('personal/saveBill', 'post', params)  
} 
// 修改发票
function guestUpdateBill(params) { 
    http('personal/updateBillInfo', 'post', params)  
} 
export default { // 暴露接口
    queryIndex,
    queryControdition,
    queryIndexFood,
    queryCanting,
    queryRoom,
    queryRoomdetail,
    queryThree,
    queryThreedetail,
    queryFour,
    queryFourDetail,
    queryMall,
    queryMallList,
    queryMallDetail,
    queryLookshopping,
    queryAddshopping,
    queryChangeshopping,
    queryAddaddress,
    queryAddressList,
    queryChangeaddress,
    queryDefaultaddress,
    queryDeletaddress,
    getMallOrderList,
    guestRoomIndexLoad,
    guestRoomTypeDetails,
    guestRoomIndex,
    guestFoodlist,
    guestFoodDetail,
    guestPerson,
    guestBill,
    guestAddBill,
    guestUpdateBill,
    saveMallOrd,
    changePerson,
    getCoupon,
    deleteOrder,
    saveMallCarOrd,
    getCouponList,
    CancelMallOrder,
    saveRoomOrd,
    getRoomOrderList,
    getRoomOrderDetail
}