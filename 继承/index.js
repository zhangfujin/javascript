//第一种：原型链继承
function SuperType() {
    this.colors = ['red', 'blue', 'green'];
}

function SubType() {
}

SubType.prototype = new SuperType();

const instance1 = new SubType();
instance1.colors.push('black');

console.log(instance1.colors);  //['red', 'blue', 'green', 'black']

const instance2 = new SubType();
console.log(instance2.colors);  //['red', 'blue', 'green', 'black']
// 缺点：多个实例对引用类型的操作会被篡改
//==============================================================================================


//第二种：借用构造函数继承
function SupperType2() {
    this.colors = ['red', 'blue', 'green'];
    this.addColor = function (color) {
        this.colors.push(color)
    }

}

SupperType2.prototype.getColors = function () {
    return this.colors;
}

function SubType2() {
    SupperType2.call(this)
}

const instance2_1 = new SubType2();
instance2_1.colors.push('yyy')
const instance2_2 = new SubType2();
console.log('instance2_1::', instance2_1)
console.log('instance2_2::', instance2_2)
// 缺点：1、每创建一个实例都会调用SupperType2构造函数，即每个实例都会将SupperType2属性或方法复制一份
// 缺点：2、只能继承父类的属性或方法（因为复制的原因），访问不到父类原型的方法
//==============================================================================================


// //第三种：组合式继承（第一种和第二种的结合）
function SupperType3(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SupperType3.prototype.sayName = function () {
    return this.name;
}

function SubType3(name, age) {
    SupperType3.call(this, name);
    this.age = age;
}

SubType3.prototype = new SupperType3();
SubType3.prototype.constructor = SubType3;
SubType3.prototype.sayAge = function () {
    console.log(this.age);
};
const instance3_1 = new SubType3("Nicholas", 29);
instance3_1.colors.push("black");

const instance3_2 = new SubType3("Greg", 27);
instance3_2.colors.push("yyy");

console.log('instance3_1::', instance3_1)
console.log('instance3_2::', instance3_2)

// 缺点：1、第一次调用SuperType()：给SubType.prototype写入两个属性name，color
// 缺点：2、第二次调用SuperType()：给instance1写入两个属性name，color
// 实例对象instance1上的两个属性就屏蔽了其原型对象SubType.prototype的两个同名属性。
// 所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法缺点：
//==============================================================================================

//
// //第四种-原型式继承
// //ES5 里面的 Object.create 方法，这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象
// // Object.create 方法是可以为一些对象实现浅拷贝的
const parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function () {
        return this.name;
    }
};
const person4 = Object.create(parent4);
person4.name = 'tome';
person4.friends.push('jerry')

const person4_2 = Object.create(parent4);
person4_2.friends.push('lucy');

console.log('person4', person4)
console.log('person4_2', person4_2)
// // 缺点：1、引用数据存在篡改的可能
// //==============================================================================================
//
//
// //第五种：寄生式继承，在第四种中增加方法
let parent5 = {
    name: "parent5",
    friends: ["p1", "p2", "p3"],
    getName: function () {
        return this.name;
    }
};

function clone(original) {
    let clone = Object.create(original);
    clone.getFriends = function () {
        return this.friends;
    };
    return clone;
}

let person5_1 = clone(parent5);
person5_1.friends.push('211')
let person5_2 = clone(parent5);

console.log('person5_1::', person5_1);
console.log('person5_2::', person5_2);

// // 缺点：1、引用数据存在篡改的可能
// //==============================================================================================
//
//
// //第六种：寄生组合式继承
function Extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

function Parent6() {
    this.name = 'parent6';
    this.play = [1, 2, 3];
}

Parent6.prototype.getName = function () {
    return this.name;
}

function Child6() {
    Parent6.call(this);
    this.friends = 'child5';
}

Extends(Child6, Parent6);

Child6.prototype.getFriends = function () {
    return this.friends;
}

const person6 = new Child6();
console.log('person6::', person6);

class Parent {
    constructor(name) {
        this.name = name;
    }
    getName = () => {
        return this.name;
    }
}
class Child extends Parent {
    constructor(name) {
        super(name);
        this.age = 1
    }
}
console.log(new Child('12'))



