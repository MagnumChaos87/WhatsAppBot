const fs = require("node:fs");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--headless", "--no-sandbox", "--no-first-run", "--disable-gpu", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    headless: false 
  }
});

require("./handlers/eventsHandler")(client);

client.initialize();