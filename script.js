let albums
fetch("albums.json").then(response => response.json())
    .then(json => {
        albums = json
        for(let i = 0; i<albums.length; i++) {
            let album = albums[i]
            makeAlbum(album)
        }
    })
    .catch(error => console.log("error", error))

    function makeAlbum(album) {
        let albumSection = document.querySelector('.colection')
        let genre = album.Genre
        console.log (genre)
    }