const router = require('express').Router()
module.exports = router


// You can find your project ID in your Dialogflow agent settings
const projectId = 'barista-bot-5425c'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const languageCode = 'Spanish-es';

// Instantiate a DialogFlow client.
// import dialogflow from 'dialogflow';
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient({ keyFilename: './Barista-Bot-4bab6ebe4a92.json' });

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);
//-------------------------------------------------------------------   NEW STARTS
// router.get('/:usersays', (req, res, next) => {
//   const query = req.params.usersays;
//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         text: query,
//         languageCode: languageCode,
//       },
//     },
//   };

router.put('/', (req, res, next) => {
  // const resJson = JSON.parse(req.body)
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
      const response = result.fulfillmentText // OUR BOTS RESPONSE
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


//-------------------------------------------------------------------   NEW ENDS
// const query = 'hola'; //instead we have req.body.usersays, see above line#5!!!
// The text query request.

// const request = {
//   session: sessionPath,
//   queryInput: {
//     text: {
//       text: query,
//       languageCode: languageCode,
//     },
//   },
// };

// // Send request and log result
// sessionClient
//   .detectIntent(request)
//   .then(responses => {
//     console.log('Detected intent');
//     const result = responses[0].queryResult;
//     console.log(`  Query: ${result.queryText}`);
//     console.log(`  Response: ${result.fulfillmentText}`);
//     if (result.intent) {
//       console.log(`  Intent: ${result.intent.displayName}`);
//     } else {
//       console.log(`  No intent matched.`);
//     }
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
