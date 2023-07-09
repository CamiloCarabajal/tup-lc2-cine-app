//const secPeliculasFav = document.getElementById('sec-favorities-list');

let favoritosLocal= localStorage.getItem('FAVORITOS');

const contenedorPeliculasFavoritas= document.getElementById('contenedorPeliculasFavoritas');

const MostrarFavoritos = async() => {
    if (favoritosLocal != null){
        favoritos = JSON.parse(favoritosLocal);
        for (let i= 0; i< favoritos.length; i++){
            const respuesta= await fetch(`https://api.themoviedb.org/3/movie/${favoritos[i]}?api_key=94b94246803e78f1efcc203d4fab156b&language=en-US`)

            let favorito =await respuesta.json();

            console.log(favorito)
            const favoritoHTML= `
            <div class="contenedorPeliculasFavoritas" id="contenedorPeliculasFavoritas">
        <div class="contenedorPersonalFav">
          <div class="contenedorPoster">
            <img src="https://image.tmdb.org/t/p/w500/${favorito.poster_path}" alt="${favorito.title}" >
            </div>
            <h3>${favorito.title}</h3>
            <p><b>Codigo: </b>${favorito.id}</p>
            <p><b>Titulo Original: </b>${favorito.original_title}</p>
            <p><b>Idioma Original: </b>${favorito.original_language}</p>
            <p><b>Resumen: </b>${favorito.overview}</p>
            <button class="button radius">
            <span>Quitar de Favoritos</span>
          </button>
          </div>

        </div>
        `;
        contenedorPeliculasFavoritas.innerHTML += favoritoHTML;
        //contenedorPeliculasFavoritas.style.display='grid';
        }
    }
} 

MostrarFavoritos();