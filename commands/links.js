const { Permissions, MessageEmbed } = require("discord.js");
const { addLinks } = require("../models/permissionsModel");

module.exports = {
  name: "links",
  aliases: "l",
  description: "Enable / Disable Link",
  async execute(message, args) {
    if (message.author.bot) return;

    if (!args[1]) {
      message.reply(
        "Try use **Help commands** for more informations!" +
          "Use [ **enable** ] to completly enable this features\n" +
          "Use [ **disable** ] to completly disable this features\n"
      );
    }

    if (args[1]) {
      if (args[1].toLowerCase() == "enable") {
        if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
          addLinks(
            message.guild.id,
            "https:// http:// discord-gifte discord.gift discordi.gift discordn.gift bit.ly discord.gg",
            "tenor.com giphy.com webstatic-sea.mihoyo.com mihoyo.com facebook.com instagram.com google.com gamefaqs gamepressure strategyWiki youtube.com JaylsGames IGN Wiki Wikipedia",
            (callback) => {
              message.channel.send(
                `${callback} \nOnly verified Link can used here!`
              );
            }
          );
          console.log(
            `${message.author.tag} menambah permission link default settings`
          );
        } else {
          message.reply(`No Access Granted!`);
        }
      }

      if (args[1].toLowerCase() == "disable") {
        if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
          addLinks(message.guild.id, "", "", (callback) => {
            message.channel.send(`${callback}, ALL Link allowed here!`);
          });
          console.log(`${message.author.tag} menghapus permission link!`);
        } else {
          message.reply(`No Access Granted!`);
        }
      }
    }
  },
};
