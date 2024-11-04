module.exports = {
  name: "qr",
  async execute(qr, client) {
    try {
      console.log("QR CODE:", `${qr}\nㅤ`);
    } catch(err) {
      console.log(err)
    }
  }
}