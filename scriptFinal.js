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

// Function that takes in a number as input,
// generates a random number between 0 and input
// Is used as a helper by the shuffleDeck function
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Function that takes no input,
// creates a standard 52 card deck,
// Is used as a helper by createNewDeck function
var createDeck = function () {
  // Declare and initialise an empty array to hold the deck of cards
  var deck = [];
  // Static array with the suits that we will loop over 
  var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  // Using a while loop to select each suit from the suits array,
  // and using an inner loop to create 13 cards per suit
  // adding each card to the deck array.
  var suitCounter = 0;
  while (suitCounter < suits.length) {
    // Select the current suit we want to create cards for
    var currSuit = suits[suitCounter];
    // Creating 13 cards for each suit
    var cardCounter = 1;
    while (cardCounter <= 13) {
      // By default, the name of the card is equal to it's "rank" or "number":
      var cardName = cardCounter;
      // the exceptions are cards number 1 and cards number 11-13
      // so for those iterations of the loop, we re-write the value of cardName
      if (cardName == 1) {
        cardName = 'Ace';
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
      // store all the properties of a card in a new object
      // every card has a name, suit and rank.
      var card = {
        name: cardName,
        suit: currSuit,
        rank: cardCounter,
      };
      // add the newly created card object to the deck array
      deck.push(card);
      cardCounter = cardCounter + 1;
    }
    suitCounter = suitCounter + 1;
  }
  return deck;
};

// Function that takes in an array of cards as input,
// returns the same array with elements in random order
// used by the createShuffledDeck function
var shuffleDeck = function (deck) {
  var index = 0;
  // using a loop to select each card from the deck, starting from the first card
  while (index < deck.length) {
    // select a second, random card in the deck
    var randomIndex = getRandomIndex(deck.length);
    // store the first selected and second random cards in two separate variables
    var currentItem = deck[index];
    var randomItem = deck[randomIndex];
    // replace the original card with the random card
    deck[index] = randomItem;
    // replace the randomly selected card with the original card
    deck[randomIndex] = currentItem;
    // move on to the next card
    index = index + 1;
  }
  return cards;
};

// Function that creates a shuffled standard 52 card deck
// using previously defined helper functions
var createShuffledDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

/* ================================================= */
/* ================ GAME FUNCTIONS ================ */
/* ================================================ */

// Function that takes in an array of card objects,
// and returns the score of that hand.
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // we will initialise a counter to keep track of the number of aces
  // to be used later to determine if an ace should be valued as 11 or 1.
  var numOfAces = 0;

  // Loop through hand and add up the score
  var cardCounter = 0;
  while (cardCounter < handArray.length) {

    var currCard = handArray[cardCounter];

    // Add 10 for each Picture Card
    if (currCard.name == 'King' || currCard.name == 'Queen' || currCard.name == 'Jack'){
      totalHandValue = totalHandValue + 10;
    }
    // We will first add 11 for each Ace, and then later check if we should reduce it to 1
    else if (currCard.name == 'Ace') {
      totalHandValue = totalHandValue + 11;
      numOfAces = numOfAces + 1;
    } 
    // in the default case, we will just increament the score by the rank of the card
    else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    cardCounter = cardCounter + 1;
  }

  var aceCounter = 0 
  while (aceCounter < numOfAces){
    if (totalHandValue > 21){
      totalHandValue = totalHandValue - 10;
    }
    aceCounter = aceCounter + 1;
  }

  return totalHandValue;
};

// Function that takes in an array as input representing a "hand"
// and checks that hand for BlackJack
var checkForBlackJack = function (handArray) {
  // Let's start by creating a boolean variable, initialised as false
  // which will be switched to true if we find blackjack
  var isBlackJack = false;
  // We can be a bit smart here,
  // A hand is only blackjack if and only if the hand contains 2 cards
  // and the 2 cards sum up to a score of 11.
  if (handArray.length == 2 && calculateTotalHandValue(handArray) == 21) {
    isBlackJack == true;
  }
  return isBlackJack;
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
