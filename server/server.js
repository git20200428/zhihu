const express = require('express');
const app = express();

app.get('/news_latest',(req,res)=>{
    let date = '20211203';
    let stories =[{
        id:9717893,
        title:"如何评价12月4号国行Switch发布会",
        hint: "YouKindly  7 分钟阅读",
        images: ["/imgs/001.png"]
    },{
        id:9717894,
        title:"雪豹是一种什么样的动物",
        hint: "星球研究生 12 分钟阅读",
        images: ["/imgs/002.png"]
    },{
        id:9717895,
        title:"猫被安抚的时候为什么打呼噜",
        hint: "猫研所  2 分钟阅读",
        images: ["/imgs/003.png"]
    },{
        id:9717896,
        title:"为什么独立设计师品牌的家具卖的那么贵？",
        hint: "张宇豪  2 分钟阅读",
        images: ["/imgs/004.png"]
    },{
        id:9717897,
        title:"潜水呼吸管能加长到四米吗？",
        hint: "sasha  1 分钟阅读",
        images: ["/imgs/005.png"]
    },
    {
        id:9717898,
        title:"孢子星球",
        hint: "sasha  1 分钟阅读",
        images: ["/imgs/005.png"]
    }, {
        id:9717899,
        title:"十万个为什么？",
        hint: "sasha  1 分钟阅读",
        images: ["/imgs/005.png"]
    }];
    let top_stories = [{
        id: '001',
        image:'/imgs/001.png',
        title:'袍子会带来蓝色星球的秘密',
        hint: '作者/王诺诺'
    },{
        id: '002',
        image:'/imgs/002.png',
        title:'为什么要对食材进行焯水？有哪些小技巧',
        hint: '作者/识食务者'
    },{
        id: '003',
        image:'/imgs/003.png',
        title:'一部电影会失传吗',
        hint: '作者/小小日月之心'
    },{
        id: '004',
        image:'/imgs/004.png',
        title:'he Lady of Shalott 1888麻雀,水莲,夏洛特夫人',
        hint: '作者/ Darkbloom'
    },{
        id: '005',
        image:'/imgs/005.png',
        title:'羽绒服里面的鸭绒和鹅绒可能是活拔的吗？',
        hint: '作者/ 奥肯'
    },];

    res.send({date, stories, top_stories});
});

app.get('/news_before',(req, res)=>{
    let [,$1,$2,$3] = /^(\d{4})(\d{2})(\d{2})$/.exec(req.query.time);
    let dt = new Date($1,$2-1,$3,0,0,0,0);
    let day = dt.getDate()-1;
    day = day < 10 ? "0"+day : ""+day;
    let date = ""+dt.getFullYear() + (dt.getMonth()+1) + day;
    let stories =[{
        id:9727893,
        title:"007 no time to die",
        hint: "邦德  1 分钟阅读",
        // images: ["/imgs/001.png"]
    },{
        id:9727894,
        title:"速度与激情10 ",
        hint: "电影 2 分钟阅读",
        // images: ["/imgs/002.png"]
    },{
        id:9727895,
        title:"time to fight for a while",
        hint: "人性  5 分钟阅读",
        // images: ["/imgs/003.png"]
    },{
        id:9727896,
        title:"宜家儿童床？",
        hint: "居生活  2 分钟阅读",
        // images: ["/imgs/004.png"]
    },{
        id:9727897,
        title:"巴拿马半岛？",
        hint: "sasha  1 分钟阅读",
        // images: ["/imgs/005.png"]
    },
    {
        id:9727898,
        title:"特斯拉估计",
        hint: "sasha  3 分钟阅读",
        // images: ["/imgs/005.png"]
    }, {
        id:9727899,
        title:"沙特王储？",
        hint: "halaman  4 分钟阅读",
        // images: ["/imgs/005.png"]
    }];
    res.send({date,stories});
})

app.get('/news_info',(req,res)=>{
    res.send({
        body:"知乎,中文互联网高质量的问答社区和创作者聚集的原创内容平台,于 2011 年 1 月正式上线,以「让人们更好地分享知识、经验和见解,找到自己的解答」为品牌使命。知乎凭借认真、专业、友善的社区氛围...",
        title:"斑马"
    });
})
app.get('/story_extra',(req,res)=>{
    res.send({
        long_comments:1,
        popularity:183,
        short_comments:22,
        comments:23
    });
})

app.post('/login',(_,res)=>{

    res.send({code:0,token:'ljaourewn@fljl#'});
})

app.post('/phone_code',(_,res)=>{
    res.send({code:0});
})

app.get('/check_login',(_,res)=>{
    res.send({code:0,data:{id:1,name:"知乎用户6441871",phone:"18317001868",pic:"/imgs/user/apple.jpg"}})
})
app.get('/user_info',(_,res)=>{
    res.send({code:0,data:{id:1,name:"知乎用户6441871",phone:"18317001868",pic:"/imgs/user/apple.jpg"}})
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