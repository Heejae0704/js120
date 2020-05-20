let turk = {
  firstName: "Christopher",
  lastName: "Turk",
  occupation: "Surgeon",
  getDescription() {
    return (
      this.firstName + " " + this.lastName + " is a " + this.occupation + "."
    );
  },
};

const getTurkDescription = turk.getDescription.bind(turk);

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

let foo = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  },
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a);
