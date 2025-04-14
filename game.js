const quotes = [
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

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("typing-input");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
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
  let src = "assets/bicycle.png";
  if (wpm >= 300) src = "assets/rocket.png";
  else if (wpm >= 250) src = "assets/rocket.png";
  else if (wpm >= 180) src = "assets/jet.jpg";
  else if (wpm >= 130) src = "assets/plane.jpg";
  else if (wpm >= 90) src = "assets/train.png";
  else if (wpm >= 60) src = "assets/car.png";
  else if (wpm >= 30) src = "assets/motorbike.jpg";
  else src = "assets/bicycle.png";

  vehicleEl.src = src;
  vehicleEl.classList.remove("speed-up");
void vehicleEl.offsetWidth; // force reflow
vehicleEl.classList.add("speed-up");

}

// Input Listener
inputEl.addEventListener("input", () => {
  updateStats();
  if (inputEl.value === currentQuote) {
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
