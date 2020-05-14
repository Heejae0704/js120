const readline = require('readline-sync');
const GAME_STATUS = {
  deck: [],
  playerHand: [],
  dealerHand: []
};

function prompt(text) {
  console.log(`=> ${text}`);
}

function initiateDeck() {
  const symbols = ['Heart', 'Spade', 'Diamond', 'Club'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  symbols.forEach(symbol => {
    ranks.forEach(rank => {
      GAME_STATUS.deck.push([symbol, rank]);
    });
  });
  return null;
}

function shuffleDeck() {
  for (let index = GAME_STATUS.deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); //0 to index
    [GAME_STATUS.deck[index], GAME_STATUS.deck[otherIndex]] =
    [GAME_STATUS.deck[otherIndex], GAME_STATUS.deck[index]];
  }
}

function calcNum(handsArr) {
  const rankArr = handsArr.map(el => el[1]);
  const aceArr = rankArr.filter(el => el === 'Ace');
  let otherNumSum = rankArr.filter(el => el !== 'Ace')
    .map(el => {
      if (['Jack', 'Queen', 'King'].includes(el)) return 10;
      return Number(el);
    })
    .reduce((accu, curr) => {
      accu += curr;
      return accu;
    }, 0);
  if (aceArr.length >= 1) {
    otherNumSum += aceArr.length - 1; // More than one Ace cards will be treated as 1
    if (otherNumSum <= 10) return otherNumSum + 11;
    return otherNumSum + 1;
  }
  return otherNumSum;
}

function dealCard() {
  return GAME_STATUS.deck.shift();
}

function returnValidChoice(promptMessage, choiceArr) {
  let choice;
  do {
    prompt(promptMessage);
    choice = readline.question().trim()[0].toLowerCase();
    if (choiceArr.includes(choice)) return choice;
    prompt("Sorry, that's not a valid choice");
  } while (true);
}

function busted(hand) {
  return calcNum(hand) > 21;
}

function playerTurn() {
  while (true) {
    let answer = returnValidChoice('(H)it or (S)tay?', ['h', 's']);
    if (answer === 's') break;
    GAME_STATUS.playerHand.unshift(dealCard());
    showCards("playerHand");
    if (busted(GAME_STATUS.playerHand)) break;
  }
  if (busted(GAME_STATUS.playerHand)) {
    console.log("You are busted!");
    console.log("Dealer won the game"); // do something
  } else {
    console.log(""); // you chose to stay!
  }
}

function dealerTurn() {
  while (true) {
    if (calcNum(GAME_STATUS.dealerHand) >= 17) break;
    GAME_STATUS.dealerHand.unshift(dealCard());
    if (busted(GAME_STATUS.dealerHand)) break;
  }
  if (busted(GAME_STATUS.dealerHand)) {
    showCards("dealerHand", true);
    console.log("Dealer is busted!!");
    console.log("Yon won the game");
  } else {
    showCards("dealerHand", true);
  }
}

function initiateGame() {
  console.clear();
  initiateDeck();
  shuffleDeck();
  GAME_STATUS.playerHand.length = 0;
  GAME_STATUS.dealerHand.length = 0;
  GAME_STATUS.playerHand.push(dealCard());
  GAME_STATUS.dealerHand.push(dealCard());
  GAME_STATUS.playerHand.push(dealCard());
  GAME_STATUS.dealerHand.push(dealCard());
}

function compareCards() {
  let winner;
  if (calcNum(GAME_STATUS.playerHand) > calcNum(GAME_STATUS.dealerHand)) {
    winner = 'Player';
  } else if (
    calcNum(GAME_STATUS.dealerHand) > calcNum(GAME_STATUS.playerHand)
    ) {
    winner = 'Dealer';
  } else winner = null;
  return winner;
}

function declareWinner(winner) {
  console.log("The sum of player's cards: " + calcNum(GAME_STATUS.playerHand));
  console.log("The sum of dealer's cards: " + calcNum(GAME_STATUS.dealerHand));
  if (winner) {
    console.log(`${winner} won the game!`);
  } else {
    console.log("The game is tie!");
  }
}

function showCards(hand, isAll = false) {
  const numArr = GAME_STATUS[hand].map(set => set[1]);
  let cardStr = "";
  for (let idx = 0; idx < numArr.length; idx++) {
    if (idx === numArr.length - 1) {
      if (hand === 'playerHand' || isAll) {
        cardStr = cardStr + "and " + numArr[idx];
      } else {
        cardStr += "and an unknown card";
      }
    } else {
      cardStr = numArr[idx] + ", " + cardStr;
    }
  }
  if (hand === 'playerHand') {
    console.log("Player has: " + cardStr);
  } else console.log("Dealer has: " + cardStr);
}

function init() {
  while (true) {
    while (true) {
      initiateGame();
      console.log("Dealer has: " + GAME_STATUS.dealerHand[0][1] + " and unknown card");
      console.log("Player has: " + GAME_STATUS.playerHand.map(set => set[1]).join(" and "));
      playerTurn();
      if (busted(GAME_STATUS.playerHand)) break;
      dealerTurn();
      if (busted(GAME_STATUS.dealerHand)) break;
      let winner = compareCards();
      declareWinner(winner);
      break;
    }
    let answer = returnValidChoice('Play again? (Y)es / (N)o', ['y', 'n']);
    if (answer === 'n') break;
  }
  return null;
}

init();