window.addEventListener('load', () => {
  let recognition;
  let recognizedWords = [];
  const maxWordsToDisplay = 10; // Maximum number of words to display
  let displayedWords = [];
  let lastDisplayTime = 0; // To track the last time a sentence was displayed

 
  function setup() {
    const canvas = createCanvas(400, 100).parent('canvas-container'); // Create the canvas inside the container
    textSize(10); // Set the font size
    textAlign(RIGHT, TOP); // Align text to the top-right corner
    initializeRecognition(); // Initialize voice recognition
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
  
    displayedWords.push(word);
  
    // Limit the displayed words to the maximum buffer size
    if (displayedWords.length > maxWordsToDisplay) {
      const removedWord = displayedWords.shift(); // Remove the oldest word from the buffer
      fadeOutWord(removedWord, 2000); // Adjust the fade-out duration as needed (in milliseconds)
    }
  
    setTimeout(() => {
      removeWord(word);
    }, 1000); // Adjust the timeout for word display duration as needed (in milliseconds)
  
    const canvas = document.getElementById('defaultCanvas0');
    
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
    
      const leftPosition = Math.floor(Math.random() * (canvasRect.width));
      const topPosition = Math.floor(Math.random() * (canvasRect.height));
    
      fill(0);
      text(word, leftPosition, topPosition); // Draw text on the canvas
    
      setTimeout(() => {
        fadeOutWord(word, 2000); // Adjust the fade-out duration as needed (in milliseconds)
      }, 1000); // Adjust the timeout for word display duration as needed (in milliseconds)
    } else {
      console.log('Canvas element not found');
    }
  }
  


  function fadeOutWord(word, duration) {
    const outputDiv = document.getElementById('output');
    const words = outputDiv.querySelectorAll('span.text-fade');

    words.forEach((wordElement) => {
      if (wordElement.textContent === word) {
        let opacity = 100; // initial opacity value
        wordElement.style.opacity = `${opacity}%`; // Set initial opacity before starting the interval

        const fadeInterval = setInterval(() => {
          if (opacity <= 0) {
            clearInterval(fadeInterval);
            removeWord(word);
          } else {
            wordElement.style.opacity = `${opacity}%`;
            opacity -= (2 / (duration / 100)); // decrease opacity gradually based on the specified duration
          }
        }, 100);
      }
    });
  }

  function removeWord(word) {
    const outputDiv = document.getElementById('output');
    const words = outputDiv.querySelectorAll('span.text-fade');

    words.forEach((wordElement) => {
      if (wordElement.textContent === word) {
        outputDiv.removeChild(wordElement);
        const index = displayedWords.indexOf(word);
        if (index !== -1) {
          displayedWords.splice(index, 1);
        }
      }
    });
  }

  function removeDisplayedWords() {
    const outputDiv = document.getElementById('output');
    const words = outputDiv.querySelectorAll('span.text-fade');

    words.forEach((wordElement) => {
      fadeOutWord(wordElement.textContent);
    });
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





  
 


  function draw() {
    background(220);
    fill(0);
    text(`Max Words to Display: ${maxWordsToDisplay}`, width - 10, 10); // Display maxWordsToDisplay in the top-right corner
    print(maxWordsToDisplay);
  }

  document.getElementById('startButton').addEventListener('click', () => {
    const currentTime = Date.now();
    if (currentTime - lastDisplayTime > 60000) {
      displayedWords = [];
      removeDisplayedWords();
      initializeRecognition();
    }
    startListening();
  });

  document.getElementById('stopButton').addEventListener('click', () => {
    stopListening();
  });

  initializeRecognition();
});
