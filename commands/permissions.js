const { Permissions, MessageEmbed } = require("discord.js");
// const { addChannels, listChannels } = require("../models/permissionsModel");

module.exports = {
  name: "permissions",
  aliases: "perm",
  description: "Permissions commands untuk channel yang diperbolehkan saja",
  execute(message, args, client) {
    if (message.author.bot) return;

    let section = args.slice(2).join(" ");

    if (args[1].toLowerCase() == "add") {
      console.log("hello!");
    }
  },
};
