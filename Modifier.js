//正则修饰符，出现在/符号外面

//i,不去分大小写
var pattern = /java/i;
pattern.test("javA");//--->true
pattern.test("JAVA");//--->true
pattern.test("java");//--->true


//g,检索字符串中所有的匹配，而不是第一个
pattern = /java/g;
pattern.test("asdfasjavaasdfjava.java");//--->true
pattern.test("javaasdfasdfjavae");//--->true

//m,多行模式下使用 ^匹配一行开头和字符串开头
//$匹配一行结束和字符串结束
pattern = /java$/m;
pattern.test("java\nasdf");//--->true
pattern.test("java\nis instrea");//--->true
pattern.test("java is instrea");//--->false  ,, 不懂。。。

