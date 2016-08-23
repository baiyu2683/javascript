//RegExp构造函数
//第一个参数是正则表达式直接量/../中间的部分
//第二个参数可选，是正则表达式修饰符,i,g,m或者其组合

var zipCode = new RegExp("\d{5}","g");


//exec(),返回一个数组，不带g的情况下格式和string的match一样
//带g的时候只匹配第一个，lastIndex记录当前匹配位置，可以多次调用
var pattern = /Java/g;
var text = "JavaScript is more fun than Java！";
var result;
while((result = pattern.exec(text)) != null){
    console.log("Matched '" + result[0] + "'" +
            " at Position '" + result.index + "'" +
           "; next search begins at " + pattern.lastIndex);
};

//最后一次检索失败，返回null,并且将lastIndex归零

