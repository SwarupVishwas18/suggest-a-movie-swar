// Take all elements

let searchIcon = document.querySelector('#searchIcon');
let searchSec = document.querySelector('#search-section');
let closeBtn = document.querySelector('#close-btn');
let mobS = document.querySelector('#mobSearchIcon');
let lines = document.querySelector('#lines');
let mobNav = document.querySelector('#mob-nav');
let qry = document.querySelector('#query');
searchIcon.addEventListener('click', function(e){
    e.preventDefault();
    console.log("Hell");
    searchSec.style.display = 'flex';
    query.autofocus = true;
});

mobSearchIcon.addEventListener('click', function(e){
    e.preventDefault();
    searchSec.style.display = 'flex';
});

closeBtn.addEventListener('click', function(e){
    e.preventDefault();
    searchSec.style.display = 'none';
});

lines.addEventListener('click', function(e){
    e.preventDefault();
    console.log(mobNav.style.display);
    if(mobNav.style.display == '' || mobNav.style.display == 'none'){
    mobNav.style.display = 'block';
    }else{
        mobNav.style.display = 'none';
    }
});