const { Client, NoAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new NoAuth(),
  puppeteer: {
    args: ["--headless", "--no-sandbox", "--no-first-run", "--disable-gpu", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    headless: false 
  }
})

client.on("qr", (qr) => {
  console.log("QR Code pra logar", qr);
});

client.on("ready", () => {
  console.log("To on");
});

client.on("message", msg => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }
});

client.initialize();