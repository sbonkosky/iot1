'use strict';

const fs = require('fs');
const key = fs.readFileSync('./server.pem');
const cert = fs.readFileSync('./server.crt');

const express = require('express');
const https = require('https');
var cors = require('cors');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors());
const server = https.createServer({key: key, cert: cert }, app);

app.get('/', (req, res) => {
  res.json({data: "Hello World"});
});

//app.listen(PORT, HOST);
server.listen(PORT, () => { console.log(`listening on ${PORT}`) });