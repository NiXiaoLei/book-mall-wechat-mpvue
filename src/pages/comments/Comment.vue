<template>
    <div class="container">
        <CommentList type='user' :comments='comments'></CommentList>
        <div v-if="userinfo.openId">
            <div class="page-title">我的图书</div>
            <Card v-for="book in books" :key="book.id" :book='book'></Card>
            <div v-if="!books.length">暂时还没添加过书, 快去添加几本吧</div>
        </div>
    </div>
</template>
<script>
import CommentList from '@/components/CommentList'
import { get }  from '@/util'
import Card from '@/components/Card'
export default {
    components:{
        CommentList,
        Card
    },
    data(){
        return {
            comments: [],
            books: [],
            userinfo: {}
        }
    },
    onPullDownRefresh(){
        this.init()
        wx.stopPullDownRefresh()
    },
    methods:{
        init(){
            wx.showNavigationBarLoading()
            this.getComments()
            this.getBooks()
            wx.hideNavigationBarLoading()
        },
        async getBooks(){
            console.log("getBook")
            const books = await get('/weapp/booklist',{
                openid: this.userinfo.openId
            })
            this.books = books.list
            
            // console.log('---------',this.books)
        },
        async getComments(){
            let comments = await get('/weapp/commentlist', {
                openid: this.userinfo.openId
            })
            this.comments = comments.list
        }
    },
    onShow(){
        if(!this.userinfo.openId){
            let userinfo = wx.getStorageSync('userinfo')
            if(userinfo){
                this.userinfo = userinfo
                this.init()
            }
        }
    },
}
</script>
<style>

</style>
