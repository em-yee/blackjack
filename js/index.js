const textArea = document.getElementById('text-area');
const buttonContainer = document.getElementById('button-container');
const hitButton = document.getElementById('hit-button');
const stayButton = document.getElementById('stay-button');
const newGameButton = document.getElementById('new-game-button');
const playerScore = document.getElementById('player-score');
const dealerScore = document.getElementById('dealer-score');
const winnerContainer = document.getElementById('winner-container');
const scoreContainer = document.getElementById('score-container');
const cardsContainer = document.getElementById('cards-container');
const playerHand = document.getElementById('player-hand');
const dealerHand = document.getElementById('dealer-hand');
const playerCardA = document.getElementById('player-card-a');
const playerCardB = document.getElementById('player-card-b');
const dealerCardA = document.getElementById('dealer-card-a');
const dealerCardB = document.getElementById('dealer-card-b');
const playerCardValA = document.getElementById('player-card-val-a');
const playerCardValB = document.getElementById('player-card-val-b');
const dealerCardValA = document.getElementById('dealer-card-val-a');
const dealerCardValB = document.getElementById('dealer-card-val-b');


const cardSuits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
const cardValues = [
	'Two',
	'Three',
	'Four',
	'Five',
	'Six',
	'Seven',
	'Eight',
	'Nine',
	'Ten',
	'Jack',
	'Queen',
	'King',
	'Ace',
];

buttonContainer.style.display = 'none';

let deck = [];
let winnerText = '';
let started = false;
let gameOver = false;
let playerWins = false;

let dealer = {
	cards: [],
	score: 0,
};

let player = {
	cards: [],
	score: 0,
};

newGameButton.addEventListener('click', function () {
	newGameButton.style.display = 'none';
	buttonContainer.style.display = 'block';
	winnerContainer.style.display = 'none';
	cardsContainer.style.display = 'flex';
	
	started = true;
	winnerText = '';

	deck = createNewDeck();
	shuffleDeck(deck);
	
	dealer.cards = [handleDealCard(), handleDealCard()];
	player.cards = [handleDealCard(), handleDealCard()];
	
	handleUpdateScores();
});

hitButton.addEventListener('click', function () {
	handlePlayerHit()
	handleUpdateScores();
	handleCheckGameStatus();
});

stayButton.addEventListener('click', function () {
	gameOver = true;
	handleCheckGameStatus();
});

const handlePlayerHit = () => {
	player.cards.push(handleDealCard());
	
	
}

const handleFindImage = (card) => {
	switch (card.value) {
		case 'Jack':
			return `../assets/${card.suit.toLowerCase()}/11.png`;
		case 'Queen':
			return `../assets/${card.suit.toLowerCase()}/12.png`;
		case 'King':
			return `../assets/${card.suit.toLowerCase()}/13.png`;
		default:
			return `../assets/${card.suit.toLowerCase()}/${getCardValInt(card.value)}.png`;
	}
}

const createNewDeck = () => {
	// start with empty array
	let deck = [];

	// since there are 12 indices in the 'cardValues' array, for each of the 4 suits, we want to assign each of the 12 'cardValues'
	for (let i = 0; i < cardSuits.length; i++) {
		for (let j = 0; j < cardValues.length; j++) {
			let card = {
				suit: cardSuits[i],
				value: cardValues[j],
			};
			deck.push(card);
		}
	}
	// returns 52-card deck (unshuffled)
	return deck;
};

const shuffleDeck = (deck) => {
	for (let i = 0; i < deck.length; i++) {
		// selects a random number less than deck.length
		let randomIndex = Math.trunc(Math.random() * deck.length);

		// assigns a random card to a temporary placeholder variable
		let tempCard = deck[randomIndex];

		// reassigns the same card to current value of "i" in loop
		deck[randomIndex] = deck[i];

		// assigns, in order, randomly generated card from line 70
		deck[i] = tempCard;
	}
};

const getCardValInt = (cardVal) => {
	switch (cardVal) {
		case 'Ace':
			return 1;
		case 'Two':
			return 2;
		case 'Three':
			return 3;
		case 'Four':
			return 4;
		case 'Five':
			return 5;
		case 'Six':
			return 6;
		case 'Seven':
			return 7;
		case 'Eight':
			return 8;
		case 'Nine':
			return 9;
		default:
			return 10;
	}
};

const handleDealCard = () => {
	return deck.shift();
};

const handleCheckGameStatus = () => {
	playerScore.style.display = 'block';
	dealerScore.style.display = 'block';
	
	handleRenderNewCards();
	handleUpdateScores();

	if (gameOver) {
		while (
			dealer.score < player.score &&
			player.score <= 21 &&
			dealer.score <= 21
		) {
			dealer.cards.push(handleDealCard());
			handleRenderNewCards();
			handleUpdateScores();
		}
	}

	if (player.score > 21) {
		playerWins = false;
		// winnerText = 'Dealer Wins!';
		gameOver = true;
	} else if (dealer.score > 21) {
		// winnerText = 'Player Wins!';
		playerWins = true;
		gameOver = true;
	} else if (gameOver) {
		winnerContainer.innerText = winnerText;
		winnerContainer.style.display = 'block';
		if (player.score > dealer.score) {
			playerWins = true;
		} else if (dealer.score > player.score) {
			playerWins = false;
		}
	}

	winnerContainer.innerText = winnerText;
	winnerContainer.style.display = 'block';
	newGameButton.style.display = 'block';
	buttonContainer.style.display = 'none';
};

