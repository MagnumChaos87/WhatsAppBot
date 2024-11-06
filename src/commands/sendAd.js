const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
  data: {
    name: "sendAd",
    type: "message"
  },
  async execute(message, args, client) {
    try {
      if (!args[1]) return message.reply("✖〢Para utilizar este comando, você deve inserir um número");
      
      let phoneNumber = args.slice(1, args.length).join("").replace(/-|[+]/g, "");
      
      if (!/[0-9]{12,13}/.test(phoneNumber)) return message.reply("✖〢Número inválido!");
      
      const media = await MessageMedia.fromFilePath("./media/presentation_1.jpg");
      
      const message_1 = await client.sendMessage(phoneNumber, media);
      
      const message_2 = await client.sendMessage(phoneNumber, "Imagine uma mensagem de anúncio aqui!");
      
      if (message_1 && message_2) {
        message.reply("✔〢Anúncio enviado com sucesso!");
      } else {
        message.reply("✖〢Falha ao enviar anúncio.\n\n⇝ Verifique-se que o número inserido segue o padrão abaixo:\n\n+55 21 9xxxx-xxxx\n\n- 55: Código do País\n- 21: DDD\n- 9xxxx-xxxx: Número da Linha (podendo ou não começar com 9)");
      }
    } catch(err) {
      console.log(err)
    }
  }
}