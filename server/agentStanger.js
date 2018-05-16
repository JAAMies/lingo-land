const router = require('express').Router()
module.exports = router


// You can find your project ID in your Dialogflow agent settings
const projectId = 'stanger-in-cafe'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id-x';
const languageCode = 'Spanish-es';

// Instantiate a DialogFlow client.
// import dialogflow from 'dialogflow';
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient({ keyFilename: './stanger-in-cafe-5f37be01e389.json' });

// Define session path
//-------------------------------------------------------------------   NEW STARTS

router.put('/:sessionId', (req, res, next) => {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const query = req.body.usersays;
    console.log("OUR BODY IS...", typeof req.body)
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
            const response = result.fulfillmentText
            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
                return response;
            } else {
                console.log(`  No intent matched.`);
            }
        })
        .then(response => res.json(response))
        .catch(err => {
            console.error('ERROR:', err);
        })

})
