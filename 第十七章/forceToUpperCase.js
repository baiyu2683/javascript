function forceToUpperCase(element){
    if(typeof element === "string")
        element = document.getElementById(element);
    element.oninput = upcase;
    element.onpropertychange = upcaseOnPropertyChange;

    function upcase(event) {
        this.value = this.value.toUpperCase();
    }

    function upcaseOnPropertyChange(event) {
        var e = event || window.event;
        //如果value属性发生改变
        if (e.propteryName === "value") {
            //移除onpropertychange处理程序,避免循环调用
            this.onpropertychange = null;
            //把值都变成大写
            this.value = this.value.toUpperCase();
            //然后恢复原来的propertychange处理程序
            this.onpropertychange = upcaseOnpropertyChange;
        }
    }
}
