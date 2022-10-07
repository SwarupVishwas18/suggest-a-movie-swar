// const localStorage = require('localStorage');
// const { default: store } = require('store2');
const store = require('store2');
const https = require('https');
var getFromStorage = function(name){
    var data = store(name)
    console.log(data);
    return data;
}

var getList = function(name, type){
    var data = getFromStorage(name);

    if(data){
        var coo = {};
        var items = data.split('100001');
        console.log(items);
        var label = false;
        items.forEach(item => {
            item = item.trim();
                label =  true;
                coo.push(item);
            console.log(item);

            let url = `https://api.themoviedb.org/3/${type}/${item}?api_key=a464f40d479967686effa8e1d4defd1d&language=en-US`;
              
            https.get(url, (resp) => {
              var data2 = '';
            
              // A chunk of data has been received.
              resp.on('data', (chunk) => {
                data2 += chunk;
              });
            
              // The whole response has been received. Print out the result.
              resp.on('end', () => {
                data2 = JSON.parse(data2);
                if(type=='movie'){
                coo[item] = data2.results.title;
                }else if(type == 'tv'){
                    coo[item] = data2.results.name;
                }
              });
            
            }).on("error", (err) => {
              console.log("Error: " + err.message);
            });
        });
        return coo;
        
    }else{
        console.log("Hello" + name);
        return false;
    }


}

var checkCookie = function(name){
    var cookies = getFromStorage(name)

    if(cookies){
        return true; 
    }else{
        return false;
    }
}

var addToList = function(id, name){
    if(checkCookie(name)){
        var cookie = store(name);

        cookie = cookie.concat(id.toString(),'100001');
    }
    else{
        cookie = id.toString().concat('100001');
    }

    return cookie;
}

var isPresent = function( id, name){
    var cookies = getFromStorage(name);

    if(cookies){
        var items = cookies.split('100001');
        console.log(items);
        var label = false;
        items.forEach(item => {
            item = item.trim();
            if(item == id.toString()){
                label =  true;
            }
            console.log(item);
        });
        return label
        
    }else{
        console.log("Hello" + name);
        return false;
    }
}

module.exports = {
    getFromStorage : getFromStorage,
    checkCookie : checkCookie, 
    addToList : addToList,
    isPresent : isPresent, 
    getList : getList
}