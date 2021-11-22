import Home from '@/pages/Home';

const routes =  [{
    path: '/',
    component: Home
},{
    path: '/detail/:id',
    //路由懒加载：在webpack打包的时候，实现切割打包
    // /* webpackChunkName:"other" */给组件取相同的名字，最终这些组件都会被打包到同一个
    // other.js的文件中
    //如果路由组件很多，可以按照功能把相同功能的组件指定相同的名字，最终打包到相同的文件中
    component: ()=>import(/* webpackChunkName:"other" */'@/pages/Detail.vue')
},{
    path: '/login',
    component: ()=>import(/* webpackChunkName:"other" */'@/pages/Login.vue')
},{
    path: '/person',
    component: ()=>import(/* webpackChunkName:"other" */'@/pages/Person.vue')
},{
    path: '/store',
    component: ()=>import(/* webpackChunkName:"other" */'@/pages/Store.vue')
},{
    path: '/updatePerson',
    component: ()=>import(/* webpackChunkName:"other" */'@/pages/UpdatePerson.vue')
},{
    path: '/:pathMatch(.*)*',
    redirect: '/'
}];
export default routes;