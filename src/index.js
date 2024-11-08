const fs = require("node:fs");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--headless", "--no-sandbox", "--no-first-run", "--disable-gpu", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    headless: true 
  }
});

client.commands = new Map();

for (const file of fs.readdirSync("./src/handlers").filter(file => file.endsWith("Handler.js"))) {
  require(`./handlers/${file}`)(client)
};

client.initialize();