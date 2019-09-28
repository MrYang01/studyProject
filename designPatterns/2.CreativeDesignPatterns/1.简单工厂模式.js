/*
 * @Author: yangzehong 
 * @Date: 2019-09-01 21:37:46 
 * @Last Modified by: yangzehong
 * @Last Modified time: 2019-09-01 21:57:37
 */

//  简单工厂模式又叫静态工厂方法，由一个工厂对象创建某一类产品对象类的实例，主要用来创建同一类对象

// eg: 工作中的需求
// 1.用户名输入框用户输入不符合规范自定义一个输入框提示
var LoginAlert = function (text) {
    this.content = text
}
LoginAlert.prototype.show = function () {
    // 显示警示框
}
var userNameAlert = new LoginAlert('用户名不能多于16个字符')
userNameAlert.show()
// 2.当用户密码输入错误时也提示
var passwordAlert = new LoginAlert('输入密码不正确')
passwordAlert.show()
// 3.用户登录时用户名不存在提示，且添加一个注册按钮
// 上边的类不能用了，再写一个
var loginConfirm = function (text) {
    this.content = text
}
loginConfirm.prototype.show = function(){
    // 显示确认框
}
var loginFailConfirm = new loginConfirm('您的用户名不存在，请重新输入')
loginFailConfirm.show()
// 4.需求又增加，需要加输入框
var LoginPrompt = function (text) {
    this.content = text
}
LoginPrompt.prototype.show = function () {
    // 显示提示框
}

// 这样会添加很多重复的代码，也会添加很多全局变量

// 用简单工厂模式实现
var createPop = function (type, text) {
    var o = new Object()
    o.content = text
    o.show = function () {
        // 显示方法
    }
    if (type === 'alert') {
        // 警示框差异部分
    }
    if (type === 'confirm') {
        // 确认框差异部分
    }
    if (type === 'prompt') {
        // 提示框差异部分
    }
    return o
}
// 创建警示框
var userNameAlert2 = createPop('alert', '用户名只能是26个字符以内')

// 这种方式很像前边说的寄生式继承
