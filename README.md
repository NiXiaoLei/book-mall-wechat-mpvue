


### koa 学习笔记
> npm install koa 
> npm install koa-router  路由依赖

和express 有些许的不同, 作为第二代 node web Framework 的 koa 拥有强大的异步处理 使用 async/await 代替 generator 使用, 以及洋葱圈模型的中间件结构, 又可以理解为栈的形式, 后入先出, 第一个中间件 则会在最后一个再调用一次之后才离开

#### 起步方式
安装好后
> const app = new Koa()
> const Router = require('koa-router')   载入路由模块
> const router = new Router()
实例化一个 Koa 
并且载入 koa-router 路由模块
实例化 一个路由模块 

接下来就是配置路由 支持 RESTRful 数据协议规范
参数 ( 请求路径[根路径为 '/'], 回调函数 支持async/await 参数(请求信息, 和跳转至下一个路由的next 函数 ))
```
# 
# 
router.get('/', async (req, next)=>{
    
})
```

### 小程序起步

> 小程序后台及开发手册
> https://mp.weixin.qq.com/wxopen/initprofile?action=home&lang=zh_CN&token=604755431  

> Node.js 后台
>https://cloud.tencent.com/document/product/619/12794#.E6.9C.AC.E5.9C.B0.E5.A6.82.E4.BD.95.E6.90.AD.E5.BB.BA.E5.BC.80.E5.8F.91.E7.8E.AF.E5.A2.83



### 库
> npm install wafer2-client-sdk --save  #登陆信息
> let { mysql } = require('./qcloud')  # 操作Mysql 数据库  语法查看  Knex.js  文档


#### 步骤 知识点及问题 😄

##### 轮播图
> 微信 官方的 组件 swiper
比较重要的几个属性
* autoplay 自动切换
* interval 设置切换时间
* duration 设置滑动过程的时长

##### 星级评价
> "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
rate = 评价分数

实现小数评价思路: 
底下一层空的星星
上面 ` overflow: hidden ` 按em 长度隐藏实的星星 

##### 下拉刷新接口
> 需要在 config 的window选项中开启 enablePullDownRefresh。

> onPullDownRefresh  处理下拉刷新事件

> wx.startPullDownRefresh()  触发下啦刷新动画


#####  登录请求 与 openid 
> 需要使用 wafer2-client-sdk
> 微信更新后 最好是绑定于 button 按钮进行登录操作
> 登录后建议将openid 保存再本地  使用  wx.setStorageSync('userinfo', userinfo)  同步数据存储操作
```
# 设置请求的url 地址
 qcloud.setLoginUrl(config.loginUrl);
                # 发送登录请求
                qcloud.login({
                    success:(userinfo) => {
                        showSuccess('登陆成功')
                        # 数据持久化
                        wx.setStorageSync('userinfo', userinfo)
                        this.userinfo = userinfo
                    },
                    fail:  (err) =>{
                        console.log('登录失败', err);
                    }
                });
```
#####  调用摄像头接口 以及 豆瓣 api 
> 通过 isbn  查询图书信息 