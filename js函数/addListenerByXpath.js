(function(xpath) {
	  var evaluator = new XPathEvaluator();
	  var result = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	  if (result && window.blurEventHandler) {
		    var node = result.singleNodeValue;
        node.xpath = xpath;
		    node.removeEventListener("blur", window.blurEventHandler, false);
        node.addEventListener("blur", window.blurEventHandler, false);
	  }
})("$1");

(function(){
    if(!window.blurEventHandler){
        window.blurEventHandler = function (event) {
		        event.stopPropagation();
		        var target = event.target;
		        if (target && target.value && window.bridge) {
			          window.bridge.getInput(target.xpath, target.value);
		        }
        };
    }
})();
