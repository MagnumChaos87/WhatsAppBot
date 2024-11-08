const UserSchema = require("../schemas/UserSchema");

const xlsx = require("xlsx");

const fs = require("fs");

const path = require("path");

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
        
        const tempFilePath = path.join(__dirname, "temp.xlsx");
        
        fs.writeFileSync(tempFilePath, media.data, { encoding: "base64" });
        
        const workbook = xlsx.readFile(tempFilePath);
        
        const sheetName = workbook.SheetNames[0];
        
        const worksheet = workbook.Sheets[sheetName];
        
        const users = xlsx.utils.sheet_to_json(worksheet);
        
        for (const user of users) {
          console.log(user);
          /*
          const phoneNumber = Object.values(user)[0].replace(/-|[+]|\s/g, "");
          
          if (!/[0-9]{12,13}/.test(phoneNumber)) continue;
          
          const User = await UserSchema.findOne({ ID: phoneNumber + "@c.us" });
          
          if (User) continue;
          
          await UserSchema.create({ ID: phoneNumber + "@c.us" });
          */
        }
        
        fs.unlinkSync(tempFilePath);
        
        response.edit("✔〢Contatos adicionados.");
      } else {
        response.edit("✖〢Arquivo não suportado.");
      }
    } catch (err) {
      console.log(err);
    }
  }
}