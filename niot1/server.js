'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const express = require('express');
var cors = require('cors');
const https = require('https');
const fs = require('fs')
    , path = require('path')
    , pfxFile = path.resolve(__dirname, 'aspnetapp.pfx')
    , request = require('request').defaults({rejectUnauthorized:false}); // use this to get rid of cert issues making calls to app:443
const options = {
  pfx: fs.readFileSync('aspnetapp.pfx'),
  passphrase: 'localhost'
};

// App
const app = express();
app.use(cors());
const server = https.createServer(options, app);

app.get('/', (req, res) => {
  var reqOptions = {
      url: 'https://app:443/'
  };
  request(reqOptions, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    return res.json({data: body});
  });
});

server.listen(PORT, () => { console.log(`listening on ${PORT}`) });