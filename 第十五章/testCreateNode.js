/**
 *动态创建一个script节点，引入js文件，放在head里
 */
function loadsync(url){
    var head = document.getElementsByTagName("head")[0];
    var s = document.createElement('script');
    s.src = url;
    head.appendChild(s);
}
