const UserSchema = require("../schemas/UserSchema");

const ClientSchema = require("../schemas/ClientSchema");

module.exports = {
  name: "message",
  async execute(message, client) {
    try {
      const Client = await ClientSchema.findOne({
        ID: client.info.wid._serialized
      });
      
      const User = await UserSchema.findOne({
        ID: message.from
      });
      
      if (message.body.startsWith(Client.prefix) && User.role === "admin") {
        const args = message.body.slice(Client.prefix.length).trim().split(/\s+/g);
        
        const command = client.commands.find(cmd => cmd.name === args[0] && cmd.type === this.name);
        
        if (command) {
          command.execute(message, args, client);
          
          return;
        }
        
        message.reply("✖〢Comando não encontrado.");
        
        return;
      }
    } catch(err) {
      console.log(err)
    }
  }
}