const fs = require("node:fs");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--headless", "--no-sandbox", "--no-first-run", "--disable-gpu", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    headless: false 
  }
});

client.commands = new Map();

client.commands.set("oi", "teste");

console.log(client.commands);

for (const file of fs.readdirSync("./handlers/")) {
  require(`./handlers/${file}`)(client, commands);
}

client.initialize();