const PROMPTS = [
    {
        character1: 'foreign exchange student',
        setting: 'sitting next to you',
        verb: 'show',
        subject: 'around campus',
        wordBank: ['estudiante de intercambio', 'nombre', 'de donde eres', 'donde esta', 'clase', 'profesor', 'campus', 'el café', 'residencia universitaria', 'biblioteca' ]
    },
    {
        character1: 'tourist',
        setting: 'standing next to you at the bus stop',
        verb: 'help',
        subject: 'navigate the city',
        wordBank: ['turista', 'nombre', 'de donde eres', 'donde esta', 'el museo', 'el teatro', 'el campus', 'el café', 'el hotel', 'el restaurante', 'el autobús', 'el tren', 'el avion', 'sube al autobús', 'bajar del autobús', 'girar a la izquierda', 'girar a la derecha' ]
    },
    {
        character1: 'good-looking single man/woman',
        setting: 'next to you',
        verb: 'join',
        subject: 'for a cup of coffee',
        wordBank: ['guapo/a', 'bonito/a', 'hermoso/a', 'lindo/a', 'chulo/a', 'salir en una cita', 'beber café', 'conmigo', 'tu teléfono', 'llámame', 'te quiero']
    },
    {
        character1: 'stranger in a new city',
        setting: 'next to you in line at the cafe',
        verb: 'recommend',
        subject: 'something the locals like to eat',
        wordBank: ['cuidad', 'el restaurante', 'comida local/cultural']
    },
    {
        character1: 'lost passenger',
        setting: 'in the seat next to you',
        verb: 'direct',
        subject: 'the hotel',
        wordBank: ['pasajero', 'perdido', 'dónde está', 'el hotel']
    },
];

// generates a random number to access a prompt from the promptList
const randomNum = function () {
    let max = PROMPTS.length;
    return Math.floor(Math.random() * Math.floor(max));
};

function generatePrompt(promptList = PROMPTS, num = randomNum()) {
    let player1Prompt = `You are a ${promptList[num].character1}. The person ${promptList[num].setting} seems friendly. Strike up a conversation and ask if they can ${promptList[num].verb} you ${promptList[num].subject}.`;

    let player2Prompt = `The person ${promptList[num].setting} is a ${promptList[num].character1}; ${promptList[num].verb} them ${promptList[num].subject}.`;

    return `Player 1:
    ${player1Prompt}

    Player 2:
    ${player2Prompt}

    Word Bank:
    ${promptList[num].wordBank.join(" | ")}`;
}
// when 'Get New Prompt' button is clicked, a new prompt is generated and displayed

document.getElementById('get-prompt-button').addEventListener('click', function () {
    let prompt = generatePrompt();
    NAF.connection.broadcastDataGuaranteed("prompt", prompt);
    setPromptText(prompt);
});

function setPromptText(message) {
    let text = document.getElementById("do-that");
    text.setAttribute("value", message)
}

NAF.connection.subscribeToDataChannel('prompt', function (sender, type, message) {
    setPromptText(message);
})
