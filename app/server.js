'use strict';

var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    app_port = process.env.PORT || 3000;

app.set("views", __dirname + '/public/html');
app.set('view engine', 'html');
app.engine("html", cons.ejs);

// Serve static assets from public
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(app_port, function() {
    console.log('Application running on port %s', app_port);
});
