module.exports = {
  name: "message",
  async execute(message, client) {
    try {
      console.log(message);
      
      if (message.body.toLowerCase() === "oi") message.reply("Boa Tarde");
    } catch(err) {
      console.log(err)
    }
  }
}