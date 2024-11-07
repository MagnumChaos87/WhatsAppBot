const UserSchema = require("../schemas/UserSchema");

const xlsx = require("xlsx");

module.exports = {
  data: {
    name: "addContacts",
    type: "message"
  },
  async execute(message, args, client) {
    try {
      if (!message.hasMedia) return message.reply("✖〢Para usar este comando, é necessário um arquivo xlsx");
      
      const response = await message.reply("⏳〢Processando...");
      
      const media = await message.downloadMedia();
      
      if (media.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        
        const workbook = xlsx.readFile(media.filename);
        
        const sheetName = workbook.SheetNames[0];
        
        const worksheet = workbook.Sheets[sheetName];
        
        const users = xlsx.utils.sheet_to_json(worksheet);
        
        for (const user of users) {
          console.log(user);
          
          /*
          const User = await UserSchema.findOne({
            ID: user + "@c.us"
          });
          
          if (User) continue;
          
          await UserSchema.create({
            ID: user + "@c.us"
          });
          */
        }
        
        response.edit("✔〢Contatos adicionados.");
      } else {
        response.edit("✖〢Arquivo não suportado.");
      }
    } catch(err) {
      console.log(err)
    }
  }
}