//第一种：原型链继承

function SuperType(){
    this.colors = ['red', 'blue', 'green'];
}

function SubType(){}
SubType.prototype = new SuperType();

const instance1 = new SubType();
instance1.colors.push('black');

console.log(instance1.colors);  //['red', 'blue', 'green', 'black']

const instance2 = new SubType();
console.log(instance2.colors);  //['red', 'blue', 'green', 'black']

// 缺点：多个实例对引用类型的操作会被篡改
//==============================================================================================

//第二种：借用构造函数继承

