const cargarPeliculas = async() =>{
     try{
        const llamada= await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=94b94246803e78f1efcc203d4fab156b&language=en-US&page=1');
        console.log (llamada);
        if (llamada.ok){
            const datos= await llamada.json();
            console.log(datos)   
        }

     } catch (error){
        console.log(error)
     }

}
cargarPeliculas();