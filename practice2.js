let helperFunctions = {
  getWinningMove(move1, move2) {
    if (move1 === move2) return null;
    if (move1 === "Rock" && (move2 === "Lizard" || move2 === "Scissors"))
      return move1;
    if (move1 === "Paper" && (move2 === "Rock" || move2 === "Spock"))
      return move1;
    if (move1 === "Scissors" && (move2 === "Paper" || move2 === "Lizard"))
      return move1;
    if (move1 === "Spock" && (move2 === "Rock" || move2 === "Scissors"))
      return move1;
    if (move1 === "Lizard" && (move2 === "Paper" || move2 === "Spock"))
      return move1;
    return move2;
  },
};

console.log(helperFunctions.getWinningMove("Rock", "Lizard"));

let history = [
  {
    human: "Rock",
    computer: "Paper",
    winner: "human",
  },
  {
    human: "Rock",
    computer: "Paper",
    winner: "computer",
  },
  {
    human: "Rock",
    computer: "Paper",
    winner: null,
  },
  {
    human: "Rock",
    computer: "Paper",
    winner: null,
  },
  {
    human: "Rock",
    computer: "Lizard",
    winner: "human",
  },
  {
    human: "Scissor",
    computer: "Rock",
    winner: "computer",
  },
  {
    human: "Lizard",
    computer: "Spock",
    winner: "human",
  },
  {
    human: "Rock",
    computer: "Spock",
    winner: "computer",
  },
  {
    human: "Paper",
    computer: "Scissor",
    winner: "computer",
  },
  {
    human: "Paper",
    computer: "Spock",
    winner: "human",
  },
  {
    human: "Paper",
    computer: "Spock",
    winner: "human",
  },
  {
    human: "Paper",
    computer: "Spock",
    winner: "human",
  },
];

// For each move, calculate the winning rate of human

function humanWinningRate(computerMove) {
  let roundsWithSelectedMove = history.filter(
    (round) => round.computer === computerMove
  );
  let numberOfRounds = roundsWithSelectedMove.length;
  if (!numberOfRounds) return 0;
  let numberOfHumanWonRounds = roundsWithSelectedMove.filter(
    (round) => round.winner === "human"
  ).length;
  let humanWinningRate = numberOfHumanWonRounds / numberOfRounds;
  return humanWinningRate;
}

let humanWinRateObj = {};
["Rock", "Scissors", "Paper", "Lizard", "Spock"].forEach((computerMove) => {
  humanWinRateObj[computerMove] = humanWinningRate(computerMove);
});
console.log(humanWinRateObj);

function weightedRand2(spec) {
  var i,
    sum = 0,
    r = Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}
weightedRand2({ 0: 0.8, 1: 0.1, 2: 0.1 });

// get the history of the game and store that in game object
// for every 10 turns,
// reset the percentage,
// then, analyze the results to descrease the percentage by 10 percent
// for those moves that yields more than 60% human winning rate
