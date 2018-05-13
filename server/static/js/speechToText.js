
var vocabWords = new Set(["los libros", "el gato"])

var r = document.getElementById('speech-recognition');

// function startConverting() {
  if ('webkitSpeechRecognition' in window){
    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'es-ES';
    speechRecognizer.start();

    // var finalTranscripts = '';

    speechRecognizer.onresult = function(event) {
      // var interimTranscripts = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        console.log(transcript)
        transcript.replace("\n", "<br>")
          r.setAttribute("value", transcript)
          console.log("value", r.getAttribute("value"))
          console.log("value type", typeof r.getAttribute("value"))
          console.log(r.getAttribute("value") === "los libros")
      }
    }

    speechRecognizer.onerror = function(event) {

    }
  } else {
    // r.innerHTML = "Your browser is not supported. Please use google chrome or update it."
  }
