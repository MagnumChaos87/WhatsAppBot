const { Buttons } = require("whatsapp-web.js");

module.exports = {
  data: {
    name: "test",
    type: "message"
  },
  async execute(message, args, client) {
    try {
      const teste = new Buttons("Texto teste", [{body: "testando", type: "url", url: "https://www.instagram.com/rfoliveirasc/"}]);
      
      message.reply(teste)
    } catch(err) {
      console.log(err)
    }
  }
}