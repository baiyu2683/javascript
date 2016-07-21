//判断浏览器是否支持严格模式
//严格模式下，函数中this是undefined
function hasStrictMode(){
    "use strict";
    return this === undefined;
}

alert(hasStrictMode());
