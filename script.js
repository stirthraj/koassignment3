// http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc?&api_key=40287c4c0632db7267b9149ba5df9928
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images
// https://api.themoviedb.org/3/movie/157336?api_key=40287c4c0632db7267b9149ba5df9928&append_to_response=videos,images
// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
//https://api.themoviedb.org/3/movie/343611?api_key={api_key}

const baseURL = 'http://api.themoviedb.org/3'; 
const APIKEY ='40287c4c0632db7267b9149ba5df9928';
var config1 ='/discover/movie?&api_key=';
let baseImageUrl=null;
const a=document.getElementById('a');
let source=null;

// var narr = (fetch(url).then(res => { return res.json() }).then(data => { console.log(data.results) })).map(x);

let getConfig = function () {
    
    let url = "".concat(baseURL, config1, APIKEY);
    fetch(url).then(res => { return res.json() }).then(data => { 
        for(var i=0;i<data.results.length;i++) {
            a.innerHTML += '<div class="img11"><img src="https://image.tmdb.org/t/p/w300/' + data.results[i].backdrop_path + '" alt="A"/><br><div id="text1"><span style="color:yellow;">*</span>' + data.results[i].vote_average + '<br><h3>' + data.results[i].original_title + '</h3><br>' + data.results[i].overview +'</div></div>';
        };

    })
}
document.addEventListener('DOMContentLoaded', getConfig);


let baseImageUrl1 = null;
const b = document.getElementById('b');
let source1 = null;
let config2 ='/trending/all/day?&api_key=';


var getConfig1 = function () {
    let url1 = "".concat(baseURL,config2, APIKEY);
    fetch(url1).then(response => { return response.json() }).then(data => {
        for (var i = 0; i < data.results.length; i++) {
            b.innerHTML += '<div class="img11"><img src="https://image.tmdb.org/t/p/w300/' + data.results[i].backdrop_path + '" alt="A" width="300px"/><br><span>' + data.results[i].vote_average + '<br>' + data.results[i].original_title + '</span></div>';
        };
    })
    document.getElementById("search-content-section").style.display = "none";
}
document.addEventListener('DOMContentLoaded', getConfig1);


let config4 = '/search/movie?api_key=';
const d = document.getElementById('d');
let url4 = "".concat(baseURL, config4, APIKEY);

function searchQuery() {
    var content=document.getElementById("main-content-section");
    document.getElementById("search-content-section").style.display = "";
    document.getElementById("detail-content-section").style.display = "none";


    var search_keyword = document.getElementById("search_keyword");
    var text=document.getElementById("sid1").value;
    var tmp_text=text;
    text=text.replace(" ","+");
    url4="".concat(url4,'&query=',text);
    content.style.display="none";
    search_keyword.innerText=tmp_text;
    
    fetch(url4)
    .then(response=>{return response.json()})
    .then(data=>{
        d.textContent="";
        for (var i = 0; i < data.results.length; i++) {
            d.innerHTML += '<div class="img11"><img src="https://image.tmdb.org/t/p/w300/' + data.results[i].backdrop_path + '" alt="A"/><br><div id="text1"><span style="color:yellow;">*</span>' + data.results[i].vote_average + '<br><h3>' + data.results[i].original_title + '</h3><button onclick="detailQuery(' + data.results[i].id +')">Details</button><br>' + data.results[i].overview + '</div></div>';
        };
    });



}
const detailcontent = document.getElementById('detailcontent');


function detailQuery(id) {
    document.getElementById("search-content-section").style.display = "none";
    let url5 = "".concat('https://api.themoviedb.org/3/movie/',id,'?api_key=',APIKEY);
    // alert(url5);
    document.getElementById("detail-content-section").style.display = "";
        fetch(url5)
        .then(response => { return response.json()})
        .then(data => {
            console.log(data);
            detailcontent.innerHTML = '<div><img src="https://image.tmdb.org/t/p/w500/'
                + data.poster_path + '" alt="poster unavailble"/></div><div><h1>'+data.title+
                '</h1><p>' + data.overview + '</p></div><hr><h1>Description:<img src="https://image.tmdb.org/t/p/w500/'
                + data.backdrop_path + '" alt="backdrop_path unavailble"/></h1><ul><li>Adult:'+ data.adult+
             '</li><li>Budget:'
                + data.budget + '</li><li>Homepage:'
                + data.homepage + '</li><li>Original language:'
                + data.original_language + '</li><li>Original title:'
                + data.original_title + '</li><li>Popularity:'
                + data.popularity + '</li><li>Poster:'
                + data.poster_path + '</li><li>Release Date:'
                + data.release_date + '</li><li>Revenue:'
                + data.revenue + '</li><li>Runtime:'
                + data.runtime + '</li><li>Status:'
                + data.status + '</li><li>Tagline:'
                + data.tagline + '</li><li>Title:'
                + data.title + '</li><li>Video:'
                + data.video + '</li><li>Vote Average:'
                + data.vote_average + '</li><li>Vote Count:'
                + data.vote_count +'</li></ul>';  
        });

}




