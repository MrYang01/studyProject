/*
 * @Author: yangzehong 
 * @Date: 2019-09-01 12:25:59 
 * @Last Modified by: yangzehong
 * @Last Modified time: 2019-09-01 20:41:10
 */

//  面向对象编程

// 此小节讲封装

//  创建一个类（习惯首字母大写）
// 1.在函数（类）内部通过this变量添加属性或者方法来实现对类添加属性或方法
let Book = function (id, bookname, price) {
    this.id = id
    this.bookname = bookname
    this.price = price
}
// 2.通过在类的原型是上添加属性和方法
Book.prototype.display = function() {
    // 展示这本书
}
// 两种方式的区别：
// 通过this定义的属性或方法是该对象自身拥有的，
//     每次通过类创建一个新对象时，this指向的对象和属性都会得到相应的创建
// 通过prototype继承的属性或方法是每个对象通过prototype访问到
//     每次通过类创建时这些属性和方法不会再次创建

// 使用的时候，需要用new来创建
let book = new Book(10, 'OOP', 50);
console.log(book.bookname)  // OOP

// constructor 指向拥有整个原型对象的函数或者对象
//     此处我理解为指向实例


// 属性和方法封装
// 私有属性、私有方法、特权方法、共有属性、共有方法、构造器等
let Book1 = function (id, bookname, price) {
    // 私有属性
    let num = 1
    // 私有方法
    function checkId () {}
    // 特权方法：共有、私有的属性方法都能访问到
    this.getName = function () {}
    this.getPrice = function () {}
    this.setName = function () {}
    this.setPricr = function () {}
    // 对象共有属性
    this.id = id
    // 对象共有方法
    this.copy = function(){}
    // 构造器：在创建对象时调用的特权方法
    this.setName(name)
    this.setPrice(price)
}

// 类静态共有属性（对象并不能访问）
Book1.isChinese = true
// 类静态共有方法（对象不能访问）
Book1.resetTime = function () {
    console.log("new Time")
}
Book1.prototype = {
    // 共有属性
    isJSBook: true,
    // 共有方法
    display: function () {}
}

// 类的私有属性以及静态共有属性在新创建的对象里访问不到
// 共有属性可以通过点语法获取到

// 闭包实现
// 闭包是有权访问另外一个函数作用域中变量的函数
//     即在一个函数内部创建另外一个函数
//     我们将这个闭包作为创建对象的构造函数

// 利用闭包实现
let Book2 = (function() {
    // 静态私有变量
    let bookNum = 0
    // 静态私有方法
    function checkBook (name) {}
    // 创建类
    function _book (newId, newName, newPrice) {
        // 私有属性
        let name, price
        // 私有方法
        function checkId () {}
        // 特权方法
        this.getName = function () {}
        this.getPrice = function () {}
        this.setName = function () {}
        this.setPricr = function () {}
        // 共有属性
        this.id = id
        // 共有方法
        this.copy = function () {}

        bookNum ++
        if(bookNum > 100) {
            throw new Error('我们仅出版100本书');
        }
        // 构造器：在创建对象时调用的特权方法
        this.setName(name)
        this.setPrice(price)
    }
    // 构建原型
    _book.prototype = {
        // 静态公有属性
        isJSBook: true,
        // 静态公有方法
        display: function () {}
    }
    return _book
})

// 创建对象的安全模式

// 有时候会经常忘记使用new创建
// new关键字的作用可以看做是对当前对象的this不停的赋值
// 忘记使用new时 会直接执行这个函数，在全局作用域中执行，所以函数内部属性都会挂载到window上
// let book = Book2('', '', '')
// 而book是要得到Book2的执行结果即返回值，没return就会得到undefined
let Book3 = function (title, time, price) {
    // 判断执行过程中this是否是当前这份对象，是的话就是new创建的
    if (this instanceof Book3) {
        // ...
    } else {
        return new Book2(title, time, price)
    }
}
