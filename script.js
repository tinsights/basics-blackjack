console.log("running!");

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

function generateDeck() {
  console.log("Generating deck!");
  let deck = [];
  const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < 4; j++) {
      deck.splice(Math.floor(Math.random() * deck.length), 0, generateCard(i, suits[j]));
    }
  }
  return deck;
}

let deck = generateDeck();

console.log(deck.slice(40));
