<template>
    <div class="swiper">
        <swiper 
            :indicator-dots='true'
            indicator-color='#ea5a49'
            :autoplay='true'
            :interval='6000'
            :duration='1000'
            :circular='true'
        >
            <div v-for='(top, imgIndex) in imgUrls' :key="imgIndex" >
                <swiper-item >
                    <img v-for="(img, index) in top" :key="index"  @click="bookDatail(img)" class="slide-image"  mode="aspectFit" :src="img.image" alt="">
                </swiper-item>
            </div>
        </swiper>
    </div> 
</template>
<script>
export default {
    props:['tops'],
    computed:{
        imgUrls(){
            // 如果通用 请用chunk 函数    比如lodash  的chunk 方法
            let res = this.tops
            return [res.slice(0,3), res.slice(3,6), res.slice(6,9)]
        }
    },
    methods:{
        bookDatail(item){
            wx.navigateTo({
                url:'/pages/detail/main?id=' + item.id
            })
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss">
.swiper{
    margin-top: 5px;
    .slide-image{
        width: 33%;
        height: 250rpx;
    }
}
</style>
