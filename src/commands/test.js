const fetch = require("node-fetch");

module.exports = {
  data: {
    name: "test",
    type: "message"
  },
  async execute(message, args, client) {
    try {
      const token = "1248967809636648|CSK77j1pDS0aAYiRgt1yPOa9x90"; // Substitua pelo seu token
      
      const phoneNumberId = "+554792377108"; // Substitua pelo ID do número de telefone
      
      const recipientNumber = "+5521983196551"; // Substitua pelo número de telefone do destinatário, no formato E.164 (ex: +5511999998888)
      
      const data = {
        messaging_product: "whatsapp",
        to: recipientNumber,
        type: "interactive",
        interactive: {
          type: "button",
          header: {
            type: "text",
            text: "Instagram"
          },
          body: {
            text: "Teste de botão"
          },
          footer: {
            text: "| Teste"
          },
          action: {
            buttons: [{
              type: "link",
              url: "https://www.instagram.com/rfoliveirasc/",
              text: "Instagram"
            }]
          }
        }
      };
      
      fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    } catch(err) {
      console.log(err)
    }
  }
}