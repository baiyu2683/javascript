//{n,m},匹配至少n次，至多m次
var pattern = /\d{2,3}/;
pattern.test("1233"); //--->true
pattern.test("1aasdf");//--->false

//{n,},匹配至少n次
pattern = /\w{2,}/;
pattern.test('a2\n');//--->true
pattern.test('张恒');//--->false

//{n},匹配n次
pattern = /\s{2}/;
pattern.test(' ');//--->false
pattern.test('  ');//--->true

//?,匹配前一项0次或者1次，即前一项可有可无，{0,1}
pattern = /\s?/;
pattern.test('');//--->true;
pattern.test(' ');//--->true
pattern.test('  ');//--->false,错了，因为有一个空格的。。-_-!

//+,匹配1次或者多次，{1,}
pattern = /\d+/;
pattern.test('1asdf');//--->true
pattern.test('asdf');//--->false

//*,匹配0次或者多次，{0,}
pattern = /\d*/;           //貌似这个什么都可以匹配了
pattern.test('asdf');//--->true
pattern.test('123');//--->true
pattern.test('\n\s\r');//--->true


//非贪婪的匹配


