import { createApp } from 'vue'
import App from './App.vue'
import Vant,{Lazyload} from 'vant'
import 'vant/lib/index.css'
import "amfe-flexible"
import store from "./store/index"
import router from "./router/index"
import {handleMaxWidth} from "./assets/utils"
handleMaxWidth();
window.addEventListener('resize',handleMaxWidth);


const app = createApp(App);
app.use(Vant);
app.use(Lazyload,{
    lazyComponent: true
});
app.use(store);
app.use(router);
app.mount('#app')

// 首页    /
// 详情页  /detail
// 登录   /login
// 个人信息 /info
// 收藏 /store
// 修改个人信息/update

