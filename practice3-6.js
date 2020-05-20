function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function () {
  return this.radius * this.radius * Math.PI;
};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty("area")); // => false

function Ninja() {
  this.swung = false;
}

Ninja.prototype.swing = function () {
  this.swung = true;
  return this;
};
// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung); // logs `true`
console.log(ninjaB.swing().swung); // logs `true`
