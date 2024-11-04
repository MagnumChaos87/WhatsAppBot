module.exports = {
  name: "qr",
  async execute(qr, client) {
    try {
      console.log("QR CODE:", qr);
    } catch(err) {
      console.log(err)
    }
  }
}