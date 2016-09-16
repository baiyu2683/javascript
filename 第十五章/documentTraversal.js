/**
 * 返回元素e的n层祖先元素
 */
function parent(e, n){
    if(n == undefined) n = 1;
    while(n-- && e) e = e.parentNode;
    if(!e || e.nodeType !== 1) return null;
    return e;
}

/**
 * 返回元素e的第n个兄弟元素
 */
function sibling(e, n){
    while(e && n !== 0){
        if(n > 0){
            if(e.nextElementSibling) e = e.nextElementSibling;
            else {
                for(e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling)
                    /*空循环*/;
            }
            n--;
        }else{
            if(e.previousElementSibling) e = e.previousElementSibling;
            else{
                for(e = e.previousElementSibling; e && e.nodeType !== 1; e = e.previousElementSibling)
                    /*空循环*/;
            }
            n++;
        }
    }
    return e;
}
/**
 * 返回元素e 的第n代子元素，如果不存在则为null
 * 负值n代表从后往前计数，0表示第一个，-1最后一个，-2倒数第二个
 */
function child(e, n){
    //1.children存在的话，直接使用
    if(e.children){
        if(n < 0) n += e.children.length;
        if(n < 0) return null;
        return e.children[n];
    }
    //2. children不存在的话
    if(n >= 0){
        if(e.firstElementChild) e = e.firstElementChild;
        else{
            for(e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling)
                /*空循环*/;
        }
        return sibling(e, n);
    }else{
        if(e.lastElementChild) e = e.lastElementChild;
        else{
            for(e = e.lastChild; e && e.nodeType !== 1; e = e.lastChild)
                /*空循环*/;
        }
        return sibling(e, n+1);
    }
}

