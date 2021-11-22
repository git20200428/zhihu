import axios from 'axios'
import qs from 'qs'
import {isPlainObject} from '@/assets/utils';
import {Notify} from 'vant'
import md5 from 'blueimp-md5'

axios.defaults.baseURL = '';
axios.defaults.timeout = 60000;
axios.defaults.transformRequest = data => {
    if(isPlainObject(data)) return qs.stringify(data);
    return data;
};
axios.interceptors.request.use(config =>{
    //针对于部分接口,我们需要携带令牌和签名信息
    let apiList = ['/api/check_login','/api/user_info','/api/user_update','/api/store','/api/store_remove','/api/store_list'],
        token = localStorage.getItem('token');
    if(apiList.includes(config.url.replace('/api','')) && token){
        let time = +new Date(),
            sign = md5(`${token}@${time}@zhunfeng`);
        config.headers['authorization'] = token;
        config.headers['time'] = time;
        config.headers['sign'] = sign;
    }
   return config;
});
axios.interceptors.response.use(response =>{
    return response.data;
}, reason =>{
    Notify({
        type: 'danger',
        message: '小主，当前网络繁忙，请稍后再试！'
    });
    return Promise.reject(reason);
});
export default axios;
