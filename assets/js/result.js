// Add more variables here as needed
var searchBtnEl = document.querySelector('#search-btn');
var titleEl = document.querySelector("#title");
var releaseEl = document.querySelector("#release");
var synopsisEl = document.querySelector("#synopsis");
var act1El = document.querySelector("#act1");
var act2El = document.querySelector("#act2");
var act3El = document.querySelector("#act3");
var posterEl = document.querySelector('#poster');
var wikiLinkText = document.querySelector('#in-depth');
var actorOneEl = document.querySelector('#actor-one');
var actorTwoEl = document.querySelector('#actor-two');
var actorThreeEl = document.querySelector('#actor-three');
var fullPlotEl = document.querySelector('#full-plot');
var addFavorite = document.querySelector('#favorite-this');

var OMDBDataUrl = 'https://www.omdbapi.com/?apikey=767dc988&';
var OMDBImageUrl = 'https://img.omdbapi.com/?apikey=767dc988&';
var WikiURL = 'https://en.wikipedia.org/w/api.php';

function getParams() {
    var searchParamsArr = document.location.search.split('&')
    var title = searchParamsArr[0].split('=').pop();
    var movieId = searchParamsArr[1].split('=').pop();

    resultInfo(movieId, title);
}

function favoriteStorage(event) {
    event.stopPropagation();
    var favorite = {
        title: titleEl.textContent,
        search: document.location.search,
        poster: posterEl.src
    }
    console.log(favorite)
    localStorage.setItem(`${favorite.title}`, JSON.stringify(favorite));
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

function getWikiInfoNoYear(title) {
    var wikiURL = WikiURL;
    var params = {
        action: "opensearch",
        search: title,
        format: "json"
    };

    wikiURL = wikiURL + "?origin=*";
    Object.keys(params).forEach(function(key) {
        wikiURL += "&" + key + "=" + params[key];
    })
    fetch(wikiURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function(queryData) {
            if(!queryData[3][0]) {
                wikiLinkText.textContent = "There is no Wiki page for this content! Maybe you should start one?";
            }
            else {
                var titleForPage = title.replace(/_/g,' ');
                var titleForPage = titleForPage.replace(/%27/g,"'")
                var wikiLink = document.createElement('a')
                wikiLink.textContent = titleForPage;
                wikiLink.setAttribute('href', queryData[3][0]);
                wikiLink.setAttribute('class', 'is-size-3')
                wikiLinkText.appendChild(wikiLink);
                getFullPlot(titleForPage);
            }
        })
}

function getWikiInfo(title, year) {
    var wikiURL = WikiURL;
    var params = {
        action: "opensearch",
        search: title + '_' + year,
        format: "json"
    };

    wikiURL = wikiURL + "?origin=*";
    Object.keys(params).forEach(function(key) {
        wikiURL += "&" + key + "=" + params[key];
    })
    fetch(wikiURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
    
            return response.json();
        })
        .then(function(queryData) {
            if(!queryData[3][0]) {
                getWikiInfoNoYear(title);
            }
            else {
                var titleForPage = title.replace(/_/g,' ');
                var titleForPage = titleForPage.replace(/%27/g,"'")
                //var titleForPage = titleForPage.replace(/%27/g,"'")
                var wikiLink = document.createElement('a')
                wikiLink.textContent = titleForPage;
                wikiLink.setAttribute('href', queryData[3][0]);
                wikiLink.setAttribute('class', 'is-size-3')
                wikiLinkText.appendChild(wikiLink);
                getFullPlot(titleForPage);
            }

        })
}

function setActorOneWikiLink(actor) {
    actor = actor.replace(/ /g, '_');
    var wikiURL = WikiURL;
    var params = {
        action: "opensearch",
        search: actor,
        format: "json"
    };

    wikiURL = wikiURL + "?origin=*";
    Object.keys(params).forEach(function(key) {
        wikiURL += "&" + key + "=" + params[key];
    })

    fetch(wikiURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (queryData) {
            act1El.setAttribute('href', queryData[3][0]);
        })
}

