(function(xpath){
    var evaluator = new XPathEvaluator();
    var result = evaluator.evaluate(xpath, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if(result !== null){
        try{
            var node = result.singleNodeValue;
            var box = node.getBoundingClientRect();
            var offsets = getScrollOffsets();
            //TODO 获得文档坐标。。。
            var x = box.left + offsets.x;
            var y = box.top + offsets.y;
            var width = node.width;
            var height = node.height;
            if(bridge) {
               bridge.getCaptchaPosition(x, y, width, height);
            }
        } catch (error){
        }
    }

    function getScrollOffsets(){
        var w = window;
//        if(w.pageXOffset != null)
            return {
                x : w.pageXOffset,
                y : w.pageYOffset
            };
        // var d = w.document;
        // if(document.compatMode == 'CSS1Compat')
        //     return {
        //         x : d.documentElement.scrollLeft,
        //         y : d.documentElement.scrollTop
        //     };
        // return {
        //     x : d.body.scrollLeft,
        //     y : d.body.scrollTop
        // };
    }

}("$1"));
