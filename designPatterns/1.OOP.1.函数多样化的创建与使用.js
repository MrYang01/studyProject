/*
 * @Author: yangzehong 
 * @Date: 2019-08-31 22:23:32 
 * @Last Modified by: yangzehong
 * @Last Modified time: 2019-09-01 12:19:38
 */

//  OOP(Onject-oriented programming) 面向对象编程 1.1

// 从一个最简单的功能开始，验证表单
function checkName () {
    // 验证姓名
}
function checkEmail () {
    // 验证邮箱
}
function checkPassword () {
    // 验证密码
}

// 缺点：创建了很多全局变量（函数也是变量）
// 团队开发为了不影响他人，可能变量覆盖，可以把他们放一个变量里保存

// 用对象收编变量
let checkObject = {
    checkName: function () {},
    checkEmail: function () {},
    checkPassword: function () {}
}

checkObject.checkEmail() // 调用

// 对象的另一种形式
let CheckObject1 = function (){};
CheckObject1.checkName = function () {}
CheckObject1.checkEmail = function () {}
CheckObject1.checkPassword = function () {}

// 真假对象
let CheckObject2 = function () {
    return {
        checkName: function () {},
        checkEmail: function () {},
        checkPassword: function () {}
    }
}

let a = CheckObject2();
a.checkEmail();

// 类的方式
let CheckObject3 = function () {
    this.checkName = function () {}
    this.checkEmail = function () {}
    this.checkPassword = function () {}
}
// 既然是一个类，就需要用new创建
let b = new CheckObject3()
b.checkEmail()

// 检测类
let CheckObject4 = function () {}
CheckObject4.prototype = {
    checkName: function () {},
    checkEmail: function () {},
    checkPassword: function () {}
}
let c1 = new CheckObject4()
c1.checkEmail()
c1.checkName()
c1.checkPassword()   // 调用得写三次

// 链式调用
CheckObject4.prototype = {
    checkName: function () {
        // ...
        return this
    },
    checkEmail: function () {
        // ...
        return this
    },
    checkPassword: function () {
        // ...
        return this
    }
}
let c2 = new CheckObject4()
c2.checkEmail()
    .checkName()
    .checkPassword()   // 实现链式调用

// 有个prototype.js框架，对原生对象Function、Array、Object等进行了拓展
// 可以把这几个函数都写在原生对象的prototype中
// 但相应的也污染了原生对象，造成不必要的开销

// 更优雅的写法  （函数式调用方式）
Function.prototype.addMethod = function (name, fn) {
    this[name] = fn
}

let methods = function () {}
methods.addMethod('checkName', function () {
    // ...
})
methods.addMethod('checkEmail', function () {
    // ...
    return this     // 同样加return this可以实现链式调用
})
methods.checkName()
methods.checkEmail()

// （类式调用方式）
Function.prototype.addMethod = function (name, fn) {
    this.prototype[name] = fn
}
var Methods = function () {}
Methods.addMethod('checkName', function () {
    // ...
})
Methods.addMethod('checkEmail', function () {
    // ...
})
// 此时创建对象需要用new
let m = new Methods()
m.checkEmail()



// end: 
// 用三个函数去实现，是一种面向过程的实现方式
// 会无端在页面添加了很多全局变量，而且不利于别人重复使用

// 我们在团队开发过程中，应该接受另一种编程风格——面向对象编程
// 即下边一节所讲述的内容