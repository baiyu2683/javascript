//单独的项组成子表达式
var pattern = /java(script)?/;


//在完整的模式种定义子模式
pattern = (/[a-z]+(\d+)/);


//引用
pattern = /(['"])[^'"]*\1/;
pattern.test("'asdf\"");//--->false
pattern.test("'asdf'");//--->true
