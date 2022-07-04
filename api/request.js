
import { http } from './http'; 

function queryIndex(params) { 
  http('index/getCarousel', 'post', params)  // 接口请求的路由地址以及请求方法在此处传递
} 


export default { // 暴露接口
    queryIndex
}