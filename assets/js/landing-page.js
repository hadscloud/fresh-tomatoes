// Global variables
const panels = document.querySelectorAll('.panel');
var panelOne = document.getElementById('panel-one');
var panelTwo = document.getElementById('panel-two');
var panelThree = document.getElementById('panel-three');
var titleOne = document.createElement('h3');
var titleTwo = document.createElement('h3');
var titleThree = document.createElement('h3');
var panelClick = document.getElementById('panels');
var movieSummary = document.getElementById('summary');
var searchBtnEl = document.querySelector('#search-btn');

// API Keys
var OMDBDataUrl = 'https://www.omdbapi.com/?apikey=767dc988&';
var OMDBImageUrl = 'https://img.omdbapi.com/?apikey=767dc988&';

//Global arrays
var launchPageNumber = [0,1,2,3,4,5,6,7]
var launchPageTitles = [
    "V+for+Vendetta",
    "Kiki's+Delivery+Service",
    "Spirited+Away",
    "Spider-Man:+No+Way+Home",
    "Die+Hard",
    "The+Avengers",
    "Frozen",
    "Tarzan",
];

//Landing page posters
var launchPagePosters = {
    VforVendetta: 'https://images3.alphacoders.com/266/266715.jpg',
    TheAvengers: 'https://images5.alphacoders.com/481/481123.jpg',
    SpiderManNoWayHome: 'https://knowinsiders.com/stores/news_dataimages/hangdt/042021/18/23/3107_Spider-Man-No-Way-Home-1.jpg?rt=20210418233112?randTime=1623794761',
    KikisDeliveryService: 'https://cdn.suwalls.com/wallpapers/anime/kikis-delivery-service-30125-2560x1600.jpg',
    DieHard: 'https://wallpapercave.com/wp/wp1933244.jpg',
    SpiritedAway: 'https://d1e4pidl3fu268.cloudfront.net/875e245f-ebfa-4815-8c76-8f3e8f265bc2/826663181579_animespiritedawaydvdprimary.crop_1063x797_0,344.preview.jpg',
    Frozen: 'https://images6.alphacoders.com/491/491326.jpg',
    Tarzan: 'https://c4.wallpaperflare.com/wallpaper/58/531/792/tarzan-wallpaper-preview.jpg',
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

function landingPageParams(numArray) {
    var i = numArray.length;
    var j;
    var selection = [];
    var urls = [];
            
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        selection.push(numArray[j]);
        numArray.splice(j,1);
    }
    selection.splice(3,3)
    urls = [
        OMDBDataUrl + 't=' + launchPageTitles[selection[0]],
        OMDBDataUrl + 't=' + launchPageTitles[selection[1]],
        OMDBDataUrl + 't=' + launchPageTitles[selection[2]],
    ]
    landingPageFetch(urls)

}

function landingPageFetch (urlArray) {
    fetch(urlArray[0])
        .then(function (response) {
            if (!response.ok) {
            throw response.json();
            }
    
            return response.json();
        })
        .then(function (data) {
            titleOne.textContent = data.Title;
            var posterSelect = data.Title.split('');
            for (var i = 0; i < posterSelect.length; i++) {
                if(posterSelect[i] === " " || posterSelect[i] === ":" || posterSelect[i] === "'" || posterSelect[i] === "-") {
                    posterSelect.splice(i,1,"");
                    i--;
                }
            }
            var posterSelectConcat = posterSelect.join('');
            panelOne.setAttribute("style", "background-image: url(" + "'" + launchPagePosters[posterSelectConcat] + "'" + ");");
            panelOne.appendChild(titleOne);
        })
    fetch(urlArray[1])
        .then(function (response) {
            if (!response.ok) {
            throw response.json();
            }
    
            return response.json();
        })
        .then(function (data) {
            titleTwo.textContent = data.Title;
            var posterSelect = data.Title.split('');
            for (var i = 0; i < posterSelect.length; i++) {
                if(posterSelect[i] === " " || posterSelect[i] === ":" || posterSelect[i] === "'" || posterSelect[i] === "-") {
                    posterSelect.splice(i,1,"");
                    i--;
                }
            }
            var posterSelectConcat = posterSelect.join('');
            panelTwo.setAttribute("style", "background-image: url(" + "'" + launchPagePosters[posterSelectConcat] + "'" + ");");
            panelTwo.appendChild(titleTwo);
        })
    fetch(urlArray[2])
        .then(function (response) {
            if (!response.ok) {
            throw response.json();
            }
    
            return response.json();
        })
        .then(function (data) {
            titleThree.textContent = data.Title;
            var posterSelect = data.Title.split('');
            for (var i = 0; i < posterSelect.length; i++) {
                if(posterSelect[i] === " " || posterSelect[i] === ":" || posterSelect[i] === "'" || posterSelect[i] === "-") {
                    posterSelect.splice(i,1,"");
                    i--;
                }
            }
            var posterSelectConcat = posterSelect.join('');
            panelThree.setAttribute("style", "background-image: url(" + "'" + launchPagePosters[posterSelectConcat] + "'" + ");");
            panelThree.appendChild(titleThree);
        })
}

function loadSummary(title) {
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
            })
        })
}

function eventHandler(event) {
    if(event.target.parentElement.id !== 'panels') {
        return;
    }
    movieSummary.innerHTML = '';
    loadSummary(event.target.innerText)
}
    
landingPageParams(launchPageNumber);
panelClick.addEventListener("click", eventHandler);
searchBtnEl.addEventListener('click', handleSearchButton);
document.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        handleSearchButton(event);
    }
})

