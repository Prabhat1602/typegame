let landing = document.getElementById("landing");
let gameContainer = document.getElementById("gameContainer");
let playerNameInput = document.getElementById("playerName");
let startBtn = document.getElementById("startBtn");

let quoteEl = document.getElementById("quote");
let inputEl = document.getElementById("typing-input");
let wpmEl = document.getElementById("wpm");
let accuracyEl = document.getElementById("accuracy");
let scoreEl = document.getElementById("score");
let vehicleEl = document.getElementById("vehicle");

let upgradeSound = document.getElementById("upgrade-sound");
let completeSound = document.getElementById("complete-sound");

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let lastStage = "";

let quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Typing speed improves with practice",
  "Code is like humor when you have to explain it it's bad",
  "Stay hungry stay foolish",
  "To be or not to be that is the question"
];

let startTime, interval;
let currentQuote = "";
let typedChars = 0;
let errors = 0;

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
  let now = new Date();
  let elapsed = (now - startTime) / 1000 / 60;
  let wordsTyped = inputEl.value.trim().split(" ").length;
  let wpm = Math.round(wordsTyped / elapsed);

  let correctChars

