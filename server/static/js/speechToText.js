
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
        // if (event.results[i].isFinal) {
        //   finalTranscripts += transcript;
        // } else {
        //   interimTranscripts += transcript;
        // }
        // r.setAttribute("value", transcript)
        // console.log("vocabWords", vocabWords)
        // console.log("vocabWords has los libros", vocabWords.has(transcript))
        // console.log("transcript type", typeof transcript)

          // r.setAttribute("color", "#50A534")
          r.setAttribute("value", transcript)

          console.log("value", r.getAttribute("value"))
          console.log("value type", typeof r.getAttribute("value"))
          console.log(r.getAttribute("value") === "los libros")


        // if (r.getAttribute("value") === "los libros"){
        // while (vocabWords.includes(r.getAttribute("value"))){
        //   r.setAttribute("color", "#50A534")
        // }
        // }
      }
      // r.innerHTML = finalTranscripts + '<span style="color: #999">' + interimTranscripts + '</span>';
      // r.setAttribute("value", transcript)
    }

    speechRecognizer.onerror = function(event) {

    }
  } else {
    // r.innerHTML = "Your browser is not supported. Please use google chrome or update it."
  }
// }
