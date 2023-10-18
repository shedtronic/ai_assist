
let recognition;
let recognizedWords = [];

function setup() {
let outputDiv = document.getElementById('output');
outputDiv.style.display = 'none';

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

startButton.addEventListener('click', startListening);
stopButton.addEventListener('click', stopListening);

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = function (event) {
    recognizedWords = [];
    for (let i = 0; i < event.results.length; i++) {
      recognizedWords.push(event.results[i][0].transcript);
    }
    displayWords();
  };
} else {
  console.log('Speech recognition is not supported in this browser.');
}
}

function displayWords() {
let outputDiv = document.getElementById('output');
outputDiv.style.display = 'block';
outputDiv.textContent = '';

// Randomly position each word within the canvas
let canvasWidth = window.innerWidth - 40; // Account for 20px padding
let canvasHeight = window.innerHeight - 40; // Account for 20px padding

recognizedWords.forEach((word) => {
  let wordElement = document.createElement('span');
  wordElement.textContent = word;
  wordElement.style.position = 'absolute';
  wordElement.style.left = `${Math.floor(Math.random() * canvasWidth)}px`;
  wordElement.style.top = `${Math.floor(Math.random() * canvasHeight)}px`;
  wordElement.classList.add('text-fade');
  outputDiv.appendChild(wordElement);
});

// Clear words after 5 seconds
setTimeout(() => {
  recognizedWords = [];
  outputDiv.style.display = 'none';
  outputDiv.textContent = '';
}, 5000);
}

function startListening() {
if (recognition) {
  recognition.start();
}
}

function stopListening() {
if (recognition) {
  recognition.stop();
}
}