function getViewportSize(w){
    w = w || window;

    //除了IE8及更早的版本之外，其他浏览器都能用
    if(w.innerWidth != null) {
        return {
            w : w.innerWidth,
            h : w.innerHeight
        };
    }

    //对标准模式下的IE或任何浏览器
    var d = w.document;
    if(document.compatMode == 'CSS1Compat'){
        return {
            w : d.documentElement.clientWidth,
            h : d.documentElement.clientHeight
        };
    }

    //对怪异模式下的浏览器
    return {
        w : d.body.clientWidth,
        h : d.body.clientHeight
    };
}
