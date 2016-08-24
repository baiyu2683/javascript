//指定匹配的位置

//^匹配字符串开头
var pattern = /^[Jj]ava/;
pattern.test("java");//--->true
pattern.test("ava");//--->false

//$匹配字符串结尾
pattern = /张恒$/;
pattern.test("张恒");//--->true
pattern.test("张衡");//--->false

//\b匹配单词的边界
pattern = /\bjava\b/;
pattern.test("asdfasdfjavaasdfasdf");//--->true
pattern.test(" java adsfasdf javaScript");//--->true

//(?!p)零宽负向断言,下面的字符不与p匹配
pattern = /[Jj]ava(?!Script)([A-Z]\w*)/;
pattern.test("javaScript");//--->false
pattern.test("javascript");//--->false
pattern.test("JavaScripter");//--->false

//(?=p)正向零宽断言，下面的字符需要完全与p匹配，不是包含p
pattern = /java(?=Script)/;
pattern.test("asdfjavaScript");//--->true
pattern.test("asdfjavaScrip");//--->false
pattern.test("javaECMAScript");//--->false

