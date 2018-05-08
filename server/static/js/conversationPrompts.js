const PROMPTS = [
    {
        character1: 'foreign exchange student',
        setting: 'sitting next to you',
        verb: 'show',
        subject: 'around campus',
    },
    {
        character1: 'tourist',
        setting: 'standing next to you at the bus stop',
        verb: 'help',
        subject: 'navigate the city',
    },
    {
        character1: 'good-looking single man/woman',
        setting: 'next to you',
        verb: 'join',
        subject: 'for a cup of coffee',
    },
    {
        character1: 'stranger in a new city',
        setting: 'next to you in line at the cafe',
        verb: 'recommend',
        subject: 'something the locals like to eat',
    },
    {
        character1: 'lost passenger',
        setting: 'in the seat next to you',
        verb: 'direct',
        subject: 'home',
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

    return `Player 1: ${player1Prompt}
    Player 2: ${player2Prompt}`;
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