'use strict';

let deckId;
const baseUrl = 'https://apis.scrimba.com/deckofcards/api/deck/';
const cardSlots = document.getElementById('cards');
const drawButton = document.getElementById('draw-cards');

const handleClick = () => {
  fetch(`${baseUrl}/new/shuffle/`)
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards(data);
    });
};

const drawCards = () => {
  fetch(`${baseUrl}/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      const computerCardData = data.cards[0];
      const playerCardData = data.cards[1];
      remainingCards(data);
      determineWinner(computerCardData, playerCardData);
      renderCard(computerCardData.image, playerCardData.image);
    });
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

  let gameMessage = '';
  if (computerCard > playerCard) {
    gameMessage = 'Computer Wins!';
  } else if (computerCard < playerCard) {
    gameMessage = 'Player Wins!';
  } else {
    gameMessage = 'WAR!';
  }
  return (document.getElementById('game-message').textContent = gameMessage);
};

const remainingCards = (data) => {
  data.remaining <= 0 ? (drawButton.disabled = true) : (drawButton.disabled = false);
  document.getElementById('cards-remaining').textContent = `Cards Remaining: ${data.remaining}`;
};

drawButton.addEventListener('click', drawCards);
document.getElementById('new-deck').addEventListener('click', handleClick);
