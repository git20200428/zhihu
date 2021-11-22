export const isPlainObject = function (obj){
    let proto, Ctor;
    if(!obj || Object.prototype.toString.call(obj) !== '[object Object]') return false;
    proto = Object.getPrototypeOf(obj);
    if(!proto) return true;
    Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === 'function' &&  Ctor === Object;
}

// 处理页面最大宽度为750px问题，小于750px时页面宽度就是屏幕宽度
// 项目中使用的是amfe-flexible。
// 如果使用vant推荐的lib-flexible，那么在处理当屏幕尺寸大于750px，使html的font-size和body的width设置为75px和750px，且居中显示body时失效。
// 使用amfe-flexible有效
export const handleMaxWidth = function (){
    let HTML = document.documentElement,
        size = parseFloat(HTML.style.fontSize),
        app = document.querySelector('#app');
    if(size > 75){
        HTML.style.fontSize = '75px';
        app.style.width = '750px';
        return;
    }
    app.style.width = '100%';
}
//日期格式化
export const formatTime = function (time, template){
    //'20211025' '2021/12/25' '2021-12-5 10:00:00'
    if(typeof time !== 'string'){
        time = new Date().toLocaleString('zh-CN',{hour12:false});//'2021/11/19 18:52:34'
    }
    if(typeof template !== 'string'){
        template = "{0}年{1}月{2}日 {3}:{4}:{5}";
    }
    //解析年月日等信息
    let arr = [];
    if(/^\d{8}/.test(time)){
        let [,$1,$2,$3] = /^(\d{4})(\d{2})(\d{2})$/.exec(time);
        arr.push($1,$2,$3);
    }else{
        arr = time.match(/\d+/g);
    }

    return template.replace(/\{(\d+)\}/g,(_, $1)=>{
        let item = arr[$1] || "00";
        if(item.length < 2) item = "0" +item;
        return item;
    });
}