
// https 库 用法与http 类似
const https = require('https')
const { mysql } = require('./../qcloud')
// 新增图书

// 1. 获取豆瓣信息
// 2. 入库

// 获取传来的参数, 参数都在ctx 中
module.exports = async (ctx)=> {
    const {isbn, openid} = ctx.request.body
    if(isbn && openid){
        // 插入数据前先查询
        const findRes = await mysql('books').select().where('isbn', isbn)
        if(findRes.length){
            ctx.state = {
                code: -1,
                data:{
                    msg: '图书已存在'
                }
            }
            return false
        }

        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJSON(url)
        const rate = bookinfo.rating.average
        const { title, image, alt, publisher, summary, price } = bookinfo
        // 做个简单的映射 , 格式化数据为字符串 
        const tags = bookinfo.tags.map(v=>{
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        try{
            await mysql('books').insert({
                isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        }catch(e){
            ctx.state = {
                code: -1,
                data:{
                    msg:'新增失败:' + e.sqlMessage
                }
            }
        }
        
       
        // tag: 科幻 1000, 小说500
    }
    // const {isbn, openid } = ctx.request.body
}

function getJSON(url){
    return new Promise((resolve, rejected)=>{
        https.get(url, (res) => {
            let urlData = ''
            // 当每次获取新数据的时候, 触发data事件
            res.on('data', data=>{
                urlData += data
            })
            // 获取已经结束的时候
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if(bookinfo.title){
                    resolve(bookinfo)
                }
                rejected(bookinfo)
            })
        })
    })
}