require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');


// Basic Configuration
const port = process.env.PORT || 3000;
const urlTable = {};
let urlnum = 1;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  let dest = req.body.url;
  let msg = {"original_url": dest, "short_url": urlnum};
  const regex = /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  console.log(regex.test(dest));
  if (!regex.test(dest)) {
    msg = { "error": 'invalid url' };
    console.log("fail");
  };
  dns.lookup(dest, (err) => {
    if (err) {
      msg = { "error": 'invalid url' };
      return;
    };
    urlTable[urlnum] = dest;
    urlnum++;
    console.log(urlTable);
  });
  res.json(msg);
})

app.get('/api/shorturl/:URLNUM', (req, res) => {
  //const newurl = urlTable[req.params.URLNUM];
  //res.json({"url": newurl});
  res.redirect(newurl);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
