/*
 * @Author: yangzehong 
 * @Date: 2019-09-01 20:19:05 
 * @Last Modified by: yangzehong
 * @Last Modified time: 2019-09-01 20:37:37
 */

// 多继承

// 单继承 属性复制
var extend = function(target, origin) {
    for (var property in source) {
        target[property] = origin[property]
    }
    return target
}
// 只是一个浅复制，深度克隆此处不写了

// 多继承 属性复制
var mix = function () {
    var i = 1,      // 从第二个参数起为被继承的对象
        len = arguments.length,
        target = arguments[0],
        arg;        // 缓存数组对象
    for (i; i < len; i++) {
        arg = arguments[i]
        for (var property in arg) {
            target[property] = arg[property]
        }
    }
    return target
}

// 绑定到原生对象Object上
Object.prototype.mix = function () {
    var i = 0,      // 从第一个参数起为被继承的对象
        len = arguments.length,
        arg;        // 缓存数组对象
    for (i; i < len; i++) {
        arg = arguments[i]
        for (var property in arg) {
            this[property] = arg[property]
        }
    }
}


// 多态

// 同一种方法多重调用
function add () {
    var arg = arguments
        len = arg.length
    switch(len){
        case 0:
            return 10;
        case 1:
            return 10 + arg[0];
        case 2:
            return arg[0] + arg[1]
    }
}

// 转化为更易懂的类形式
function Add (){
    function zero () {
        return 10
    }
    function one(num){
        return 10 + num
    }
    function two (num1, num2) {
        return num1 + num2
    }
    this.add = function() {
        var arg = arguments,
            len = arg.length
        switch(len) {
            case 0:
                return zero();
            case 1:
                return one(arg[0]);
            case 2:
                return two(arg[0], arg[1])
        }
    }
}
// 实例化类
var A = new Add()

console.log(A.add())        // 10
console.log(A.add(5))       // 15
console.log(A.add(5, 4))    //9


