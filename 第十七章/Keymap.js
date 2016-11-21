/**
 * keymap.js； 绑定键盘事件和处理程序函数
 *
 * 这个模块定义一个Keymap类
 * 这个类的实例表示按键标识符(下面有定义)到处理程序函数的映射
 * Keymap能配置到HTML元素上以处理keydown事件
 * 当此类事件发生时，Keymap会使用它的映射来调用合适的处理程序
 *
 * 当创建Keymap时
 * 能传入一个Javascript对象，它表示Keymap绑定的初始设置
 * 对象的属性名是按键标识符，而属性值是处理程序函数
 * 在创建Keymap之后，通过给bind()方法传入按键标识符和处理程序函数可以添加一个新绑定
 * 能给unbind()方法传入按键标识符来移除绑定
 *
 * 通过给Keymap的install()方法传入像document对象这样的HTML元素，然后就可以使用它 
 * install()方法给指定的对象添加onkeydown事件处理程序
 * 当调用这个处理程序时，它判断按下键的按键标识符
 * 如果有这个按键标识符的任何绑定函数
 * 一个Keymap可以在多个HTML元素上配置
 *
 * 按键标识符
 * 按键标识符是一个区分大小写的字符串
 * 它表示按键加上同一时刻按下的辅助键
 * 按键的名字通常是案件上的字符（不会变）
 * 法定的键名包括"A","7","F2","PageUp","Left","Backspace"和“ESC"
 *
 * 请参阅模块的Keymap.keyCodeToKeyName对象中的键名列表 
 * 这里有3级DOM规范定义的键名子集
 * 并且当实现时这个类将使用事件对象的key属性
 *
 * 按键表支付也可能包含辅助键前缀
 * 这些前缀时Alt、Ctrl、Meta和Shift
 * 它们区分大小写，且必须使用空格、下划线、连字符或”+“来和按键名彼此分开
 * 例如：”SHIFT+A“、”ALT_F2“、”meta-v“和”ctrl alt left“
 * 在Mac中，Meta是Command键，Alt是Option键
 * 一些浏览器把Windows键映射到Meta辅助键
 *
 * 处理程序函数
 * 处理程序在配置Keymap的文档或文档元素上作为其方法调用，并传入两个参数:
 * 1)keydown事件的事件对象
 * 2)按下的按键的标识符
 * 处理程序的返回值就是keydown处理程序的返回值
 * 如果处理程序函数返回false
 * Keymap将停止冒泡并取消和keydown事件相关的操作
 *
 * 限制
 * 在所有按键上绑定一个事件处理函数是不可能的
 * 操作系统会限制一些按键序列（例如， Alt+F4）
 * 而浏览器本身也可能限制其他一些按键序列（比如，Ctrl+S）
 * 这些代码受限于浏览器、OS和本地设置。功能键和有辅助键的功能键工作得很好
 * 而没有辅助键的字母数字键也工作的很好
 * Ctrl和Alt与字母键的结合非常强健
 *
 * 在美国标准键盘布局上，
 * 能够支持大多数不需要Shift键的标点字符(`=[];',.\/但不包括连字符)
 * 但是它们不特别适合其他键盘布局，应该避免
 *
 */

//这是构造函数
function Keymap(bindings) {
    this.map = {}; //定义按键标识符->处理程序映射
    if (bindings) { //给它复制初始绑定
        for(var name in bindings) this.bind(name, bindings[name]);
    }
}

// 绑定制定的按键标识符和指定的处理程序函数
Keymap.prototype.bind = function(key, func) {
    this.map[Keymap.normalize(key)] = func;
};

//删除绑定的按键标识符和指定的处理程序函数
Keymap.prototype.unbind = function(key, func) {
    delete this.map[Keymap.normalize[key]];
};

// 在制定的HTML元素上配置Keymap
Keymap.prototype.install = function(element) {
    //这是事件处理程序
    var keymap = this;
    function handler(event) {
        return keymap.dispatch(event, element);
    }

    //现在安装它
    if(element.addEventListener) {
        element.addEventListener("keydown", handler, false);
    } else if(element.attachEvent) {
        element.attachEvent("onkeydown", handler);
    }
};

