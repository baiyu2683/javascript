/**
 * 一个参数，返回元素的textContent或innerText
 * 两个参数，用value参数的值设置元素的textContext或innerText
 */
function textContent(element, value){
    var content = element.textContent;  //检测textcontent是否有定义
    if(value === undefined){
        if(content !== undefined){
            return content;
        }else{
            return element.innerText;
        }
    }else{
        if(content !== undefined){
            element.textContent = value;
        }else{
            element.innerText = value;
        }
    }
}
/**
 * 返回元素e的纯文本内容，递归进入其子元素
 */
function getAllTextContent(e){
    var child, type, s = '';     //s保存文本
    for(child = e.firstChild; child != null; child = child.nextSibling){
        type = child.nodeType;
        if(type === 3 || type === 4){
            s += child.nodeValue;
        }else if(type === 1){
            s += getAllTextContent(child);
        }
    }
    return s;
}
/**
 *递归的把n的后代子节点中所有的Text节点内容转换为大写
 */
function upcase(n){
    if(n.nodeType === 3 || n.nodeType === 4){
        n.data = n.data.toUpperCase();
    }else{
        for(var i = 0; i < n.childNodes.length; i++){
            upcase(n.childNodes[i]);
        }
    }
}