function setActorTwoWikiLink(actor) {
    actor = actor.replace(/ /g, '_');
    var wikiURL = WikiURL;
    var params = {
        action: "opensearch",
        search: actor,
        format: "json"
    };

    wikiURL = wikiURL + "?origin=*";
    Object.keys(params).forEach(function(key) {
        wikiURL += "&" + key + "=" + params[key];
    })

    fetch(wikiURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (queryData) {
            act2El.setAttribute('href', queryData[3][0]);
        })
}

function setActorThreeWikiLink(actor) {
    actor = actor.replace(/ /g, '_');
    var wikiURL = WikiURL;
    var params = {
        action: "opensearch",
        search: actor,
        format: "json"
    };

    wikiURL = wikiURL + "?origin=*";
    Object.keys(params).forEach(function(key) {
        wikiURL += "&" + key + "=" + params[key];
    })

    fetch(wikiURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (queryData) {
            act3El.setAttribute('href', queryData[3][0]);
        })
}

function getFullPlot(title) {
    var searchParamsArr = document.location.search.split('&')
    var movieId = searchParamsArr[1].split('=').pop();
    var fullPlotURL = OMDBDataUrl + 'i=' + movieId + '&plot=full';

    fetch(fullPlotURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
    
            return response.json();
        })
        .then(function (queryData) {
            var fullPlot = document.createElement('p');
            fullPlot.textContent = queryData.Plot;
            fullPlotEl.appendChild(fullPlot);
        })
}

function retryActorOne(actor) {
    var wikiURL = WikiURL;
    actor = actor.replace(/ /g, '_')
    var params = {
        action: "parse",
        page: actor + '_(actor)',
        format: "json"
    };

    wikiURL = wikiURL + "?origin=*";
    Object.keys(params).forEach(function(key) {
        wikiURL += "&" + key + "=" + params[key];
    })
    fetch(wikiURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (queryData) {
            for(var i =0; i < queryData.parse.images.length; i++) {
                if(queryData.parse.images[i].includes('.jpg')) {
                    var image = queryData.parse.images[i];
                    break;
                }
            }
            image = 'File:' + image;
            var imageURL = WikiURL;
            var imageOne = {
                action: "query",
                titles: image,
                format: "json",
                prop: 'imageinfo',
                iiprop: 'url'
            };
    
            imageURL = imageURL + "?origin=*";
            Object.keys(imageOne).forEach(function(key) {
                imageURL += "&" + key + "=" + imageOne[key];
            })
            fetch(imageURL)
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }

                    return response.json();
                })
                .then(function (imageData) {
                    if(imageData.query.pages[-1].imageinfo) {
                        actorOneEl.setAttribute('src', imageData.query.pages[-1].imageinfo[0].url)
                        setActorOneWikiLink(actor + '_(actor)');
                    }
                })
        })
}

function retryActorTwo(actor) {
    var wikiURL = WikiURL;
    actor = actor.replace(/ /g, '_')
    var params = {
        action: "parse",
        page: actor + '_(actor)',
        format: "json"
    };

    wikiURL = wikiURL + "?origin=*";
    Object.keys(params).forEach(function(key) {
        wikiURL += "&" + key + "=" + params[key];
    })
    fetch(wikiURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (queryData) {
            for(var i =0; i < queryData.parse.images.length; i++) {
                if(queryData.parse.images[i].includes('.jpg')) {
                    var image = queryData.parse.images[i];
                    break;
                }
            }
            image = 'File:' + image;
            var imageURL = WikiURL;
            var imageTwo = {
                action: "query",
                titles: image,
                format: "json",
                prop: 'imageinfo',
                iiprop: 'url'
            };
    
            imageURL = imageURL + "?origin=*";
            Object.keys(imageTwo).forEach(function(key) {
                imageURL += "&" + key + "=" + imageTwo[key];
            })
            fetch(imageURL)
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }

                    return response.json();
                })
                .then(function (imageData) {
                    if(imageData.query.pages[-1].imageinfo) {
                        actorTwoEl.setAttribute('src', imageData.query.pages[-1].imageinfo[0].url)
                        setActorTwoWikiLink(actor + '_(actor)');
                    }
                })
        })
}

