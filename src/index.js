const qrcode = require("qrcode-terminal");

const { Client, NoAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new NoAuth(),
  puppeteer: {
    args: ["--headless", "--no-sandbox", "--no-first-run", "--disable-gpu", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    headless: false 
  }
})

client.on("qr", (qr) => {
  qrcode.generate(qr, {small: true})
});

client.on("ready", () => {
  console.log("TO ON!!");
});

client.on("message", msg => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }
});

client.initialize();