const handleCalcHandScore = (hand) => {
	let score = 0;
	let isAce = false;
	
	handleRenderImages();

	for (let i = 0; i < hand.length; i++) {
		let card = hand[i];
		isAce = false;
		score += getCardValInt(card.value);

		if (card.value === 'Ace') {
			isAce = true;
		}
	}
		if (isAce && score + 10 <= 21) {
			return score + 10;
		} else {
			return score;
		}
};

const handleSuitIcon = (suit) => {
	let suitIcon = '';
	
	switch(suit) {
		case 'Spades':
			suitIcon = '♠';
			break;
		case 'Hearts':
			suitIcon = '♥';
			break;
		case 'Clubs':
			suitIcon = '♣';
			break;
		case 'Diamonds':
			suitIcon = '♦';
			break;
		default:
	}
	
	return suitIcon;
}

const handleRenderImages = () => {
	playerCardA.src = handleFindImage(player.cards[0]);
	playerCardB.src = handleFindImage(player.cards[1]);
	playerCardValA.innerText = `${handleRenderOverlayContent(player.cards[0].value)} of ${handleSuitIcon(player.cards[0].suit)}`;
	playerCardValB.innerText = `${handleRenderOverlayContent(player.cards[1].value)} of ${handleSuitIcon(player.cards[1].suit)}`;
	
	dealerCardA.src = handleFindImage(dealer.cards[0]);
	dealerCardB.src = handleFindImage(dealer.cards[1]);
	dealerCardValA.innerText = `${handleRenderOverlayContent(dealer.cards[0].value)} of ${handleSuitIcon(dealer.cards[0].suit)}`;
	dealerCardValB.innerText = `${handleRenderOverlayContent(dealer.cards[1].value)} of ${handleSuitIcon(dealer.cards[1].suit)}`;
}

const handleRenderOverlayContent = (card) => {
	switch (card) {
		case 'Ace':
			return 'A';
		case 'Jack':
			return `J`;
		case 'Queen':
			return `Q`;
		case 'King':
			return `K`;
		default:
			return getCardValInt(card);
	}
}

const handleUpdateScores = () => {
	dealer.score = handleCalcHandScore(dealer.cards);
	player.score = handleCalcHandScore(player.cards);
	
	
	dealerScore.innerText = dealer.score;
	playerScore.innerText = player.score;
	
	cardsContainer.style.display = 'flex';
}

const handleRenderNewCards = () => {
	let newCardWrapper = document.createElement('div');
	let newCardImage = document.createElement('img');
	let newCardOverlay = document.createElement('span');
	
	newCardWrapper.classList.add('card-wrapper');
	
	if (gameOver) {
		newCardImage.setAttribute('src', handleFindImage(dealer.cards[dealer.cards.length - 1]));
			newCardImage.setAttribute('alt', `${getCardValInt(dealer.cards[dealer.cards.length - 1].value)} of ${handleSuitIcon(dealer.cards[dealer.cards.length - 1].suit)}`)
	
	newCardOverlay.classList.add('hover');
	newCardOverlay.innerText = `${getCardValInt(player.cards[player.cards.length - 1].value)} of ${handleSuitIcon(player.cards[player.cards.length - 1].suit)}`;
	}
	
	newCardImage.setAttribute('src', handleFindImage(player.cards[player.cards.length - 1]));
	newCardImage.setAttribute('alt', `${getCardValInt(player.cards[player.cards.length - 1].value)} of ${handleSuitIcon(player.cards[player.cards.length - 1].suit)}`)
	
	newCardOverlay.classList.add('hover');
	newCardOverlay.innerText = `${getCardValInt(player.cards[player.cards.length - 1].value)} of ${handleSuitIcon(player.cards[player.cards.length - 1].suit)}`;
	
	newCardWrapper.appendChild(newCardImage);
	newCardWrapper.appendChild(newCardOverlay);
}


// const showStatus = () => {
// 	if (!started) {
// 		textArea.innerText = 'Welcome to BlackJack';
// 	}
//
// 	let dealerCardString = '';
// 	for (let i = 0; i < dealer.cards.length; i++) {
// 		dealerCardString += getCardString(dealer.cards[i]) + '\n';
// 	}
//
// 	let playerCardString = '';
// 	for (let i = 0; i < player.cards.length; i++) {
// 		playerCardString += getCardString(player.cards[i]) + '\n';
// 	}
//
// 	handleUpdateScores();
//
// 	textArea.innerText =
// 		'Dealer has: \n ' +
// 		dealerCardString +
// 		'(score:' +
// 		dealerScore +
// 		')\n\n' +
// 		'Player has: \n ' +
// 		playerCardString +
// 		'(score:' +
// 		playerScore +
// 		')\n\n';
//
// 	if (gameOver) {
// 		if (playerWins) {
// 			winnerText = 'You Win!';
// 		} else if (!playerWins) {
// 			winnerText = 'Dealer Wins!';
// 		} else {
// 			winnerText = 'Push (Tie)';
// 		}
//
// 		winnerContainer.innerText = winnerText;
// 		newGameButton.style.display = 'block';
// 		hitButton.style.display = 'none';
// 		stayButton.style.display = 'none';
// 	}
// };
