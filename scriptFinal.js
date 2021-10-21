/* ================================================== */
/* ================ GLOBAL VARIABLES ================ */
/* ================================================== */

// Declare Game modes
var GAME_START = 'game start';
var GAME_CARDS_DRAWN = 'cards are drawn';
var GAME_RESULTS_SHOWN = 'results are shown';
var GAME_HIT_OR_STAND = 'hit or stand';
var currentGameMode  = GAME_START;

// Declare variable to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// Declare variable to hold deck of cards
var gameDeck = 'empty at the start';

/* ================================================== */
/* =========== DECK CREATION FUNCTIONS ============== */
/* ================================================== */

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      if (cardName == 1) {
        cardName = 'Ace';
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = 'Jack';
      }
      if (cardName == 12) {
        cardName = 'Queen';
      }
      if (cardName == 13) {
        cardName = 'King';
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

// Function that shuffles a deck, used by createNewDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

/* ================================================= */
/* ================ GAME FUNCTIONS ================ */
/* ================================================ */

// Function that checks a hand for black jack
var checkForBlackJack = function (handArray) {
  // Loop through player hand 
  // if there is a blackjack return true
  // else return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  // Possible black jack scenerios 
  // double Aces 
  // First card is Ace +  Second card is 10 or suits
  // Second card is Ace +  First card is 10 or suits
  if (  
    (playerCardOne.name == 'Ace' && playerCardTwo.name == 'Ace') ||
    (playerCardOne.name == 'Ace' && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == 'Ace' && playerCardOne.rank >= 10)
    ){
    isBlackJack = true;
  }

  return isBlackJack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {

  var totalHandValue = 0;
  var aceCounter = 0;

  // Loop through player or dealers hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {

    var currCard = handArray[index];

    // In black jack king queen and jack are counted as 10
    if (currCard.name == 'King' || currCard.name == 'Queen' || currCard.name == 'Jack'){
      totalHandValue = totalHandValue + 10;
    }
    else if (currCard.name == 'Ace') {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
  }

  index = 0 // 2
  while (index < aceCounter){
    if (totalHandValue > 21){
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// Function that displays the player and dealers hand in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = 'Player hand:<br>';
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage = playerMessage + '- ' + playerHandArray[index].name + ' of ' + playerHandArray[index].suit + '<br>';
    index = index + 1;
  }

  index = 0;
  var dealerMessage = 'Dealer hand:<br>';
  while (index < dealerHandArray.length) {
    dealerMessage = dealerMessage + '- ' + dealerHandArray[index].name + ' of ' + dealerHandArray[index].suit + '<br>';
    index = index + 1;
}

  return playerMessage + '<br>' + dealerMessage;
};


/* ================================================= */
/* ================ MAIN FUNCTION ================ */
/* ================================================ */

var main = function (input) {
	var outputMessage = '';

	// FIRST CLICK
	if (currentGameMode == GAME_START){

    // create a deck of cards 
    gameDeck = createNewDeck();

		// deal 2 cards to player and computer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    
    // check player and dealer cards
    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Dealer Hand ==>");
    console.log(dealerHand);

		// update gameMode
		currentGameMode = GAME_CARDS_DRAWN;

    // reassign output message
		outputMessage = 'Everyone has been dealt a card. Click button to calculate cards!';


    // return message
		return outputMessage;
	}

	// SECOND CLICK
	if (currentGameMode == GAME_CARDS_DRAWN ){

		// check for blackjack
		var playerHasBlackJack = checkForBlackJack(playerHand);
		var dealerHasBlackJack = checkForBlackJack(dealerHand);
		
    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);


		// IF either player or dealer has black jack
		if (playerHasBlackJack || dealerHasBlackJack ) {
			
			// if both have black jack
		  if (playerHasBlackJack && dealerHasBlackJack ){
		    outputMessage = displayPlayerAndDealerHands
        (playerHand,dealerHand) + '<br>Its a Black Jack Tie!';
		  } 
			// if only player has black jack
		  else if (playerHasBlackJack ){
		    outputMessage = displayPlayerAndDealerHands
        (playerHand,dealerHand) + '<br>Player wins by Black Jack!';
		  } 
		  // if only dealer has black jack
		  else {
		    outputMessage = displayPlayerAndDealerHands
        (playerHand,dealerHand) + '<br>Dealer wins by Black Jack!';
		  }


		}

		// ELSE no one has black jack, ask players to hit or stand
		else {
      outputMessage = displayPlayerAndDealerHands
      (playerHand,dealerHand) + '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';
      
      // update gameMode
		  currentGameMode = GAME_HIT_OR_STAND;
		}



    // return message
		return outputMessage;
	}

  // THIRD CLICK
  if (currentGameMode == GAME_HIT_OR_STAND) {

    if (input == 'hit') {
      playerHand.push(gameDeck.pop());
      outputMessage = displayPlayerAndDealerHands
      (playerHand,dealerHand) + '<br> You drew another card. <br>Please input "hit" or "stand".';
    }
    
    else if (input == 'stand') {
      // calculate hands

			var playerHandTotalValue = calculateTotalHandValue(playerHand);
      // NOTE! Abstract dealer's logic into helper function.
			var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
			console.log(`line 298: dealer hand value: ${dealerHandTotalValue}`);
      while (dealerHandTotalValue < 17) {
        console.log(`while loop running!`);
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      console.log("Player Total Hand Value ==>", playerHandTotalValue);
      console.log("Dealer Total Hand Value ==>", dealerHandTotalValue);

			// if tie
			if ((playerHandTotalValue == dealerHandTotalValue) ||
          (playerHandTotalValue > 21 && dealerHandTotalValue > 21)){
		    outputMessage = displayPlayerAndDealerHands
        (playerHand,dealerHand) + "<br>Its a Tie!";
			} 
      
			// player win
			else if ( (playerHandTotalValue > dealerHandTotalValue && playerHandTotalValue <= 21) ||
                (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)) { 
		      outputMessage = displayPlayerAndDealerHands
          (playerHand,dealerHand) + "<br>Player wins!";
      } 
			// dealer win
			else {
		    outputMessage = displayPlayerAndDealerHands
        (playerHand,dealerHand) + "<br>Dealer wins!";
			}
      currentGameMode = GAME_RESULTS_SHOWN;
    }
    else {
      outputMessage = 'wrong input... only "hit" or "stand" are valid.'
    }

    return outputMessage;
  }

};