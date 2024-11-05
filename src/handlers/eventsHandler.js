const fs = require("node:fs");

module.exports = (client) => {
  try {
    for (const file of fs.readdirSync("./src/events/")) {
      const event = require(`../events/${file}`);
      
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  } catch(err) {
    console.log(err)
  }
}