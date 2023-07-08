
let nroPagina=1;
const secPeliculas = document.getElementById('sec_peliculas');
const cargarPeliculas = async() =>{
     try{
        const llamado = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=94b94246803e78f1efcc203d4fab156b&language=en-US&page=${nroPagina}`);
        console.log (llamado);
        if (llamado.ok){
            const datosPelicula= await llamado.json();
            console.log(datosPelicula)   
            let peliculas = '';
      datosPelicula.results.forEach(pelicula => {
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
          <button class="button radius">
          <span>Agregar a Favoritos</span>
          </button>
          </div>
        `;
      });

      secPeliculas.innerHTML = peliculas;
      secPeliculas.style.display = 'grid';
        }
    }catch (error){
        console.log(error)
     }

}
cargarPeliculas();