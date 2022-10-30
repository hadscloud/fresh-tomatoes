var searchBtnEl = document.querySelector('#search-btn');
var resultTextEl = document.getElementById('result-text');
var resultContentEl = document.getElementById('result-content');
var pageNumber = document.getElementById('page-number');
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");
var index = 0;
var totalPages = [];

var OMDBDataUrl = 'https://www.omdbapi.com/?apikey=767dc988&';

function searchResults(title) {
    var searchTitle = title.split('');

    for (var i = 0; i < searchTitle.length; i++) {
        if(searchTitle[i] === " ") {
            searchTitle.splice(i,1,"+");
        }
    }
    var titleQuery = searchTitle.join('')
    var queryString = './search-results.html?q=' + titleQuery;
    location.assign(queryString);
}

function handleSearchButton(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    var resultsQuery = OMDBDataUrl + 's=' + searchInputVal;
    fetch(resultsQuery)
      .then(function (response) {
          if (!response.ok) {
              throw response.json();
          }
  
          return response.json();
      })
      .then(function (queryResults) {
          var pages = Math.ceil(queryResults.totalResults/10);
          var queryString = './search-listing.html?q=' + searchInputVal + '&totalpages=' + pages;
          location.assign(queryString);
      })
}

function pageSelect(direction) {
    var searchParamsArr = document.location.search.split('&');
    var title = searchParamsArr[0].split('=').pop();

    index = index + direction;
    if (index < 0) { 
        index = totalPages.length - 1; 
    } 
    else if (index > totalPages.length - 1) { 
        index = 0;
    }

    pageNumber.textContent = totalPages[index];
    getList(title);
}

function initialLoad() {
    var searchParamsArr = document.location.search.split('&');
    var title = searchParamsArr[0].split('=').pop();
    var pageCount = parseInt(searchParamsArr[1].split('=').pop(),10);

    for (var i = 0; i < pageCount; i++) {
        totalPages[i] = i + 1;
    }

    resultTextEl.textContent = title;
    pageNumber.textContent = totalPages[0];
    getList(title);
}

function getList(title) {
    var page = pageNumber.textContent;
    var urlQuery = OMDBDataUrl + 's=' + title + '&page=' + page;
    resultContentEl.innerHTML = '';    

    fetch(urlQuery)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (queryResults) {
            console.log(queryResults)
            if (!queryResults.Search.length) {
                console.log('No results found!');
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            }
            
            for (var i = 0; i < queryResults.Search.length; i++) {
                var card = document.createElement('div');
                card.setAttribute('class', 'card is-flex is-align-content-center mx-4 my-5 ');
                var movieTitle = document.createElement('div');
                movieTitle.setAttribute('class', 'card-content mt-6 is-clickable');
                var moviePoster = document.createElement('img');
                moviePoster.setAttribute('class', 'card-image is-inline');
                if(queryResults.Search[i].Poster !== 'N/A') {
                    moviePoster.setAttribute('src', queryResults.Search[i].Poster);
                }
                else {
                    moviePoster.setAttribute('src', 'https://bulma.io/images/placeholders/320x480.png');    
                }
                movieTitle.textContent = queryResults.Search[i].Title;
                card.appendChild(moviePoster);
                card.appendChild(movieTitle);
                resultContentEl.appendChild(card)
            }
            resultContentEl.addEventListener('click', function(event) {
                console.log(event)
                if(event.target.classList[0] === 'card') {
                    searchResults(event.target.children[1].innerText);
                }
                else if(event.target.classList[0] === 'card-image') {
                    searchResults(event.target.nextSibling.innerText);
                }
                else if(event.target.classList[0] === 'card-content') {
                    searchResults(event.target.innerText);
                }
            })
        })
        .catch(function (error) {
            console.error(error);
        });
}

initialLoad();
next.addEventListener('click', function(event) {
    event.stopPropagation();
    pageSelect(1);
});
prev.addEventListener('click', function(event) {
    event.stopPropagation();
    pageSelect(-1);
});

searchBtnEl.addEventListener('click', handleSearchButton);
document.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        handleSearchButton(event);
    }
})

