Function.prototype.uncurrying = function () {
    return (arguments) => {
        const obj = Array.prototype.shift.call(arguments)
        return this.apply(obj, arguments)
    }
}

// 将数组push方法提取出来
const push = Array.prototype.push.uncurrying()

    ; (function () {
        push(arguments, 4)
        console.log(arguments)
    })(1, 2, 3)