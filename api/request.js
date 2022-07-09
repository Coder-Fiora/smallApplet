
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
    http('mall/getMallOrderList', 'post', params)  
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
    guestRoomTypeDetails
}