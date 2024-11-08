const UserSchema = require("../schemas/UserSchema");

const commands = require("../handlers/commandsHandler");

module.exports = {
  name: "message_create",
  async execute(message, client) {
    try {
      const prefix = "!";
      
      if (!message.body.startsWith(prefix)) return;
      
      const User = await UserSchema.findOne({
        ID: message.from
      });
      
      if (message.body.startsWith(prefix) && User.role === "admin") {
        
        const args = message.body.slice(prefix.length).trim().split(/\s+/g);
        
        const command = client.commands.get(args[0]);
        
        if (command) {
          if (command.data.type !== "message") return;
          
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