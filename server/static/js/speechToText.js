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

// function startConverting() {
if ("webkitSpeechRecognition" in window) {
  var speechRecognizer = new webkitSpeechRecognition();
  speechRecognizer.continuous = true;
  speechRecognizer.interimResults = true;
  speechRecognizer.lang = "es-ES";
  speechRecognizer.start();

  // var finalTranscripts = '';

  speechRecognizer.onresult = function(event) {
    var transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        transcript += event.results[i][0].transcript;
        console.log("transcript", transcript);
        console.log("has or not", vocabWords.has(transcript));
        if (vocabWords.has(transcript)) {
          r.setAttribute("color", "#5DB145");
          r.setAttribute("value", transcript);
        } else {
          r.setAttribute("color", "white");
          r.setAttribute("value", transcript);
        }
      }
    }

    // console.log("value", r.getAttribute("value"))
    // console.log("value type", typeof r.getAttribute("value"))
    // console.log(r.getAttribute("value") === "los libros")
  };

  speechRecognizer.onerror = function(event) {};
} else {
  // r.innerHTML = "Your browser is not supported. Please use google chrome or update it."
}
