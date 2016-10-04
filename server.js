var express = require('express');
var app = express();
var serveIndex = require('serve-index');
app.use(express.static(__dirname + "/code"));
app.use('/', serveIndex(__dirname + '/code'));

app.listen(3000, function() { console.log('listening on http://localhost:3000'); });