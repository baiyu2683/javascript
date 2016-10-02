//chrominu中测试
//此方法获得的box是确定的，不会再页面上元素位置变化时动态变化，仅是静态快照

var box = e.getBoundingClientRect();

var offsets = getScrollOffsets(); //之前定义的函数

var x = box.left + offsets.x;
var y = box.top + offsets.y;



//getBoundingClientRect()返回的坐标包含元素的边框和内边距，不包含外边距
//如果元素换行，也只返回一个边界矩形，包含所有的元素
//getClientRects()在元素换行是返回一个类数组对象，包含一个矩形列表
