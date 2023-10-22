let recognition;
let recognizedWords = [];
let displayedWords = [];
const wordBuffer = 10; // Number of words to display in the buffer
let lastDisplayTime = 0; // To track the last time a sentence was displayed

function setup() {
  // Setup the p5.js canvas and buttons here
}

function initializeRecognition() {
  // Initialize recognition here
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

// Event listener for the "Start Listening" button
document.getElementById('startButton').addEventListener('click', () => {
  // Initialize recognition only if it hasn't been initialized in the last minute
  const currentTime = Date.now();
  if (currentTime - lastDisplayTime > 60000) {
    initializeRecognition();
  }

  startListening();
});

// Event listener for the "Stop Listening" button
document.getElementById('stopButton').addEventListener('click', stopListening);
