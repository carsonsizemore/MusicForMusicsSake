let albums = [];
let lastIndex = -1;

// Fetch data and initialize page functionality
fetch("albums.json")
    .then(response => response.json())
    .then(json => {
        albums = json;
        displayAllAlbums(albums);
        setupFilters();
        setupRandomButton(); // Attached AFTER albums are loaded
    })
    .catch(error => console.log("Error loading JSON:", error));

// Renders an individual album div
function displayAlbum(album) {
    let albumSection = document.querySelector('.collection');
    if (!albumSection) return;

    let newAlbum = document.createElement("div");
    
    // Quotes around src and data-link added to hold YouTube URL
    newAlbum.innerHTML = `
        <img src="${album.Path}" data-link="${album.Link || ''}" alt="${album["Album Name"] || 'Album Cover'}">
    `;

    // Click handler directly attached to each generated album image
    let img = newAlbum.querySelector('img');
    img.style.cursor = 'pointer'; // Visual hint that images are clickable
    img.addEventListener("click", function(event) {
        let albumLink = event.target.getAttribute("data-link");
        if (albumLink) {
            window.open(albumLink, '_blank'); // Opens YouTube link in new tab
        }
    });

    albumSection.appendChild(newAlbum);
}

// Clears grid and displays requested list of albums
function displayAllAlbums(albumsToDisplay) {
    let albumSection = document.querySelector('.collection');
    if (!albumSection) return;

    albumSection.innerHTML = "";
    albumsToDisplay.forEach((album) => displayAlbum(album));
}

// Category & Vibe Filter Listeners
function setupFilters() {
    let filterButtons = document.querySelectorAll('.filter');
    filterButtons.forEach((button) => {
        button.addEventListener("click", function(event) {
            let target = event.target;
            let genre = target.getAttribute("data-genre");
            let vibe = target.getAttribute("data-vibe");

            if (genre) {
                if (genre.toLowerCase() === "all") {
                    displayAllAlbums(albums);
                } else {
                    let filtered = albums.filter(
                        (album) => album.Genre && album.Genre.toLowerCase() === genre.toLowerCase()
                    );
                    displayAllAlbums(filtered);
                }
            } 
            
            if (vibe) {
                if (vibe.toLowerCase() === "all") {
                    displayAllAlbums(albums);
                } else {
                    let filtered = albums.filter(
                        (album) => album.Vibe && album.Vibe.toLowerCase() === vibe.toLowerCase()
                    );
                    displayAllAlbums(filtered);
                }
            }
        });
    });
}

// Random Album Button Listener
function setupRandomButton() {
    let randomSongButton = document.querySelector('.random-song-generator');
    
    if (randomSongButton) {
        randomSongButton.addEventListener("click", function() {
            if (!albums || albums.length === 0) return;

            let randomIndex;

            // Pick a random index (prevent duplicate on back-to-back clicks)
            if (albums.length > 1) {
                do {
                    randomIndex = Math.floor(Math.random() * albums.length);
                } while (randomIndex === lastIndex);
            } else {
                randomIndex = 0;
            }

            lastIndex = randomIndex;

            // Render ONLY the randomly selected album
            displayAllAlbums([albums[randomIndex]]);
        });
    }
}

// Page load transition
window.addEventListener('pageshow', () => {
    document.body.classList.add('loaded');
});