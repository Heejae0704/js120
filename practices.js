class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model);
    this.wheels = 4;
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model);
    this.wheels = 2;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.wheels = 6;
    this.payload = payload;
  }
}

// class Animal {
//   constructor(name, age, legs, species, status) {
//     this.name = name;
//     this.age = age;
//     this.legs = legs;
//     this.species = species;
//     this.status = status;
//   }
//   introduce() {
//     return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
//   }
// }

// class Cat extends Animal {
//   constructor(name, age, status) {
//     super(name, age, 4, "cat", status);
//   }

//   introduce() {
//     return super.introduce() + " Meow meow!";
//   }
// }

// class Dog extends Animal {
//   constructor(name, age, status, master) {
//     super(name, age, 4, "dog", status);
//     this.master = master;
//   }

//   greetMaster() {
//     return `Hello ${this.master}! Woof, woof!`;
//   }
// }

// let cat = new Cat("Pepe", 2, "happy");
// console.log(
//   cat.introduce() ===
//     "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!"
// );
// logs true

// class Rectangle {
//   constructor(width, length) {
//     this.width = width;
//     this.length = length;
//   }

//   getWidth() {
//     return this.width;
//   }

//   getLength() {
//     return this.length;
//   }

//   getArea() {
//     return this.width * this.length;
//   }
// }

// class Square extends Rectangle {
//   constructor(side) {
//     super(side, side);
//   }
// }

// let square = new Square(5);
// console.log(`area of square = ${square.getArea()}`); // area of square = 25

// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, fur) {
//     super(name, age);
//     this.fur = fur;
//   }

//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.fur} fur.`;
//   }
// }

// let pudding = new Cat("Pudding", 7, "black and white");
// let butterscotch = new Cat("Butterscotch", 10, "tan and white");

// console.log(pudding.info());
// console.log(butterscotch.info());
