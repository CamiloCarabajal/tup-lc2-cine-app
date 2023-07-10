let favoritos = []; // Declaro la variable favoritos fuera de la función MostrarFavoritos

//CONEXION PARA OBTENER LOS VIDEOS
const obtenerVideosPelicula = async (peliculaId) => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${peliculaId}/videos?api_key=94b94246803e78f1efcc203d4fab156b`);
    if (respuesta.ok) {
      const datos = await respuesta.json();
      const videos = datos.results;
      return videos;
    } else {
      console.log('Error al obtener los videos de la película.');
      return [];
    }
  } catch (error) {
    console.log('Error en la conexión.', error);
    return [];
  }
};
//MUESTRO LOS FAVORITOS Y SUS VIDEOS
const MostrarFavoritos = async () => {
  favoritos = obtenerFavoritos();

  if (favoritos.length > 0) {
    MensajeNoHay.style.display = 'none';
    let html = '';
    for (let i = 0; i < favoritos.length; i++) {
      const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${favoritos[i]}?api_key=94b94246803e78f1efcc203d4fab156b&language=en-US`);
      let favorito = await respuesta.json();

      const videos = await obtenerVideosPelicula(favorito.id);
      const primerVideo = videos.length > 0 ? videos[0] : null;
      const videoKey = primerVideo ? primerVideo.key : '';

      html += `
        <div class="contenedorPeliculasFavoritas" id="contenedorPeliculasFavoritas">
          <div class="contenedorPersonalFav">
            <div class="contenedorPoster">
              <img src="https://image.tmdb.org/t/p/w500/${favorito.poster_path}" alt="${favorito.title}">
            </div>
            <h3>${favorito.title}</h3>
            <p><b>Codigo: </b>${favorito.id}</p>
            <p><b>Titulo Original: </b>${favorito.original_title}</p>
            <p><b>Idioma Original: </b>${favorito.original_language}</p>
            <p><b>Resumen: </b>${favorito.overview}</p>
            <p><b>Video:</b></p>
            ${primerVideo ? `<iframe width="300" height="150" src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen allow="fullscreen"></iframe>` : 'No hay videos disponibles'}
            <button class="button radius" onclick="eliminarFavorito(${favorito.id}, this)">
              <span>Quitar de Favoritos</span>
            </button>
          </div>
        </div>
      `;
    }

    contenedorPeliculasFavoritas.innerHTML = html;
  }
  else {
    MensajeNoHay.innerHTML = '<p>No tiene películas seleccionadas en sus favoritos</p>';
  }
};

//OBTENER LOS FAVORITOS DEL LOCALSTORAGE
function obtenerFavoritos() {
  const favoritosLocal = localStorage.getItem('FAVORITOS');
  return favoritosLocal ? JSON.parse(favoritosLocal) : [];
}
//ELIMINAR LOS FAVORITOS MEDIANTE EL BOTON
function eliminarFavorito(id, boton) {
  const indice = favoritos.indexOf(id.toString());
  if (indice !== -1) {
    favoritos.splice(indice, 1);
    localStorage.setItem('FAVORITOS', JSON.stringify(favoritos));
    boton.parentNode.parentNode.remove();
  }
}

MostrarFavoritos();

