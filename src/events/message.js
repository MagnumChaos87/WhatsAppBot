const UserSchema = require("../schemas/UserSchema");

const commands = require("../handlers/commandsHandler");

module.exports = {
  name: "message",
  async execute(message, client) {
    try {
      const prefix = "!";
      
      const User = await UserSchema.findOne({
        ID: message.from
      });
      
      if (message.body.startsWith(prefix) && User.role === "admin") {
        const args = message.body.slice(prefix.length).trim().split(/\s+/g);
        
        const command = commands.find(cmd => cmd.name === args[0] && cmd.type === this.name);
        
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