// 这个方法基于Keymap绑定分派按键事件
Keymap.protorype.dispatch = function(event, element) {
    //开始没有辅助键和键名
    var modifiers = "";
    var keyname = null;

    //按照标准的小写字母顺序构建辅助键字符串
    if (event.altKey) modifiers += "alt_";
    if (event.ctrlKey) modifiers += "ctrrl_";
    if (event.metaKey) modifiers += "meta_";
    if (event.shiftKey) modifiers += "shift_";

    //如果实现3级DOM规范的key属性，获取keyname很容易
    if (event.key) keyname = event.key;
    //在Safari和Chrome商用keyIdentifier来获取功能键名
    else if (event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== "U+")
        keyname = event.keyIdentifier;
    //否则,使用keyCode属性和后面编码到键名的映射
    else keyname = Keymap.keyCodeToKeyName[event.keyCode];

    // 如果不能找出键名，只能返回并忽略这个事件
    if (!keyname) return;

    //标准的按键id是辅助键加上小写的键名
    var keyid = modifiers + keyname.toLowerCase();

    // 现在查看按键标识符是否绑定了任何东西
    var handler = this.map[keyid];

    if(handler) { //如果这个键有处理程序,调用它
        //调用处理程序函数
        var retval = handler.call(element, event, keyid);
        //如果处理程序返回false， 取消默认操作并阻止冒泡
        if(retval === false) {
            if (event.stopPropagation) event.stopPropagation(); //DOM模型
            else event.cancelBubble = true;          //IE模型
            if (event.preventDefault) event.preventDefault(); //DOM
            else event.returnValue = false;     //IE
        }
        //返回处理程序返回值
        return retval;
    }
};

//用于把按键标识符转换成标准形式的工具函数
//在非Mac硬件，我们这里把"meta"映射到"ctrl",
//这样在Mac中"Meta+C"将变成"Commang+C",其他都是"Ctrl+C"
Keymap.normalize = function(keyid) {
    keyid = keyid.toLowerCase(); //一切都小写
    var words = keyid.split("/\s+|[\-+_]/"); //分割辅助键和键名
    var keyname = words.pop(); //键名是最后一个
    keyname = Keymap.aliases[keyname] || keyname; //它是别名吗？
    words.sort(); //排序剩下的辅助键
    words.push(keyname);//添加到序列化名字后面
    return workd.join("_"); //把它们拼起来
};

Keymap.aliases = { //把按键的常见别名映射到他们的“正式名”
    "escape" : "esc", //键名使用3级DOM规范的定义和后面的编码到键名的映射
    "delete" : "del", //所有的键和值都必须小写
    "return" : "enter",
    "ctrl" : "control",
    "space" : "spacebar",
    "ins" : "insert"
};

//传统的keydown事件对象的keyCode属性是不标准的
//但下面的值似乎可以在大多数浏览器和OS中可行
Keymap.keyCodeToKeyName = {
    //使用词或方向键的按键
    8:"Backspace", 9:"Tab", 13:"Enter", 16:"Shift", 17:"Control", 18:"Alt",
    19:"Pause", 20:"CapsLock", 27:"Esc", 32:"Spacebar", 33:"PageUp",
    34:"PageDown", 35:"End", 36:"Home", 37:"Left", 38:"Up", 39:"Right",
    40:"Down", 45:"Insert", 46:"Del",

    //主键盘(非数字小键盘)上的数字键
    48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",

    //字母按键，注意我们不区分大小写
    65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I",
    74:"J", 75:"K", 76:"L", 77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R",
    83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",

    //数字小键盘的数字和标点符号按键(Opera不支持这些)
    96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",
    106:"Multiply",107:"Add",109:"Subtract",110:"Decimal",111:"Divide",

    //功能键
    112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",
    120:"F9",121:"F10",122:"F11",123:"F12",124:"F13",125:"F14",126:"F15",
    127:"F16",128:"F17",129:"F18",130:"F19",131:"F20",132:"F21",133:"F22",
    134:"F23",135:"F24",

    //不需要按下Shift键的标点符号键
    //连字符不兼容，ＦＦ返回的编码和减号一样
    59:";",61:"=",186:";",187:"=",//FF和Opera返回59,61
    188:",", 190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"
};
