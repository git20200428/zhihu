import {createStore, createLogger} from "vuex";
import api from "@/api/index"

const evn = process.env.NODE_ENV;
export default createStore({
   state:{
       isLogin:null,
       info:null
   } ,
    mutations:{
        changeIsLogin(state,bool){
            state.isLogin = bool;
        },
        changeInfo(state,payload){
            state.info = payload;
        }
    },
    actions:{
        async changeIsLoginAsync({commit}){
            let bool = false;
            let {code} = await api.checkLogin();
            if(+code===0) bool = true;
            commit('changeIsLogin',bool);
        },
        async changeInfoAsync({commit}){
            let {code, data} = await api.userInfo();
            if(+code===0){
                commit('changeInfo',data);
            }
        }
    },
    plugins: evn ==='production' ? [] : [createLogger()]
});

