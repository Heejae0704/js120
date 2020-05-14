const readline = require("readline-sync");

class Deck {
  static SYMBOLS = ["Heart", "Spade", "Diamond", "Club"];
  static RANKS = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];

  constructor() {
    this.cardSet = [];
    Deck.SYMBOLS.forEach((symbol) => {
      Deck.RANKS.forEach((rank) => {
        this.cardSet.push([symbol, rank]);
      });
    });
  }

  shuffle() {
    for (let index = this.cardSet.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1));
      [this.cardSet[index], this.cardSet[otherIndex]] = [
        this.cardSet[otherIndex],
        this.cardSet[index],
      ];
    }
  }

  deal() {
    return this.cardSet.shift();
  }
}

class Participant {
  constructor() {
    this.hand = [];
    this.money = 5;
  }

  getCard(card) {
    this.hand.push(card);
  }

  calcPoint() {
    const rankArr = this.hand.map((el) => el[1]);
    const aceArr = rankArr.filter((el) => el === "Ace");
    let otherNumSum = rankArr
      .filter((el) => el !== "Ace")
      .map((el) => {
        if (["Jack", "Queen", "King"].includes(el)) return 10;
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

  isBusted() {
    return this.calcPoint() > 21;
  }
}

class Player extends Participant {
  constructor() {
    super();
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.displayWelcomeMessage();
    while (true) {
      this.dealCards();
      this.showCards();
      this.playerTurn();
      if (!this.player.isBusted()) this.dealerTurn();
      if (!this.player.isBusted() && !this.dealer.isBusted()) {
        this.displayResult();
      }
      if (this.player.money === 0) {
        console.log("");
        console.log("You lost all your money!");
        break;
      }
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  }

  dealCards() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.player.hand = [];
    this.dealer.hand = [];
    this.dealer.hidden = true;
    this.player.getCard(this.deck.deal());
    this.dealer.getCard(this.deck.deal());
    this.player.getCard(this.deck.deal());
    this.dealer.getCard(this.deck.deal());
  }

  showDealerHands() {
    console.log("---------------");
    console.log("dealer's hand: ");
    console.log("---------------");
    if (this.dealer.hidden) {
      console.log("< Hidden Card >");
    } else {
      console.log(`${this.dealer.hand[0][1]} of ${this.dealer.hand[0][0]}`);
    }
    for (let idx = 1; idx < this.dealer.hand.length; idx++) {
      console.log(`${this.dealer.hand[idx][1]} of ${this.dealer.hand[idx][0]}`);
    }
  }

  showPlayerHands() {
    console.log("---------------");
    console.log("player's hand: ");
    console.log("---------------");
    for (let idx = 0; idx < this.player.hand.length; idx++) {
      console.log(`${this.player.hand[idx][1]} of ${this.player.hand[idx][0]}`);
    }
  }

  showCards() {
    console.clear();
    console.log(`player has ${this.player.money} dollars`);
    this.showDealerHands();
    this.showPlayerHands();
  }

  returnValidChoice(promptMessage, choiceArr) {
    let choice;
    do {
      console.log(promptMessage);
      choice = readline.question();
      if (choice) choice = choice.trim()[0].toLowerCase();
      if (choiceArr.includes(choice)) return choice;
      console.log("Sorry, that's not a valid choice");
    } while (true);
  }

  playAgain() {
    console.log("");
    let answer = this.returnValidChoice("Play again? (Y/N)", ["y", "n"]);
    if (answer === "y") return true;
    return false;
  }

  playerTurn() {
    while (true) {
      let answer = this.returnValidChoice("(H)it or (S)tay?", ["h", "s"]);
      if (answer === "s") break;
      this.player.getCard(this.deck.deal());
      this.showCards();
      if (this.player.isBusted()) break;
    }
    if (this.player.isBusted()) {
      this.player.money--;
      this.showCards();
      console.log("");
      console.log("You are busted!");
      console.log("Dealer won the game");
    } else {
      console.log(""); // you chose to stay!
    }
  }

  dealerTurn() {
    while (true) {
      if (this.dealer.calcPoint() >= 17) break;
      this.dealer.getCard(this.deck.deal());
      if (this.dealer.isBusted()) break;
    }
    if (this.dealer.isBusted()) {
      this.player.money++;
      this.dealer.reveal();
      this.showCards();
      console.log("");
      console.log("Dealer is busted!!");
      console.log("Yon won the game");
    } else {
      this.dealer.reveal();
      this.showCards();
    }
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to twentyone game!");
    console.log("--------------------------");
    readline.question("Press any key to start!");
  }

  displayGoodbyeMessage() {
    console.log("");
    console.log("Thanks for playing twentyone game. Good bye!");
  }

  compareCards() {
    let winner;
    const playerPoint = this.player.calcPoint();
    const dealerPoint = this.dealer.calcPoint();
    if (playerPoint > dealerPoint) {
      winner = "Player";
      this.player.money++;
    } else if (dealerPoint > playerPoint) {
      winner = "Dealer";
      this.player.money--;
    } else {
      winner = null;
    }
    return [winner, playerPoint, dealerPoint];
  }

  displayResult() {
    const [winner, playerPoint, dealerPoint] = this.compareCards();
    this.showCards();
    console.log("");
    console.log("The sum of player's cards: " + playerPoint);
    console.log("The sum of dealer's cards: " + dealerPoint);
    if (winner) {
      console.log(`${winner} won the game!`);
    } else {
      console.log("The game is tie!");
    }
  }
}

let game = new TwentyOneGame();
game.start();
