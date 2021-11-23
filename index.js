const { Intents, Client } = require("discord.js");
const { TOKEN } = require("./config/config.json");
const fs = require("fs");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const files = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));

for (const file of files) {
  const events = require(`./events/${file}`);

  if (events.once) {
    client.once(events.name, (...args) => events.execute(...args, client));
  } else {
    client.on(events.name, (...args) => events.execute(...args, client));
  }
}

client.login(TOKEN);
