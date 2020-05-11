/**
 * 分时函数，将瞬间完成的大量工作改为一段时间内分批次执行
 * 
 * @param {any} array 
 * @param {any} fn 
 * @param {any} count 
 * @param {any} interval 
 */
function timeChunk(array = [], fn, count = 1, interval = 1000) {
    // 每批次执行的内容
    function start() {
        const chunkLength = Math.min(array.length, count)
        for (let index = 0; index < chunkLength; index++) {
            const element = array.shift();
            fn(element)
        }
    }

    return function () {
        // 分批执行
        let t = setInterval(() => {
            if (array.length == 0) {
                clearInterval(t)
            }

            start()
        }, interval)
    }
}

function test(params) {
    console.log(`-----${params}-----`)
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

timeChunk(arr, test, 2, 1000)()