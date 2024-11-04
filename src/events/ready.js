const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  async execute(client) {
    try {
      console.log("ZeusBolt: Conectado.");
      /*
      await mongoose.connect(mongoToken + "invite", {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }).then(() => {
        console.log(`[${client.user.username}DB Status]: Online`);
      }).catch(async (err) => {
        console.log(`[${client.user.username}DB Status]: Offline\n\n${err}`);
        return;
      });
      
      mongoose.connection.on("disconnected", async () => {
        console.log("Conexão com o MongoDB perdida. Tentando reconectar...");
        
        await mongoose.connect(mongoToken + "invite", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }).then(() => {
          console.log("Conexão com MongoDB reestabelecida com sucesso!")
        }).catch(err => {
          console.log(`Falha ao tentar reconectar!\n\n${err}`)
        })
      });
      */
    } catch(err) {
      console.log(err)
    }
  }
}