import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const app = new Vue(App)

app.$mount()

export default {
    config:{
        pages:['^pages/books/main'],
        "window":{
            "backgroundTextStyle":"light",
            "navigationBarBackgroundColor": "#ea5149",
            "navigationBarTitleText": "阿磊图书",
            "navigationBarTextStyle":"black"
        },
        "tabBar":{
            selectedColor:'#ea5149',
            list: [
                {
                    //  路径
                    pagePath:'pages/books/main',
                    // 文本
                    text:'图书',
                    // 图标
                    iconPath:"static/img/book.png",
                    // 被选中时的图标
                    selectedIconPath:'static/img/book-active.png'
                },{
                    pagePath:'pages/comments/main',
                    text:'图书',
                    iconPath:"static/img/todo.png",
                    selectedIconPath:'static/img/todo-active.png'
                },{
                    pagePath:'pages/me/main',
                    text:'图书',
                    iconPath:"static/img/me.png",
                    selectedIconPath:'static/img/me-active.png'
                }
            ]
        }
    }
}