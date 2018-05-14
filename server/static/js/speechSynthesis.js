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
    setTimeout(() => element.setAttribute("visible", "false"), 3000)
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

