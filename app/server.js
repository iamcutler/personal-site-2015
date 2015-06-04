'use strict';

var express = require('express'),
    app = express(),
    cons = require('consolidate');

app.set("views", __dirname + '/public');
app.set('view engine', 'html');
app.engine("html", cons.ejs);

// Serve static assets from public
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Application running on port %s', this.address().port);
});
