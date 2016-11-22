function postMessage(msg) {
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9006/test/strings");
    request.setRequestHeader("Content-Type", "text/plain;charset=utf-8");//请求主体是纯文本
    request.send(msg);
}
