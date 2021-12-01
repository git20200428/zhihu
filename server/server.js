const express = require('express');
const axios = require('axios');
const app = express();
const uuid = require('uuid');
const md5 = require('blueimp-md5');
// const bodyParser=require("body-parser");
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const cache = {};

app.get('/news_latest',async (req,res)=>{
    /*let date = '20211203';
    let stories =[{
        id:9717893,
        title:"如何评价12月4号国行Switch发布会",
        hint: "YouKindly  7 分钟阅读",
        images: ["/imgs/001.png"]
    }];
    let top_stories = [{
        id: '001',
        image:'/imgs/001.png',
        title:'袍子会带来蓝色星球的秘密',
        hint: '作者/王诺诺'
    }];*/
    let result = await axios.get("http://news-at.zhihu.com/api/4/news/latest");
    res.send(result.data);
});
app.get('/news_before', async (req, res)=>{
    /*let [,$1,$2,$3] = /^(\d{4})(\d{2})(\d{2})$/.exec(req.query.time);
    let dt = new Date($1,$2-1,$3,0,0,0,0);
    let day = dt.getDate()-1;
    day = day < 10 ? "0"+day : ""+day;
    let date = ""+dt.getFullYear() + (dt.getMonth()+1) + day;
    let stories =[{
        id:9727893,
        title:"007 no time to die",
        hint: "邦德  1 分钟阅读",
        // images: ["/imgs/001.png"]
    }];*/
    let result = await axios.get(`http://news.at.zhihu.com/api/4/news/before/${req.query.time}`);
    res.send(result.data);
})
app.get('/news_info',async (req,res)=>{
    /*res.send({
        body:"知乎,中文互联网高质量的问答社区和创作者聚集的原创内容平台,于 2011 年 1 月正式上线,以「让人们更好地分享知识、经验和见解,找到自己的解答」为品牌使命。知乎凭借认真、专业、友善的社区氛围...",
        title:"斑马"
    });*/
    let result = await axios.get(`http://news-at.zhihu.com/api/4/news/${req.query.id}`);
    res.send(result.data);

})
app.get('/story_extra',async (req,res)=>{
    /*res.send({
        long_c:omments:1,
        popularity:183,
        short_comments:22,
        comments:23
    });*/
    let result = await axios.get(`http://news-at.zhihu.com/api/4/story-extra/${req.query.id}`);
    res.send(result.data);
})




app.post('/login',(req,res)=>{
// {phone,code}
//     console.log(req)
    let {phone, code}  = req.body;
    if(cache[phone] == code){
        res.send({code:0,token:uuid.v1()});
    }else{
        res.send({code:1});
    }
})
app.post('/phone_code',(req,res)=>{
    let {phone}  = req.body;
    let num = parseInt((Math.random() * 9 + 1) * 100000);
    console.log(num);
    cache[phone] = num;
    res.send({code:num});
})

app.get('/check_login',(_,res)=>{
    res.send({code:0,data:{id:1,name:"知乎用户6441871",phone:"18317001868",pic:"/imgs/user/apple.jpg"}})
})
app.get('/user_info',(_,res)=>{
    res.send({code:0,data:{id:1,name:"知乎用户6441871",phone:"18317001868",pic:"/imgs/user/apple.jpg"}})
})
app.get('/user_update',(_,res)=>{
    res.send({
        code:0,
        codeText:"store_list 成功",
        data : [{
          image_hue: "0xb09b7b",
          title: "以藤原豆腐店的收入，是否能够支付藤原在赛车上的投入？",
          url: "https://daily.zhihu.com/story/9741729",
          hint: "Astro . 2 分钟前阅读",
          gp_prefix: "102907",
          images:["https://pica.zhimg.com/v2-91978c94dd4064d0c687be6ef17301d4.jpg?source=8673f162",],
          type:0,
          id:9741729
        }]
    })
})
app.get('/store',(_,res)=>{
    res.send({
        code:0,
        codeText:"store_list 成功",
        data : [{
            image_hue: "0xb09b7b",
            title: "以藤原豆腐店的收入，是否能够支付藤原在赛车上的投入？",
            url: "https://daily.zhihu.com/story/9741729",
            hint: "Astro . 2 分钟前阅读",
            gp_prefix: "102907",
            images:["https://pica.zhimg.com/v2-91978c94dd4064d0c687be6ef17301d4.jpg?source=8673f162",],
            type:0,
            id:9741729
        }]
    })
})
app.get('/store_remove',(_,res)=>{
    res.send({
        code:0,
        codeText:"store_list 成功",
        data : [{
            image_hue: "0xb09b7b",
            title: "以藤原豆腐店的收入，是否能够支付藤原在赛车上的投入？",
            url: "https://daily.zhihu.com/story/9741729",
            hint: "Astro . 2 分钟前阅读",
            gp_prefix: "102907",
            images:["https://pica.zhimg.com/v2-91978c94dd4064d0c687be6ef17301d4.jpg?source=8673f162",],
            type:0,
            id:9741729
        }]
    })
})
app.get('/store_list',(_,res)=>{
    res.send({
        code:0,
        codeText:"store_list 成功",
        data : [{
            image_hue: "0xb09b7b",
            title: "以藤原豆腐店的收入，是否能够支付藤原在赛车上的投入？",
            url: "https://daily.zhihu.com/story/9741729",
            hint: "Astro . 2 分钟前阅读",
            gp_prefix: "102907",
            images:["https://pica.zhimg.com/v2-91978c94dd4064d0c687be6ef17301d4.jpg?source=8673f162",],
            type:0,
            id:9741729
        }]
    })
})




app.listen(7000, err=>{
    if(!err) {
        console.log("server started on 7000")
    }else{
        console.log(err);
    }
})