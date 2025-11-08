const BOT_TOKEN = '8485815175:AAGzLk9Np4dixBP55pq4Q5-4bggAWfPeDX8';
const CHAT_ID = '-1003213512490'; // 

async function sendTelegramMessageWithBtn(mensaje, teclado) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  console.log("📤 Enviando mensaje a Telegram...");
  
  const body = {
    chat_id: CHAT_ID,
    text: mensaje,
    parse_mode: 'Markdown'
  };
  
  if (teclado) {
    body.reply_markup = JSON.parse(teclado);
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    console.log("✅ Mensaje enviado:", data);
    return data.result;
    
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}

async function waitForButtonPress(messageId, timeout = 120) {
  console.log("⏳ Esperando acción del usuario...");
  
  let lastUpdateId = 0;
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const checkInterval = setInterval(async () => {
      try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${lastUpdateId + 1}&timeout=5`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.result && data.result.length > 0) {
          for (const update of data.result) {
            lastUpdateId = update.update_id;
            
            if (update.callback_query && update.callback_query.message.message_id === messageId) {
              clearInterval(checkInterval);
              console.log("✅ Acción recibida:", update.callback_query.data);
              resolve({ action: update.callback_query.data });
              return;
            }
          }
        }
        
        if (Date.now() - startTime > timeout * 1000) {
          clearInterval(checkInterval);
          reject(new Error('Timeout'));
        }
        
      } catch (error) {
        console.error("Error en polling:", error);
      }
    }, 2000);
  });
}


