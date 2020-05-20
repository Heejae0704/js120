function objectsEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  if (!Object.keys(obj1).every((key) => Object.keys(obj2).includes(key))) {
    return false;
  }
  if (
    !Object.keys(obj1).every((key) => {
      return obj1[key] === obj2[key];
    })
  ) {
    return false;
  }
  return true;
}

console.log(objectsEqual({ a: "foo" }, { a: "foo" })); // true
console.log(objectsEqual({ a: "foo", b: "bar" }, { a: "foo" })); // false
console.log(objectsEqual({}, {})); // true
console.log(objectsEqual({ a: "foo", b: undefined }, { a: "foo", c: 1 })); // false
