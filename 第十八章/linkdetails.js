/**
 * 使用HEAD和CORS请求链接详细信息
 *
 * 这个常见的javascript模块查询有href属性但没有title属性的所有a元素，并给他们注册onmouseover事件处理程序
 * 这个事件处理程序使用XMLHttpRequest HEAD请求取得链接资源的详细信息,然后把这些详细信息设置为链接的title属性
 * 这样他们将会在工具提示中显示
 */
whenReady(function() {
    //是否有机会用跨域请求
    var supportsCORS = (new XMLHttpRequest()).withCredentials !== undefined;

    //遍历文档中的所有链接
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        if(!link.href) continue;  //跳过没有超链接的锚点
        if(link.title) continue; //跳过已经有工具提示的链接
        //如果这是一个跨域链接
        if (link.host !== location.host || link.protocol !== location.protocol) {
            link.title = "站外链接";
            if(!supportsCORS) continue; //如果不支持跨域就退出
        }

        //注册时间处理程序，当鼠标悬停时下载链接详细信息
        if (link.addEventListener) {
            link.addEventListener("mouseover", mouseoverHandler, false);
        } else {
            link.attachEvent("onmouseover", mouseoverHandler);
        }

    }

    function mouseoverHandler(e) {
        var link = e.target || e.srcElement;
        var url = link.href;

        var req = new XMLHttpRequest();
        req.open("HEAD", url);
        req.onreadystatechange = function() {
            if(req.readyState !== 4) return;
            if(req.statue === 200) {
                var type = req.getResponseHeader("Content-Type");
                var size = req.getResponseHeader("Content-Length");
                var date = req.getResponseHeader("Last-Modified");
                //在工具提示中显示详细信息
                link.title = "类型:" + type + "\n" + "大小:" + size + "\n" + "时间:" + date;
            }
            else {
                if(!link.title) {
                    link.title = "Couldn't fetch details:\n" + req.status + " " + req.statusText;
                }
            }
        };
        req.send();

        //移除处理程序,获取一次就可以了
        if(link.removeEventListener) {
            link.removeEventListener("mouseover", mouseoverHandler, false);
        } else {
            link.detachEvent("mouseover", mouseoverHandler);
        }
    }
});
