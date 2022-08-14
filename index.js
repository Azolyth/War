'use strict';
// API
let deckId;
const baseUrl = 'https://apis.scrimba.com/deckofcards/api/deck/';
// HTML Elements
const cardSlots = document.getElementById('cards');
const gameMessageEl = document.getElementById('game-message');
const cardsRemainingEl = document.getElementById('cards-remaining');
// Buttons
const drawButton = document.getElementById('draw-cards');
const newDeck = document.getElementById('new-deck');
// Score
let computerScore = 0;
let playerScore = 0;
const computerScoreEl = document.getElementById('computer-score');
const playerScoreEl = document.getElementById('player-score');

const handleClick = async () => {
  const response = await fetch(`${baseUrl}/new/shuffle/`);
  const data = await response.json();
  deckId = data.deck_id;
  remainingCards(data);
};

const drawCards = async () => {
  const response = await fetch(`${baseUrl}/${deckId}/draw/?count=2`);
  const data = await response.json();
  const computerCardData = data.cards[0];
  const playerCardData = data.cards[1];
  gameMessageEl.textContent = determineWinner(computerCardData, playerCardData);
  remainingCards(data);
  renderCard(computerCardData.image, playerCardData.image);
};

const renderCard = (firstCard, secondCard) => {
  cardSlots.children[0].innerHTML = `
    <img class="card" src=${firstCard}>
  `;
  cardSlots.children[1].innerHTML = `
    <img class="card" src=${secondCard}>
  `;
};

const determineWinner = (firstCard, secondCard) => {
  const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];

  const computerCard = cardValues.indexOf(firstCard.value);
  const playerCard = cardValues.indexOf(secondCard.value);

  if (computerCard > playerCard) {
    computerScore++;
    computerScoreEl.textContent = `Computer Score: ${computerScore}`;
    return 'Computer Wins!';
  } else if (computerCard < playerCard) {
    playerScore++;
    playerScoreEl.textContent = `Your Score: ${playerScore}`;
    return 'Player Wins!';
  } else {
    return 'WAR!';
  }
};

const remainingCards = (data) => {
  data.remaining <= 0 ? (drawButton.disabled = true) : '';

  let winnerMessage = '';
  if (data.remaining === 0) {
    drawButton.disabled = true;
    if (computerScore > playerScore && data.remaining === 0) {
      winnerMessage = 'Computer won the game!';
    } else if (computerScore < playerScore && data.remaining === 0) {
      winnerMessage = 'Player won the game!';
    } else {
      winnerMessage = 'WAR!';
    }
  }
  gameMessageEl.textContent = winnerMessage;
  cardsRemainingEl.textContent = `Cards Remaining: ${data.remaining}`;
};

drawButton.addEventListener('click', drawCards);
newDeck.addEventListener('click', handleClick);
