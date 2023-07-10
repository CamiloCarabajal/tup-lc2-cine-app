//FUNCIONES PARA MOSTRAR MENSAJES

function mostrarMensajeError(mensaje) {
    mensajeError.innerText = mensaje;
    mensajeError.style.display = 'block';
    mensajeExito.style.display = 'none';
    mensajeWarning.style.display = 'none';
  
    setTimeout(() => {
      mensajeError.style.display = 'none';
    }, 5000);
  }
  
  function mostrarMensajeExito(mensaje) {
    mensajeExito.innerText = mensaje;
    mensajeExito.style.display = 'block';
    mensajeError.style.display = 'none';
    mensajeWarning.style.display = 'none';
  
    setTimeout(() => {
      mensajeExito.style.display = 'none';
    }, 5000);
  }
  
  function mostrarMensajeWarning(mensaje) {
    mensajeWarning.innerText = mensaje;
    mensajeWarning.style.display = 'block';
    mensajeError.style.display = 'none';
    mensajeExito.style.display = 'none';
  
    setTimeout(() => {
      mensajeWarning.style.display = 'none';
    }, 5000);
  }
  
  mensajeError.style.display = 'none';
  mensajeExito.style.display = 'none';
  mensajeWarning.style.display = 'none';





