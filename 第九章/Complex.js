/**
 * Complex.js
 *  这个文件定义了Complex类,用来描述复数
 */

/**
 * 这个构造函数为它创建的每个实例定义了实例字段r和i
 */
function Complex(real, imaginary) {
    if(isNaN(real) && isNaN(imaginary)) //确保都是数字
        throw TypeError();
    this.r = real;
    this.i = imaginary;
}

/**
 * 为类的实例定义实例方法
 * 每个实例方法必须用this访问实例属性
 */

//当前复数对象加上另外一个复数,并返回一个新的计算和值之后的复数对象
Complex.prototype.add = function(that){
    return new Complex(this.r + that.r, this.i + that.i);
};

//当前复数乘以另外一个复数,并返回一个新的计算乘积之后的复数对象
Complex.prototype.mul = function(that){
    return new Complex(this. r * that.r - this.i * that.i, this.r * this.i + this.i * this.r);
};

//计算复数的模,复数的模定义为原点(0,0)到复平面的距离
Complex.prototype.mag = function(that){
    return Math.sqrt(this.r * this.r + this.i * this.i);
};

//复数的求负运算
Complex.prototype.neg = function(){
    return new Complex(-this.r, (-this.i));
};
//检测当前复数对象是否和另外一个复数值相等
Complex.prototype.equals = function(that){
    return that != null  && that.constructor === Complex &&
        (that.r == this.r && that.i == this.i);
};

/**
 * 类字段和类方法直接定义为构造函数的属性
 */
/**
 * 预定义的一些常量
 */
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

//定义类的私有字段,下划线表示私有
Complex._format = /^\{([^,]+),([^}]+)\}$/;

//这个类方法将又实例对象的toString方法返回的字符串格式解析为一个Complex对象
//或者抛出一个类型错误异常
Complex.parse = function(s){
    try{
        var m = Complex._format.exec(s);
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    }catch(x){
        throw new TypeError("'Can\'t parse '" + s + "' as a complex number.\'");
    }
};

//toString
Complex.prototype.toString = function(){
    return "{" + this.r + "," + this.i + "}";
};

//例子
var c = new Complex(1,2);
var d = new Complex(c.i, c.r);

console.log(c.add(d).toString());

var e = Complex.parse(c.toString());

console.log(e.toString());

var f = e.add(c.neg());

console.log(f.toString());

console.log(f.equals(Complex.ZERO));

