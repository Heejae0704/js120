let SwimmerMixin = {
  swim() {
    console.log("I can swim");
  },
};

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(`My name is ${this.name}.`);
  }
}

function Student(name, age, major) {
  Person.call(this, name, age);
  this.major = major;
}

Student.prototype = Object.create(Person);

Student.prototype.sayMajor = function () {
  console.log(`My name is ${this.name} and my major is ${this.major}.`);
};
Student.prototype.constructor = Student;
