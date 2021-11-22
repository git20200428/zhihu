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
    }
}


