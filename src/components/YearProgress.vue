<template>
    <div class="progressbar">
        <progress percent="20" activeColor='#ea5a49' />
        <p>{{year}}已经过去了{{days}}天, {{percent}}%</p>
    </div>
</template>
<script>
export default {
    computed:{
        year(){
            return new Date().getFullYear()
        },
        days(){
            let start = new Date()
            start.setMonth(0)
            start.setDate(1)
            // start 就是今天的第一天

            let offset = new Date().getTime() - start.getTime()
            return parseInt(offset/1000/60/60/24)+1
        },
        percent(){
            return (this.days * 100 / this.getDayOfYead()).toFixed(1)
        }
    },
    methods:{
        isLeapYear(){
            const year = new Date().getFullYear()
            if(year % 400 === 0){
                return true
            }
            if(year % 4 === 0 && year % 100 !== 0){
                return true
            }
            return false
        },
        getDayOfYead(){
            return this.isLeapYear()?366:365
        }
    }
}
</script>
<style lang="scss">
.progressbar{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;
    width: 100%;
    progress{
        margin-bottom: 10px;
    }
}
</style>
