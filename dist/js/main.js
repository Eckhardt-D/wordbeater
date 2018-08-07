window.addEventListener('load', setBestScore);

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

let score = 0;
let isPlaying;
let counter;
let checker;
let resetButton;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const difficultySelector = document.querySelector('#difficultySelector');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const bestScore =document.querySelector('#bestScore');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');


// To change level
difficultySelector.addEventListener('change', (e) => {
  currentLevel = levels[e.target.value];
  document.querySelector('.lead').style.display = 'block';
  resetMatch();
});

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  counter = setInterval(countdown, 1000);
  // Check game status
  checker = setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

function resetMatch() {
  clearInterval(counter);
  clearInterval(checker);
  time = currentLevel;
  seconds.innerHTML = currentLevel;
  scoreDisplay.innerHTML = 0;
  message.innerHTML = '';
  wordInput.value = '';
  score = 0;
  init();
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML && time > 0) {
    message.innerHTML = 'Correct!!!';
    score++;
    return true;
  } else {
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    setBestScore();
    message.innerHTML = 'Game Over!!!' + 
    '<br><button class="mt-3" id="resetButton">Restart with the same difficulty</button>';
    resetButton = document.querySelector('#resetButton');
    score = -1;
    clearInterval(counter);
    clearInterval(checker);
    resetButton.addEventListener('click', resetMatch);
  }
}

// Set best score
function setBestScore() {
  getPreviousBestScore()
  .then(res => {
    console.log(score);
    if (res <= parseInt(scoreDisplay.innerHTML)) {
      localStorage.setItem('best', JSON.stringify(scoreDisplay.innerHTML));
      bestScore.innerHTML = scoreDisplay.innerHTML;
    } else {
      bestScore.innerHTML = res;
    }
  })
}

// get Best score
function getPreviousBestScore() {
  return new Promise((resolve, reject) => {
    if(localStorage.getItem('best')) {
      return resolve(JSON.parse(localStorage.getItem('best')));
    }
      return resolve(0);
  })
}

