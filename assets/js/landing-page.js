// Initial reference 
const panels = document.querySelectorAll('.panel');

// API Key 
var OMDBDataUrl = 'http://www.omdbapi.com/?apikey=767dc988&';
var OMDBImageUrl = 'http://img.omdbapi.com/?apikey=767dc988&';
 
var launchPageTitles = [
    "V+for+Vendetta",
    "Kiki's+Delivery+Service",
    "Spirited+Away",
    "Spider-Man:+No+Way+Home",
    "Die+Hard",
    "The+Avengers",
];

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


function initialPageLoad () {
    for (var i = 0; i < 3; i++) {
        var random = Math.floor(Math.random() * 5);
        var selection = launchPageTitles[random]
        fetch(OMDBDataUrl + 's=' + selection)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    i--;
                    alert('Error: ' + response.statusText);
                }
        })
            .then(function (data) {
                console.log(data.Search[0]);
        });
    }
}

initialPageLoad();


// ? Wikipedia Api 
// ! Needs to be checked 👇 

if (search) {
    var api = "https://en.wikipedia.org/w/api.php?action=help&modules=opensearch"; 
    console.log(api)

    fetch(api)
    .then(response => response.json())
    .then(response => {
        response = response.query.pages;
        var pageid = Object.keys(response)[0];
        var extract = response[pageid].extract;

        title_elem.innerHTML = search;
        description_elem.innerHTML = extract;
        
    })
}