const mongoose = require("mongoose");

const UserSchema = require("../schemas/UserSchema");

require("dotenv").config();

module.exports = {
  name: "ready",
  async execute(client) {
    try {
      console.log("[ZeusBolt]: ⚡");
      
      await mongoose.connect(process.env.MONGO_TOKEN + "advertisement", {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }).then(() => {
        console.log(`[ZeusBoltDB Status]: ⚡`);
      }).catch(async (err) => {
        console.log(`[ZeusBoltDB Status]: ✖`, err);
        return;
      });
      
      mongoose.connection.on("disconnected", async () => {
        console.log("Conexão com o MongoDB perdida. Tentando reconectar...");
        
        await mongoose.connect(process.env.MONGO_TOKEN + "advertisement", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }).then(() => {
          console.log("Conexão com MongoDB reestabelecida com sucesso!");
        }).catch(err => {
          console.log("Falha ao tentar reconectar!", err);
        })
      });
      
      const second = 1000;
      const minute = 60 * second;
      const hour = 60 * minute;
      const day = 24 * hour;
      const week = 7 * day;
      
      setInterval(async () => {
        await sendAd();
      }, minute);
      
      async function sendAd() {
        const Users = await UserSchema.find().then(async (Users) => {
          return Array.from(Users.values());
        })
        
        for (User of Users) {
          if (User.lastAd + hour > Date.now()) continue;
          
          client.sendMessage(User.ID, "🍖〢Cápsulas que curam a fome por apenas 1000000000000 pesos bolivianos!\n\n- Ingerir essa Cápsula Magica com um pão faz a fome sumir num instante.\n\nCompre já: https://virustotal.com");
          
          User.lastAd = Date.now();
          
          await User.save();
        }
      }
    } catch(err) {
      console.log(err)
    }
  }
}