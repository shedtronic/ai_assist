let recognition;
let recognizedText = '';

function setup() {
  let cnv = createCanvas(400, 100);
  cnv.position(10, 50); // Position the canvas within its parent container
  background(220);
  textSize(16);
  textAlign(CENTER, CENTER);

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {
      recognizedText = '';
      for (let i = 0; i < event.results.length; i++) {
        recognizedText += event.results[i][0].transcript;
      }
    };

    recognition.start();
  } else {
    console.log('Speech recognition is not supported in this browser.');
  }
}

function draw() {
  background(220);
  fill(0);
  text(recognizedText, width / 2, height / 2);
}
