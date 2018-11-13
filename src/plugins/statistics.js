export const statistics = () =>{
    if(document.getElementById("statistics")){
        var removeEl = document.getElementById("statistics");
        var head = document.getElementsByTagName("head")[0]; 
        head.removeChild(removeEl);
    }
    var _hmt = _hmt || [];
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?363ba5b1ab884359082bc2540dc7cec0";
    hm.id = 'statistics';
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
}