function clearAllCookies() {
    var cookies = document.cookie;
    var cookieArr = cookies.split("; ");
    for(var i in cookieArr) {
        var currentCookie = cookieArr[i];
        var name = currentCookie.substring(0, currentCookie.indexOf("="));
        var change = name + "=; max-age=0";
        document.cookie = change;
    }
}
