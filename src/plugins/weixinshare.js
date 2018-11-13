/**
 * Created by xiang on 2017/11/2.
 */
var wx = require('weixin-js-sdk');
export function wxConfigInit(data) {
    // 微信信息的以及调用的配置
    wx.config({
        debug:false, 
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
       jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
        // jsApiList: ['onMenuShareAppMessage']
    });

    // wx.checkJsApi({
    //     jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //     success: function(res) {
    //         console.debug(res);
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        // }
    // });

    // wx.ready(function(){
    //     // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    //    wx.onMenuShareTimeline({
    //        title: data.title, // 分享标题
    //        desc: data.desc, // 分享描述
    //        link: data.link,
    //        imgUrl: data.imgUrl, // 分享图标
    //        type: 'link' // 分享类型,music、video或link，不填默认为link
    //    });
    //     // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    //     wx.onMenuShareAppMessage({
    //         title: data.title, // 分享标题
    //         desc: data.desc, // 分享描述
    //         link: data.link,
    //         imgUrl: data.imgUrl, // 分享图标
    //         type: 'link' // 分享类型,music、video或link，不填默认为link
    //     });

    //     //获取“分享到QQ”按钮点击状态及自定义分享内容接口
    //    wx.onMenuShareQQ({
    //        title: data.title, // 分享标题
    //        desc: data.desc, // 分享描述
    //        link: data.link,
    //        imgUrl: data.imgUrl, // 分享图标
    //        type: 'link' // 分享类型,music、video或link，不填默认为link
    //    });

    //    //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
    //    wx.onMenuShareWeibo({
    //        title: data.title, // 分享标题
    //        desc: data.desc, // 分享描述
    //        link: data.link,
    //        imgUrl: data.imgUrl, // 分享图标
    //        type: 'link' // 分享类型,music、video或link，不填默认为link
    //    });

    //     //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
    //    wx.onMenuShareQZone({
    //        title: data.title, // 分享标题
    //        desc: data.desc, // 分享描述
    //        link: data.link,
    //        imgUrl: data.imgUrl, // 分享图标
    //        type: 'link' // 分享类型,music、video或link，不填默认为link
    //    });

    // });

    wx.error(function(res){
        console.debug(res);
    });
}
export function removeHTMLTag (str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    str=str.replace(/\s/g,''); //将空格去掉
    return str;
};
export function wxReady(data){
    wx.ready(function(){
      //     // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
       wx.onMenuShareTimeline({
           title: data.title, // 分享标题
           desc: data.desc, // 分享描述
           link: data.link,
           imgUrl: data.imgUrl, // 分享图标
           type: 'link' // 分享类型,music、video或link，不填默认为link
       });
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link,
            imgUrl: data.imgUrl, // 分享图标
            type: 'link' // 分享类型,music、video或link，不填默认为link
        });

        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
       wx.onMenuShareQQ({
           title: data.title, // 分享标题
           desc: data.desc, // 分享描述
           link: data.link,
           imgUrl: data.imgUrl, // 分享图标
           type: 'link' // 分享类型,music、video或link，不填默认为link
       });

       //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
       wx.onMenuShareWeibo({
           title: data.title, // 分享标题
           desc: data.desc, // 分享描述
           link: data.link,
           imgUrl: data.imgUrl, // 分享图标
           type: 'link' // 分享类型,music、video或link，不填默认为link
       });

        //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
       wx.onMenuShareQZone({
           title: data.title, // 分享标题
           desc: data.desc, // 分享描述
           link: data.link,
           imgUrl: data.imgUrl, // 分享图标
           type: 'link' // 分享类型,music、video或link，不填默认为link
       });
    })
}

