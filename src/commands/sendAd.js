const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
  data: {
    name: "sendAd",
    type: "message"
  },
  async execute(message, args, client) {
    try {
      const phoneNumber = args[1];
      
      if (!/^\(?[1-9]{2}\)?\s?[9][0-9]{3}\-[0-9]{4}$/.text(phoneNumber)) return message.reply("✖〢Número inválido!");
      
      const media = await MessageMedia.fromFilePath("./media/presentation_1.jpg");
      
      const message_1 = await client.sendMessage(phoneNumber, media);
      
      const message_2 = await client.sendMessage(phoneNumber, "Imagine uma mensagem de anúncio aqui!");
      
      if (message_1 && message_2) {
        message.reply("✔〢Anúncio enviado com sucesso!");
      } else {
        message.reply("✖〢Falha ao enviar anúncio.");
      }
    } catch(err) {
      console.log(err)
    }
  }
}