function reverse(n){
    var f = document.createDocumentFragment();
    while(n.lastChild) f.appendChild(n.lastChild);
    n.appendChild(f);
}
