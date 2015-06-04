'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

// Serve static assets from public
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello iamcutler');
});

app.listen(port, function() {
    console.log('Application running on port %s', port);
});
