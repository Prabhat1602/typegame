// Make sure the entire script is wrapped in a <script> tag, if in HTML
// or in a standalone JS file

// Landing Page Logic
// Use 'var' if browser does not support ES6
var landing = document.getElementById("landing");
var gameContainer = document.getElementById("gameContainer");
var playerNameInput = document.getElementById("playerName");
var highScoreText = document.getElementById("highScoreText");
var startBtn = document.getElementById("startBtn");


// Load high score from localStorage
let highScore = localStorage.getItem("highScore") || 0;
highScoreText.textContent = `High Score: ${highScore}`;

// Start button handler
startBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (name === "") {
    alert("Please enter your name to play.");
    return;
  }

  // Hide landing screen and show the game screen
  landing.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  // Set the player name (you can use it in the game)
  console.log("Player name:", name);
});


const quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Typing speed improves with practice",
  "Code is like humor when you have to explain it it's bad",
  "Stay hungry stay foolish",
  "To be or not to be that is the question"
  const upgradeSound = document.getElementById("upgrade-sound");
const completeSound = document.getElementById("complete-sound");
let lastStage = "";

];

let startTime, interval;
let currentQuote = "";
let typedChars = 0;
let errors = 0;

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("typing-input");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
let score = 0;
const scoreEl = document.getElementById("score");

const vehicleEl = document.getElementById("vehicle");

// Load new quote
function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
  inputEl.value = "";
  typedChars = 0;
  errors = 0;
  startTime = new Date();
}

function updateStats() {
  const now = new Date();
  const elapsed = (now - startTime) / 1000 / 60; // in minutes
  const wordsTyped = inputEl.value.trim().split(" ").length;
  const wpm = Math.round(wordsTyped / elapsed);

  let correctChars = 0;
  const input = inputEl.value;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentQuote[i]) correctChars++;
    else errors++;
  }

  const accuracy = input.length === 0
    ? 100
    : Math.round((correctChars / input.length) * 100);

  wpmEl.textContent = `WPM: ${wpm}`;
  accuracyEl.textContent = `Accuracy: ${accuracy}%`;

  updateVehicle(wpm);
}

// Vehicle evolution
function updateVehicle(wpm) {
  let newStage = "bicycle";
  if (wpm >= 300) newStage = "rocket";
  else if (wpm >= 180) newStage = "jet";
  else if (wpm >= 130) newStage = "plane";
  else if (wpm >= 90) newStage = "train";
  else if (wpm >= 60) newStage = "car";
  else if (wpm >= 30) newStage = "motorbike";

  if (newStage !== lastStage) {
    vehicleEl.src = `assets/${newStage}.png`;
    upgradeSound.play();
    lastStage = newStage;
  }

  vehicleEl.classList.remove("speed-up");
  void vehicleEl.offsetWidth;
  vehicleEl.classList.add("speed-up");
}


// Input Listener
inputEl.addEventListener("input", () => {
  updateStats();
  if (inputEl.value === currentQuote) {
      completeSound.play();
  score += 10;
  scoreEl.textContent = `Score: ${score}`;

    clearInterval(interval);
    setTimeout(() => {
      loadQuote();
    }, 1000);
  }
});

// Start game on load
window.onload = () => {
  loadQuote();
};
