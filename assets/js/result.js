// Add more variables here as needed

var OMDBDataUrl = 'https://www.omdbapi.com/?apikey=767dc988&';
var OMDBImageUrl = 'https://img.omdbapi.com/?apikey=767dc988&';

function getParams() {
    
    var searchParamsArr = document.location.search.split('t=');
  
    // Get the title value
    var query = searchParamsArr[1];
    
    resultInfo(query);
  }

  function resultInfo(query) {
    var url = OMDBDataUrl + "t=" + query;
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (info) {
            //assign info values to the various text and images in search-results.html

        }

  }