//查找有data-uploadto属性的全部<input type="file">元素
//并注册onchange事件处理程序
//这样任何选择的文件都会自动通过post方法发送到指定的"uploaded"URL
//忽略了服务器的相应

//后台接收不到数据，不知道为什么。。。。!-_-
whenReady(function(){
    var elts = document.getElementsByTagName("input");
    for(var i = 0; i < elts.length; i++) {
        var input = elts[i];
        if(input.type !== "file") continue;
        var url = input.getAttribute("data-uploadto");
        if(!url) continue;
        //加上传文件监听
        input.addEventListener("change", function(event) {
            var file = this.files[0];
            if(!file) return;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.send(file);
        });
    }
});
