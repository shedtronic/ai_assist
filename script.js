let recognition;
let recognizedWords = [];

function setup() {
  // This function will be empty for p5.js to work correctly
}

function initializeRecognition() {
  const outputDiv = document.getElementById('output');
  outputDiv.style.position = 'relative';

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {
      for (let i = 0; i < event.results.length; i++) {
        const word = event.results[i][0].transcript;
        recognizedWords.push(word);
        displayWord(word);
      }
    };
  } else {
    console.log('Speech recognition is not supported in this browser.');
  }
}

function displayWord(word) {
  const outputDiv = document.getElementById('output');
  const wordElement = document.createElement('span');
  wordElement.textContent = word;

  // Randomly position the word within the viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  wordElement.style.position = 'absolute';
  wordElement.style.left = `${Math.floor(Math.random() * viewportWidth)}px`;
  wordElement.style.top = `${Math.floor(Math.random() * viewportHeight)}px`;
  wordElement.classList.add('text-fade');

  outputDiv.appendChild(wordElement);

  // Clear the word after 5 seconds
  setTimeout(() => {
    recognizedWords.shift();
    outputDiv.removeChild(wordElement);
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

// Add event listeners for the buttons
document.getElementById('startButton').addEventListener('click', () => {
  initializeRecognition();
  startListening();
});

document.getElementById('stopButton').addEventListener('click', stopListening);
