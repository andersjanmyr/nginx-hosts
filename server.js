var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');

var filename = process.env.NGINX_FILE || '/etc/nginx/conf.d/default.conf';
if (process.argv[2])
  filename = process.argv[2];

var pattern = /server_name (.*);/g

app.get('/', function (req, res) {
  console.log('Reading file', filename)
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    var servers = matchAll(data, pattern);
    res.type('html')
    res.send(generatePage(servers));
  });
});

app.get('/style.css', function (req, res) {
  res.sendFile(__dirname + '/style.css');
});

function matchAll(str, regex) {
  var res = [];
  var m;
  while (m = regex.exec(str)) {
    res.push(m[1]);
  }
  return _.uniq(res);
}

function generatePage(servers) {
  var html = `<html>
  <head>
  <title>Available Services</title>
  <link rel="stylesheet" href="style.css">
  <body>
  <h1>Available Services</h1>
  <ul>
  ${servers.map(item).join('\n')}
  </ul>
  </body>
  </html>`
  return html;
}

function item(server) {
  return `<li><a href="//${server}">${server}</a></li>`;
}

var server = app.listen(process.env.PORT||3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server started on http://%s:%s', host, port);
});
