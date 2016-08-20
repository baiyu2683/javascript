//正则表达式直接量,匹配s结尾的字符串
var pattern = /s$/;
//构造函数
var pettern1 = new RegExp("s$");

/**
 * 字符类,将直接来那个字符单独放进方括号内,就组成了字符类.匹配所有它包含的字符
 * [...]
 */

//[...]匹配中扩号内任意的字符
pattern = /[asdf]/;
pattern.test('d'); //-->true
pattern.test('azxcvf');//-->true
pattern.test('e'); //-->false

pattern = /[[张恒]/;
pattern.test('张衡');//-->true
pattern.test('章');//--false

//[^...]匹配除中括号内的任意字符
pattern = /[^a]/;
pattern.test('aaaaaa');//-->false
pattern.test('adsfg');//-->true

//.,匹配任意一个字符,除换行符外
pattern = /./;
pattern.test("\n"); //-->false
pattern.test("a");  //-->true
pattern.tes("asdf"); //-->true

//\w匹配任何ASCII字符组成的单词,等价于[a-zA-Z0-9]，字母和数字
pattern = /\w/;
pattern.test('asdf');//-->true
pattern.test('\u0400');//-->false

//\W任何不是ASCII字符组成的单词,等价于[^a-zA-Z0-9]
pattern = /\W/;
pattern.test('asdf');//-->false
pattern.test('\u0400');//--true

//\s匹配任何Unicode空白符
pattern = /\s/;
pattern.test(' ');//空格,   -->true
pattern.test('	');//emacs:C-q TAB输入tab键   -->true
pattern.test('\t');//tab键

//\S匹配任何非Unicode空白符的字符，比\w匹配的更多
pattern = /\S/;
pattern.test(' ');//-->false
pattern.test('\u0400');//-->true
pattern.test('asdf');//-->true

//\d,任何ASCII数字，[0-9]
pattern = /\d/;
pattern.test('123');//-->true
pattern.test('asdf');//-->fasle

//\D除ASCII数字之外的任意字符,[^0-9]
pattern = /\D/;
pattern.test('asdf');//-->true
pattern.test('123');//-->false

//[\b],退格,不能嵌套写在[]里了
pattern = /[\b]/;
pattern.test('\b');//-->true


//exercise
pattern = /[\b][\d]/;//匹配退格键+数字，\b123123
pattern.test('\b1');//-->true
