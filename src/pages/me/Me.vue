<template>
    <div class="container">
        <p>{{userinfo.openId}}</p>
        <div class="userinfo"  @click="login">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <!-- <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button> -->
        <button v-if='userinfo.openId' @click="scanBook" class="btn">添加图书</button>
    </div>
</template>
<script>
import YearProgress from '@/components/YearProgress'
import {showSuccess, post, showModal} from '@/util'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'

export default {
    components:{
        YearProgress
    },
    data(){
        return {
            userinfo: {
                avatarUrl:"../../../static/img/unlogin.png",
                nickName: '点击登录'
            }
        }
    },
    methods:{
        // 全部清除缓存后只能通过 点击按钮来获取用户信息
        doLogin: function (e) {
            qcloud.setLoginUrl(config.loginUrl)
            qcloud.login({
                success: function (userInfo) {
                console.log('登录成功', userInfo)
                },
                fail: function (err) {
                console.log('登录失败', err)
                }
            })
        },
        async addBook(isbn){
            const res = await post('/weapp/addbook',{
                isbn,
                openid:this.userinfo.openId
            })
            console.log(res)
            showModal('添加成功',`${res.title}添加成功`)
           
        },
        scanBook(){
            // 扫码接口
            wx.scanCode({
                success:(res)=>{
                    if(res.result){
                        this.addBook(res.result)
                    }
                    console.log(res)
                }
            })
        },
        login(){
            let user = wx.getStorageSync('userinfo')
            if(!user){
                // 设置登录地址
            //  腾讯微信 的 获取登录信息接口
                qcloud.setLoginUrl(config.loginUrl);
                qcloud.login({
                    success:(userinfo) => {
                        // 微信强制获取不到openId  需要的话就得再获取一次
                        showSuccess('登陆成功')
                        wx.setStorageSync('userinfo', userinfo)
                        this.userinfo = userinfo
                    },
                    fail:  (err) =>{
                        console.log('登录失败', err);
                    }
                });
            }
        }
    },
    created(){
        // 同步读取
        let userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo
        }
    }
}
</script>
<style lang="scss">
.container{
    padding: 0 30rpx;
    .userinfo{
        margin-top: 100rpx;
        text-align: center;
        img{
            width: 128rpx;
            height: 128rpx;
            margin: 20rpx;
            border-radius: 50%;
        }
    }
}

</style>
