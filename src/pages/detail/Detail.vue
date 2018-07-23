<template>
    <div>
        <BookInfo :info='info'></BookInfo>
        <CommentList :comments="comments"></CommentList>
        <!-- 评论 -->
        <div class="comment" v-if="showAdd">
            <textarea v-model="comment" 
                    :class="textarea"
                    :maxlength="100"
                    placeholder="请输入图书短评"
                        ></textarea>
            <div class="location">
                地理位置: 
                <switch color="#ea5a49"  :checked='location'  @change='getGeo'></switch>
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                手机型号:
                   <switch color="#ea5a49" :checked='phone' @change='getPhone'></switch>
                   <span>{{phone}}</span>
            </div>
            <button class='btn' @click="addComment">
                评论
            </button>
        </div>
        <div v-else  class="text-footer">
            未登录或已经评论过了
        </div>
        <button open-type="share"  class="btn">转发给好友</button>
    </div>
    
</template>
<script>
import { get, post, showModal}  from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
    components:{
        BookInfo,
        CommentList
    },
    data(){
        return{
            comments: [],
            userinfo: {},
            bookid: '',
            info: {},
            comment: '',
            location: '',
            phone: ''
        }
    },
    onShareAppMessage(){

    },
    computed:{
        showAdd(){
            // 没登陆
            if(!this.userinfo.openId){
                return false
            }
            if(this.comments.filter(v =>v.openid == this.userinfo.openId).length){
                return false
            }
            return true
        }
    },
    methods:{
        async addComment(){
            if(!this.comment){
                return
            }
            // 评论内容 ,手机型号  地理位置  图书id  用户的openid
            const data = {
                openid: this.userinfo.openId,
                bookid: this.bookid,
                comment: this.comment,
                phone: this.phone,
                location: this.location
            }
            try{
                await post('/weapp/addcomment', data)
                this.comment = ''
                this.getComments()
            }catch(e){
                showModal('失败', e.msg)
            }
        },
        async getComments(){
            const comments = await get('/weapp/commentlist',{ bookid: this.bookid })
            this.comments = comments.list || []
        },
        // 获取地理位置信息
        getGeo(e){
            // BVFK7VsHKuWTF4Oh9oRG1zY9bAqBsocU
            // http://api.map.baidu.com/geocoder/v2/?address=北京市海淀区上地十街10号&output=json&ak=您的ak&callback=showLocation //GET请求
            const ak = 'BVFK7VsHKuWTF4Oh9oRG1zY9bAqBsocU'
            let url = `http://api.map.baidu.com/geocoder/v2/`
            if(e.target.value){
                wx.getLocation({
                    success: geo=>{
                        // 请求百度地图api
                        wx.request({
                            url,
                            data:{
                                location: `${geo.latitude},${geo.longitude}`,
                                output: `json`,
                                ak
                            },
                            success: res=>{
                                if(res.data.status == 0){
                                    this.location = res.data.result.addressComponent.city
                                }else{
                                    this.location = '未知地点'
                                }
                            }
                        })
                    }
                })
            }else{  
                this.localtion = ''
            }
        },
        // 获取手机型号
        getPhone(e){
            if(e.target.value){
                const phoneInfo = wx.getSystemInfoSync()
                this.phone = phoneInfo.model
            }else{
                // 没选中
                this.phone = ''
            }
        },
        async getDeatail(){
            const info = await get('/weapp/bookdetail', {id: this.bookid})
            wx.setNavigationBarTitle({
                title: info.title
            })
            this.info = info
        }
    },
    mounted() {
        // mounted 期间尝试获取id 这是Mpvue 的语法 
        // query 所有查询到的参数
        this.bookid = this.$root.$mp.query.id
        this.getDeatail()
        this.getComments()
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo
        }
        // console.log(this.$root.$mp.query)
    }
}
</script>
<style lang='scss'>
.comment{
    margin-top: 10px;
    .textarea{
        width: 730rpx;
        height: 200rpx;
        background: #eee;
        padding: 10rpx;
    }
    .location{
        margin-top: 10px;
        padding: 5px 10px;
    }
    .phone{
        margin-top: 10px;
        padding: 5px 10px;
    }
}
</style>
