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
  buttonContainer.style.display = 'flex';
  winnerContainer.style.display = 'none';
  cardsContainer.style.display = 'flex';
  textArea.innerText = '';

  started = true;
  winnerText = '';

  deck = createNewDeck();
  shuffleDeck(deck);

  dealer.cards = [handleDealCard(), handleDealCard()];
  player.cards = [handleDealCard(), handleDealCard()];

  handleUpdateScores();
  const newCards = document.querySelectorAll('div#new-cards');

  newCards.forEach(function (el) {
    el.remove();
  });
});

hitButton.addEventListener('click', function () {
  handlePlayerHit();
  handleUpdateScores();
  handleCheckGameStatus();
  // handleRenderImages();
});

stayButton.addEventListener('click', function () {
  gameOver = true;
  handleCheckGameStatus();
  // handleRenderImages();
});

const handlePlayerHit = () => {
  player.cards.push(handleDealCard());
};

const handleFindImage = (card) => {
  switch (card.value) {
    case 'Jack':
      return `../assets/${card.suit.toLowerCase()}/11.png`;
    case 'Queen':
      return `../assets/${card.suit.toLowerCase()}/12.png`;
    case 'King':
      return `../assets/${card.suit.toLowerCase()}/13.png`;
    default:
      return `../assets/${card.suit.toLowerCase()}/${getCardValInt(
        card.value
      )}.png`;
  }
};

const createNewDeck = () => {
  let deck = [];
  for (let i = 0; i < cardSuits.length; i++) {
    for (let j = 0; j < cardValues.length; j++) {
      let card = {
        suit: cardSuits[i],
        value: cardValues[j],
      };
      deck.push(card);
    }
  }

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

  handleUpdateScores();
  handleRenderNewCards();
  // console.log(gameOver);

  if (gameOver) {
    // console.log(
    //   dealer.score < player.score && player.score <= 21 && dealer.score <= 21
    // );
    while (
      dealer.score < player.score &&
      player.score <= 21 &&
      dealer.score <= 21
    ) {
      dealer.cards.push(handleDealCard());
      handleUpdateScores();
    }
  }

  if (player.score > 21) {
    playerWins = false;
    gameOver = true;
    handleWinnerAlert();
    // alert("Boooo, dealer wins.");
  } else if (dealer.score > 21) {
    playerWins = true;
    gameOver = true;
    handleWinnerAlert();
    // alert("Congrats!! Player Wins!");
  } else if (gameOver) {
    // buttonContainer.style.display = 'none';
    if (player.score > dealer.score) {
      playerWins = true;
      handleWinnerAlert();
    } else {
      playerWins = false;
      handleWinnerAlert();
    }
  }

  newGameButton.style.display = 'block';
};

const handleWinnerAlert = () => {
  if (gameOver) {
    if (playerWins) {
      textArea.innerText = 'Congrats!! Player Wins!';
    } else if (!playerWins) {
      textArea.innerText = 'Boooo, dealer wins.';
    } else {
      textArea.innerText = "Hey, it's a tie!";
    }
  }
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

  switch (suit) {
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
};

const handleRenderImages = () => {
  playerCardA.src = handleFindImage(player.cards[0]);
  playerCardB.src = handleFindImage(player.cards[1]);

  playerCardValA.innerText = `${handleRenderOverlayContent(
    player.cards[0].value
  )} of ${handleSuitIcon(player.cards[0].suit)}`;
  playerCardValB.innerText = `${handleRenderOverlayContent(
    player.cards[1].value
  )} of ${handleSuitIcon(player.cards[1].suit)}`;

  dealerCardA.src = handleFindImage(dealer.cards[0]);
  dealerCardB.src = handleFindImage(dealer.cards[1]);

  dealerCardValA.innerText = `${handleRenderOverlayContent(
    dealer.cards[0].value
  )} of ${handleSuitIcon(dealer.cards[0].suit)}`;
  dealerCardValB.innerText = `${handleRenderOverlayContent(
    dealer.cards[1].value
  )} of ${handleSuitIcon(dealer.cards[1].suit)}`;
};

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
};

const handleUpdateScores = () => {
  dealer.score = handleCalcHandScore(dealer.cards);
  player.score = handleCalcHandScore(player.cards);

  dealerScore.innerText = dealer.score;
  playerScore.innerText = player.score;

  // handleWinnerAlert();

  // handleRenderNewCards();
  console.log(player.score, dealer.score);

  cardsContainer.style.display = 'flex';
};

const handleRenderNewCards = () => {
  let newCardWrapper = document.createElement('div');
  let newCardImage = document.createElement('img');
  let newCardOverlay = document.createElement('span');

  newCardWrapper.classList.add('card-wrapper');
  newCardWrapper.setAttribute('id', 'new-cards');

  if (gameOver && playerWins) {
    newCardImage.setAttribute(
      'src',
      handleFindImage(dealer.cards[dealer.cards.length - 1])
    );
    newCardImage.setAttribute(
      'alt',
      `${getCardValInt(
        dealer.cards[dealer.cards.length - 1].value
      )} of ${handleSuitIcon(dealer.cards[dealer.cards.length - 1].suit)}`
    );

    newCardOverlay.classList.add('hover');
    newCardOverlay.innerText = `${getCardValInt(
      dealer.cards[dealer.cards.length - 1].value
    )} of ${handleSuitIcon(dealer.cards[dealer.cards.length - 1].suit)}`;

    newCardWrapper.appendChild(newCardImage);
    newCardWrapper.appendChild(newCardOverlay);
    dealerHand.appendChild(newCardWrapper);
  } else {
    newCardImage.setAttribute(
      'src',
      handleFindImage(player.cards[player.cards.length - 1])
    );
    newCardImage.setAttribute(
      'alt',
      `${getCardValInt(
        player.cards[player.cards.length - 1].value
      )} of ${handleSuitIcon(player.cards[player.cards.length - 1].suit)}`
    );
    newCardOverlay.classList.add('hover');
    newCardOverlay.innerText = `${getCardValInt(
      player.cards[player.cards.length - 1].value
    )} of ${handleSuitIcon(player.cards[player.cards.length - 1].suit)}`;

    newCardWrapper.appendChild(newCardImage);
    newCardWrapper.appendChild(newCardOverlay);
    playerHand.appendChild(newCardWrapper);
  }
};
