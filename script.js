let recognition;
let recognizedText = '';
let canvas;

function setup() {
  canvas = createCanvas(400, 100);
  canvas.position(10, 50);
  background(220);
  textSize(16);
  textAlign(CENTER, CENTER);

  recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = function (event) {
    recognizedText = '';
    for (let i = 0; i < event.results.length; i++) {
      recognizedText += event.results[i][0].transcript;
    }
  };

  recognition.start();
}

function draw() {
  background(220);
  fill(0);
  text(recognizedText, width / 2, height / 2);
}


let recognition;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
  // Your code to set up and use the recognition object here
} else {
  // Handle the case where the API is not supported
  console.log('Speech recognition is not supported in this browser.');
}
