// 工具函数库
import config from './config'

// http get工具函数 获取数据
export function get(url, data){
  return request(url, 'GET', data)
}
export function post(url, data){
  return request(url, 'POST', data)
}



function request(url, method, data){
  return new Promise(function(resolve, rejected){
    // 微信的请求接口 
    wx.request({
      data,
      method,
      url:config.host + url,
      success:function(res){
        if(res.data.code == 0){
          resolve(res.data.data)
        }else{
          console.log('12', res)
          showModal('失败', res.data.data.msg)
          rejected(res.data)
        }
      }
    })
  })
}



// 弹窗
export function showSuccess(text){
  wx.showToast({
    title:text,
    icon:'success'
  })
}

export function showModal(title, content){
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}