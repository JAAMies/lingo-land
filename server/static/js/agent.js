// You can find your project ID in your Dialogflow agent settings
const projectId = 'barista-bot-5425c'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const query = 'hola';
const languageCode = 'Spanish-es';

// Instantiate a DialogFlow client.
// import dialogflow from 'dialogflow';
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient({keyFilename: '/Users/AllaY/Downloads/Barista-Bot-4bab6ebe4a92.json'});

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
