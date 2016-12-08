/**
 * 优雅的图片翻转实现方式
 * 要创建图片翻转效果，将此模块引入到HTML文件中
 * 然后在任意<img>元素上使用data-rollover属性来制定翻转图片的url即可
 * etc：<img src="normal_image.png" data-rollover="rollover_image.png">
 *  依赖于之前的onLoad.js
 */
onLoad(function(){
    //遍历所有的图片，查找data-rollover属性
    for(var i = 0; i < document.images.length; i++) {
        var img = document.images[i];
        var rollover = img.getAttribute("data-rollover");
        if(!rollover) continue; //跳过没有data-rollover属性的图片

        //确保将翻转的图片缓存起来
        (new Image()).src = rollover;

        //定义一个属性来标识默认的图片URL
        img.setAttribute("data-rollout", img.src);

        //注册事件处理函数来创建翻转效果
        img.onmouseenter = function(){
            this.src = this.getAttribute("data-rollover");
        };
        img.onmouseleave = function(){
            this.src = this.getAttribute("data-rollout");
        };
    }
});
