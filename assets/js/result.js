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

function getParams() {
    var searchParamsArr = document.location.search.split('&')
    var title = searchParamsArr[0].split('=').pop();
    var movieId = searchParamsArr[1].split('=').pop();

    resultInfo(movieId);
  }

function resultInfo(query) {
    var url = OMDBDataUrl + "i=" + query;
    fetch(url)
        .then(function (response) {
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
            console.log(actors);
            act1El.textContent = actors[0];
            act2El.textContent = actors[1];
            act3El.textContent = actors[2];
            posterEl.setAttribute("src", info.Poster);


        })
}
getParams();