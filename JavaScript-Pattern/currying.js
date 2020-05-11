var currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            // return arguments.callee;
        }
    }
};
var cost = (function () {
    var money = 0;
    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();

console.log(cost(100)) // 直接求值

var cost = currying(cost); // 转化成 currying 函数

cost(100); // 未真正求值
cost(200); // 未真正求值
cost(300); // 未真正求值
console.log(cost()); // 求值并输出：600 