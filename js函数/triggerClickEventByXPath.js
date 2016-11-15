(function(xpath, index){
    var evaluator = new XPathEvaluator();
    var result = evaluator.evaluate(xpath, document.documentElement, null,XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    if(result !== null){
        var nodes = [];
        var node = result.iterateNext();
        var i = 1;
        var e = document.createEvent("MouseEvent");
        e.initEvent("click",true,true);
        while(node !== null){
            if(i === index){
                node.dispatchEvent(e);
            }
            node = result.iterateNext();
            i++;
        }
    }
})("//div", 2);


(function(xpath){
    var evaluator = new XPathEvaluator();
    var result = evaluator.evaluate(xpath, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if(result !== null){
        try{
            var nodes = [];
            var node = result.singleNodeValue;
            var e = document.createEvent("MouseEvent");
            e.initEvent("click",true,true);
            node.dispatchEvent(e);
        } catch (error){}
    }
})("//div");
