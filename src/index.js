const { Client, NoAur } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new NoAuth(),
  puppeteer: {
    args: ["--headless", "--no-sandbox", "--no-first-run", "--disable-gpu", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    headless: false 
  }
})

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  
  console.log("QR RECEIVED", qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", msg => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }
});

client.initialize();