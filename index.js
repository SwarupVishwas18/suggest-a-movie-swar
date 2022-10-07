const express = require('express');
const movieController = require('./controllers/movieController');
const tvController = require('./controllers/tvCotroller');
const navController = require('./controllers/navlinkController');
const path = require('path');

var app = express();

// Set Up Templates Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Static Files
app.use('/assets', express.static('./assets'));

// Fire Controllers
movieController(app);
tvController(app);
navController(app);
// Listen To Port
app.listen(3000);
console.log("Listening to port 3000");