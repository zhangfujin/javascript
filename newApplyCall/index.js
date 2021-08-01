function Person() {
    this.name = 'Jack';
}

const p = new Person();
console.log("普通构造函数的new：", p);


function Person1() {
    this.name = 'Jack';
    return {age: 18}
}

//当构造函数最后 return 出来的是一个和 this 无关的对象时，new 命令会直接返回这个新对象，
// 而不是通过 new 执行步骤生成的 this 对象


const p1 = new Person1();
console.log("构造函数返回一个对象的new：", p1);


function Person2() {
    this.name = 'Jack';
    return 'tom';
}

const p2 = new Person2();
console.log("构造函数返回一个string：", p2);

// 总结一下：
// new 关键词执行之后总是会返回一个对象，要么是实例对象，
// 要么是 return 语句指定的对象。
//================================================================================================================================


// ###:过程
// 创建一个新对象；
// 将构造函数的作用域赋给新对象（this 指向新对象）；
// 执行构造函数中的代码（为这个新对象添加属性）；
// 返回新对象
function _new(ctor, ...args) {
    if(typeof ctor !== 'function') {
        throw 'ctor must be a function';
    }
    const obj = new Object({});
    obj.__proto__ =  Object.create(ctor.prototype);
    const res = ctor.apply(obj,  [...args]);
    const isObject = typeof res === 'object' && res !== null;
    const isFunction = typeof res === 'function';
    return isObject || isFunction ? res : obj;
}

const p3 = _new(Person);
console.log(p3)