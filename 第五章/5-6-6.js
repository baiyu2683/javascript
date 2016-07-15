function factorial(x) {
    if (x < 0) throw new Error('不能是负数');
    for (var f = 1; x > 1; f *= x, x--) /*empty*/
        ;
    return f;
}
try {
    var n = Number(prompt('请输入一个正整数', ''));
    var f = factorial(n);
    alert(n + ' != ' + f);
}
catch (e) {
    alert(e);
}finally{
    alert(123);
}

