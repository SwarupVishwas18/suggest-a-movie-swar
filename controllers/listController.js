const bodyParser = require('body-parser');
const https = require('https');
const functions = require('./functions');
const store = require('store2');

const ejs = require('ejs');
const { query } = require('express');
const img = 'https://image.tmdb.org/t/p/original/';
let base = "https://api.themoviedb.org/";
let key = "a464f40d479967686effa8e1d4defd1d";
var trbd,sim, cast, bd, tvbd, trtvbd, sertvbd, serbd, movbd;
var req1, req2;
let page = 1;

module.exports = function(app){
    app.get('/list/guest', function(req, res){
        var guest = functions.checkCookie('guest')
        var watchListMovies = functions.getList('moviewatchlist');
        var watchedMovies = functions.getList('moviewatched');
        var watchListTv = functions.getList('tvwatchlist');
        var watchedTv = functions.getList('tvwatched');

        console.log(watchListMovies);
        console.log(watchedMovies);
        console.log(watchListTv);
        console.log(watchedTv);

        res.render('guestProfile', {watchListMovies: watchListMovies, watchedMovies: watchedMovies, watchListTv: watchListTv, watchedTv: watchedTv, guest:guest})
    })
}