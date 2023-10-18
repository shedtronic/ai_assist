let recognition;
let recognizedWords = [];

function setup() {
  const outputDiv = document.getElementById('output');
  outputDiv.style.position = 'relative';

  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');

  startButton.addEventListener('click', startListening);
  stopButton.addEventListener('click', stopListening);

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

  // Randomly position the word within the canvas
  const canvasWidth = outputDiv.offsetWidth;
  const canvasHeight = outputDiv.offsetHeight;
  wordElement.style.position = 'absolute';
  wordElement.style.left = `${Math.floor(Math.random() * canvasWidth)}px`;
  wordElement.style.top = `${Math.floor(Math.random() * canvasHeight)}px`;
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
