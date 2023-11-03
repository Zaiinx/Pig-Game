'use strict';

// SELECTING ELEMENTS

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// STARTING CONDITION

let scores, currentScore, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLLING DICE FUNCTIONALITY

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. GENERATE A RANDOM DICE ROLL

    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. DISPLAY THE DICE

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // 3. CHECK FOR DICE 1: IF TRUE, SWITCH TO NEXT PLAYER

    if (diceRoll !== 1) {
      // ADD DICE TO CURRENT SCORE
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // SWITCH THE PLAYER
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE

    // scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. CHECK IF PLAYER'S CORE IS >= 100

    // i. FINISH THE GAME

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //   ii. SWITCH THE PLAYER
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
