let nroPagina = 1;
const secPeliculas = document.getElementById('sec_peliculas');
const botonAnterior = document.getElementById('btnAnterior');
const botonSiguiente = document.getElementById('btnSiguiente');
const inputCodigo = document.getElementById('codigoPelicula');
let idsPeliculas = [];
let favoritos = [];



botonSiguiente.addEventListener('click', () => {
  if (nroPagina < 1000) {
    nroPagina += 1;
    cargarPeliculas().then(() => {
      window.scrollTo(0, 0);
      console.log(idsPeliculas);
    });
  }
});

botonAnterior.addEventListener('click', () => {
  if (nroPagina > 1) {
    nroPagina -= 1;
    cargarPeliculas().then(() => {
      window.scrollTo(0, 0);
      console.log(idsPeliculas);
    });
  }
});

const cargarPeliculas = async () => {
  try {
    idsPeliculas = [];

    const llamado = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=94b94246803e78f1efcc203d4fab156b&language=en-US&page=${nroPagina}`
    );
    if (llamado.ok) {
      const datosPelicula = await llamado.json();
      datosPelicula.results.forEach((pelicula) => {
        idsPeliculas.push(pelicula.id);
      });

      let peliculas = '';
      datosPelicula.results.forEach((pelicula) => {
        peliculas += `
          <div class="contenedorPeliculas">
          <div class="contenedor-infopelicula">
            <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <h3>${pelicula.title}</h3>
            <p><b>Código: ${pelicula.id}</b></p>
            <p><b>Título Original: ${pelicula.original_title}</b></p>
            <p><b>Idioma Original: ${pelicula.original_language}</b></p>
            <p><b>Año: ${pelicula.release_date}</b></p>
          </div>
          <button class="button radius" id="${pelicula.id}">
          <span>Agregar a Favoritos</span>
          </button>
          </div>
        `;
      });

      secPeliculas.innerHTML = peliculas;
      secPeliculas.style.display = 'grid';
      buttonAgregarFavorito();

    }
  } catch (error) {
    console.log(error);
  }
};

function buttonAgregarFavorito(){
  const botones = document.querySelectorAll('.button.radius');

  botones.forEach(boton => {
    boton.addEventListener("click",(e) =>{
      let buscar= e.currentTarget.id
      if(favoritos.includes(buscar)){
        //Aca va el mensaje que ya esta cargado en favoritos
        console.log("No capo")
      }else{
        favoritos.push(buscar)
        //Aca va el mensaje de cargado con exito
        console.log("Entreeee")
      }
      localStorage.setItem('FAVORITOS',JSON.stringify(favoritos))
    })
  })


}

const esPeliculaEnFavoritos = (codigoPelicula) => {
  const favoritos = localStorage.getItem('FAVORITOS');
  if (favoritos) {
    const favoritosArray = favoritos.split(',');
    return favoritosArray.includes(codigoPelicula);
  }
  return false;
};

const agregarFavoritoCodigo = () => {
  const codigoPelicula = inputCodigo.value;
  
  if (esCodigoNumerico(codigoPelicula)) {
    if (esPeliculaEnFavoritos(codigoPelicula)) {
      mostrarMensajeWarning('La película ingresada ya se encuentra almacenada.');
    } else {
      const url = `https://api.themoviedb.org/3/movie/${codigoPelicula}?api_key=987174eff71006f71276ecb352a7837b&language=es-ES`;
      
      fetch(url)
        .then((response) => {
          if (response.ok) {
            localStorage.setItem('FAVORITOS', codigoPelicula);
            mostrarMensajeExito('Película agregada con éxito.');
          } else {
            mostrarMensajeError('Error: La película seleccionada no se encuentra en la API o se produjo un error al consultar.');
          }
        })
        .catch((error) => {
          console.log(error);
          mostrarMensajeError('Error en la conexión');
        });
    }
  } else {
    mostrarMensajeError('Error: El código de película ingresado no es válido.');
  }
};



function esCodigoNumerico(codigo) {
  return !isNaN(codigo);
}

function mostrarMensajeExito(mensaje) {

  console.log('Éxito:', mensaje);
}

cargarPeliculas().then(() => {
  console.log(idsPeliculas);
});
