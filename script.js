'use strict';
//! draw a die face on a canvas element
const diceEl = document.querySelector('.dice');
const ctx = diceEl.getContext('2d');

// Set diceEl dimensions
diceEl.width = 100;
diceEl.height = 100;
// Function to draw a die face
function drawDieFace(value) {
  ctx.clearRect(0, 0, diceEl.width, diceEl.height); // Clear previous drawing
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, diceEl.width, diceEl.height); // Draw die background
  ctx.fillStyle = '#000';
  const dotRadius = 10;
  const positions = [
    [50, 50], // Center
    [20, 20], // Top-left
    [80, 20], // Top-right
    [20, 80], // Bottom-left
    [80, 80], // Bottom-right
    [20, 50], // Middle-left
    [80, 50], // Middle-right
  ];
  const dotsToDraw = {
    1: [0],
    2: [1, 4],
    3: [0, 1, 4],
    4: [1, 2, 3, 4],
    5: [0, 1, 2, 3, 4],
    6: [1, 2, 3, 4, 5, 6],
  };
  dotsToDraw[value].forEach(dot => {
    const [x, y] = positions[dot];
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  });
}
//! Modal functionality
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
const closeModal = function () {  
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// ! select elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// ! intialize the scores
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
//hide the dice

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling dice functionallity
rollBtn.addEventListener('click', function () {
  if (playing) {
    let activeCurrentScore = document.getElementById(
      `current--${activePlayer}`,
    );
    //Generating Random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display the dice
    diceEl.classList.remove('hidden');
    drawDieFace(dice);
    //Checking if it rolled 1
    if (dice !== 1) {
      //Adding dice to current score
      currentScore += dice;
      activeCurrentScore.textContent = currentScore;
    } else {
      //dice =1 switch to next player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    //using scores arr + activeplayer
    let activeCurrentScore = document.getElementById(`score--${activePlayer}`);
    scores[activePlayer] += currentScore;
    activeCurrentScore.textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      openModal();
    } else {
      switchPlayer();
    }
  }
});
newBtn.addEventListener('click', init);
