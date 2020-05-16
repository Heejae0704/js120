// let person = {
//   firstName: "Rick ",
//   lastName: "Sanchez",
//   get fullName() {
//     return this.firstName + this.lastName;
//   },
// };

// console.log(person.fullName);

// let franchise = {
//   name: "How to Train Your Dragon",
//   allMovies: function () {
//     return [1, 2, 3].map(function (number) {
//       return this.name + " " + number;
//     }, this);
//   },
// };

// console.log(franchise.allMovies());

function myFilter(array, func, context) {
  let result = [];

  array.forEach(function (value) {
    if (func.call(context, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
};

console.log(
  myFilter(
    [2, 1, 3, 4, 5, 6, 9, 12],
    function (val) {
      return this.allowedValues.indexOf(val) >= 0;
    },
    filter
  )
); // returns [5, 6, 9]
