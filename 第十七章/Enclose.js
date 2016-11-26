//把内容装入到一个指定大小(最小50x50)的窗体或视口内
//可选参数contentX和contentY指定内容相对于窗体的初始偏移量
//(如果指定，它们必须>=0)
//这个窗体有mousewheel事件处理程序，
//它允许用户平移元素和缩放窗体
function enclose (content, framewidth, frameheight, contentX, contentY) {
    //这些参数不仅仅是初始值，它们保存当前状态，能被mousewheel处理程序使用和修改
    framewidth = Math.max(framewidth, 50);
    frameheight = Math.max(frameheight, 50);
    contentX = Math.min(contentX, 0) || 0;
    contentY = Math.min(contentY, 0) || 0;

    //创建frame元素，且设置css类名和样式
    var frame = document.createElement("div");
    frame.className = "enclosure";
    frame.style.width = framewidth + "px";
    frame.style.height = frameheight + "px";
    frame.style.overflow = "hidden";            //没有滚动条，不能溢出
    frame.style.boxSizing = "border-box";       //这个是说元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制
    frame.style.webkitBoxSizing = "border-box";
    frame.style.MozBoxSizing = "border-box";

    //把frame放入文档中，并把内容移入frame中
    content.parentNode.insertBefore(frame, content); //将frame插入content之前
    frame.appendChild(content);  //将content放入frame最后，同时会删除本来content的节点，相当于将content剪切到frame里了

    //确定元素相对于frame的位置
    content.style.position = "relative";
    content.style.left = contentX + "px";
    content.style.top = contentY + "px";

    //我们将需要针对下面一些特定浏览器怪癖进行处理
    var currentUserAgent = navigator.userAgent;
    var isMacWebkit= (currentUserAgent.indexOf("macintosh") !== -1 &&
                      currentUserAgent.indexOf("WebKit") !== -1);
    var isFirefox = (currentUserAgent.indexOf("Gecko") !== -1);

    //注册mousewheel事件处理程序
    frame.onwheel = wheelHandler; //未来浏览器, onwheel这个名字还没有流行开，大多数都是onmousewheel
    frame.onmousewheel = wheelHandler; //当前大多数浏览器
    if(isFirefox){
        frame.addEventListener("DOMMouseScroll", wheelHandler, false);
    }

    function wheelHandler(event){
        var e = event || window.event;

        //查找wheel事件对象，mousewheel事件对象（包括2D和1D）
        //和firefox的DOMMouseScroll事件对象的属性
        //从事件对象中提取旋转量
        //绽放delta以便一次鼠标滚轮“单击”相对于屏幕的缩放增量是30像素
        //如果未来浏览器在同一事件上同时触发“wheel”和“onmousewheel”
        //这里会重复计算，所以希望取消wheel事件将阻止mousewheel事件的产生
        var deltaX = e.deltaX*-30 || //wheel事件
                  e.wheelDeltaX/4 || //mousewheel事件
                                0;   //属性未定义
        var deltaY = e.deltaY*-30 ||           //wheel事件
            e.whellDeltaY/4 ||                 //Webkit中的mousedown事件
            (e.wheelDeltaY === undefined &&    //如果没有2D属性
             e.wheelDelta/4) ||                //name就用1D的滚轮属性
            e.detail*-10 ||                    //FF的DOMMouseScroll事件
            0;                                 //属性未定义

        //在大多数浏览器中，每次鼠标滚轮单击对应的delta是120，但是在Mac中，鼠标滚轮似乎对速度更敏感
        //其delta值通常要放大120倍，使用Apple鼠标至少如此，使用浏览器测试解决这个问题
        if(isMacWebkit) {
            deltaX /= 30;
            deltaY /= 30;
        }

        //如果在ff中得到mousewheel或wheel事件(当前ff浏览器只有DOMMouseScroll事件)，那么就不需要DOMMouseScroll
        if(isFirefox && e.type !== "DOMMouseScroll"){
            frame.removeEventListener("DOMMouseScroll", wheelHandler, false);
        }

        //获取内容元素当前的尺寸
        var contentbox = content.getBoundingClientRect();
        var contentwidth = contentbox.right - contentbox.left;
        var contentheight = contentbox.bottom - contentbox.top;

        if(e.altKey) { //如果按下Alt键，就可以调整frame大小
            if(deltaX) {
                framewidth -= deltaX; //新宽度，但是不能比内容大
                framewidth = Math.min(framewidth, contentwidth);
                framewidth = Math.max(framewidth, 50);  //不能比50小
                frame.style.width = framewidth + "px";  //在frame上设置它
            }
            if(deltaY) {
                frameheight -= deltaY; //同样的操作对frame的高度做一遍
                frameheight = Math.min(frameheight, contentheight);
                frameheight = Math.max(frameheight-deltaY, 50);
                frame.style.height = frameheight + "px";
            }
        }
        else { //没有按下Alt辅助键，就可以平移frame中的内容
            if(deltaX) {
                //不能再滚动了
                var minoffset = Math.min(framewidth - contentwidth, 0);
                //把deltaX添加到contentX中，但不能小于minoffset
                contentX = Math.max(contentX + deltaX, minoffset);
                contentY = Math.min(contentX, 0);
                content.style.left = content + "px";
            }
            if(deltaY) {
                var minoffset = Math.min(frameheight - contentheight, 0);
                //把deltaY添加到contentY，但不能小于minoffset
                contentY = Math.max(contentY + deltaY, minoffset);
                contentY = Math.min(contentY, 0);
                content.style.top = contentY + "px";
            }
        }

        //不让这个事件冒泡，组织任何默认操作，这回组织浏览器使用mousewheel事件滚动文档
        //希望对于相同的鼠标滚动
        //调用wheel事件上的preventDefault()也能阻止mousewheel事件的产生
        if(e.preventDefault) e.preventDefault();
        if(e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;

    }







}
