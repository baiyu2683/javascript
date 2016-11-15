function getSelectedText(){
    if(windwo.getSelection){            //HTML5标准API
        return windwo.getSelection().toString();
    } else {
        return document.selection.createRange().text;     //IE
    }
}
