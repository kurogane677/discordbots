const { Collection } = require("discord.js");
const fs = require("fs");

commands = new Collection();

const commandFiles = fs
  .readdirSync("./slashcommands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`../slashcommands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  commands.set(command.data.name, command);
}

module.exports = commands;
