const button = document.querySelector(".button");
const result = document.querySelector(".result");
const reset = document.querySelector(".reset")

button.addEventListener("click", function(event) {
  const number = Math.floor(Math.random() * 6) + 1;
  result.innerHTML = `${number}`
})

reset.addEventListener("click", function(event) {
  result.innerHTML = "-"
})

console.log(button);