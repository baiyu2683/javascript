do{
    var name = prompt("What's your name?");
    var correct = confirm("Your entered '" + name + "'.\n" + "Click Okay to proceed or Cancel to re-enter.");
}while(!correct);
alert("Hello, " + name);
