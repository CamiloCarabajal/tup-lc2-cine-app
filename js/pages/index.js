//NRO DE PAGINA
let nroPagina = 1;
//VARIABLES PARA OBTENER LOS ELEMENTOS DE CONTENEDORES
const secPeliculas = document.getElementById('sec_peliculas');
const botonAnterior = document.getElementById('btnAnterior');
const botonSiguiente = document.getElementById('btnSiguiente');
const inputCodigo = document.getElementById('codigoPelicula');
//VARIABLES PARA OBTENER LOS ELEMENTOS DE MENSAJE
const mensajeError = document.getElementById('Error');
const mensajeExito = document.getElementById('Success');
const mensajeWarning = document.getElementById('Warning');

//ARRAYS
let idsPeliculas = []; //Para almacenar los id
let favoritos = [];

// Recuperar los favoritos del localStorage al cargar la página
if (localStorage.getItem('FAVORITOS')) {
  favoritos = JSON.parse(localStorage.getItem('FAVORITOS'));
}
//Boton para Siguiente
botonSiguiente.addEventListener('click', () => {
  if (nroPagina < 1000) {
    nroPagina += 1;
    cargarPeliculas().then(() => {
      window.scrollTo(0, 0);
      console.log(idsPeliculas);
    });
  }
});
//BOTON PARA ANTERIOR
botonAnterior.addEventListener('click', () => {
  if (nroPagina > 1) {
    nroPagina -= 1;
    cargarPeliculas().then(() => {
      window.scrollTo(0, 0);
      console.log(idsPeliculas);
    });
  }
});
//CARGA DE PELICULAS
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
    mostrarMensajeError('Error en la conexión, por favor intente de vuelta..')

  }
};
//AGREGAR PELICULA MEDIANTE BOTON
function buttonAgregarFavorito() {
  const botones = document.querySelectorAll('.button.radius');

  botones.forEach(boton => {
    boton.addEventListener("click", (e) => {
      let buscar = e.currentTarget.id;
      if (favoritos.includes(buscar)) {
        mostrarMensajeWarning('La película ingresada ya se encuentra almacenada.');
        //Aca va el mensaje que ya esta cargado en favoritos
        console.log("No, la pelicula ya se encuentra agregada")
      } else {
        favoritos.push(buscar);
        localStorage.setItem('FAVORITOS', JSON.stringify(favoritos));
        //Aca va el mensaje de cargado con exito
        mostrarMensajeExito('Película agregada con éxito.');
        console.log("Se agrego correctamente a tus favoritos")
      }
    });
  });
}
//VERIFICACION DE PELICULA DENTRO DE LA LISTA
const esPeliculaEnFavoritos = (codigoPelicula) => {
  return favoritos.includes(codigoPelicula);
};
//AGREGAR PELICULA MEDIANTE CODIGO
const agregarFavoritoCodigo = () => {
  const codigoPelicula = inputCodigo.value;

  if (esCodigoNumerico(codigoPelicula)) {
    if (esPeliculaEnFavoritos(codigoPelicula)) {
      mostrarMensajeWarning('La película ingresada ya se encuentra almacenada.');
      console.log("La película ingresada ya se encuentra almacenada.");
    } else {
      const url = `https://api.themoviedb.org/3/movie/${codigoPelicula}?api_key=987174eff71006f71276ecb352a7837b&language=es-ES`;

      fetch(url)
        .then((response) => {
          if (response.ok) {
            favoritos.push(codigoPelicula); // Agregar el código de la película a la lista de favoritos
            localStorage.setItem('FAVORITOS', JSON.stringify(favoritos)); // Actualizar el localStorage con la lista de favoritos
            console.log("Película agregada con éxito.");
            mostrarMensajeExito('Película agregada con éxito.'); //ACAAA ESTA EL MENSAJE DE EXITOOO
          } else {
            console.log("Error: La película seleccionada no se encuentra en la API o se produjo un error al consultar.");
            mostrarMensajeError('Error: La película seleccionada no se encuentra en la API o se produjo un error al consultar.');
          }
        })
        .catch((error) => {
          console.log(error);
          mostrarMensajeError('Error en la conexión');
        });
    }
  } else {
    console.log("Error: El código de película ingresado no es válido.");
    mostrarMensajeError('Error: El código de película ingresado no es válido.')
  }
};
//FUNCION PARA SABER SI ES NUMERO
function esCodigoNumerico(codigo) {
  return !isNaN(codigo);
}

cargarPeliculas()
