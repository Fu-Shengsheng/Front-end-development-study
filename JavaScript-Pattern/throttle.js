
/**
 * 节流函数
 * 
 * @param {Function} 目标节流函数
 * @param {Number} 节流间隔时间 
 */
function trrottle(fn, interval) {
    let timer = null, firstTime = false
    return function () {
        // 首次执行无需等待
        if (firstTime) {
            fn.apply(this, arguments)
            return firstTime = false
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
                timer = null
            }, interval)
        }
    }
}

function test(params) {
    console.log(`-----${params}-----`)
}

test = trrottle(test, 1000)

setInterval(() => { test('hello') }, 200)