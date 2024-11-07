

module.exports = {
  data: {
    name: "test",
    type: "message"
  },
  async execute(message, args, client) {
    try {
      message.reply({
        text: "teste",
        buttons: [{
          body: "Instagram",
          url: "https://www.instagram.com/rfoliveirasc/"
        }]
      })
    } catch(err) {
      console.log(err)
    }
  }
}