<template>
    <div id="rate">
        <span>☆☆☆☆☆</span>
        <span  :style='style'>★★★★★</span>
    </div>
    <!-- {{getStar}} -->
</template>
<script>
export default {
    props:{
        value:{
            type:[Number,String],
            default: '0'
        }
    },
    computed:{
        getStar(){
            // 制作星级评价的第一种方法
            return "★★★★★☆☆☆☆☆".slice(5 - this.value, 10 - this.value)
        },
        style(){
            return `width:${this.value / 2.5}em`
        }
    },created() {
    //   conso(this.value)  
    }
}
</script>
<style lang="scss" scoped>
#rate{
    display: inline-block;
    position: relative;
    span:last-of-type{
        position:absolute;
        display: inline-block;
        top:0;
        left:0;
        width:0em;
        overflow: hidden;
        transition: width 2s;
        -moz-transition: width 2s;
        -webkit-transition: width 2s;
        -o-transition: width 2s;
    }
}
</style>
