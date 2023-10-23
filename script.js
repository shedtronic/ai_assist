let recognition;
let recognizedWords = [];
const wordBuffer = 100; // Number of words to display in the buffer
let displayedWords = [];
let lastDisplayTime = 0; // To track the last time a sentence was displayed

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

  // Check if the word has already been displayed and skip if it's a repeat
  if (displayedWords.includes(word)) {
    return;
  }

  // Add the word to the displayed words buffer
  displayedWords.push(word);

  // Remove earlier words from the buffer if it exceeds the wordBuffer size
  if (displayedWords.length > wordBuffer) {
    const removedWords = displayedWords.splice(0, displayedWords.length - wordBuffer);
    for (const removedWord of removedWords) {
      removeWord(removedWord);
    }
  }

  // Remove the word from the displayedWords array after 5 seconds
  setTimeout(() => {
    removeWord(word);
  }, 5000);

  const wordElement = document.createElement('span');
  wordElement.textContent = word;

  // Get the dimensions of the output div
  const outputWidth = outputDiv.offsetWidth;
  const outputHeight = outputDiv.offsetHeight;

  // Calculate a random position within the bounds of the output div
  const leftPosition = Math.floor(Math.random() * (outputWidth - wordElement.clientWidth));
  const topPosition = Math.floor(Math.random() * (outputHeight - wordElement.clientHeight));

  wordElement.style.position = 'absolute';
  wordElement.style.left = `${leftPosition}px`;
  wordElement.style.top = `${topPosition}px`;
  wordElement.classList.add('text-fade');

  outputDiv.appendChild(wordElement);

  // Clear the word after 5 seconds
  setTimeout(() => {
    removeWord(word);
  }, 5000);
}

function removeWord(word) {
  const outputDiv = document.getElementById('output');
  const wordElement = outputDiv.querySelector(`span:contains('${word}')`);
  if (wordElement) {
    outputDiv.removeChild(wordElement);
    const index = displayedWords.indexOf(word);
    if (index !== -1) {
      displayedWords.splice(index, 1);
    }
  }
}

function removeDisplayedWords() {
  const outputDiv = document.getElementById('output');
  for (const word of displayedWords) {
    const wordElement = outputDiv.querySelector(`span:contains('${word}')`);
    if (wordElement) {
      outputDiv.removeChild(wordElement);
    }
  }
  displayedWords = [];
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
  removeDisplayedWords(); // Remove any words currently displayed
}

// Add event listeners for the buttons
document.getElementById('startButton').addEventListener('click', () => {
  // Initialize recognition only if it hasn't been initialized in the last minute
  const currentTime = Date.now();
  if (currentTime - lastDisplayTime > 60000) {
    displayedWords = [];
    removeDisplayedWords(); // Remove any words currently displayed
    initializeRecognition();
  }

  startListening();
});

document.getElementById('stopButton').addEventListener('click', () => {
  stopListening();
});

// Call initializeRecognition to set up recognition when the page loads
initializeRecognition();
