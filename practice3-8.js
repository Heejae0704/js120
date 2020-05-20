function Greeting() {}

Greeting.prototype.greet = function (message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function () {
  this.greet("Hello!");
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function () {
  this.greet("Goodbye");
};

// case1: Hello!
// case2: Error
// case3: undefined
// case4: Goodbye!
// Error: hi is not a function

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }
  this.first = first;
  this.last = last;
  this.name = first + " " + last;
}

let name = "Jane Doe";
let user1 = new User("John", "Doe");
let user2 = User("John", "Doe");

console.log(name); // => Jane Doe
console.log(user1.name); // => John Doe
console.log(user2.name); // => John Doe
