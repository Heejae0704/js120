# Test Prep for JS129

## Objects

One of JavaScript's data types containing data as properties of key and value chain. Objects can have properties indicating its states and methods representing its behavior. **Object Oriented Programming** is the paradigm of thinking about problems as a collection of objects that interact with each other.

```javascript
const person = {
  name: "John Smith",
  age: 30,
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};
```

## Object Factories

Object factory is a way of automating the creation of objects that are of similar type. It is one of the possible ways but not necessarily the best one. Good thing about object factory (or factory function) is that you can have private variables using closure, but there are some disadvantages.

- Methods are copied to each object created by the factory function. This is not efficient way of using memory
- You cannot tell if an object is created by which factory function.

```javascript
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    },
  };
}

let john = createPerson("John Smith", 30);
john.greet();
```

## Collaborator

Collaborator objects can modularize the problem into cohesive pieces.

```javascript
let chichi = {
  name: "Chichi",
  age: 3,
  spicies: "cat",
};

let john = {
  name: "John Smith",
  pet: chichi,
};

console.log(john.pet.name);
```

## Constructors and Prototypes

Constructors are the functions used to create an object with a `new` keyword. When the function is invoked with `new` keyword, the following steps happen:

1. It creates an entirely new object
2. It sets the value of `this` for use inside the function to point to the new object
3. It invokes the function. Since this refers to the new object, we use it within the function to set the object's properties and methods
4. Finally, once the function finishs running, `new` returns the new object.

Constructors ususally do not have explicit return value. When it does, if the function is invoked with `new` keyword:

- If the explicit return value is an object, it returns the object
- If the explicit return value is premitive, it returns the object created by `new` keyword and ignore the explicit return value

```javascript
function Person(name. age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log(`Hello! My name is ${this.name} and I'm ${this.age} years old.`);
}
```

## OLOO (Object Linking to Other Object)

```javascript
let personPrototype = {
  greet() {
    console.log(
      `Hello! My name is ${this.name} and I'm ${this.age} years old.`
    );
  },

  init(name, age) {
    this.name = name;
    this.age = age;
    return this;
  },
};

let john = Object.create(personPrototype).init("John Smith", 30);
console.log(john);
```

## ES6 Classes

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    `Hello! My name is ${this.name} and I'm ${this.age} years old.`;
  }
}

let john = new Person("John Smith", 30);
```

## Instance and Static Members

Instances are objects created by a constructor. Instances can access the properties and methods in its prototype chain. This can be possible as the instance's hidden property [[prototype]] is pointing to the prototype property of the contructor function.

Static members are the properties belong to the contructor itself. They are supposed to be called as properties or methods of the constructor, not with its instances.

```javascript
class Person {
  static averageAge = 80;
  static sayWord = function () {
    console.log("word!");
  };

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log("Hello!");
  }
}

let john = new Person("John Smith", 30);
console.log(Person.averageAge);
console.log(Person.sayWord());

console.log(john.name);
console.log(john.greet());
```

## Prototypal inheritance

Objects created with OLOO pattern is actually implementing prototypal inheritance already, because the mechanism of connecting the object's internal [[prototype]] property is pointing to another object, and the object can delegate method calls to that other object.

```javascript
let personPrototype = {
  sayName() {
    console.log(`My name is ${this.name} and I'm ${this.age} old.`);
  },

  init(name, age) {
    this.name = name;
    this.age = age;
    return this;
  },
};

let john = Object.create(personPrototype).init("John Smith", 30);

console.log(john);
```

We can further explore OLOO inheritance pattern like this:

```javascript
let personPrototype = {
  sayName() {
    console.log(`My name is ${this.name} and I'm ${this.age} old.`);
  },

  init(name, age) {
    this.name = name;
    this.age = age;
    return this;
  },
};

let studentPrototype = Object.create(personPrototype);
studentPrototype.init = function (name, age, major) {
  personPrototype.init.call(this, name, age);
  this.major = major;
  return this;
};

