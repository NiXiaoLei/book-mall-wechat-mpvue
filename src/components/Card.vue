<template>
    <a :href="detailUrl">
        <div class="book-card">
        <div class="thumb" @click.stop="preview()" >
            <img :src="book.image" class="image"  mode="aspectFit"  >
        </div>
        <div class="detail">
            <div class="row text-primary">
                <div class="right">
                    {{book.rate}} <Rate :value="book.rate"></Rate>
                </div>
                <div class="left">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right text-primary">
                     浏览量: {{book.count}}
                </div>
                <div class="left">
                    {{book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    {{book.user_info.nickName}}
                </div>
                <div class="left">
                    添加人
                </div>
            </div>
        </div>
        </div> 
    </a>
</template>
<script>
import Rate from '@/components/Rate'
export default {
    components:{
        Rate
    },
    props:['book'],
    computed:{
        detailUrl(){
            return '/pages/detail/main?id=' + this.book.id
        }
    },
    methods:{
        preview(){
            wx.previewImage({
                current: this.book.image, // 当前显示图片的http链接
                urls: [this.book.image] // 需要预览的图片http链接列表
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.book-card{
    padding: 5px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 35rpx;
    .thumb{
        width: 90px;
        height: 90px;
        float: left;
        margin: 0 auto;
        overflow: hidden;
        .image{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .detail{
        margin-left: 100px;
        .row{
            line-height: 20px;
            margin-bottom: 3px;
        }
        .right{
            float: right;
        }
        .left{
            margin-right: 80px;
        }
    }
}
</style>