function retryActorThree(actor) {
    var wikiURL = WikiURL;
    actor = actor.replace(/ /g, '_')
    var params = {
        action: "parse",
        page: actor + '_(actor)',
        format: "json"
    };

    wikiURL = wikiURL + "?origin=*";
    Object.keys(params).forEach(function(key) {
        wikiURL += "&" + key + "=" + params[key];
    })
    fetch(wikiURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (queryData) {
            for(var i =0; i < queryData.parse.images.length; i++) {
                if(queryData.parse.images[i].includes('.jpg')) {
                    var image = queryData.parse.images[i];
                    break;
                }
            }
            image = 'File:' + image;
            var imageURL = WikiURL;
            var imageThree = {
                action: "query",
                titles: image,
                format: "json",
                prop: 'imageinfo',
                iiprop: 'url'
            };
    
            imageURL = imageURL + "?origin=*";
            Object.keys(imageThree).forEach(function(key) {
                imageURL += "&" + key + "=" + imageThree[key];
            })
            fetch(imageURL)
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }

                    return response.json();
                })
                .then(function (imageData) {
                    if(imageData.query.pages[-1].imageinfo) {
                        actorThreeEl.setAttribute('src', imageData.query.pages[-1].imageinfo[0].url)
                        setActorThreeWikiLink(actor + '_(actor)');
                    }
                })
        })
}

