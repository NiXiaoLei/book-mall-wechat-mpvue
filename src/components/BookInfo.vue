<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back" :src="info.image" mode="aspectFill" alt="">
            <img class="img" :src="info.image" mode="aspectFit" alt="">
            <div class="info">
                <div class="title">
                    {{info.title}}
                </div>
                <div class="author">
                    {{info.author}}
                </div>
            </div>
        </div>
        <div class="detail">
            <img :src="userinfo.image" class="avatar" mode='aspectFit'>
            {{userinfo.nickName}}
            <div class="right text-primary">
                {{info.rate}} <Rate :value='info.rate'></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
            {{info.price}}  
            </div>
        </div>
        <!-- 标签 -->
        <div class="tags">
            <div class="badge" v-for='(tag, tagIndex) in info.tags' :key="tagIndex">
                {{tag}}
            </div>
        </div>
        <!-- 简述 -->
        <div class="summary">
            <p v-for="(sum, sumIndex) in info.summary" :key="sumIndex">{{sum}}</p>
        </div>
    </div>
</template>
<script>
import Rate from '@/components/Rate'

export default {
   props: ['info'],
   components:{
       Rate
   },
   computed:{
       userinfo(){
           return this.info.user_info || {}
       }
   }
}
</script>
<style lang="scss">
.bookinfo{
    font-size: 14px;
    .badge{
        display: inline-block;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px #ea5a49 solid;
        color: #ea5a49;
    }
    .summary{
        padding: 0 10px;
        margin-top: 10px;
        p{
            text-indent: 2em;
            font-size: 14px;
        }
    }
    .right{
        float: right;
    }
    .detail{
        padding: 5px;
        .avatar{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .thumb{
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        position: relative;
        .back{
            // 模糊
            filter: blur(15px);
            width: 100%;
        }
        .img{
            position: absolute;
            width: 100%;
            height: 300rpx;
            left:0;
            top: 30rpx;
            margin: 0 auto;
        }
        .info{
            color: white;
            position: absolute;
            width: 100%;
            left: 0;
            top: 330rpx;
            text-align: center;
            .title{
                font-size: 20px;
            }
            .author{
                font-size: 14px;
            }
        }
    }
}
</style>
