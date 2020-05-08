// specific probability

function weightedRandom(prob) {
  let i, sum=0, r=Math.random();
  for (i in prob) {
    sum += prob[i];
    if (r <= sum) return i;
  }
}

let result = weightedRandom({0:0.6, 1:0.1, 2:0.1, 3:0.2});

console.log(result);

