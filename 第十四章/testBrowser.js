/**
 * 使用navigator.userAgent属性来进行浏览器嗅探
 * 为客户端嗅探定义browser.name和browser.version，检测结果如下:
 *
 * 'webkit' : Safari或Chrome;版本号时Webkit的版本号
 * 'opera' : Opera; 版本号就是软件的版本号
 * 'mozilla' : Firefox或者其他基于gecko内盒的浏览器;版本号时Gecko的版本
 * 'msie' : IE; 版本号就是IE的版本号
 *
 */
var browser = (function(){
    var s = navigator.userAgent.toLowerCase();
    var match = /(webkit)[\/]([\w.]+)/.exec(s) ||
        /(opera)(?:.*version)?[\/]([\w.]+)/.exec(s) ||
        /(msie)([\w.]+)/.exec(s) ||
        !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s)||
        [];
    return {name : match[1] || "", version : match[2] || "0"};
}());
