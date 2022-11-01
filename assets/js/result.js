// Add more variables here as needed
var titleEl = document.querySelector("#title");
var releaseEl = document.querySelector("#release");
var synopsisEl = document.querySelector("#synopsis");
var act1El = document.querySelector("#act1");
var act2El = document.querySelector("#act2");
var act3El = document.querySelector("#act3");
var posterEl = document.getElementById('poster');


var OMDBDataUrl = 'https://www.omdbapi.com/?apikey=767dc988&';
var OMDBImageUrl = 'https://img.omdbapi.com/?apikey=767dc988&';
var WikiURL = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php';

function getParams() {
    var searchParamsArr = document.location.search.split('&')
    var title = searchParamsArr[0].split('=').pop();
    var movieId = searchParamsArr[1].split('=').pop();

    resultInfo(movieId, title);
}

function resultInfo(queryID, queryTitle) {
    var infoURL = OMDBDataUrl + "i=" + queryID + '&plot=full';
    var titleAdapt = queryTitle.split('');

    for (var i = 0; i < titleAdapt.length; i++) {
        if(titleAdapt[i] === "+") {
            titleAdapt.splice(i,1,"%20");
        }
    }
    var wikiTitle = titleAdapt.join('');
    console.log(wikiTitle);

    fetch(infoURL)
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (info) {
            //assign info values to the various text and images in search-results.html

            titleEl.textContent = info.Title;
            releaseEl.textContent += ": " + info.Released;
            synopsisEl.textContent = info.Plot;

            var actors = info.Actors.split(",");
            
            act1El.textContent = actors[0];
            act2El.textContent = actors[1];
            act3El.textContent = actors[2];
            posterEl.setAttribute("src", info.Poster);
        })

    var wikiURL = WikiURL + '?action=parse&page=Pet_door&format=json';
    console.log(wikiURL);
    fetch(wikiURL)
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (wiki) {
            console.log(wiki);
        }) 
}
getParams();