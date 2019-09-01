/*
 * @Author: yangzehong 
 * @Date: 2019-09-01 16:55:00 
 * @Last Modified by: yangzehong
 * @Last Modified time: 2019-09-01 19:39:17
 */

// 继承
// 1.子类的原型对象——类式继承
// 类式继承：将第一个类的实例赋值给第二个类的原型
// 声明父类
function SuperClass () {    
    this.superValue = true
}
// 为父类添加公有方法
SuperClass.prototype.getSuperValue = function () {
    return this.superValue
}
// 声明子类
function SubClass () {
    this.subValue = false
}

// 继承父类
SubClass.prototype = new SuperClass()
// 为子类添加公有方法
SubClass.prototype.getSubValue = function () {
    return this.subValue
}

// 类式继承两个缺点：
// （1）如果父类的某一个公有属性是引用类型，一个子类的实例更改子类原型从父类构造函数中继承来的公有属性就会直接影响到其他子类
// （2）由于子类实现的继承是靠其原型prototype对父类的实例化实现的
//     因此在创建父类的时候，是无法向父类传递参数的
// 由此引出构造函数继承

// 添加一个知识点：
// instanceof是通过判断对象的prototype链来判断某个对象是否是某个类的实例

// 2.创建即继承——构造函数式继承
function SuperClass1 (id) {
    this.books = ['js', 'css', 'html']
    this.id = id
}
SuperClass1.prototype.showBooks = function () {
    console.log(this.books)
}
function SubClass1 (id) {
    // 构造函数式继承的精华 
    SuperClass1.call(this, id)
}
var instance1 = new SubClass1(1)
var instance2 = new SubClass1(2)
// 可测试一下，改变子类不会影响到其他子类

// call可以改变函数的作用环境 相当于SuperClass1在此处执行一遍
// 但是由于父类中是给this绑定属性的，而没有涉及到原型prototype
// 所以父类原型的方法无法被子类继承

// 3.结合两者优点——组合继承
// 在子类构造函数中执行父类构造函数，在子类原型上实例化父类就是组合模式
function SuperClass2 (id) {
    this.books = ['js', 'css', 'html']
    this.id = id
}
SuperClass2.prototype.showBooks = function () {
    console.log(this.books)
}

function SubClass2 (id, time) {
    SuperClass2.call(this, id)
    this.time = time // 子类中新增公有属性
}
SubClass2.prototype = new SuperClass2()
SubClass2.prototype.getTime = function () {
    console.log(this.time)
}
// 这种模式在子类的实例中更改父类继承下来的引用类型属性也不会影响到其他子类
// 并且子类实例化过程中又能将参数传递到父类的构造函数中
// 但是这种方式调用了两遍父类构造函数

// 4.洁净的继承者——原型式继承
function inheritObject (o) {
    // 声明一个过渡函数对象
    function F () {}
    // 过渡对象的原型继承父对象
    F.prototype = o
    // 返回过渡对象的一个实例，该实例的原型继承了父对象
    return new F()
}
// 是对类式继承的一个封装，其中的过渡函数就相当于类式继承中的子类
// 跟类式继承一样，父类对象中 值类型的属性被复制，引用类型的属性被共用

// 5.寄生式继承
// 声明基对象
var book = {
    name: 'js book',
    alikeBooks: ['css', 'html']
}
function createBook(obj) {
    // 通过原型式继承方式创建新对象
    var o = new inheritObject(obj)
    // 拓展新对象
    o.getName = function () {
        console.log(name)
    }
    // 返回拓展后的新对象
    return o
}
// 寄生式继承是对原型式继承的第二次封装，并对继承的对象进行了拓展


// 6.终极继承者——寄生组合式继承
// 寄生式继承与构造函数式继承的组合
/** 
 * 寄生式继承 继承原型
 * 传递参数 subClass 子类
 * 传递参数 superClass 父类
 */
function inheritPrototype(subClass, superClass) {
    // 复制一份父类的原型副本保存在变量中
    var p = inheritObject(superClass.prototype)
    // 修正因为重写子类原型导致子类的constructor属性被修改
    p.constructor = subClass
    // 设置子类的原型
    subClass.prototype = p
}

// 测试用例
function SuperClass3 (id) {
    this.books = ['js', 'css', 'html']
    this.id = id
}
SuperClass3.prototype.showBooks = function () {
    console.log(this.books)
}
function SubClass3 (id, time) {
    // 构造函数式继承
    SuperClass3.call(this, id)
    // 子类中新增公有属性
    this.time = time
}
// 寄生式继承父类原型
inheritPrototype(SubClass3, SuperClass3)
SubClass3.prototype.getTime = function () {
    console.log(this.time)
}
// 创建两个测试方法
var instance1 = new SubClass3('js', 2014)
var instance2 = new SubClass3('css', 2013)

instance1.books.push('html')
console.log(instance1.books)
console.log(instance2.books)
instance2.showBooks()
instance2.getTime()
