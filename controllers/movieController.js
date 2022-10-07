const bodyParser = require('body-parser');
const https = require('https');
const functions = require('./functions');
const cookieParser = require('cookie-parser');
const store2 = require('store2')
let enc = bodyParser.urlencoded({extended:false});
const ejs = require('ejs');
const { default: store } = require('store2');
const img = 'https://image.tmdb.org/t/p/original/';
let base = "https://api.themoviedb.org/";
let key = "a464f40d479967686effa8e1d4defd1d";
var trbd,sim, cast, bd, tvbd, trtvbd, sertvbd, serbd, movbd;
var req1, req2;
let page = 1;
module.exports = function(app){
  app.get('/movie/:id', function(req, res){

    var success = false
      if(req.query.success){
        success = true;
      }
  // var guest = functions.checkCookie(app, 'guest', req);

        let id = req.params.id;
      //   var isPresentWatchList = functions.isPresent( id, 'moviewatchlist');
      // var isPresentWatched = functions.isPresent( id, 'moviewatched');
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
        https.get(url, (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              console.log(JSON.parse(data));
              movbd = JSON.parse(data);
              let casturl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
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
              let simurl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
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
              // res.render('movie', {result: movbd, casts: cast, sims: sim, guest : guest,  success : success, isPresentWatchList: isPresentWatchList, isPresentWatched: isPresentWatched});
              res.render('movie', {result: movbd, casts: cast, sims: sim,  success : success});
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


    
    app.get('/movie/addWatched/:id', function(req, res){
      app.use(cookieParser());

      var guest = functions.checkCookie(app, 'guest', req)
      var id = req.params.id;
      if(guest){
        var watched = functions.addToList(app, req,req.params.id, 'moviewatched');
        store('moviewatched', watched)
      res.redirect(`/movie/${id}?success=true`)
      }else{
        res.redirect('/signup')
      }
    })

    app.get('/movie/addWatchList/:id', function(req, res){
      app.use(cookieParser());

      var guest = functions.checkCookie(app, 'guest', req)
      var id = req.params.id;

      if(guest){
        var watched = functions.addToList(app, req,req.params.id, 'moviewatchlist');
        store('moviewatchlist', watched)
      res.redirect(`/movie/${id}?success=true`)

      }else{
        res.redirect('/signup')
      }
    })
  



    app.post('/movie', function(req, res){
        
    });

    app.delete('/movie', function(req, res){
        
    });

 

        app.get('/cast/:id', function(req, res){
      var guest = functions.checkCookie(app, 'guest', req);
      let id = req.params.id;
          let url = `https://api.themoviedb.org/3/movie/${id}?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
          https.get(url, (resp) => {
              let data = '';
            
              // A chunk of data has been received.
              resp.on('data', (chunk) => {
                data += chunk;
              });
            
              // The whole response has been received. Print out the result.
              resp.on('end', () => {
                console.log(JSON.parse(data));
                movbd = JSON.parse(data);
                var moviename = movbd.title;
                let casturl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
                
                https.get(casturl, (resp) => {
                  let data2 = '';
                
                  // A chunk of data has been received.
                  resp.on('data', (chunk) => {
                    data2 += chunk;
                  });
                
                  // The whole response has been received. Print out the result.
                  resp.on('end', () => {
                    console.log(JSON.parse(data2));
                      sertvbd = JSON.parse(data2);
  
                    res.render('cast', {casts: sertvbd.cast, moviename: moviename, guest : guest});
                  });
                
                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                });
              });
            
            }).on("error", (err) => {
              console.log("Error: " + err.message);
            });
        });


        app.get('/similar/:id', function(req, res){
      var guest = functions.checkCookie(app, 'guest', req);
      let id = req.params.id;
          let url = `https://api.themoviedb.org/3/movie/${id}?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
          https.get(url, (resp) => {
              let data = '';
            
              // A chunk of data has been received.
              resp.on('data', (chunk) => {
                data += chunk;
              });
            
              // The whole response has been received. Print out the result.
              resp.on('end', () => {
                console.log(JSON.parse(data));
                movbd = JSON.parse(data);
                var moviename = movbd.title;
                let casturl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
                
                https.get(casturl, (resp) => {
                  let data2 = '';
                
                  // A chunk of data has been received.
                  resp.on('data', (chunk) => {
                    data2 += chunk;
                  });
                
                  // The whole response has been received. Print out the result.
                  resp.on('end', () => {
                    console.log(JSON.parse(data2));
                      sertvbd = JSON.parse(data2);
  
                    res.render('similar', {results: sertvbd.results, moviename: moviename, guest : guest});
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