function getActorImages(actorOne,actorTwo,actorThree) {
    var wikiURLOne = WikiURL;
    var paramsOne = {
        action: "parse",
        page: actorOne,
        format: "json"
    };

    wikiURLOne = wikiURLOne + "?origin=*";
    Object.keys(paramsOne).forEach(function(key) {
        wikiURLOne += "&" + key + "=" + paramsOne[key];
    })
    fetch(wikiURLOne)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (queryData) {
            if(queryData.parse.images.length !== 0) {
                for(var i =0; i < queryData.parse.images.length; i++) {
                    if(queryData.parse.images[i].includes('.jpg')) {
                        var image = queryData.parse.images[i];
                        break;
                    }
                }
            }
            else {
                retryActorOne(actorOne);
            }
            if (!image) {
                setActorOneWikiLink(actorOne);
            }
            image = 'File:' + image;
            var imageURL = WikiURL;
            var imageOne = {
                action: "query",
                titles: image,
                format: "json",
                prop: 'imageinfo',
                iiprop: 'url'
            };

            imageURL = imageURL + "?origin=*";
            Object.keys(imageOne).forEach(function(key) {
                imageURL += "&" + key + "=" + imageOne[key];
            })
            fetch(imageURL)
                .then(function (response) {

                    if (!response.ok) {
                        throw response.json();
                    }

                    return response.json();
                })
                .then(function (imageData) {
                    if(imageData.query.pages[-1].imageinfo[0].url) {
                        actorOneEl.setAttribute('src', imageData.query.pages[-1].imageinfo[0].url)
                        setActorOneWikiLink(actorOne);
                    }
                })
        })
        var wikiURLTwo = WikiURL;
        var paramsTwo = {
            action: "parse",
            page: actorTwo,
            format: "json"
        };
    
        wikiURLTwo = wikiURLTwo + "?origin=*";
        Object.keys(paramsTwo).forEach(function(key) {
            wikiURLTwo += "&" + key + "=" + paramsTwo[key];
        })
        fetch(wikiURLTwo)
            .then(function (response) {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(function (queryData) {
                if(queryData.parse.images.length !== 0) {
                    for(var i =0; i < queryData.parse.images.length; i++) {
                        if(queryData.parse.images[i].includes('.jpg')) {
                            var image = queryData.parse.images[i];
                            break;
                        }
                    }
                }
                else {
                    retryActorTwo(actorTwo);
                }
                if (!image) {
                    setActorTwoWikiLink(actorTwo);
                }
                image = 'File:' + image;
                var imageURL = WikiURL;
                var imageTwo = {
                    action: "query",
                    titles: image,
                    format: "json",
                    prop: 'imageinfo',
                    iiprop: 'url'
                };
    
                imageURL = imageURL + "?origin=*";
                Object.keys(imageTwo).forEach(function(key) {
                    imageURL += "&" + key + "=" + imageTwo[key];
                })
                fetch(imageURL)
                    .then(function (response) {
    
                        if (!response.ok) {
                            throw response.json();
                        }

                        return response.json();
                    })
                    .then(function (imageData) {
                        if(imageData.query.pages[-1].imageinfo) {
                            actorTwoEl.setAttribute('src', imageData.query.pages[-1].imageinfo[0].url)
                            setActorTwoWikiLink(actorTwo);
                        }
                    })
            })
        var wikiURLThree = WikiURL;
        var paramsThree = {
            action: "parse",
            page: actorThree,
            format: "json"
        };
    
        wikiURLThree = wikiURLThree + "?origin=*";
        Object.keys(paramsThree).forEach(function(key) {
            wikiURLThree += "&" + key + "=" + paramsThree[key];
        })
        fetch(wikiURLThree)
            .then(function (response) {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(function (queryData) {
                if(queryData.parse.images.length !== 0) {
                    for(var i =0; i < queryData.parse.images.length; i++) {
                        if(queryData.parse.images[i].includes('.jpg')) {
                            var image = queryData.parse.images[i];
                            break;
                        }
                    }
                }
                else {
                    retryActorThree(actorOne);
                }
                if (!image) {
                    setActorThreeWikiLink(actorThree);
                }
                image = 'File:' + image;
                var imageURL = WikiURL;
                var imageTwo = {
                    action: "query",
                    titles: image,
                    format: "json",
                    prop: 'imageinfo',
                    iiprop: 'url'
                };
    
                imageURL = imageURL + "?origin=*";
                Object.keys(imageTwo).forEach(function(key) {
                    imageURL += "&" + key + "=" + imageTwo[key];
                })
                fetch(imageURL)
                    .then(function (response) {
    
                        if (!response.ok) {
                            throw response.json();
                        }

                        return response.json();
                    })
                    .then(function (imageData) {
                        if(imageData.query.pages[-1].imageinfo) {
                            actorThreeEl.setAttribute('src', imageData.query.pages[-1].imageinfo[0].url)
                            setActorThreeWikiLink(actorThree);
                        }
                    })
            })
}

function resultInfo(queryID, queryTitle) {
    var infoURL = OMDBDataUrl + "i=" + queryID + '&plot=short';
    var titleAdapt = queryTitle.split('');

    for (var i = 0; i < titleAdapt.length; i++) {
        if(titleAdapt[i] === "+") {
            titleAdapt.splice(i,1,"_");
        }
    }
    var wikiTitle = titleAdapt.join('');

    fetch(infoURL)
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
            
            act1El.textContent = actors[0];
            act2El.textContent = actors[1];
            act3El.textContent = actors[2];
            getActorImages(actors[0],actors[1],actors[2])
            posterEl.setAttribute("src", info.Poster);
            getWikiInfo(wikiTitle, info.Year);
        })

}

getParams();
searchBtnEl.addEventListener('click', handleSearchButton);
document.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        handleSearchButton(event);
    }
})

addFavorite.addEventListener('click', favoriteStorage)

