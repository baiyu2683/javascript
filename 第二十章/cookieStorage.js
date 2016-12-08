/**
 * 实现像localStorge和sessionStorge的api
 */
function getStorage(maxage, path) {
    //获取一个存储全部cookie信息的对象
    var cookie = (function(){
        var cookie = {};
        var all = document.cookie;
        if(all === "") {
            return cookie;
        }
        var list = all.split("; ");
        for(var i = 0, len = list.length; i < len; i++) {
            var cookieTmp = list[i];
            var p = cookieTmp.indexOf("=");
            var name = cookieTmp.substring(0, p);
            var value = cookieTmp.substring(p+1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    })();

    //将所有cookie的名字存储到一个数组中
    var keys = [];
    for(var key in cookie) keys.push(key);

    //现在定义存储API公共的属性和方法
    //存储的cookie的个数
    this.length = keys.length;

    //返回第n个cookie的名字，如果n越界则返回null
    this.key = function(n) {
        if(n < 0 || n >= keys.length) return null;
        return keys[n];
    };

    this.getItem = function(name) {
        return cookie[name] || null;
    };

    this.setItem = function(key, value) {
        if(!(key in cookie)) {
            keys.push(key);
            this.length++;
        }

        cookie[key] = value;

        var cookie = key + "=" + encodeURIComponent(value);

        if(maxage) cookie += "; max-age=" + maxage;
        if(path) cookie += "; path=" + path;

        document.cookie = cookie;
    };

    this.removeItem = function(key) {
        if(!(key in cookie)) return;

        delete cookie[key];

        for(var i = 0; i < keys.length; i++) {
            if(keys[i] === key) {
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;

        document.cookie = key + "=; max-age=0";
    };

    this.clear = function() {
        for(var i = 0; i < keys.lenght; i++) {
            document.cookie = keys[i] +"=; max-age=0";
        }
        cookie = [];
        keys = [];
        this.lenght = 0;
    };
}
