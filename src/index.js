const fs = require("node:fs");

const { Client, NoAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new NoAuth(),
  puppeteer: {
    args: ["--headless", "--no-sandbox", "--no-first-run", "--disable-gpu", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    headless: false 
  }
});

for (const file of fs.readdirSync("./src/handlers").filter(file => file.endsWith("Handler.js"))) {
  require(`./handlers/${file}`)(client)
};

client.initialize();