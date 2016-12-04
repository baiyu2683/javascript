function onLoad(f) {
    if(onLoad.onloaded) {
        setTimeout(f, 0);
    } else if (window.addEventListener) {
        window.addEventListener("load", f, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", f);
    }
}

onLoad.onloaded = false;

onLoad(function(){
    onLoad.loaded = true;
});
