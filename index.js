'use strict';

let deckId;
const baseUrl = 'https://apis.scrimba.com/deckofcards/api/deck/';
const cardSlots = document.getElementById('cards');

const handleClick = () => {
  fetch(`${baseUrl}/new/shuffle/`)
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
    });
};

const drawCards = () => {
  fetch(`${baseUrl}/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      const firstCard = data.cards[0].image;
      const secondCard = data.cards[1].image;

      cardSlots.children[0].innerHTML = `
        <img class="card" src=${firstCard} />
        `;
      cardSlots.children[1].innerHTML = `
        <img class="card" src=${secondCard} />
        `;

      const determineWinner = () => {
        const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];

        const computerCard = cardValues.indexOf(data.cards[0].value);
        const playerCard = cardValues.indexOf(data.cards[1].value);

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

      determineWinner();
    });
};

document.getElementById('new-deck').addEventListener('click', handleClick);
document.getElementById('draw-cards').addEventListener('click', drawCards);
