const panels = document.querySelectorAll('.panel');
var pageNumber = document.getElementById('page-number');
var panelClick = document.getElementById('panels');
var movieSummary = document.getElementById('summary');
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");
var searchBtnEl = document.querySelector('#search-btn');
// API Keys
var OMDBDataUrl = 'https://www.omdbapi.com/?apikey=767dc988&';
var OMDBImageUrl = 'https://img.omdbapi.com/?apikey=767dc988&';

var index = 0;
var totalPages = [];

function pageSelect(direction) {

    index = index + direction;
    if (index < 0) { 
        index = totalPages.length - 1; 
    } 
    else if (index > totalPages.length - 1) { 
        index = 0;
    }

    pageNumber.textContent = totalPages[index];
    getFavorites(index);
}

function searchResults(title, id) {
    var searchTitle = title.split('');

    for (var i = 0; i < searchTitle.length; i++) {
        if(searchTitle[i] === " ") {
            searchTitle.splice(i,1,"+");
        }
    }
    var titleQuery = searchTitle.join('')
    var queryString = './search-results.html?q=' + titleQuery + '&movieID=' + id;
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

function loadSummary(title) {
    dataStore = [];
    titleURL = title.replace(/ /g,'+');
    searchURL = OMDBDataUrl + 't=' + titleURL + '&plot=short';

    fetch(searchURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
        
            return response.json();
        })
        .then(function (data) {
            dataStore.push(data.Title)
            dataStore.push(data.imdbID)
            var summaryCardTitle = document.createElement('div');
            var summaryCardContent = document.createElement('div');
            summaryCardTitle.setAttribute("class", "card-header-title");
            summaryCardTitle.setAttribute("style", "color: #fff; font-size: 1.5rem");
            summaryCardContent.setAttribute("class", "card-content");
            summaryCardTitle.textContent = title;
            summaryCardContent.textContent = data.Plot;
            movieSummary.setAttribute("style", "background: #000000; color: #fff; font-family: 'Poppins', sans-serif")
            movieSummary.appendChild(summaryCardTitle);
            movieSummary.appendChild(summaryCardContent);
            var activePanel = document.querySelector('.active');
            activePanel.addEventListener('click', function(event) {
                if(event.target.classList[1] === 'active') {
                    searchResults(data.Title, data.imdbID);
                }
            });
        })
}

function setPanels(favorites) {
    console.log(panels)
    var count = 5 * index;
    console.log(count);
    for(var i = 0; i < 5; i++) {
        if(favorites[i + count]) {
            panels[i].setAttribute("style", "background-image: url(" + "'" + favorites[i + count].poster + "'" + ");");
            panels[i].children[0].textContent = favorites[i + count].title;
        }
        else {
            panels[i].setAttribute("style", "background-image: url(" + "'https://bulma.io/images/placeholders/320x480.png'" + ");")
            panels[i].children[0].textContent = 'Select more favorites!'
        }
    }
}

function getFavorites(indexVal) {
    var favoritesArray = [];
    var keys = Object.keys(localStorage);

    for (var i = 0; i < keys.length; i++) {
        let checkKey = JSON.parse(localStorage.getItem(keys[i]));
        if(checkKey.title && checkKey.search) {
            favoritesArray.push(checkKey);
        }
    }

    var pageCount = Math.ceil(favoritesArray.length/5)

    for (var i = 0; i < pageCount; i++) {
        totalPages[i] = i + 1;
    }

    if(favoritesArray.length <= 5) {
        next.setAttribute('style', 'display:none');
        prev.setAttribute('style', 'display:none');
    }
    else {
        pageNumber.textContent = indexVal + 1;
    }

    setPanels(favoritesArray);
}

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active')
    })
})

function eventHandler(event) {
    if(event.target.parentElement.id !== 'panels') {
        return;
    }
    movieSummary.innerHTML = '';
    loadSummary(event.target.innerText)
}

next.addEventListener('click', function(event) {
    event.stopPropagation();
    pageSelect(1);
});
prev.addEventListener('click', function(event) {
    event.stopPropagation();
    pageSelect(-1);
});

panelClick.addEventListener("click", eventHandler)
searchBtnEl.addEventListener('click', handleSearchButton);
document.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        handleSearchButton(event);
    }
})
getFavorites(index);
