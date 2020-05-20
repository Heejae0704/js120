let PetPrototype = {
  sleep() {
    console.log("I am sleeping");
  },

  wake() {
    console.log("I am awake");
  },

  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },
};

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake(); // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake(); // I am awake

// Maybe now I need to create a lot of cats...

let CatPrototype = Object.create(PetPrototype);

CatPrototype.init = function (name) {
  PetPrototype.init("Cat", name);
  this.sound = "Meow";
  return this;
};

CatPrototype.cry = function () {
  console.log(this.sound);
};

let silk = Object.create(CatPrototype).init("silk");
silk.sleep();
silk.cry();
