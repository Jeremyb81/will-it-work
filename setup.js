const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let time = 0;
let timer;
let lastHole = null;
let points = 0;
let difficulty = "hard";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else {
    return randomInteger(600, 1200);
  }
}

function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  } else {
    lastHole = hole;
    return hole;
  }
}

function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    stopGame();
    return "game stopped";
  }
}

function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

function toggleVisibility(hole) {
  hole.classList.toggle('show');
}

function updateScore() {
  points++;
  score.textContent = points;
}

function clearScore() {
  points = 0;
  score.textContent = points;
}

function updateTimer() {
  time--;
  timerDisplay.textContent = time;
  if (time <= 0) {
    clearInterval(timer);
  }
}

function startTimer() {
  timerDisplay.textContent = time;
  timer = setInterval(updateTimer, 1000);
}

function whack(event) {
  updateScore();
  event.target.classList.remove('show');
}

function setEventListeners() {
  moles.forEach(mole => mole.addEventListener('click', whack));
}

function setDuration(duration) {
  time = duration;
}

function stopGame() {
  clearInterval(timer);
}

function startGame() {
  clearScore();
  setDuration(10); // Set game duration here
  setEventListeners();
  startTimer();
  showUp();
}

// ✅ Start button event
startButton.addEventListener('click', startGame);

// (Optional) Expose for debugging
window.startGame = startGame;
