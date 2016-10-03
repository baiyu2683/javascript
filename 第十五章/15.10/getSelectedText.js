//返回当前页面上选中的内容
function getSelectionText(){
    if(window.getSelection)   //HTML5标准API
        return window.getSelection().toString();
    else if(document.selection)  //IE特有的技术
        return document.selection.createRange().text;
};
