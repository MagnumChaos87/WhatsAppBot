const { UserSchema } = require("../schemas/UserSchema");

module.exports = {
  name: "message",
  async execute(message, client) {
    try {
      console.log(client.me);
      
      if (message.from === client.me) return;
      
      let User = await UserSchema.findOne({
        ID: message.from
      });
      
      if (!User) User = await UserSchema.create({
        ID: message.from
      });
      
      if (message.body.toLowerCase() === "oi") message.reply("Boa Tarde");
      
      if (message.body.toLowerCase() === "tchau") message.reply("Até logo, até mais ver, bon voyage, arrivederci, até mais, adeus, boa viagem, vá em paz, que a porta bata onde o sol não bate, não volte mais aqui, hasta la vista baby, escafeda-se, e saia logo daqui");
    } catch(err) {
      console.log(err)
    }
  }
}