'use strict';

let deckId;

const baseUrl = 'https://apis.scrimba.com/deckofcards/api/deck/';
const cardSlots = document.getElementById('cards');

const handleClick = () => {
  fetch(`${baseUrl}/new/shuffle/`)
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id;
    });
};

const drawCards = () => {
  fetch(`${baseUrl}/${deckId}/draw/?count=2`)
    .then(response => response.json())
    .then(data => {
      const firstCard = data.cards[0].image;
      const secondCard = data.cards[1].image;

      cardSlots.children[0].innerHTML = `
        <img class="card" src=${firstCard} />
        `;
      cardSlots.children[1].innerHTML = `
        <img class="card" src=${secondCard} />
        `;
    });
};

document.getElementById('new-deck').addEventListener('click', handleClick);
document.getElementById('draw-cards').addEventListener('click', drawCards);
