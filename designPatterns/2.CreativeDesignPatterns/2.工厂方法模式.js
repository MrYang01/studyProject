/*
 * @Author: yangzehong 
 * @Date: 2019-09-01 21:59:19 
 * @Last Modified by: yangzehong
 * @Last Modified time: 2019-09-02 20:51:21
 */

//  工厂方法模式（Factory Method）：
//  通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例

// （听着麻烦，其实就是属性用变量设置……）

var Factory = function (type, content) {
    if (this instanceof Factory) {
        var s = new this[type](content)
        return s
    }else {
        return new Factory(type, content)
    }
}
Factory.prototype = {
    Java: function () {},
    JavaScript: function () {},
    UI: function () {}
}

// 这样以后新增类的时候，只需要在原型里新增方法就可以了
