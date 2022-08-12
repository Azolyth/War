'use strict';

let deckId;

const baseUrl = 'https://apis.scrimba.com/deckofcards/api/deck/';

const handleClick = () => {
  fetch(`${baseUrl}/new/shuffle/`)
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id;
      console.log(deckId);
    });
};

const drawCards = () => {
  fetch(`${baseUrl}/${deckId}/draw/?count=2`)
    .then(response => response.json())
    .then(data => {
      const firstCard = data.cards[0].image;
      const secondCard = data.cards[1].image;

      document.getElementById('cards').innerHTML = `
      <img class="first-card" src=${firstCard} >
      <img class="second-card" src=${secondCard}>
        `;
      console.log(firstCard, secondCard);
    });
};

document.getElementById('new-deck').addEventListener('click', handleClick);
document.getElementById('draw-cards').addEventListener('click', drawCards);