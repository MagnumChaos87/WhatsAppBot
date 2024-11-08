const axios = require("axios");

require("dotenv").config();

module.exports = {
  data: {
    name: "test",
    type: "message"
  },
  async execute(message, args, client) {
    try {
      const phoneNumberId = "+554792377108";
      
      const recipientNumber = "+5521983196551";
      
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
      
      axios.post(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, data, {
        headers: {
          'Authorization': `Bearer ${process.env.META_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
    } catch(err) {
      console.log(err)
    }
  }
}