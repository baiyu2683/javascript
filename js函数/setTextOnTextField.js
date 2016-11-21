//将文本放入当前页面中获得焦点的元素里
(function(content, append){
    if(content == undefined) content = "";
    if(append == undefined) append = true;
    var focusElement = document.activeElement;
    if(focusElement.value !== undefined){
        if(append)
            focusElement.value = focusElement.value + content;
        else
            focusElement.value = content;
    }
})("123", true);
