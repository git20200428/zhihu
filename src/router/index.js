import {createRouter,createWebHashHistory} from "vue-router";
import routes from "./routes"
import store from "@/store/index"
import api from "@/api/index"

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async (to, from,next)=>{
    let arr = ['/person','/updatePerson','/store'];
    if(arr.includes(to.path)){
        let isLogin = store.state.isLogin;
        if(isLogin){
            next();
            return;
        }
        if(isLogin === false){
            next('/login');
            return;
        }
        if(isLogin === null){
            try {
                let {code, data} = await api.checkLogin();
                if (+code !== 0) {
                    next('/login');
                    return;
                }
                store.commit('changeIsLogin', true);
                store.commit('changeInfo', data);
                next();
            }catch (e){
                console.log(e);
                return;
            }
        }
    }
    next();
})
export default router;