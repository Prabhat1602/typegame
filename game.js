// Get HTML elements
var landing = document.getElementById("landing");
var gameContainer = document.getElementById("gameContainer");
var playerNameInput = document.getElementById("playerName");
var highScoreText = document.getElementById("highScoreText");
var startBtn = document.getElementById("startBtn");

// Load high score from localStorage
var highScore = localStorage.getItem("highScore") || 0;
highScoreText.textContent = "High Score: " + highScore;

// Start button click handler
startBtn.addEventListener("click", function () {
  var name = playerNameInput.value.trim();
  if (name === "") {
    alert("Please enter your name to play.");
    return;
  }

  landing.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  console.log("Player name:", name);
});

// --- Game Logic ---
var quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Typing speed improves with practice",
  "Code is like humor when you have to explain it it's bad",
  "Stay hungry stay foolish",
  "To be or not to be that is the question"
];

var upgradeSound = document.getElementById("upgrade-sound");
var completeSound = document.getElementById("complete-sound");
var lastStage = "";

var startTime, interval;
var currentQuote = "";
var typedChars = 0;
var errors = 0;

var quoteEl = document.getElementById("quote");
var inputEl = document.getElementById("typing-input");
var wpmEl = document.getElementById("wpm");
var accuracyEl = document.getElementById("accuracy");
var score = 0;
var scoreEl = document.getElementById("score");
var vehicleEl = document.getElementById("vehicle");

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
  var now = new Date();
  var elapsed = (now - startTime) / 1000 / 60; // in minutes
  var wordsTyped = inputEl.value.trim().split(" ").length;
  var wpm = Math.round(wordsTyped / elapsed);

  var correctChars = 0;
  var input = inputEl.value;
  for (var i = 0; i < input.length; i++) {
    if (input[i] === currentQuote[i]) correctChars++;
    else errors++;
  }

  var accuracy = input.length === 0
    ? 100
    : Math.round((correctChars / input.length) * 100);

  wpmEl.textContent = "WPM: " + wpm;
  accuracyEl.textContent = "Accuracy: " + accuracy + "%";

  updateVehicle(wpm);
}

// Vehicle evolution
function updateVehicle(wpm) {
  var newStage = "bicycle";
  if (wpm >= 300) newStage = "rocket";
  else if (wpm >= 180) newStage = "jet";
  else if (wpm >= 130) newStage = "plane";
  else if (wpm >= 90) newStage = "train";
  else if (wpm >= 60) newStage = "car";
  else if (wpm >= 30) newStage = "motorbike";

  if (newStage !== lastStage) {
    vehicleEl.src = "assets/" + newStage + ".png";
    upgradeSound.play();
    lastStage = newStage;
  }

  vehicleEl.classList.remove("speed-up");
  void vehicleEl.offsetWidth;
  vehicleEl.classList.add("speed-up");
}

// Typing input listener
inputEl.addEventListener("input", function () {
  updateStats();
  if (inputEl.value === currentQuote) {
    completeSound.play();
    score += 10;
    scoreEl.textContent = "Score: " + score;

    clearInterval(interval);
    setTimeout(function () {
      loadQuote();
    }, 1000);
  }
});

// Start game on page load
window.onload = function () {
  loadQuote();
};

