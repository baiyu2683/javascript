function convert(x){
    switch(typeof x){
    case "undefined":
        return "undefined";
    case "string":
        return "'" + x + "'";
    case "number":
        return x.toString(16);
    }
}
