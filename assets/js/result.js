// Add more variables here as needed

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
            console.log(info)

        })
}

getParams();