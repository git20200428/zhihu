import {createStore, createLogger} from "vuex";

const evn = process.env.NODE_ENV;
export default createStore({
   state:{

   } ,
    mutations:{

    },
    actions:{

    },
    plugins: evn ==='production' ? [] : [createLogger()]
});

