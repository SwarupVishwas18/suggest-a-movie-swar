const bodyParser = require('body-parser');
const https = require('https');
const functions = require('./functions');
const localStorage = require('localStorage');

const ejs = require('ejs');
const { default: store } = require('store2');
const img = 'https://image.tmdb.org/t/p/original/';
let base = "https://api.themoviedb.org/";
let key = "a464f40d479967686effa8e1d4defd1d";
var trbd,sim, cast, bd, tvbd, trtvbd, sertvbd, serbd, movbd;
var req1, req2;
let page = 1;
module.exports = function(app){


    app.get('/guest/signup', function(req, res){

        store('guest', true)
        res.redirect('/')
    });

    app.get('/guest/check', function(req, res){
        var data = functions.getFromStorage('guest')

    })

    app.get('/guest/info', function(req,res){
        res.render('guest_info')
    });
      
}