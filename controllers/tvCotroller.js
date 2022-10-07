const bodyParser = require('body-parser');
const localStorage = require('localStorage');
const https = require('https');
const functions = require('./functions');
const cookieParser = require('cookie-parser');

let enc = bodyParser.urlencoded({extended:false});
const ejs = require('ejs');
const { query } = require('express');
const { default: store } = require('store2');
const img = 'https://image.tmdb.org/t/p/original/';
let base = "https://api.themoviedb.org/";
let key = "a464f40d479967686effa8e1d4defd1d";
var trbd,sim, cast, bd, tvbd, trtvbd, sertvbd, serbd, movbd;
var req1, req2;
let page = 1;

module.exports = function(app){

    app.get('/tv/:id', function(req, res){
      var success = false
      if(req.query.success){
        success = true;
      }


      // var guest = functions.checkCookie('guest');
      let id = req.params.id;

      // Check If Given Item Is Present Or Not

      // var isPresentWatchList = functions.isPresent(id, 'tvwatchlist');
      // var isPresentWatched = functions.isPresent( id, 'tvwatched');

        let url = `https://api.themoviedb.org/3/tv/${id}?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
        https.get(url, (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              movbd = JSON.parse(data);
              let casturl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
              https.get(casturl, (resp) => {
                  let data = '';
                
                  // A chunk of data has been received.
                  resp.on('data', (chunk) => {
                    data += chunk;
                  });
                
                  // The whole response has been received. Print out the result.
                  resp.on('end', () => {
                    cast = JSON.parse(data).cast;
      
                    if(cast.length > 5){
                      cast = cast.slice(0,5)
                    }
                    let simurl = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
              https.get(simurl, (resp) => {
                  let data = '';
                
                  // A chunk of data has been received.
                  resp.on('data', (chunk) => {
                    data += chunk;
                  });
                
                  // The whole response has been received. Print out the result.
                  resp.on('end', () => {
                    sim = JSON.parse(data).results;
      
                    if(sim.length > 5){
                      sim = sim.slice(0,5)
                    }
                    res.render('tv', {result: movbd, casts: cast, sims: sim, success : success});
                  });
                
                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                });
                  });
                
                
                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                });
            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
    });

    // app.get('/tv/addWatched/:id', function(req, res){
    //   app.use(cookieParser());

    //   var id = req.params.id;
    //   if(guest){
    //     var watched = functions.addToList(req.params.id, 'tvwatched');
    //     store('watched', watched)

    //   res.redirect(`/tv/${id}?success=true`)
    //   }else{
    //     res.redirect('/signup')
    //   }
    // })

    // app.get('/tv/addWatchList/:id', function(req, res){
    //   app.use(cookieParser());

    //   var guest = functions.checkCookie(app, 'guest', req)
    //   var id = req.params.id;

    //   if(guest){
    //     var watched = functions.addToList(req.params.id, 'tvwatchlist');
    //     store('tvwatchlist', watched)
    //   res.redirect(`/tv/${id}?success=true`)
    //   }else{
    //     res.redirect('/signup')
    //   }
    // })

    app.get('/tvsimilar/:id', function(req, res){
  var guest = functions.checkCookie(app, 'guest', req);
  let id = req.params.id;
        let url = `https://api.themoviedb.org/3/tv/${id}?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
        https.get(url, (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              movbd = JSON.parse(data);
              var moviename = movbd.name;
              let casturl = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
              
              https.get(casturl, (resp) => {
                let data2 = '';
              
                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                  data2 += chunk;
                });
              
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    sertvbd = JSON.parse(data2);

                  res.render('tvsimilar', {results: sertvbd.results, moviename: moviename});
                });

              
              }).on("error", (err) => {
                console.log("Error: " + err.message);
              });
            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
      });

      
      app.get('/tvcast/:id', function(req, res){
  var guest = functions.checkCookie(app, 'guest', req);
  let id = req.params.id;
        let url = `https://api.themoviedb.org/3/tv/${id}?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
        https.get(url, (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              movbd = JSON.parse(data);
              var moviename = movbd.name;
              let casturl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
              
              https.get(casturl, (resp) => {
                let data2 = '';
              
                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                  data2 += chunk;
                });
              
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    sertvbd = JSON.parse(data2);

                  res.render('cast', {casts: sertvbd.cast, moviename: moviename, guest: guest});
                });
              
              }).on("error", (err) => {
                console.log("Error: " + err.message);
              });
            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
      });

}