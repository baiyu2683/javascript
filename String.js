//search(/../),返回第一个与值匹配的字串的起始位置，如果找不到返回-1
var index = "javaScript".search(/script/i);
console.log(index);


//replace(str, "xxx"), replace(/.../, "xxx")
var str = "javascriptvbScript";
var tmp = str.replace(/script/ig,"-");
console.log(str + "~" + tmp);

//$1,1代表索引位置，replace将使用与制定的子表达式相匹配的文本来替换这两个字符
str = "java\"asdfasdf\"";
var quote = /"([^"]*)"/g;
tmp = str.replace(quote, "“$1”");
console.log(tmp);


//match(/.../g),匹配正则，返回匹配的字符串的数组，加g表示匹配所有，不加匹配第一个
str = "javaScriptasdfasdfscript";
var elements = str.match(/script/ig);
console.log(elements);
for(i in elements){
    console.log(i);
}

elements.forEach(function(i, v){
    console.log(i+"-"+v);
});

//下面这个执行结果好厉害，0-->第一个完整的匹配  1-->位置  2-->整个字符串
str.match(/script/i);
//-->[ 'Script', index: 4, input: 'javaScriptasdfasdfscript' ]


//0--->第一个完整的匹配 1-->第一个分组 2-->第二个分组 3-->第一个匹配位置，4-->输入
str.match(/(sc)r(ipt)/i);
/**
[ 'Script',
  'Sc',
  'ipt',
  index: 4,
  input: 'javaScriptasdfasdfscript' ]
**/

//split，按正则或者字符串分割字符串
str = "1,2,3,4,,asdf";
tmp = str.split(",,");
console.log(tmp);
tmp = str.split(/,+/);
console.log(tmp);
