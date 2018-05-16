//var r = document.getElementById('result');

async function speak(text, vox) {
  // if (vox ) 
  console.log('see here ------>', vox)
  var msg = new SpeechSynthesisUtterance();
  msg.lang = 'es-ES'
  console.log(msg)
  msg.text = text;
  msg.voice = await speechSynthesis.getVoices().find((voice) => voice.name === vox);
  console.log("msg.voice", msg.voice)
  window.speechSynthesis.speak(msg);
}

function startConverting(bot) {
  console.log('start converting ----------> ')
  if (!('webkitSpeechRecognition' in window)) return

  const sessionId = uuid.v4()

  function startConverting(bot) {
    console.log('our bot ---> ', bot)
    console.log('start converting ----------> ')
    if (!('webkitSpeechRecognition' in window)) return

    const sessionId = uuid.v4()

    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'es-ES';
    speechRecognizer.start();

    speechRecognizer.onresult = function (event) {
      console.log('speech result', event)

      console.log('body:', body)
      var vox = bot === 'barista' ? 'Jorge' : 'Paulina';
      fetch(`/${bot}/${sessionId}`, {
        method: 'PUT',
        body,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(response => response.json())
        .then(response => {
          response = response.toString().toLowerCase();
          if (response.includes('gracias') || response.includes('adios')) {
            speak(response, vox);
            speechRecognizer.stop();
          } else speak(response, vox);
        })
        .catch(error => console.error('Error:', error))
    }
    if (!usersays) return

    const body = JSON.stringify({
      usersays
    })

    console.log('body:', body)
    var vox = bot === 'barista' ? 'Paulina' : 'Paulina'//'Paulina';
    fetch(`/${bot}/${sessionId}`, {
      method: 'PUT',
      body,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(response => {
        response = response.toString().toLowerCase();
        if (response.includes('gracias') || response.includes('adios')) {
          speak(response, vox);
          speechRecognizer.stop();
        } else speak(response, vox);
      })
      .catch(error => console.error('Error:', error))
  }

  return speechRecognizer;
}

document.getElementById('barista').addEventListener('click', () => {
  startConverting('barista');
  document.getElementById('barista').setAttribute('material', 'color: green')
})

document.getElementById('stanger').addEventListener('click', () => {
  startConverting('stanger');
  document.getElementById('stanger').setAttribute('material', 'color: green')
})