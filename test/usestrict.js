function testStrict(){
    "use strict"
    return this === undefined;
}
function testNotStrict(){
    return this === undefined;
}
console.log(testStrict());
console.log(testNotStrict());
