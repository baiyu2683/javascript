/**
 * InputFilter.js: 不唐突(Unobtrusive JavaScript,一种编写javascript的方法)地过滤<input>元素输入
 * 这个模块查找文档中拥有"data-allowed-char"属性的所有<input type="text">元素
 * 它为所有这类元素都注册keypress、textinput、textInput事件处理程序，用来限制用户只能输入出现再许可属性值中的字符
 * 如果<input>元素中也有一个“data-messageid"属性，那么认为这个值是另外一个文档元素的id
 * 如果用户输入了不允许的字符，那么会显示消息元素，如果输入了允许的字符，那么会隐藏消息元素
 * 这个信息id元素用于向用户说明拒绝输入的原因
 * 它通常应该有css控制样式，所以它开始不可见
 *
 * 下面时使用这个模块的html代码示例
 * 邮政编码:<input id="zip" data-allowed-chars="0123456789" data-messageid="zipwarn" type="text">
 * <span id="zipwarn" style="color:red;visibility:hidden">只支持数字</span>
 *
 * 这个模块相当的不唐突，它没有定义全局命名空间中的任何符号
 */
whenReady(function() {//当文档加载完毕时，运行这个函数
    //查找所有<input>元素
    var inputelts = document.getElementsByTagName("input");
    //遍历
    for(var i = 0; i < inputelts.length; i++) {
        var elt = inputelts[i];
        //跳过不是文本域或没有data-allowed-chars属性的元素
        if(elt.type != "text" || !elt.getAttribute("data-allowed-chars"))
            continue;

        //在input元素上注册事件处理程序函数
        //传统的keypress事件处理程序能够在任何地方运行
        //textInput(混合大小写)在2010年后Safari和Chrome支持
        //textinput(小写)是3级DOM事件规范草案中的版本
        if(elt.addEventListener){
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false);
            elt.addEventListener("textinput", filter, false);
        }
        else if(elt.attachEvent){
            elt.attachEvent("keypress", filter);
        }
    }

    //这是用于过滤用户输入的keypress、textInput和textinput事件处理程序
    function filter(event) {
        //获取事件对象和目标对象元素
        var e = event || window.event;  //标准||IE模型
        var target = e.target || e.srcElement; //标准||IE模型
        var text = null; //输入的文本

        //获取输入的文本
        if(e.type === "textinput" || e.type === "textInput") {
            text = e.data;
        }
        else { // 传统的keypress事件
            //对于可打印的keypress事件，Firefox使用charCode
            var code = e.charCode || e.keyCode;
            //如果按下的是任何形式的功能键，不要过滤它
            if(code < 32 || //ASCII控制字符
               e.charCode == 0 ||  //功能键(仅指FF)
               e.ctrlKey || e.altKey) //按下辅助键
                return;
            var text = String.fromCharCode(code);
        }

        //现在需要从input元素中寻找所需信息
        var allowed = target.getAttribute("data-allowed-chars");//合法字符
        var messageid = target.getAttribute("data-messageid");//信息元素id
        var messageElement;
        if(messageid) //如果存在消息元素id，那么获取这个元素
            messageElement = document.getElementById(messageid);

        //遍历输入文本中的字符
        for(var i = 0; i < text.length; i++){
            var c = text.charAt(i);
            if(allowed.indexOf(c) == -1){
                //如果存在不合法字符， 显示消息元素
                if(messageElement) messageElement.style.visibility = "visible";

                //取消默认行为，所有不会插入文本
                if(e.preventDefault) e.preventDefault();
                if(e.returnValue) e.returnValue = false;
                return false;
            }
        }

        //如果所有的字符都合法，隐藏存在的消息元素
        if(messageElement) messageElement.style.visibility = "hidden";
    }
});
