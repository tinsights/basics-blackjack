/* ================ PSUDEO CODE FOR VERSION 1 ================ */
// two players - player vs. dealer
// whoever is closer to 21 wins
// sequence: 
// 1. Deal Cards
// 2. Check for winner
//      Possible Winning Scenerios:
//        1. It's a tie
//        1. Whoever gets a Black Jack
//        2. Whoever is closest to 21
// 3. Display cards and show winner

/* ================================================== */
/* ================ GLOBAL VARIABLES ================ */
/* ================================================== */

// Declare Game modes
var GAME_START = 'game start' 
var GAME_CARDS_DRAWN = 'cards are drawn'
var GAME_RESULTS_SHOWN = 'results are shown'
var currentGameMode  = GAME_START;

// Declare variable to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = []
var dealerHand = []

// Declare variable to hold deck of cards
var gameDeck = 'empty at the start'

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
    (playerCardOne.name === 'Ace' && playerCardTwo.name === 'Ace') ||
    (playerCardOne.name === 'Ace' && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name === 'Ace' && playerCardOne.rank >= 10)
    ){
    isBlackJack = true;
  }

  return isBlackJack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {

  var totalHandValue = 0;

  // Loop through player or dealers hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {

    var currCard = handArray[index];

    // In black jack king queen and jack are counted as 10
    if (currCard.name === 'King' || currCard.name === 'Queen' || currCard.name === 'Jack'){
      totalHandValue = totalHandValue + 10
    }
    else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// Function that displays the player and dealers hand in a message
var displayMessage = function (playerHandArray, dealerHandArray) {
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
	if (currentGameMode === GAME_START){

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
	if (currentGameMode === GAME_CARDS_DRAWN ){

    // // NOTE FOR PRESENTER !
    // // TEST checkForBlackJack function
    // // double aces
    // playerHand = [{name: 'Ace', suit: 'Clubs', rank: 1}, {name: 'Ace', suit: 'Hearts', rank: 1}]
    // // ace and suit
    // playerHand = [{name: 'Queen', suit: 'Clubs', rank: 12},{name: 'Ace', suit: 'Diamonds', rank: 1}]
    // // ace and 10
    // playerHand = [{name: 'Ace', suit: 'Clubs', rank: 1}, {name: 10 , suit: 'Spades', rank: 10}]

		// check for blackjack
		var playerHasBlackJack = checkForBlackJack(playerHand);
		var dealerHasBlackJack = checkForBlackJack(dealerHand);
		
    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

    // // NOTE FOR PRESENTER !
    // // TEST Black Jack Conditional
    // // both black jack
    // playerHasBlackJack = true;
    // dealerHasBlackJack = true;
    // // // player win
    // playerHasBlackJack = true;
    // dealerHasBlackJack = false;
    // // // dealer win
    // playerHasBlackJack = false;
    // dealerHasBlackJack = true;

		// IF either player or dealer has black jack
		if (playerHasBlackJack || dealerHasBlackJack ) {
			
			// if both have black jack
		  if (playerHasBlackJack && dealerHasBlackJack ){
		    outputMessage = displayMessage(playerHand,dealerHand) + '<br>Its a Black Jack Tie!';
		  } 
			// if only player has black jack
		  else if (playerHasBlackJack ){
		    outputMessage = displayMessage(playerHand,dealerHand) + '<br>Player wins by Black Jack!';
		  } 
		  // if only dealer has black jack
		  else {
		    outputMessage = displayMessage(playerHand,dealerHand) + '<br>Dealer wins by Black Jack!';
		  }


		}

		// ELSE no one has black jack, count hand value
		else {
			// calculate hands
			var playerHandTotalValue = calculateTotalHandValue(playerHand);
			var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
			
      console.log("Player Total Hand Value ==>", playerHandTotalValue);
      console.log("Dealer Total Hand Value ==>", dealerHandTotalValue);

    // // NOTE FOR PRESENTER !
    // // TEST FOR TIE
    // playerHandTotalValue = 11;
    // dealerHandTotalValue = 11;

			// if tie
			if (playerHandTotalValue == dealerHandTotalValue ){
		    outputMessage = displayMessage(playerHand,dealerHand) + "<br>Its a Tie!";
			} 
			// player win
			else if (playerHandTotalValue > dealerHandTotalValue){
		    outputMessage = displayMessage(playerHand,dealerHand) + "<br>Player wins!";
			} 
			// dealer win
			else {
		    outputMessage = displayMessage(playerHand,dealerHand) + "<br>Dealer wins!";
			}
		}

		// update gameMode
		currentGameMode = GAME_RESULTS_SHOWN ;

    // return message
		return outputMessage;
	}
};


//
// ----- Main flow for main() -----//
//
// Click ONE
// // DEAL CARDS
// comHand = dealCards()
// playerHand = dealCards()
// ​
// // CHECK FOR BLACKJACK (BOOLEAN)
// // Check for blackjacks (22 for double 'ace')
// playerHandHasBlackJack = findBlackJack(playerHand)
// comHandHandHasBlackJack = findBlackJack(comHand)
// ​
// if (playerHandHasBlackJack && comHandHandHasBlackJack){
//   return "Tie"
// } 
// if (playerHandHasBlackJack){
//   return "playerWin"
// } 
// ​
// if (playerHandHasBlackJack) {
//   return "comWin"
// } 
// ​
// // COUNT HAND
// playerHandCounted = countHand(playerHand)
// comHandCounted = countHand(comHand)
// ​
// if (playerHandCounted == comHandCounted){
//   return "Tie"
// } 
// if (playerHandCounted > comHandCounted){
//   return "playerWin"
// } 
// ​
// if (comHandCounted < playerHandCounted) {
//   return "comWin"
// } 



// ========== RULES ========== //
// 1. Only two players: 1x human, 1x computer
// 2. Computer is always dealer
// 3. Winner is closest to 21
// 4. If hand value > 21, auto-lose
// 5. Aces can be 1 or 11

// ========== GAMEPLAY ========== //
// main function (which also means pressing the submit button) runs on each player's turn
// results == message template:


// makeDeck()
// shuffleDeck()

// -- Page Load -- //  gameState = ''
// - output = hit button to draw cards
//  1. make and shuffle deck
// - deck = shuffleDeck(makeDeck());



// -- click 1 -- //
// 2. user clicks submit to deal cards
// - hand.push
// - gameState = 'cards drawn'
// gameMessage = "click to see results" // blackjack FIRST, then highest hands

// -- click 2 -- //
// - gameState = 'results shown'
// 3. (optional) analyse cards for immediate winning conditions; blackjack = 2 cards @ 21
// checkBlackjack();
// 4. cards are displayed to the user
// outputmessage
// VERSION 1 CAPSTONE - calcHandScore(), if(hand vs hand) 
//     -> version2, point 6 
////////////////////    OUTPUT:   ///////////////////////////
//// playerHand .....                                      //
// comHand .....                                           //
//  win???? lose??? draw??? blackjackk???                  //
/////////////////////////////////////////////////////////////


// 5. user decides to 'hit' or 'stand'; use submit to input choice
// 6. user cards analysed for winning or losing conditions
// 7. computer decides to hit or stand automatically based on game rules.

// 8. game either ends or continues

// ===== GAME FLOW ===== //
// 5 clicks, 5 gamestates
// 