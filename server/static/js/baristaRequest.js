var r = document.getElementById('result');

async function speak(text) {
  var msg = new SpeechSynthesisUtterance();
  msg.lang = 'es-ES'
  console.log(msg)
  msg.text = text;
  msg.voice = await speechSynthesis.getVoices().find((voice) => voice.name == "Jorge");
  console.log("msg.voice", msg.voice)
  window.speechSynthesis.speak(msg);
}

function startConverting() {
  if (!('webkitSpeechRecognition' in window)) return

  const sessionId = uuid.v4()

  var speechRecognizer = new webkitSpeechRecognition();
  speechRecognizer.continuous = true;
  speechRecognizer.interimResults = true;
  speechRecognizer.lang = 'es-ES';
  speechRecognizer.start();

  speechRecognizer.onresult = function (event) {
    console.log('speech result', event)

    var usersays = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        usersays += event.results[i][0].transcript;
      }
    }
    if (!usersays) return

    const body = JSON.stringify({
      usersays
    })

    console.log('body:', body)
    fetch(`/barista/${sessionId}`, {
      method: 'PUT',
      body,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(response => speak(response.toString()))
      // console.log('Success:', response))
      .catch(error => console.error('Error:', error))
  }

  // speechRecognizer.onerror = ()=>{}

  return speechRecognizer
}


AFRAME.registerComponent('barista-request', {
  init() {
    this.recognizer = startConverting();
    let barista = document.getElementById('barista');
    barista.addEventListener('click', function () {
      // this.setAttribute('material', 'color:green')
    })
  },

  remove() {
    this.recognizer.stop()
  }
});
