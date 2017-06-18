var Operator = function(){}
Operator.prototype.get = function() {
    return {
        "name":"zhangheng",
    };
};

var operator = new Operator();
console.info(operator.get().name)
