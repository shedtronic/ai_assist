let recognition;
let recognizedText = '';

function setup() {
  let cnv = createCanvas(1024, 768);
  cnv.position(10, 50); // Position the canvas within its parent container
  background(220);
  textSize(36); // Set the font size to 36px
  textFont('Helvetica, Arial, sans-serif'); // Set the font to a headline font

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {
      recognizedText = '';
      for (let i = 0; i < event.results.length; i++) {
        recognizedText += event.results[i][0].transcript + ' '; // Add a space to separate recognized words
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
  textLeading(40); // Increase line height to ensure text wraps
  text(recognizedText, 100, 100, 300, 300); // Provide 100px padding within the canvas
}
