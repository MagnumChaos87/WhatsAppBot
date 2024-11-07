const UserSchema = require("../schemas/UserSchema");

const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
  data: {
    name: "sendAd",
    type: "message"
  },
  async execute(message, args, client) {
    try {
      if (!args[1]) return message.reply("✖〢Para utilizar este comando, você deve inserir um número.");
      
      if (args[1].toLowerCase() === "todos") {
        const Users = await UserSchema.find();
        
        for (const User of Users) {
          client.sendMessage(User.ID, "Testando envio em massa")
        }
        
        message.reply("Envios feito com sucesso.")
        
        return;
      }
      
      let phoneNumber = args.slice(1, args.length).join("").replace(/-|[+]/g, "");
      
      if (!/[0-9]{12,13}/.test(phoneNumber)) return message.reply("✖〢Número inválido!");
      
      const media = await MessageMedia.fromFilePath("./media/presentation_1.jpg");
      
      const message_1 = await client.sendMessage(phoneNumber + "@c.us", media);
      
      const message_2 = await client.sendMessage(phoneNumber + "@c.us", "Olá, a RF Multieco tem novidades para você! Aproveite nossa promoção especial em serviços de instalação e manutenção elétrica. Garantimos qualidade e segurança para sua casa ou empresa. Fale com a gente para saber mais!");
      
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