let albums
fetch("albums.json").then(response => response.json())
    .then(json => {
        albums = json
        displayAllAlbums(albums)
        setupFilters()
    })
    .catch(error => console.log("error", error))

    function displayAlbum(album) {
        let albumSection = document.querySelector('.collection')
        let newAlbum = document.createElement("div")
        albumSection.appendChild(newAlbum)
        newAlbum.innerHTML = `
            <img src=${album.Path}>
            `;
    }
    function displayAllAlbums(albums) {
        let albumSection = document.querySelector('.collection');
        albumSection.innerHTML = ""
        albums.forEach((album) => displayAlbum(album));
    }
    function setupFilters(){
        let filterButtons = document.querySelectorAll('.filter');
        filterButtons.forEach((buttton) => {
            buttton.addEventListener("click", function(event){
                let target= event.target;
                let genre = target.getAttribute("data-genre");
                let vibe = target.getAttribute("data-vibe");
                let decade = target.getAttribute("data-decade");
                let filteredAlblums
                if (genre) {
                    if (genre.toLowerCase() === "all") {
                        displayAllAlbums(albums);
                    } else {
                        let filtered = albums.filter(
                            (album) => album.Genre.toLowerCase() === genre.toLowerCase()
                        );
                        displayAllAlbums(filtered);
                    }
                } 
                if (vibe) {
                    if (vibe.toLowerCase() === "all") {
                        displayAllAlbums(albums);
                    } else {
                        let filtered = albums.filter(
                            (album) => album.Vibe.toLowerCase() === vibe.toLowerCase()
                        );
                        displayAllAlbums(filtered);
                    }
                }
                if(decade) {
                let startYear = parseInt(decade, 10);
                let endYear = startYear + 10
                let filtered = albums.filter(
                    (album) => album.Year >= startYear && album.Year < endYear
                );
                displayAllAlbums(filtered);
            }
            })
        })
    }

window.addEventListener('pageshow', (event) => {
  document.body.classList.add('loaded');
});

let album = document.querySelector('.collection img');
album.addEventListener("click", function(event) {
    let target = event.target;
    let albumLink = target.getAttribute("data-link");
    if (albumLink) {
        window.location.href = albumLink;
    }
});
    
let randomSongButton = document.querySelector('.random-song-generator');
randomSongButton.addEventListener("click", function() {
    if (albums && albums.length > 0) {
        let randomIndex = Math.floor(Math.random() * albums.length);
        displayAllAlbums([albums[randomIndex]]);
    }
});