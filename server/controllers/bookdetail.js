const { mysql } = require('../qcloud')


module.exports = async (ctx)=>{
    const {id} = ctx.request.query
    const detail = await mysql('books')
                            .select('books.*', 'cSessionInfo.user_info')
                            .join('cSessionInfo', 'books.openid' ,'cSessionInfo.open_id')
                            .where('id', id)
                            .first()
    // console.log('-----------------', detail)
    const info = JSON.parse(detail.user_info)
    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags.split(','),
        summary: detail.summary.split('\n'),
        user_info: {
            nickName: info.nickName,
            image: info.avatarUrl
        }
    })

    await mysql('books')
            .where('id', id)
            // count字段累加  每次1
            .increment('count',1)
}
