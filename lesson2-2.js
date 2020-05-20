function repeatThreeTimes(func) {
  func();
  func();
  func();
}

let john = {
  firstName: "John",
  lastName: "Doe",
  greetings: function () {
    repeatThreeTimes(
      function () {
        console.log("hello " + this.firstName + " " + this.lastName);
      }.bind(this)
    );
  },
};

john.greetings();
