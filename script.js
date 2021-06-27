let button = document.querySelector("#submit-button");
let output = document.querySelector("#output-div");
let input = document.querySelector("#input-field");
button.addEventListener("click", (lambda = () => eval(input.value)));

let deck = [];
let playerHand = [];
let dealerHand = [];
// generate a card object with rank/value, suit, and name
function generateCard(rank, suit) {
  let value = rank > 10 ? 10 : rank;
  let name = "";
  switch (rank) {
    case 1:
      name = "Ace";
      break;
    case 11:
      name = "Jack";
      break;
    case 12:
      name = "Queen";
      break;
    case 13:
      name = "King";
      break;
    default:
      name = rank;
  }

  let card = {
    value: value,
    name: name,
    suit: suit,
    title: name + " of " + suit,
  };
  return card;
}

// generate a shuffled standard deck of cards
function generateDeck() {
  const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < 4; j++) {
      deck.splice(Math.floor(Math.random() * deck.length), 0, generateCard(i, suits[j]));
    }
  }
}

function blackjack(hand) {
  if (hand[0].name == "Ace" || hand[1].name == "Ace") {
    if (hand[0].value == 10 || hand[1].value == 10) {
      return true;
    }
  }
  return false;
}

function deal() {
  return deck.shift();
}

function score(hand) {
  let total = 0;
  let aces = 0;
  for (i = 0; i < hand.length; i++) {
    if (hand[i].name == "Ace") {
      aces++;
    } else {
      total += hand[i].value;
    }
  }
  while (aces > 0) {
    if (total <= 11 - aces) {
      total += 11;
      aces--;
    } else {
      total++;
      aces--;
    }
  }
  return total;
}

console.log(score(hand));

function startGame() {
  toggleOpts();
  output.innerHTML = "Good luck!" + "<br><br>";
  generateDeck();
  playerHand = [deal(), deal()];
  dealerHand = [deal(), deal()];

  let firstDeal = `You have been dealt the ${playerHand[0].title} and the ${playerHand[1].title}.<br><br>
                    The dealer's face-up card is the ${dealerHand[0].title}.`;
  output.innerHTML += firstDeal + "<br><br>";
  if (blackjack(playerHand)) {
    output.innerHTML += "Blackjack!";
    if (blackjack(dealerHand)) {
      let reveal = `Unfortunately, the dealer reveals the ${dealerHand[1].title}.`;
      output.innerHTML += "<br><br>" + reveal + "<br><br>";
      output.innerHTML += "Draw!";
    } else {
      output.innerHTML += "You win!";
    }
    toggleOpts();
  }
}

function hit() {
  card = deal();
  playerHand.push(card);
  let message = `You draw the ${card.title}. You now have ${score(playerHand)}.`;
  output.innerHTML += message + "<br><br>";
  if (score(playerHand) > 21) {
    output.innerHTML += "Too bad!";
    toggleOpts();
  }
}

function stand() {
  let reveal = `The dealer reveals the ${dealerHand[1].title}.
  He has ${score(dealerHand)}.`;

  output.innerHTML += reveal + "<br><br>";

  while (score(dealerHand) < 17) {
    card = deal();
    dealerHand.push(card);
    let message = `The dealer draws the ${card.title}. He now has ${score(dealerHand)}.`;
    output.innerHTML += message + "<br>";
  }

  if (score(dealerHand) > 21 || score(playerHand) > score(dealerHand)) {
    output.innerHTML += "<br>" + "You win!";
  } else if (score(playerHand) < score(dealerHand)) {
    output.innerHTML += "<br>" + "You lose!";
  } else {
    output.innerHTML += "<br>" + "Draw!";
  }
  toggleOpts();
}

function toggleOpts() {
  input[1].disabled = !input[1].disabled;
  input[2].disabled = !input[2].disabled;
  input[3].disabled = !input[3].disabled;
  input[0].selected = true;
}
