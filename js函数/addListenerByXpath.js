(function(xpath) {
	  var evaluator = new XPathEvaluator();
	  var result = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

	  function handler(event) {
		    event.stopPropagation();
		    var target = event.target;
		    if (target && target.value && window.bridge) {
			      if (target.type && target.type === "submit") {
				        target.onblur = null;
				        return;
			      }
			      bridge.getInput(xpath, target.toLocaleString());
		    }
		    target.onblur = null;
	  }
	  if (result) {
		    var node = result.singleNodeValue;
		    if ((node.tagName === "INPUT" || node.tagName == "TEXTAREA") && (typeof node.onblur !== "function")) {
			      node.onblur = handler;
		    }
	  }
})("$1");
