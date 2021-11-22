import axios from "./http";


export default {
    //获取今日新闻
    queryNewsLatest(){
        return axios.get('/api/news_latest');
    },
    //获取指定日期前一天的新闻
    queryNewsBefore(time){
        return axios.get('/api/news_before',{
            params:{
                time
            }
        });
    },
    //获取新闻详情
    queryNewsInfo(id){
        return axios.get('/api/news_info',{
            params:{
                id
            }
        });
    },
    //获取评论数
    queryNewsStory(id){
        return axios.get('/api/story_extra',{
            params:{
                id
            }
        });
    },
    //登录接口
    login(phone, code){
        return axios.post('/api/login',{
            phone,code
        });
    },
    //获取手机验证码
    phoneCode(phone){
        return axios.post('/api/phone_code',{
            phone
        })
    },
    //检测是否登录
    checkLogin(){
        return axios.get('/api/check_login');
    },
    //获取登陆者信息
    userInfo(){
        return axios.get('/api/user_info');
    },
    //修改用户信息
    userUpdate(username,file){
        let fm = new FormData();
        fm.append("username",username);
        fm.append("file",file);
        return axios.post('/api/user_update',fm);
    },
    //收藏
    store(newsId){
        return axios.post('/api/store',{
            newsId
        });
    },
    //移除收藏
    storeRemove(id){
        return axios.get('/api/store_remove',{
            params:{
                id
            }
        })
    },
    //收藏列表
    storeList(){
        return axios.get('/api/store_list');
    }



}


