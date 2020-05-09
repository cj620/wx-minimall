import {baseURL} from './config.js'    //拿到接口地址
export default function(options){      //对请求进行封装
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + options.url,     //这里直接使用接口地址与请求的URL进行拼接
      method:options.method || 'get',
      data:options.data ||{},
      success:resolve,
      fail:reject
    })
  })
}


