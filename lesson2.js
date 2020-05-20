let obj = {
  a: "hello",
  b: "world",
  foo: function () {
    let bar = function () {
      console.log(this.a + " " + this.b);
    }.bind(this);

    bar();
  },
};

obj.foo();
