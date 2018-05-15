//-------------------------------------------- LISTEN FOR THE WORD AND CHECK THE LIST --------------------------------
var vocabWords = new Set([
  "los libros",
  "la tele",
  "la casa",
  "la puerta",
  "la cama",
  "el armario",
  "la ventana",
  "la mesa",
  "las cortinas",
  "el ordenador",
  "el sofa",
  "la mesa de comedor",
  "el reloj",
  "el horno"
]);

var r = document.getElementById("speech-recognition");

function startConverting() {
  var speechRecognizer;
  if ("webkitSpeechRecognition" in window) {
    speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = "es-ES";

    speechRecognizer.onresult = function(event) {
      var transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript = event.results[i][0].transcript.trim();
          console.log("transcript", transcript);
          console.log("has or not", vocabWords.has(transcript));
          if (vocabWords.has(transcript)) {
            r.setAttribute("color", "cyan");
            r.setAttribute("value", transcript);
          } else {
            r.setAttribute("color", "white");
            r.setAttribute("value", transcript);
          }
        }
      }
    };
  }
  return speechRecognizer;
}



//--------------------------RENDER AND SAY WORD ON CLICK START--------------------------------
function loadVoices() {
  var voices = speechSynthesis.getVoices();
}

async function speak(text) {
  var msg = new SpeechSynthesisUtterance();
  msg.lang = 'es-ES'
  console.log(msg)
  msg.text = text;
  msg.voice = await speechSynthesis.getVoices().find((voice) => voice.name == "Jorge");
  console.log("msg.voice", msg.voice)
  window.speechSynthesis.speak(msg);
}

var elBox = document.getElementById("books");
var boxes = Array.from(document.getElementsByClassName("boxes"));
var texts = Array.from(document.getElementsByClassName("texts"));
var cursor = document.getElementById('cursor');

//event listener for writing object's name
boxes.forEach(box => box.addEventListener('click', (e) => {
  var element = texts.find(text => text.getAttribute("value") === box.getAttribute("object"))
  element.setAttribute("visible", "true")
  setTimeout(() => {
    element.setAttribute("visible", "false");
    document.getElementById('speech-recognition').setAttribute('visible', 'true');
    window.setTimeout(() => {
      startConverting().start();
    }, 700)
  }, 3000)

  setTimeout(() => {
    document.getElementById('speech-recognition').setAttribute('visible', 'false');
    document.getElementById('speech-recognition').setAttribute('color', 'white');
    document.getElementById('speech-recognition').setAttribute('value', 'try it yourself!');
    startConverting().stop();
  }, 12000)
}));

//event listener for pronouncing object's name
boxes.forEach(box => box.addEventListener('click', (e) => {
  speak(box.getAttribute("object"))
}));

//event listener for highlighting area
boxes.forEach(box => box.addEventListener('mouseenter', (e) => {
  box.setAttribute("opacity", "0.5");
  cursor.setAttribute('material', 'color: red; shader: flat');
}));

//event listener for unhighlighting area
boxes.forEach(box => box.addEventListener('mouseleave', (e) => {
  box.setAttribute("opacity", "0");
  cursor.setAttribute('material', 'color: black; shader: flat');
}));
