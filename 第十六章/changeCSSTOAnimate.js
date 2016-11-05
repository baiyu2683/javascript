//将e转化为相对定位的元素，使之左右震动
//e:对象或者元素id
//oncomplete:动画完成后执行的函数
//distance: 震动距离，默认5px
//time:震动频率，默认500ms
function shake(e, oncomplete, distance, time){
    if(typeof e === "string") e = document.getElementById(e);
    if(!time) time = 500;
    if(!distance) distance = 5;

    var originalStyle = e.style.cssText; //保存原有的css样式
    e.style.position = "relative";   //改为相对定位
    var start = (new Date()).getTime();
    animate();

    function animate(){
        var now = (new Date()).getTime();
        var elapsed = now-start;
        var fraction = elapsed/time;

        if(fraction < 1){
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";

            setTimeout(animate, Math.min(25, time-elapsed));
        }
        else{
            e.style.cssText = originalStyle;
            if(oncomplete) oncomplete(e);   //动画完成后执行的函数
        }
    }
}

function fadeOut(e, oncomplete, time){
    if(typeof e === "string") e = document.getElementById(e);
    if(!time) time = 500;
    //高端的数学函数。。。
    var ease = Math.sqrt;

    var start = (new Date()).getTime();
    animate();

    function animate(){
        var elapsed = (new Date()).getTime()-start;
        var fraction = elapsed/time;
        if(fraction < 1){
            var opacity = 1 - ease(fraction);
            e.style.opacity = String(opacity);
            setTimeout(animate, Math.min(25, time-elapsed));
        }
        else {
            e.style.opacity = "0";
            if(oncomplete) oncomplete(e);
        }
    }
}
