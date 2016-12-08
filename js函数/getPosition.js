//文档坐标
(function(xpath){
    var evaluator = new XPathEvaluator();
    var result = evaluator.evaluate(xpath, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if(result !== null){
        try{
            var node = result.singleNodeValue;
            var box = node.getBoundingClientRect();
            var offsets = getScrollOffsets();
            var x = box.left + offsets.x;
            var y = box.top + offsets.y;
            var width = node.width;
            var height = node.height;
            return {
                x: x,
                y: y,
                width: width,
                height: height
            };
        } catch (error){
        }
    }

    function getScrollOffsets(){
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    };
}("$1"));
//测试视口坐标
(function(){
        try{
            var node =document.getElementById("yzm");
            var pos = getElementPos(node);
            if(bridge) {
                bridge.testCallback(pos.x, pos.y);
            }
        } catch (error){
        }
    function getElementPos(elt){
        var x = 0, y = 0;
        for(var e = elt; e != null; e = e.offsetParent){
            x += e.offsetLeft;
            y += e.offsetTop;
        }
        for(var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode){
            x -= e.scrollLeft;
            y -= e.scrollTop;
        }
        return {
            x : x,
            y : y
        };
    }
})();
//视口坐标
(function(xpath){
    var evaluator = new XPathEvaluator();
    var result = evaluator.evaluate(xpath, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if(result !== null){
        try{
            var node = result.singleNodeValue;
            var pos = getElementPos(node);
            var width = node.width;
            var height = node.height;
            if(bridge) {
                bridge.getCaptchaPosition(xpath, pos.x, pos.y, width, height);
            }
        } catch (error){
        }
    }
    function getElementPos(elt){
        var x = 0, y = 0;
        for(var e = elt; e != null; e = e.offsetParent){
            x += e.offsetLeft;
            y += e.offsetTop;
        }
        for(var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode){
            x -= e.scrollLeft;
            y -= e.scrollTop;
        }
        return {
            x : x,
            y : y
        };
    }
}("$1"));

(function(){
    var yzm = document.getElementById("yzm");
    if(bridge) {
        bridge.testCallback(yzm.offsetLeft, yzm.offsetTop);
    }
})();

