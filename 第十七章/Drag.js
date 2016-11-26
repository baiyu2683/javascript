/**
 * 拖动绝对定位的html元素
 * 这个模块定义了一个drag()函数，他用于mousedown事件处理程序的调用,随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
 *
 * 参数:
 * elementToDrag: 接收mousedown事件的元素或某些包含元素,必须时绝对定位元素，它的style.left和style.top值将随用户拖动而改变
 * event: mousedown事件对象
 */
function drag(elementToDrag, event){
    //初始鼠标位置，转换为文档坐标
    var scroll = getScrollOffsets();
    var startX = event.clientX + scroll.x;
    var startY = event.clientY + scroll.y;

    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;

    //计算mousedown事件和元素左上角之剑的距离
    var deltaX = startX - origX;
    var deltaY = startY - origY;

    //注册用于响应接着mousedown事件发生的mousemove和mouseup事件的事件处理程序
    if(document.addEventListener){
        //在document对象上注册不过事件处理程序
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    }
    else if(document.attachEvent){
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);

        elementToDrag.attachEvent("onlosecapture", upHandler);
    }

    //阻止传播
    if(event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;

    //捕获mousemove的程序
    function moveHandler(e){
        if(!e) e = window.event;

        //移动这个元素到当前鼠标位置
        //通过滚动条的位置和出事淡季的偏移量来调整
        var scroll = getScrollOffsets();
        elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";  //计算offsetLeft
        elementToDrag.style.top = (e.clientY + scroll.y -deltaY) + "px";   //计算offsetTop
        //阻止传播
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }

    //捕获拖动结束时的mouseup事件的处理程序
    function upHandler(e){
        if(!e) e = window.event;

        //注销捕获事件处理程序
        if(document.removeEventListener) {
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", mhttp://spacemacs.org/news/news01.htmloveHandler, true);
        }
        else if(document.detachEvent){
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        }

        //阻止传播
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
}
