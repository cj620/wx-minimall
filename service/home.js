import request from './network.js'      //对home页面的请求进行封装，使用封装的network进行访问
export function getMultiData(){
  return request ({
    url: '/home/multidata'
  })
}