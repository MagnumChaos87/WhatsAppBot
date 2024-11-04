module.exports = {
  name: "message",
  async execute(message, client) {
    try {
      console.log(message.body);
      
      if (message.body === "oi") {
        message.reply("bom dia")
      }
    } catch(err) {
      console.log(err)
    }
  }
}