let james = Object.create(studentPrototype).init("James Roh", 20, "Math");
console.log(james);
```

## Pseudo-classical inheritance

```javascript
function Person(name. age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log(`Hello! My name is ${this.name} and I'm ${this.age} years old.`);
}

function Student(name, age, major) {
  Person.call(this, name, age);
  this.major = major;
}

Student.prototype = Object.create(Person);
Student.prototype.study = function() { console.log("Studying!")};
Student.prototype.constructor = Student;
```

Above code is almost the same to the below, using ES6 `class` syntax:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(`My name is ${this.name}.`);
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  sayMajor() {
    console.log(`My name is ${this.name} and my major is ${this.major}.`);
  }
}

let james = new Student("James Dean", 20, "Math");
console.log(james);
```

## Encapsulation

In JavaScript, encapsulation means that the Object bundles multiple states and behaviors as an Object with properties and methods. In other languages, encapsulation also involves in hiding the internal values while providing limited interface externally to make some properties private.

## Polymorphism

Having consistancy in the naming of the method so that the invokation of the methods would work in different objects, resulting in appropriate behavior of that context. This can be implemented via inheritance (shadowing methods inherited) and duck-typing (consistancy of method naming among unrelated objects.)

## Mix-ins

As JavaScript objects can inherit from only one other object, the inheritance pattern may not be able to model the real world domains and situations. You can use mix-ins to share behavior between unrelated classes.

```javascript
let SwimmerMixin = {
  swim() {
    console.log("I can swim");
  },
};

class Person {}
class FireFighter {}

Object.assign(FireFighter.prototype, Mixins);
```

## Methods and functions

When a function is called as a property of an object, we call the function a method. When a function is called as a method, the execution context will set `this` to be the object that the function is called upon.

```javascript
let obj = {
  foo: "hello",
  bar: function () {
    console.log(`${this.foo}`);
  },
};

obj.bar(); // function bar is called as a method of 'obj' object. 'this' of the function body is 'obj' here. So the code logs 'hello'
```

However, the execution context will be lost when the method is assigned to a variable:

```javascript
let baz = obj.bar;
baz(); // 'this' is now global object, so the code logs 'undefined'
```

## Higher-order functions

functions that pass in other functions as arguments or return a function.

```javascript
[1, 2, 3].map((el) => el * 2); // map function passes in an annonymous function
```

## The global object

The most outer execution context of JavaScript runtime. functions called without any explicit execution context will have the global object its execution context.

[MDN definition of global object](https://developer.mozilla.org/en-US/docs/Glossary/Global_object)

## Method and property lookup sequence

First in the object and then looking up for prototype chain.

## Function execution context and this

The value of `this` is decided by execution context of the function.

## Implicit and explicit execution context

When a function is called, not as a method of an object, implicit execution context is the global object. When a function is called as a method of an object, `this` binds to the object.

You can use `.call` or `.apply` method to call a function explicitly binding `this` to the first argument of the method.

Or you can also permanently bind `this` to a function by using `.bind` If you do that, binded `this` will not be changed further with `.call` or `.apply`

## Dealing with context loss: call, apply, and bind

Context can be lost when the method is assigned to a variable or passed into an argument. Call, apply and bind usage is explained above.

## Object.assign and Object.create

`Object.create()` creates an empty object. When an object is passed to as an argument, the created object will point the argument object as its prototype, so you can delegate method call to the prototype.

`Object.assign(obj1, obj2)` copies all enumerable own properties from one or more source objects to a target object, and returns the target object. It can be used during mix-in pattern.

## Built-in constructors like Array, Object, String and Number

## Reading OO code

## Precision of language

This code defines a `Dog` class with two methods. The `constructor` method initializes a new `Dog` object, which it does by assigning the instance property `this.name` to the dog's name specified by the argument. The `sayHello` instance method logs a message to the console that includes the dog's name in place of `${this.name}`. The instance method sayHello returns `undefined`.

Make sure you clearly speak about outputs, return value, and object mutations
