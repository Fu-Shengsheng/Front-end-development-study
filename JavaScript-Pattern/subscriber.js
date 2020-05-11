const event = {
    // 订阅者列表
    clientList: [],

    // 订阅者注册方法
    listen: function (key, fn) {
        console.log(this)
        // 如果要存储的标记不存在，则先创建标记列表
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        // 根据标记存储订阅者
        this.clientList[key].push(fn)
    },
    trigger: function () {
        // 获取第一个参数key
        const key = Array.prototype.shift.call(arguments),
            // 根据标记key取出需要通知的订阅者
            fns = this.clientList[key]
        if (!fns || fns.length === 0) {
            return
        }

        // 遍历执行订阅者列表回调
        // 这种写法有点妙，每次取完fn才执行自增
        for (let i = 0, fn; fn = fns[i++];) {
            // 调用订阅回调函数
            fn.apply(this, arguments)
        }
    }
}

// 定义install函数
// 使得订阅功能可以安装到一般对象
function installEvent(obj) {
    for (const key in event) {
        if (event.hasOwnProperty(key)) {
            obj[key] = event[key]
        }
    }
}

// 测试代码
const salesOffices = {}
installEvent(salesOffices)

salesOffices.listen('squareMeter88', function (price) {
    console.log(`价格= ${price}`)
})

salesOffices.listen('squareMeter100', function (price) {
    console.log(`价格= ${price}`)
})

salesOffices.trigger('squareMeter88', 2000000)
salesOffices.trigger('squareMeter100', 3000000)