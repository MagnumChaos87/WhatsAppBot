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
          if (User.lastAd + hour > Date.now() || User.status) continue;
          
          client.sendMessage(User.ID, "Imagine uma mensagem de ad aqui!", {
            caption: "Imagem de anuncio",
            image: "./media/presentation_1.jpg"
          });
          
          User.lastAd = Date.now();
          
          await User.save();
        }
      }
    } catch(err) {
      console.log(err)
    }
  }
}