function showNodeByXpath(xpath) {
    var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    var node = result.iterateNext();
    while(node) {
        console.info(node);
        node = result.iterateNext();
    }
}
