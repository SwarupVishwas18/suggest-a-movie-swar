const bodyParser = require('body-parser');
const https = require('https');
const functions = require('./functions');
let enc = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    

    app.get('/', function(req, res){
      var guest = functions.checkCookie(app, 'guest', req);
      res.render('index', {guest : guest});
    });



    app.get('/discover', function(req, res){
        var guest = functions.checkCookie(app, 'guest', req);
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
            https.get(url, (resp) => {
                let data = '';
              
                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                  data += chunk;
                });
              
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                  console.log(JSON.parse(data));
                  bd = JSON.parse(data);
             let tvurl = `https://api.themoviedb.org/3/discover/tv?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

                  https.get(tvurl, (resp) => {
                    let data = '';
                  
                    // A chunk of data has been received.
                    resp.on('data', (chunk) => {
                      data += chunk;
                    });
                  
                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                      console.log(JSON.parse(data));
                        tvbd = JSON.parse(data);

                      res.render('discover', {results: bd.results,tvres : tvbd.results, guest : guest });
                    });
                  
                  }).on("error", (err) => {
                    console.log("Error: " + err.message);
                  });
                });
              
              }).on("error", (err) => {
                console.log("Error: " + err.message);
              });

           
      
    });

    app.get('/trending', function(req, res){
      var guest = functions.checkCookie(app, 'guest', req);
      let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=a464f40d479967686effa8e1d4defd1d`;
        https.get(url, (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              console.log(JSON.parse(data));
              bd = JSON.parse(data);
         let tvurl = `https://api.themoviedb.org/3/trending/tv/day?api_key=a464f40d479967686effa8e1d4defd1d`;

              https.get(tvurl, (resp) => {
                let data = '';
              
                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                  data += chunk;
                });
              
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                  console.log(JSON.parse(data));
                    tvbd = JSON.parse(data);

                  res.render('trending', {results: bd.results,tvres : tvbd.results , guest : guest});
                });
              
              }).on("error", (err) => {
                console.log("Error: " + err.message);
              });
            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
        
    });

    app.get('/login', function(req, res){
      var guest = functions.checkCookie(app, 'guest', req);
      res.render('login',{ guest : guest})
    });

    app.get('/signup', function(req, res){
      var guest = functions.checkCookie(app, 'guest', req);
      res.render('signup',{ guest : guest})
    });

    app.get('/aboutme', function(req, res){
      var guest = functions.checkCookie(app, 'guest', req);
      res.render('about-me',{ guest : guest})
    });

    app.post('/search',enc, function(req, res){
      var guest = functions.checkCookie(app, 'guest', req);
      console.log(req.body.query);
        let qry = req.body.query;
        let url = `https://api.themoviedb.org/3/search/movie?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US&page=1&include_adult=false&query=${qry}`;
        https.get(url, (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              console.log(JSON.parse(data));
              serbd = JSON.parse(data);
              let tvurl = `https://api.themoviedb.org/3/search/tv?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US&page=1&include_adult=false&query=${qry}`;

              https.get(tvurl, (resp) => {
                let data2 = '';
              
                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                  data2 += chunk;
                });
              
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                  console.log(JSON.parse(data2));
                    sertvbd = JSON.parse(data2);

                  res.render('searchResult', {results: serbd.results, tvres: sertvbd.results, query: qry, guest : guest});
                });
              
              }).on("error", (err) => {
                console.log("Error: " + err.message);
              });
            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });

            

        });

        app.get('/profile/:id', function(req, res){
          var guest = functions.checkCookie(app, 'guest', req);
          let id = req.params.id;
            let url = `https://api.themoviedb.org/3/person/${id}?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
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
                  var profile = movbd;
                  let casturl = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
                  
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
                        let casturl = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
                  
                        https.get(casturl, (resp) => {
                          let data2 = '';
                        
                          // A chunk of data has been received.
                          resp.on('data', (chunk) => {
                            data2 += chunk;
                          });
                        
                          // The whole response has been received. Print out the result.
                          resp.on('end', () => {
                            console.log(JSON.parse(data2));
                              tvbd = JSON.parse(data2);
          
                            res.render('profile', {casts: sertvbd.cast,tvcasts: tvbd.cast, profile: profile, guest : guest});
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
}